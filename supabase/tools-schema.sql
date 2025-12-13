-- =============================================================================
-- TOOLS MANAGEMENT SCHEMA
-- =============================================================================
-- Tables for managing tool groups and tools
-- Supports multi-language (i18n) with JSONB for localized strings

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS tools CASCADE;
DROP TABLE IF EXISTS tool_groups CASCADE;

-- =============================================================================
-- TABLE: tool_groups
-- =============================================================================
CREATE TABLE tool_groups (
    id TEXT PRIMARY KEY,
    title JSONB NOT NULL DEFAULT '{}'::JSONB,  -- {"en": "...", "vi": "...", "ja": "...", "zh": "...", "es": "..."}
    description JSONB NOT NULL DEFAULT '{}'::JSONB,
    icon TEXT NOT NULL DEFAULT '🔧',
    priority INTEGER NOT NULL DEFAULT 100,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =============================================================================
-- TABLE: tools
-- =============================================================================
CREATE TABLE tools (
    id TEXT NOT NULL,
    group_id TEXT NOT NULL REFERENCES tool_groups(id) ON DELETE CASCADE,
    title JSONB NOT NULL DEFAULT '{}'::JSONB,  -- {"en": "...", "vi": "...", ...}
    description JSONB NOT NULL DEFAULT '{}'::JSONB,
    icon TEXT NOT NULL DEFAULT '🔧',
    priority INTEGER NOT NULL DEFAULT 100,
    status TEXT NOT NULL DEFAULT 'coming-soon' CHECK (status IN ('coming-soon', 'active', 'deprecated', 'new', 'beta')),
    implementation TEXT NOT NULL DEFAULT 'client-side' CHECK (implementation IN ('client-side', 'server-side', 'hybrid')),
    keywords TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    warning TEXT,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    view_count INTEGER NOT NULL DEFAULT 0,
    use_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (id, group_id)
);

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX idx_tools_group_id ON tools(group_id);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_priority ON tools(group_id, priority);
CREATE INDEX idx_tools_popular ON tools(is_popular) WHERE is_popular = true;
CREATE INDEX idx_tools_featured ON tools(is_featured) WHERE is_featured = true;
CREATE INDEX idx_tool_groups_priority ON tool_groups(priority);
CREATE INDEX idx_tool_groups_active ON tool_groups(is_active) WHERE is_active = true;

-- =============================================================================
-- TRIGGERS: Auto-update updated_at timestamp
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tool_groups_updated_at
    BEFORE UPDATE ON tool_groups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tools_updated_at
    BEFORE UPDATE ON tools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE tool_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Public read access for active tool groups
CREATE POLICY "Public can read active tool groups"
    ON tool_groups FOR SELECT
    USING (is_active = true);

-- Public read access for non-deprecated tools
CREATE POLICY "Public can read non-deprecated tools"
    ON tools FOR SELECT
    USING (status != 'deprecated');

-- Service role has full access (for admin operations)
CREATE POLICY "Service role has full access to tool_groups"
    ON tool_groups FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to tools"
    ON tools FOR ALL
    USING (auth.role() = 'service_role');

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Get all tools with their group info
CREATE OR REPLACE FUNCTION get_all_tools_with_groups()
RETURNS TABLE (
    tool_id TEXT,
    tool_title JSONB,
    tool_description JSONB,
    tool_icon TEXT,
    tool_status TEXT,
    tool_implementation TEXT,
    tool_keywords TEXT[],
    tool_tags TEXT[],
    tool_priority INTEGER,
    tool_is_popular BOOLEAN,
    tool_is_featured BOOLEAN,
    group_id TEXT,
    group_title JSONB,
    group_icon TEXT,
    group_priority INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.title,
        t.description,
        t.icon,
        t.status,
        t.implementation,
        t.keywords,
        t.tags,
        t.priority,
        t.is_popular,
        t.is_featured,
        tg.id,
        tg.title,
        tg.icon,
        tg.priority
    FROM tools t
    JOIN tool_groups tg ON t.group_id = tg.id
    WHERE tg.is_active = true AND t.status != 'deprecated'
    ORDER BY tg.priority ASC, t.priority ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get popular tools
CREATE OR REPLACE FUNCTION get_popular_tools(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    tool_id TEXT,
    tool_title JSONB,
    tool_description JSONB,
    tool_icon TEXT,
    tool_status TEXT,
    group_id TEXT,
    group_title JSONB,
    group_icon TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.title,
        t.description,
        t.icon,
        t.status,
        tg.id,
        tg.title,
        tg.icon
    FROM tools t
    JOIN tool_groups tg ON t.group_id = tg.id
    WHERE t.is_popular = true AND tg.is_active = true AND t.status != 'deprecated'
    ORDER BY t.view_count DESC, t.priority ASC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get featured tools
CREATE OR REPLACE FUNCTION get_featured_tools(limit_count INTEGER DEFAULT 6)
RETURNS TABLE (
    tool_id TEXT,
    tool_title JSONB,
    tool_description JSONB,
    tool_icon TEXT,
    tool_status TEXT,
    group_id TEXT,
    group_title JSONB,
    group_icon TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.title,
        t.description,
        t.icon,
        t.status,
        tg.id,
        tg.title,
        tg.icon
    FROM tools t
    JOIN tool_groups tg ON t.group_id = tg.id
    WHERE t.is_featured = true AND tg.is_active = true AND t.status != 'deprecated'
    ORDER BY t.priority ASC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment view count
CREATE OR REPLACE FUNCTION increment_tool_view(p_tool_id TEXT, p_group_id TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE tools 
    SET view_count = view_count + 1 
    WHERE id = p_tool_id AND group_id = p_group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment use count
CREATE OR REPLACE FUNCTION increment_tool_use(p_tool_id TEXT, p_group_id TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE tools 
    SET use_count = use_count + 1 
    WHERE id = p_tool_id AND group_id = p_group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Search tools by keyword (supports multiple languages)
CREATE OR REPLACE FUNCTION search_tools(search_query TEXT, locale TEXT DEFAULT 'en')
RETURNS TABLE (
    tool_id TEXT,
    tool_title JSONB,
    tool_description JSONB,
    tool_icon TEXT,
    tool_status TEXT,
    group_id TEXT,
    group_title JSONB,
    group_icon TEXT,
    relevance FLOAT
) AS $$
DECLARE
    search_pattern TEXT := '%' || LOWER(search_query) || '%';
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.title,
        t.description,
        t.icon,
        t.status,
        tg.id,
        tg.title,
        tg.icon,
        CASE 
            WHEN LOWER(t.title->>locale) LIKE search_pattern THEN 3.0
            WHEN LOWER(t.description->>locale) LIKE search_pattern THEN 2.0
            WHEN EXISTS (SELECT 1 FROM unnest(t.keywords) k WHERE LOWER(k) LIKE search_pattern) THEN 1.5
            ELSE 1.0
        END as relevance
    FROM tools t
    JOIN tool_groups tg ON t.group_id = tg.id
    WHERE 
        tg.is_active = true 
        AND t.status != 'deprecated'
        AND (
            LOWER(t.title->>locale) LIKE search_pattern
            OR LOWER(t.title->>'en') LIKE search_pattern
            OR LOWER(t.description->>locale) LIKE search_pattern
            OR LOWER(t.description->>'en') LIKE search_pattern
            OR EXISTS (SELECT 1 FROM unnest(t.keywords) k WHERE LOWER(k) LIKE search_pattern)
        )
    ORDER BY relevance DESC, t.priority ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- GRANT PERMISSIONS
-- =============================================================================
GRANT SELECT ON tool_groups TO anon, authenticated;
GRANT SELECT ON tools TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_all_tools_with_groups() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_popular_tools(INTEGER) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_featured_tools(INTEGER) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION search_tools(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_tool_view(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_tool_use(TEXT, TEXT) TO anon, authenticated;
