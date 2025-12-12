# Multi Tools Section

This folder contains the scaffolding for the Multi Tools section with 22 tool groups and 140+ individual tools.

## Structure

```
src/app/[locale]/tools/
├── page.tsx                    # Tools index - lists all groups + search
├── layout.tsx                  # Tools layout with sidebar
├── loading.tsx                 # Loading state for tools index
├── [group]/
│   ├── page.tsx               # Group page - lists tools in group
│   ├── loading.tsx            # Loading state for group
│   └── [tool]/
│       ├── page.tsx           # Individual tool page
│       └── loading.tsx        # Loading state for tool
```

## Registry

The single source of truth for all tools is located at:
`src/config/tools.registry.ts`

This file contains:
- All tool groups with priority ordering
- All tools within each group
- Helper functions for accessing tools
- Search functionality

## Implementing a Tool

### 1. Update the Registry

In `src/config/tools.registry.ts`, find your tool and update its status:

```typescript
{ 
  id: 'generator', 
  title: 'Password Generator', 
  priority: 1, 
  description: '...', 
  status: 'active', // Change from 'coming-soon'
  implementation: 'client-side'
}
```

### 2. Create the Tool Component

Create a new component in the features folder:

```
src/components/features/
└── [group-name]/
    └── [tool-name]/
        └── [ToolName].tsx
```

Example: `src/components/features/password/generator/PasswordGenerator.tsx`

```tsx
'use client';

export function PasswordGenerator() {
  // Tool implementation
  return (
    <div className="p-6">
      {/* Tool UI */}
    </div>
  );
}
```

### 3. Update the Tool Page

Modify `src/app/[locale]/tools/[group]/[tool]/page.tsx` to render your component:

```tsx
import { PasswordGenerator } from '@/components/features/password/generator/PasswordGenerator';

// In the component:
{tool.status === 'active' && tool.id === 'generator' ? (
  <PasswordGenerator />
) : (
  <ComingSoon tool={tool} group={group} />
)}
```

Or create a more scalable approach using a tool registry component map.

### 4. Add Translations (Optional)

Add tool-specific translations to `src/locales/[locale].json`:

```json
{
  "tools": {
    "password_generator": {
      "title": "Password Generator",
      "generate": "Generate",
      "copy": "Copy"
    }
  }
}
```

## URL Structure

All tools follow this URL pattern:
```
/[locale]/tools/[group]/[tool]

Examples:
/en/tools/password/generator
/vi/tools/json/format-validate
/es/tools/image/compress
```

## Sharing

Tools support shareable URLs by default. The ComingSoon component includes a "Copy Share Link" button.

For implemented tools, consider:
- Query params for simple state: `?text=hello`
- Hash state for complex state: `#state=compressed-json`

## Tool Status

- `coming-soon`: Shows ComingSoon placeholder
- `active`: Shows actual tool implementation
- `deprecated`: Can show deprecation notice

## Priority System

Groups and tools are sorted by priority (lower number = higher priority):
- P1 (1-10): High traffic, client-only tools
- P2/P3 (11-22): Lower priority, may need server/API

## Implementation Types

- `client-side`: 100% browser-based, no server calls
- `server-side`: Requires API routes
- `hybrid`: Mix of client and server processing
