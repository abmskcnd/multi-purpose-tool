-- Multi-Purpose Tool - Optimized Supabase Database Schema
-- Designed for Supabase Free Tier (500MB limit)
-- Uses table partitioning for easy cleanup and immediate space release

-- =============================================================================
-- PARTITIONED TABLE: tool_actions
-- =============================================================================
-- Benefits of partitioning:
-- 1. DROP PARTITION releases space IMMEDIATELY (no VACUUM needed)
-- 2. Query performance with partition pruning
-- 3. Easy data lifecycle management
-- =============================================================================

-- Drop existing table if exists (for fresh setup)
DROP TABLE IF EXISTS tool_actions CASCADE;
DROP TABLE IF EXISTS page_views CASCADE;

-- Create partitioned table for tool actions
-- Partitioned by MONTH for balance between management overhead and flexibility
CREATE TABLE tool_actions (
    id UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    -- Core tracking fields (minimal)
    tool_id TEXT NOT NULL,
    group_id TEXT NOT NULL,
    action_type TEXT NOT NULL,  -- view, generate, copy, download, share, configure, reset, error, complete
    session_id TEXT NOT NULL,
    -- Optional metadata (consolidated into JSONB to save columns)
    metadata JSONB DEFAULT NULL,  -- {locale, duration_ms, action_data, user_agent, referrer}
    -- Partition key must be in PRIMARY KEY
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- =============================================================================
-- CREATE PARTITIONS (2024-2029)
-- =============================================================================
-- Pre-created partitions for 5 years - no need to create manually
-- Deploy once and forget until 2030!

-- 2024
CREATE TABLE IF NOT EXISTS tool_actions_2024_12 PARTITION OF tool_actions FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

-- 2025
CREATE TABLE IF NOT EXISTS tool_actions_2025_01 PARTITION OF tool_actions FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_02 PARTITION OF tool_actions FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_03 PARTITION OF tool_actions FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_04 PARTITION OF tool_actions FOR VALUES FROM ('2025-04-01') TO ('2025-05-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_05 PARTITION OF tool_actions FOR VALUES FROM ('2025-05-01') TO ('2025-06-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_06 PARTITION OF tool_actions FOR VALUES FROM ('2025-06-01') TO ('2025-07-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_07 PARTITION OF tool_actions FOR VALUES FROM ('2025-07-01') TO ('2025-08-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_08 PARTITION OF tool_actions FOR VALUES FROM ('2025-08-01') TO ('2025-09-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_09 PARTITION OF tool_actions FOR VALUES FROM ('2025-09-01') TO ('2025-10-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_10 PARTITION OF tool_actions FOR VALUES FROM ('2025-10-01') TO ('2025-11-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_11 PARTITION OF tool_actions FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');
CREATE TABLE IF NOT EXISTS tool_actions_2025_12 PARTITION OF tool_actions FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');

-- 2026
CREATE TABLE IF NOT EXISTS tool_actions_2026_01 PARTITION OF tool_actions FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_02 PARTITION OF tool_actions FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_03 PARTITION OF tool_actions FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_04 PARTITION OF tool_actions FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_05 PARTITION OF tool_actions FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_06 PARTITION OF tool_actions FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_07 PARTITION OF tool_actions FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_08 PARTITION OF tool_actions FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_09 PARTITION OF tool_actions FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_10 PARTITION OF tool_actions FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_11 PARTITION OF tool_actions FOR VALUES FROM ('2026-11-01') TO ('2026-12-01');
CREATE TABLE IF NOT EXISTS tool_actions_2026_12 PARTITION OF tool_actions FOR VALUES FROM ('2026-12-01') TO ('2027-01-01');

-- 2027
CREATE TABLE IF NOT EXISTS tool_actions_2027_01 PARTITION OF tool_actions FOR VALUES FROM ('2027-01-01') TO ('2027-02-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_02 PARTITION OF tool_actions FOR VALUES FROM ('2027-02-01') TO ('2027-03-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_03 PARTITION OF tool_actions FOR VALUES FROM ('2027-03-01') TO ('2027-04-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_04 PARTITION OF tool_actions FOR VALUES FROM ('2027-04-01') TO ('2027-05-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_05 PARTITION OF tool_actions FOR VALUES FROM ('2027-05-01') TO ('2027-06-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_06 PARTITION OF tool_actions FOR VALUES FROM ('2027-06-01') TO ('2027-07-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_07 PARTITION OF tool_actions FOR VALUES FROM ('2027-07-01') TO ('2027-08-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_08 PARTITION OF tool_actions FOR VALUES FROM ('2027-08-01') TO ('2027-09-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_09 PARTITION OF tool_actions FOR VALUES FROM ('2027-09-01') TO ('2027-10-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_10 PARTITION OF tool_actions FOR VALUES FROM ('2027-10-01') TO ('2027-11-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_11 PARTITION OF tool_actions FOR VALUES FROM ('2027-11-01') TO ('2027-12-01');
CREATE TABLE IF NOT EXISTS tool_actions_2027_12 PARTITION OF tool_actions FOR VALUES FROM ('2027-12-01') TO ('2028-01-01');

-- 2028
CREATE TABLE IF NOT EXISTS tool_actions_2028_01 PARTITION OF tool_actions FOR VALUES FROM ('2028-01-01') TO ('2028-02-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_02 PARTITION OF tool_actions FOR VALUES FROM ('2028-02-01') TO ('2028-03-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_03 PARTITION OF tool_actions FOR VALUES FROM ('2028-03-01') TO ('2028-04-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_04 PARTITION OF tool_actions FOR VALUES FROM ('2028-04-01') TO ('2028-05-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_05 PARTITION OF tool_actions FOR VALUES FROM ('2028-05-01') TO ('2028-06-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_06 PARTITION OF tool_actions FOR VALUES FROM ('2028-06-01') TO ('2028-07-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_07 PARTITION OF tool_actions FOR VALUES FROM ('2028-07-01') TO ('2028-08-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_08 PARTITION OF tool_actions FOR VALUES FROM ('2028-08-01') TO ('2028-09-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_09 PARTITION OF tool_actions FOR VALUES FROM ('2028-09-01') TO ('2028-10-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_10 PARTITION OF tool_actions FOR VALUES FROM ('2028-10-01') TO ('2028-11-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_11 PARTITION OF tool_actions FOR VALUES FROM ('2028-11-01') TO ('2028-12-01');
CREATE TABLE IF NOT EXISTS tool_actions_2028_12 PARTITION OF tool_actions FOR VALUES FROM ('2028-12-01') TO ('2029-01-01');

-- 2029
CREATE TABLE IF NOT EXISTS tool_actions_2029_01 PARTITION OF tool_actions FOR VALUES FROM ('2029-01-01') TO ('2029-02-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_02 PARTITION OF tool_actions FOR VALUES FROM ('2029-02-01') TO ('2029-03-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_03 PARTITION OF tool_actions FOR VALUES FROM ('2029-03-01') TO ('2029-04-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_04 PARTITION OF tool_actions FOR VALUES FROM ('2029-04-01') TO ('2029-05-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_05 PARTITION OF tool_actions FOR VALUES FROM ('2029-05-01') TO ('2029-06-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_06 PARTITION OF tool_actions FOR VALUES FROM ('2029-06-01') TO ('2029-07-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_07 PARTITION OF tool_actions FOR VALUES FROM ('2029-07-01') TO ('2029-08-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_08 PARTITION OF tool_actions FOR VALUES FROM ('2029-08-01') TO ('2029-09-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_09 PARTITION OF tool_actions FOR VALUES FROM ('2029-09-01') TO ('2029-10-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_10 PARTITION OF tool_actions FOR VALUES FROM ('2029-10-01') TO ('2029-11-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_11 PARTITION OF tool_actions FOR VALUES FROM ('2029-11-01') TO ('2029-12-01');
CREATE TABLE IF NOT EXISTS tool_actions_2029_12 PARTITION OF tool_actions FOR VALUES FROM ('2029-12-01') TO ('2030-01-01');

-- =============================================================================
-- INDEXES (Applied to all partitions automatically)
-- =============================================================================
CREATE INDEX idx_tool_actions_tool_id ON tool_actions(tool_id);
CREATE INDEX idx_tool_actions_session_id ON tool_actions(session_id);
CREATE INDEX idx_tool_actions_action_type ON tool_actions(action_type);
-- GIN index for JSONB queries if needed
CREATE INDEX idx_tool_actions_metadata ON tool_actions USING GIN (metadata);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE tool_actions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for client-side tracking)
CREATE POLICY "Allow anonymous inserts" ON tool_actions
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow service role full access (for admin/cleanup operations)
CREATE POLICY "Service role full access" ON tool_actions
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to create next month's partition
-- Run this monthly via cron or manually
CREATE OR REPLACE FUNCTION create_next_month_partition()
RETURNS TEXT AS $$
DECLARE
    partition_date DATE;
    partition_name TEXT;
    start_date DATE;
    end_date DATE;
BEGIN
    -- Calculate next month
    partition_date := DATE_TRUNC('month', NOW() + INTERVAL '1 month');
    partition_name := 'tool_actions_' || TO_CHAR(partition_date, 'YYYY_MM');
    start_date := partition_date;
    end_date := partition_date + INTERVAL '1 month';
    
    -- Check if partition already exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = partition_name
    ) THEN
        EXECUTE FORMAT(
            'CREATE TABLE %I PARTITION OF tool_actions FOR VALUES FROM (%L) TO (%L)',
            partition_name, start_date, end_date
        );
        RETURN 'Created partition: ' || partition_name;
    ELSE
        RETURN 'Partition already exists: ' || partition_name;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to drop old partitions (releases space immediately!)
-- Example: SELECT drop_old_partitions(3) -- Keep last 3 months
CREATE OR REPLACE FUNCTION drop_old_partitions(months_to_keep INTEGER DEFAULT 3)
RETURNS TEXT AS $$
DECLARE
    cutoff_date DATE;
    partition_record RECORD;
    dropped_count INTEGER := 0;
    result TEXT := '';
BEGIN
    cutoff_date := DATE_TRUNC('month', NOW() - (months_to_keep || ' months')::INTERVAL);
    
    FOR partition_record IN
        SELECT tablename 
        FROM pg_tables 
        WHERE tablename LIKE 'tool_actions_%'
        AND tablename ~ '^tool_actions_[0-9]{4}_[0-9]{2}$'
    LOOP
        -- Extract date from partition name
        DECLARE
            partition_year INTEGER;
            partition_month INTEGER;
            partition_date DATE;
        BEGIN
            partition_year := SUBSTRING(partition_record.tablename FROM 14 FOR 4)::INTEGER;
            partition_month := SUBSTRING(partition_record.tablename FROM 19 FOR 2)::INTEGER;
            partition_date := MAKE_DATE(partition_year, partition_month, 1);
            
            IF partition_date < cutoff_date THEN
                EXECUTE FORMAT('DROP TABLE %I', partition_record.tablename);
                dropped_count := dropped_count + 1;
                result := result || 'Dropped: ' || partition_record.tablename || E'\n';
            END IF;
        EXCEPTION WHEN OTHERS THEN
            result := result || 'Error with ' || partition_record.tablename || ': ' || SQLERRM || E'\n';
        END;
    END LOOP;
    
    IF dropped_count = 0 THEN
        RETURN 'No partitions dropped. Keeping data from ' || cutoff_date || ' onwards.';
    ELSE
        RETURN result || 'Total dropped: ' || dropped_count || ' partitions';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get storage usage per partition
CREATE OR REPLACE FUNCTION get_partition_sizes()
RETURNS TABLE (
    partition_name TEXT,
    total_size TEXT,
    row_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.tablename::TEXT,
        pg_size_pretty(pg_total_relation_size(t.tablename::regclass))::TEXT,
        (SELECT COUNT(*) FROM tool_actions WHERE created_at >= 
            MAKE_DATE(
                SUBSTRING(t.tablename FROM 14 FOR 4)::INTEGER,
                SUBSTRING(t.tablename FROM 19 FOR 2)::INTEGER,
                1
            )
            AND created_at < 
            MAKE_DATE(
                SUBSTRING(t.tablename FROM 14 FOR 4)::INTEGER,
                SUBSTRING(t.tablename FROM 19 FOR 2)::INTEGER,
                1
            ) + INTERVAL '1 month'
        )
    FROM pg_tables t
    WHERE t.tablename LIKE 'tool_actions_%'
    AND t.tablename ~ '^tool_actions_[0-9]{4}_[0-9]{2}$'
    ORDER BY t.tablename DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- USAGE EXAMPLES
-- =============================================================================
-- 
-- 1. Insert tracking data (from client):
--    INSERT INTO tool_actions (tool_id, group_id, action_type, session_id, metadata)
--    VALUES ('generator', 'password', 'generate', 'session123', 
--            '{"locale": "vi", "duration_ms": 150, "action_data": {"length": 16}}');
--
-- 2. Create next month partition (run monthly):
--    SELECT create_next_month_partition();
--
-- 3. Drop old data (keep last 3 months, releases space immediately):
--    SELECT drop_old_partitions(3);
--
-- 4. Check storage per partition:
--    SELECT * FROM get_partition_sizes();
--
-- 5. Query with partition pruning (fast!):
--    SELECT * FROM tool_actions 
--    WHERE created_at >= '2024-12-01' AND created_at < '2025-01-01';
--
-- =============================================================================
