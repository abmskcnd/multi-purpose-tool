/**
 * Tools Data Service
 * Currently uses hardcoded registry with Supabase support ready for migration
 * 
 * To enable Supabase:
 * 1. Run tools-schema.sql in Supabase
 * 2. Run tools-seed.sql to populate data
 * 3. Set USE_SUPABASE_TOOLS=true in environment
 */

import type { 
  LocalizedString, 
  ToolStatus, 
  ImplementationType,
  Locale 
} from './types';
import { 
  TOOL_GROUPS as HARDCODED_GROUPS, 
  type ToolGroup as HardcodedToolGroup,
  type ToolItem as HardcodedToolItem
} from '@/config/tools.registry';

// Re-export types for convenience
export type { LocalizedString, ToolStatus, ImplementationType, Locale };

// Feature flag - set to true when Supabase is populated
const USE_SUPABASE = process.env.USE_SUPABASE_TOOLS === 'true';

// Transformed types for easier use in components
export interface TransformedTool {
  id: string;
  groupId: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  priority: number;
  status: ToolStatus;
  implementation: ImplementationType;
  keywords: string[];
  tags: string[];
  warning: string | null;
  isPopular: boolean;
  isFeatured: boolean;
  viewCount: number;
  useCount: number;
}

export interface TransformedToolGroup {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  priority: number;
  tools: TransformedTool[];
}

export interface ToolWithGroup extends TransformedTool {
  groupTitle: LocalizedString;
  groupIcon: string;
  groupPriority: number;
}

