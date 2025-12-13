/**
 * Supabase Database Types
 * Auto-generated types for the database schema
 */

export interface Database {
  public: {
    Tables: {
      tool_actions: {
        Row: {
          id: string;
          created_at: string;
          tool_id: string;
          group_id: string;
          action_type: ActionType;
          action_data: Record<string, unknown> | null;
          session_id: string;
          user_agent: string | null;
          ip_address: string | null;
          locale: string | null;
          referrer: string | null;
          duration_ms: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          tool_id: string;
          group_id: string;
          action_type: ActionType;
          action_data?: Record<string, unknown> | null;
          session_id: string;
          user_agent?: string | null;
          ip_address?: string | null;
          locale?: string | null;
          referrer?: string | null;
          duration_ms?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          tool_id?: string;
          group_id?: string;
          action_type?: ActionType;
          action_data?: Record<string, unknown> | null;
          session_id?: string;
          user_agent?: string | null;
          ip_address?: string | null;
          locale?: string | null;
          referrer?: string | null;
          duration_ms?: number | null;
        };
      };
      page_views: {
        Row: {
          id: string;
          created_at: string;
          page_path: string;
          session_id: string;
          user_agent: string | null;
          ip_address: string | null;
          locale: string | null;
          referrer: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          page_path: string;
          session_id: string;
          user_agent?: string | null;
          ip_address?: string | null;
          locale?: string | null;
          referrer?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          page_path?: string;
          session_id?: string;
          user_agent?: string | null;
          ip_address?: string | null;
          locale?: string | null;
          referrer?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      action_type: ActionType;
    };
  };
}

export type ActionType =
  | 'view' // User views the tool
  | 'generate' // User generates something (password, etc.)
  | 'copy' // User copies result
  | 'download' // User downloads result
  | 'share' // User shares the tool
  | 'configure' // User changes settings
  | 'reset' // User resets the tool
  | 'error' // An error occurred
  | 'complete'; // User completes an action

export type ToolAction = Database['public']['Tables']['tool_actions']['Row'];
export type ToolActionInsert = Database['public']['Tables']['tool_actions']['Insert'];
export type PageView = Database['public']['Tables']['page_views']['Row'];
export type PageViewInsert = Database['public']['Tables']['page_views']['Insert'];
