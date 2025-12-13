export { supabase, createServerSupabaseClient } from './client';
export type {
  Database,
  ActionType,
  TrackingMetadata,
  ToolAction,
  ToolActionInsert,
  Tool,
  ToolGroup,
  ToolInsert,
  ToolGroupInsert,
  LocalizedString,
  ToolStatus,
  ImplementationType,
  Locale,
} from './types';

// Tools data services
export {
  fetchToolGroups,
  fetchPopularTools,
  fetchFeaturedTools,
  searchTools,
  fetchToolById,
  fetchToolGroupById,
  incrementToolView,
  incrementToolUse,
  clearToolsCache,
  getTotalToolCountFromRegistry,
  getTotalGroupCountFromRegistry,
  type TransformedTool,
  type TransformedToolGroup,
  type ToolWithGroup,
} from './tools';
