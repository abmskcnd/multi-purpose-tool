'use client';

/**
 * React hooks for tools data from Supabase
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchToolGroups,
  fetchPopularTools,
  fetchFeaturedTools,
  searchTools,
  fetchToolById,
  fetchToolGroupById,
  type TransformedToolGroup,
  type TransformedTool,
  type ToolWithGroup,
  type Locale,
} from '@/lib/supabase/tools';

// Re-export types
export type { TransformedToolGroup, TransformedTool, ToolWithGroup };

interface UseToolGroupsReturn {
  groups: TransformedToolGroup[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UsePopularToolsReturn {
  tools: ToolWithGroup[];
  isLoading: boolean;
  error: Error | null;
}

interface UseFeaturedToolsReturn {
  tools: ToolWithGroup[];
  isLoading: boolean;
  error: Error | null;
}

interface UseSearchToolsReturn {
  results: ToolWithGroup[];
  isLoading: boolean;
  error: Error | null;
  search: (query: string) => Promise<void>;
}

interface UseToolReturn {
  tool: TransformedTool | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseToolGroupReturn {
  group: TransformedToolGroup | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch all tool groups with their tools
 */
export function useToolGroups(): UseToolGroupsReturn {
  const [groups, setGroups] = useState<TransformedToolGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchToolGroups();
      setGroups(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tool groups'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { groups, isLoading, error, refetch };
}

/**
 * Hook to fetch popular tools
 */
export function usePopularTools(limit: number = 10): UsePopularToolsReturn {
  const [tools, setTools] = useState<ToolWithGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPopularTools(limit);
        if (!cancelled) {
          setTools(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to fetch popular tools'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetch();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { tools, isLoading, error };
}

/**
 * Hook to fetch featured tools
 */
export function useFeaturedTools(limit: number = 6): UseFeaturedToolsReturn {
  const [tools, setTools] = useState<ToolWithGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchFeaturedTools(limit);
        if (!cancelled) {
          setTools(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to fetch featured tools'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetch();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { tools, isLoading, error };
}

/**
 * Hook to search tools
 * @param locale - Locale for search
 */
export function useSearchTools(
  locale: Locale = 'en'
): UseSearchToolsReturn {
  const [results, setResults] = useState<ToolWithGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await searchTools(query, locale);
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to search tools'));
      } finally {
        setIsLoading(false);
      }
    },
    [locale]
  );

  return { results, isLoading, error, search };
}

/**
 * Hook to fetch a single tool by ID
 */
export function useTool(toolId: string, groupId: string): UseToolReturn {
  const [tool, setTool] = useState<TransformedTool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchToolById(toolId, groupId);
        if (!cancelled) {
          setTool(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to fetch tool'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    if (toolId && groupId) {
      fetch();
    }

    return () => {
      cancelled = true;
    };
  }, [toolId, groupId]);

  return { tool, isLoading, error };
}

/**
 * Hook to fetch a tool group by ID
 */
export function useToolGroup(groupId: string): UseToolGroupReturn {
  const [group, setGroup] = useState<TransformedToolGroup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchToolGroupById(groupId);
        if (!cancelled) {
          setGroup(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to fetch tool group'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    if (groupId) {
      fetch();
    }

    return () => {
      cancelled = true;
    };
  }, [groupId]);

  return { group, isLoading, error };
}

/**
 * Hook to get flattened list of all tools from groups
 */
export function useAllTools(): {
  tools: ToolWithGroup[];
  isLoading: boolean;
  error: Error | null;
} {
  const { groups, isLoading, error } = useToolGroups();

  const tools = useMemo(() => {
    return groups.flatMap((group) =>
      group.tools.map((tool) => ({
        ...tool,
        groupTitle: group.title,
        groupIcon: group.icon,
        groupPriority: group.priority,
      }))
    );
  }, [groups]);

  return { tools, isLoading, error };
}

/**
 * Hook to filter tools by various criteria
 */
export function useFilteredTools(options: {
  groupId?: string;
  status?: string;
  implementation?: string;
  searchQuery?: string;
  locale?: Locale;
}) {
  const { groups, isLoading, error } = useToolGroups();
  const { groupId, status, implementation, searchQuery, locale = 'en' } = options;

  const filteredTools = useMemo(() => {
    let tools = groups.flatMap((group) =>
      group.tools.map((tool) => ({
        ...tool,
        groupTitle: group.title,
        groupIcon: group.icon,
        groupPriority: group.priority,
      }))
    );

    // Filter by group
    if (groupId && groupId !== 'all') {
      tools = tools.filter((tool) => tool.groupId === groupId);
    }

    // Filter by status
    if (status && status !== 'all') {
      tools = tools.filter((tool) => tool.status === status);
    }

    // Filter by implementation type
    if (implementation && implementation !== 'all') {
      tools = tools.filter((tool) => tool.implementation === implementation);
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter((tool) => {
        const title = tool.title[locale] || tool.title.en;
        const description = tool.description[locale] || tool.description.en;
        return (
          title.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          tool.keywords.some((k) => k.toLowerCase().includes(query))
        );
      });
    }

    return tools;
  }, [groups, groupId, status, implementation, searchQuery, locale]);

  return {
    tools: filteredTools,
    totalCount: filteredTools.length,
    isLoading,
    error,
  };
}
