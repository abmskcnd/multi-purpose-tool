/**
 * Supabase Database Types
 * Optimized schema for Supabase Free Tier (500MB)
 * Uses partitioned table with minimal columns
 */

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
    };
  };
}

// Type aliases for convenience
export type ToolAction = Database['public']['Tables']['tool_actions']['Row'];
export type ToolActionInsert = Database['public']['Tables']['tool_actions']['Insert'];
