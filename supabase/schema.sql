-- Multi-Purpose Tool - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create action_type enum
CREATE TYPE action_type AS ENUM (
  'view',
  'generate',
  'copy',
  'download',
  'share',
  'configure',
  'reset',
  'error',
  'complete'
);

-- Tool Actions Table - Tracks all user actions on tools
CREATE TABLE IF NOT EXISTS tool_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  tool_id TEXT NOT NULL,
  group_id TEXT NOT NULL,
  action_type action_type NOT NULL,
  action_data JSONB DEFAULT NULL,
  session_id TEXT NOT NULL,
  user_agent TEXT DEFAULT NULL,
  ip_address INET DEFAULT NULL,
  locale TEXT DEFAULT NULL,
  referrer TEXT DEFAULT NULL,
  duration_ms INTEGER DEFAULT NULL
);

-- Page Views Table - Tracks page visits
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  page_path TEXT NOT NULL,
  session_id TEXT NOT NULL,
  user_agent TEXT DEFAULT NULL,
  ip_address INET DEFAULT NULL,
  locale TEXT DEFAULT NULL,
  referrer TEXT DEFAULT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tool_actions_tool_id ON tool_actions(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_actions_group_id ON tool_actions(group_id);
CREATE INDEX IF NOT EXISTS idx_tool_actions_created_at ON tool_actions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tool_actions_session_id ON tool_actions(session_id);
CREATE INDEX IF NOT EXISTS idx_tool_actions_action_type ON tool_actions(action_type);

CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);

-- Row Level Security (RLS)
ALTER TABLE tool_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts" ON tool_actions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Service role full access" ON tool_actions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access" ON page_views
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Analytics Views for Dashboard

-- Daily tool usage summary
CREATE OR REPLACE VIEW daily_tool_usage AS
SELECT 
  DATE(created_at) as date,
  tool_id,
  group_id,
  action_type,
  COUNT(*) as count
FROM tool_actions
GROUP BY DATE(created_at), tool_id, group_id, action_type
ORDER BY date DESC, count DESC;

-- Popular tools (last 30 days)
CREATE OR REPLACE VIEW popular_tools AS
SELECT 
  tool_id,
  group_id,
  COUNT(*) as total_actions,
  COUNT(DISTINCT session_id) as unique_sessions
FROM tool_actions
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY tool_id, group_id
ORDER BY total_actions DESC;

-- Daily active users
CREATE OR REPLACE VIEW daily_active_sessions AS
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) as total_actions
FROM tool_actions
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Comment: Grant access to views
GRANT SELECT ON daily_tool_usage TO anon, authenticated;
GRANT SELECT ON popular_tools TO anon, authenticated;
GRANT SELECT ON daily_active_sessions TO anon, authenticated;