// Cache for tools data (simple in-memory cache)
let toolsCache: TransformedToolGroup[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Clear the tools cache (useful for admin operations)
 */
export function clearToolsCache(): void {
  toolsCache = null;
  cacheTimestamp = 0;
}

/**
 * Check if cache is still valid
 */
function isCacheValid(): boolean {
  return toolsCache !== null && Date.now() - cacheTimestamp < CACHE_TTL;
}

/**
 * Convert hardcoded tool group to transformed format
 */
function convertHardcodedGroup(group: HardcodedToolGroup): TransformedToolGroup {
  return {
    id: group.id,
    title: {
      vi: group.title,
      en: group.title,
      es: group.title,
      zh: group.title,
      ja: group.title,
    },
    description: {
      vi: group.description,
      en: group.description,
      es: group.description,
      zh: group.description,
      ja: group.description,
    },
    icon: group.icon,
    priority: group.priority,
    tools: group.tools.map((tool) => convertHardcodedTool(tool, group.id)),
  };
}

/**
 * Convert hardcoded tool item to transformed format
 */
function convertHardcodedTool(tool: HardcodedToolItem, groupId: string): TransformedTool {
  return {
    id: tool.id,
    groupId: groupId,
    title: {
      vi: tool.title,
      en: tool.title,
      es: tool.title,
      zh: tool.title,
      ja: tool.title,
    },
    description: {
      vi: tool.description,
      en: tool.description,
      es: tool.description,
      zh: tool.description,
      ja: tool.description,
    },
    icon: tool.icon || '🔧',
    priority: tool.priority,
    status: tool.status as ToolStatus,
    implementation: (tool.implementation || 'client-side') as ImplementationType,
    keywords: tool.keywords || [],
    tags: tool.tags || [],
    warning: tool.warning || null,
    isPopular: tool.priority <= 3, // Top 3 in each group are "popular"
    isFeatured: tool.priority === 1, // First tool in each group is "featured"
    viewCount: 0,
    useCount: 0,
  };
}

/**
 * Get data from hardcoded registry
 */
function getHardcodedGroups(): TransformedToolGroup[] {
  return HARDCODED_GROUPS.map(convertHardcodedGroup);
}

/**
 * Fetch all tool groups with their tools
 * Uses hardcoded registry until Supabase is enabled
 */
export async function fetchToolGroups(): Promise<TransformedToolGroup[]> {
  // Return cached data if valid
  if (isCacheValid() && toolsCache) {
    return toolsCache;
  }

  // For now, always use hardcoded data until Supabase is set up
  if (!USE_SUPABASE) {
    const data = getHardcodedGroups();
    toolsCache = data;
    cacheTimestamp = Date.now();
    return data;
  }

  // TODO: Implement Supabase fetching when enabled
  // This will be activated after running tools-schema.sql and tools-seed.sql
  const data = getHardcodedGroups();
  toolsCache = data;
  cacheTimestamp = Date.now();
  return data;
}

/**
 * Fetch popular tools
 */
export async function fetchPopularTools(limit: number = 10): Promise<ToolWithGroup[]> {
  const groups = await fetchToolGroups();
  const popularTools: ToolWithGroup[] = [];
  
  for (const group of groups) {
    for (const tool of group.tools.slice(0, 2)) {
      if (popularTools.length >= limit) break;
      popularTools.push({
        ...tool,
        groupTitle: group.title,
        groupIcon: group.icon,
        groupPriority: group.priority,
      });
    }
    if (popularTools.length >= limit) break;
  }
  
  return popularTools;
}

/**
 * Fetch featured tools
 */
export async function fetchFeaturedTools(limit: number = 6): Promise<ToolWithGroup[]> {
  const groups = await fetchToolGroups();
  const featuredTools: ToolWithGroup[] = [];
  
  for (const group of groups.slice(0, limit)) {
    if (group.tools.length > 0) {
      const tool = group.tools[0];
      featuredTools.push({
        ...tool,
        groupTitle: group.title,
        groupIcon: group.icon,
        groupPriority: group.priority,
      });
    }
  }
  
  return featuredTools;
}

/**
 * Search tools by query
 */
export async function searchTools(
  query: string, 
  locale: Locale = 'en'
): Promise<ToolWithGroup[]> {
  if (!query.trim()) {
    return [];
  }

  const groups = await fetchToolGroups();
  const lowerQuery = query.toLowerCase();
  const results: ToolWithGroup[] = [];

  for (const group of groups) {
    const groupTitle = group.title[locale] || group.title.en;
    const groupMatches = groupTitle.toLowerCase().includes(lowerQuery);

    for (const tool of group.tools) {
      const toolTitle = tool.title[locale] || tool.title.en;
      const toolDescription = tool.description[locale] || tool.description.en;
      const toolKeywords = tool.keywords.join(' ').toLowerCase();

      const toolMatches =
        toolTitle.toLowerCase().includes(lowerQuery) ||
        toolDescription.toLowerCase().includes(lowerQuery) ||
        toolKeywords.includes(lowerQuery) ||
        groupMatches;

      if (toolMatches) {
        results.push({
          ...tool,
          groupTitle: group.title,
          groupIcon: group.icon,
          groupPriority: group.priority,
        });
      }
    }
  }

  return results;
}

/**
 * Increment tool view count (placeholder - will use Supabase when enabled)
 */
export async function incrementToolView(toolId: string, groupId: string): Promise<void> {
  // Placeholder - analytics are handled separately
  console.debug('Tool view:', groupId, toolId);
}

/**
 * Increment tool use count (placeholder - will use Supabase when enabled)
 */
export async function incrementToolUse(toolId: string, groupId: string): Promise<void> {
  // Placeholder - analytics are handled separately
  console.debug('Tool use:', groupId, toolId);
}

/**
 * Get a single tool by ID and group ID
 */
export async function fetchToolById(
  toolId: string, 
  groupId: string
): Promise<TransformedTool | null> {
  const groups = await fetchToolGroups();
  const group = groups.find((g) => g.id === groupId);
  if (!group) return null;
  return group.tools.find((t) => t.id === toolId) || null;
}

/**
 * Get a single tool group by ID
 */
export async function fetchToolGroupById(
  groupId: string
): Promise<TransformedToolGroup | null> {
  const groups = await fetchToolGroups();
  return groups.find((g) => g.id === groupId) || null;
}

/**
 * Get total tool count
 */
export function getTotalToolCountFromRegistry(): number {
  return HARDCODED_GROUPS.reduce((sum, group) => sum + group.tools.length, 0);
}

/**
 * Get total group count
 */
export function getTotalGroupCountFromRegistry(): number {
  return HARDCODED_GROUPS.length;
}
