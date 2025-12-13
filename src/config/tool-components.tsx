/**
 * Tool Component Registry
 * 
 * This file provides a centralized way to load tool components dynamically.
 * Each tool implementation is in its own folder, minimizing merge conflicts.
 * 
 * ## Team Collaboration Strategy
 * 
 * ### Problem
 * When 3+ developers work on different tools simultaneously, conflicts can occur in:
 * 1. Shared files (registry, routes, etc.)
 * 2. Component exports
 * 3. Translation files
 * 
 * ### Solution: Isolated Tool Modules
 * 
 * Each tool is completely isolated in its own folder:
 * ```
 * src/features/tools/
 * ├── [group-id]/
 * │   └── [tool-id]/
 * │       ├── index.ts          # Export entry point
 * │       ├── [ToolName].tsx    # Main component
 * │       ├── hooks/            # Tool-specific hooks
 * │       ├── utils/            # Tool-specific utilities
 * │       └── i18n/             # Tool-specific translations (merged at build)
 * ```
 * 
 * ### Benefits
 * 1. **No merge conflicts**: Each developer works in their own folder
 * 2. **Easy code review**: Changes are scoped to one tool
 * 3. **Independent testing**: Each tool can have its own tests
 * 4. **Lazy loading**: Tools are loaded on demand
 * 
 * ### How to Implement a New Tool
 * 
 * 1. Create folder: `src/features/tools/[group]/[tool]/`
 * 2. Create component with default export
 * 3. Register in this file's TOOL_COMPONENTS map
 * 4. Update tool status in registry to 'active'
 * 
 * ### Assignment Strategy for Team
 * 
 * - Person A: Works on `password/*` tools
 * - Person B: Works on `text/*` tools  
 * - Person C: Works on `json/*` tools
 * 
 * No shared file modifications needed except this registry.
 */

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Loading component for dynamic imports
const ToolLoading = () => (
  <div className="flex items-center justify-center py-16">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-sm text-muted-foreground">Loading tool...</p>
    </div>
  </div>
);

// Error component for failed dynamic imports
const ToolError = () => (
  <div className="flex items-center justify-center py-16">
    <div className="text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-muted-foreground">Failed to load tool. Please refresh the page.</p>
    </div>
  </div>
);

/**
 * Tool Component Map
 * 
 * Format: `${groupId}/${toolId}` -> dynamic import
 * 
 * When implementing a tool:
 * 1. Create the component in src/features/tools/[group]/[tool]/
 * 2. Add the dynamic import here
 * 3. Update status in tools.registry.ts to 'active'
 * 
 * Example:
 * 'password/generator': dynamic(
 *   () => import('@/features/tools/password/generator'),
 *   { loading: ToolLoading, ssr: false }
 * ),
 */
export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  // ============================================
  // PASSWORD & SECURITY TOOLS
  // Owner: [Assign team member]
  // ============================================
  'password/generator': dynamic(
    () => import('@/features/tools/password/generator'),
    { loading: () => <ToolLoading />, ssr: false }
  ),
  // 'password/strength-checker': dynamic(() => import('@/features/tools/password/strength-checker'), { loading: () => <ToolLoading />, ssr: false }),
  // ... add more password tools

  // ============================================
  // TEXT TOOLS
  // Owner: [Assign team member]
  // ============================================
  // 'text/diff': dynamic(() => import('@/features/tools/text/diff'), { loading: () => <ToolLoading />, ssr: false }),
  // 'text/case-converter': dynamic(() => import('@/features/tools/text/case-converter'), { loading: () => <ToolLoading />, ssr: false }),
  // ... add more text tools

  // ============================================
  // JSON / YAML / XML TOOLS
  // Owner: [Assign team member]
  // ============================================
  // 'json/format-validate': dynamic(() => import('@/features/tools/json/format-validate'), { loading: () => <ToolLoading />, ssr: false }),
  // ... add more json tools
};

/**
 * Get tool component by group and tool ID
 * Returns null if tool is not implemented yet
 */
export function getToolComponent(groupId: string, toolId: string): ComponentType | null {
  const key = `${groupId}/${toolId}`;
  return TOOL_COMPONENTS[key] || null;
}

/**
 * Check if a tool has an implementation
 */
export function hasToolImplementation(groupId: string, toolId: string): boolean {
  const key = `${groupId}/${toolId}`;
  return key in TOOL_COMPONENTS;
}

/**
 * Dynamic tool loader with error boundary
 */
export function createToolLoader(groupId: string, toolId: string) {
  const key = `${groupId}/${toolId}`;
  
  if (!(key in TOOL_COMPONENTS)) {
    return null;
  }

  return dynamic(
    () => import(`@/features/tools/${groupId}/${toolId}`).catch(() => {
      // Return error component if import fails
      return { default: ToolError };
    }),
    {
      loading: () => <ToolLoading />,
      ssr: false,
    }
  );
}
