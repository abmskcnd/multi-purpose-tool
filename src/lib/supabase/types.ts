/**
 * Supabase Database Types
 * Optimized schema for Supabase Free Tier (500MB)
 * Uses partitioned table with minimal columns
 */

// Supported locales
export type Locale = 'en' | 'vi' | 'ja' | 'zh' | 'es';

// Localized string type for i18n support
export type LocalizedString = Record<Locale, string>;

// Tool status enum
export type ToolStatus = 'coming-soon' | 'active' | 'deprecated' | 'new' | 'beta';

// Implementation type enum
export type ImplementationType = 'client-side' | 'server-side' | 'hybrid';

// Action types supported by tracking
export type ActionType = 
  | 'view' 
  | 'generate' 
  | 'copy' 
  | 'download' 
  | 'share' 
  | 'configure' 
  | 'reset' 
  | 'error' 
  | 'complete';

// Metadata stored in JSONB column (consolidated to save space)
export interface TrackingMetadata {
  locale?: string;
  duration_ms?: number;
  action_data?: Record<string, unknown>;
  user_agent?: string;
  referrer?: string;
}

export interface Database {
  public: {
    Tables: {
      tool_actions: {
        Row: {
          id: string;
          created_at: string;
          tool_id: string;
          group_id: string;
          action_type: string;
          session_id: string;
          metadata: TrackingMetadata | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          tool_id: string;
          group_id: string;
          action_type: string;
          session_id: string;
          metadata?: TrackingMetadata | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          tool_id?: string;
          group_id?: string;
          action_type?: string;
          session_id?: string;
          metadata?: TrackingMetadata | null;
        };
      };
      tool_groups: {
        Row: {
          id: string;
          title: LocalizedString;
          description: LocalizedString;
          icon: string;
          priority: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: LocalizedString;
          description: LocalizedString;
          icon?: string;
          priority?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: LocalizedString;
          description?: LocalizedString;
          icon?: string;
          priority?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      tools: {
        Row: {
          id: string;
          group_id: string;
          title: LocalizedString;
          description: LocalizedString;
          icon: string;
          priority: number;
          status: ToolStatus;
          implementation: ImplementationType;
          keywords: string[];
          tags: string[];
          warning: string | null;
          is_popular: boolean;
          is_featured: boolean;
          view_count: number;
          use_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          group_id: string;
          title: LocalizedString;
          description: LocalizedString;
          icon?: string;
          priority?: number;
          status?: ToolStatus;
          implementation?: ImplementationType;
          keywords?: string[];
          tags?: string[];
          warning?: string | null;
          is_popular?: boolean;
          is_featured?: boolean;
          view_count?: number;
          use_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          group_id?: string;
          title?: LocalizedString;
          description?: LocalizedString;
          icon?: string;
          priority?: number;
          status?: ToolStatus;
          implementation?: ImplementationType;
          keywords?: string[];
          tags?: string[];
          warning?: string | null;
          is_popular?: boolean;
          is_featured?: boolean;
          view_count?: number;
          use_count?: number;
          updated_at?: string;
        };
      };
    };
    Functions: {
      create_next_month_partition: {
        Args: Record<string, never>;
        Returns: string;
      };
      drop_old_partitions: {
        Args: { months_to_keep?: number };
        Returns: string;
      };
      get_partition_sizes: {
        Args: Record<string, never>;
        Returns: Array<{
          partition_name: string;
          total_size: string;
          row_count: number;
        }>;
      };
      get_all_tools_with_groups: {
        Args: Record<string, never>;
        Returns: Array<{
          tool_id: string;
          tool_title: LocalizedString;
          tool_description: LocalizedString;
          tool_icon: string;
          tool_status: ToolStatus;
          tool_implementation: ImplementationType;
          tool_keywords: string[];
          tool_tags: string[];
          tool_priority: number;
          tool_is_popular: boolean;
          tool_is_featured: boolean;
          group_id: string;
          group_title: LocalizedString;
          group_icon: string;
          group_priority: number;
        }>;
      };
      get_popular_tools: {
        Args: { limit_count?: number };
        Returns: Array<{
          tool_id: string;
          tool_title: LocalizedString;
          tool_description: LocalizedString;
          tool_icon: string;
          tool_status: ToolStatus;
          group_id: string;
          group_title: LocalizedString;
          group_icon: string;
        }>;
      };
      get_featured_tools: {
        Args: { limit_count?: number };
        Returns: Array<{
          tool_id: string;
          tool_title: LocalizedString;
          tool_description: LocalizedString;
          tool_icon: string;
          tool_status: ToolStatus;
          group_id: string;
          group_title: LocalizedString;
          group_icon: string;
        }>;
      };
      search_tools: {
        Args: { search_query: string; locale?: Locale };
        Returns: Array<{
          tool_id: string;
          tool_title: LocalizedString;
          tool_description: LocalizedString;
          tool_icon: string;
          tool_status: ToolStatus;
          group_id: string;
          group_title: LocalizedString;
          group_icon: string;
          relevance: number;
        }>;
      };
      increment_tool_view: {
        Args: { p_tool_id: string; p_group_id: string };
        Returns: void;
      };
      increment_tool_use: {
        Args: { p_tool_id: string; p_group_id: string };
        Returns: void;
      };
    };
  };
}

// Type aliases for convenience
export type ToolAction = Database['public']['Tables']['tool_actions']['Row'];
export type ToolActionInsert = Database['public']['Tables']['tool_actions']['Insert'];
export type ToolGroup = Database['public']['Tables']['tool_groups']['Row'];
export type Tool = Database['public']['Tables']['tools']['Row'];
export type ToolGroupInsert = Database['public']['Tables']['tool_groups']['Insert'];
export type ToolInsert = Database['public']['Tables']['tools']['Insert'];
