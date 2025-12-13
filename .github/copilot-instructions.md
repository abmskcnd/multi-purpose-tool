# GitHub Copilot Custom Instructions

> This file provides context for GitHub Copilot to generate code that follows our project standards.

## Project Context

This is a **Multi-Purpose Tool** web application built with:
- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (with dark mode)
- **next-intl** (i18n with 5 locales: vi, en, es, zh, ja)

## Key Architecture Decisions

### Tool Implementation Location

**ALWAYS create new tool components in:**
```
src/features/tools/[group-id]/[tool-id]/
```

**NEVER create tools in:**
- `src/components/features/` (legacy, deprecated)
- `src/app/` (only routes, no business logic)

### Required Files for New Tool

```
src/features/tools/[group]/[tool]/
├── index.ts                    # REQUIRED: Re-export default
├── [ToolName].tsx              # REQUIRED: Main component with 'use client'
├── hooks/                      # OPTIONAL: Tool-specific hooks
│   └── use[ToolName].ts
└── utils/                      # OPTIONAL: Pure utility functions
    └── [utilName].ts
```

### Component Template

When creating a new tool component, use this structure:

```tsx
'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  ToolCardContainer,
  ToolSection,
  ToolButton,
} from '../../_shared/components';

interface ToolState {
  // Define state interface
}

const DEFAULT_STATE: ToolState = {
  // Default values
};

export default function ToolName() {
  const [state, setState] = useState<ToolState>(DEFAULT_STATE);

  const handleAction = useCallback(() => {
    // Implementation
  }, [/* dependencies */]);

  return (
    <div className="space-y-6">
      <ToolCardContainer className="p-6">
        <ToolSection title="Input">
          {/* Input controls */}
        </ToolSection>
        
        <div className="mt-6">
          <ToolButton onClick={handleAction}>
            Execute
          </ToolButton>
        </div>
      </ToolCardContainer>

      {/* Output section */}
    </div>
  );
}
```

## Code Style Rules

### TypeScript

- Use explicit interface/type definitions
- Prefer `interface` over `type` for object shapes
- Never use `any` - use `unknown` with type guards
- Use `as const` for literal arrays

### React

- Always use functional components
- Always add `'use client'` for interactive components
- Use `useCallback` for event handlers
- Use `useMemo` for expensive computations
- Destructure props in function signature

### Imports

Order imports as:
1. React/Next.js
2. Third-party libraries
3. Internal imports (`@/...`)
4. Relative imports (`./...`)
5. Types (`import type`)

### Tailwind CSS

- Use semantic color tokens: `text-foreground`, `bg-card`, `border-border`
- Support dark mode: `dark:bg-zinc-900`
- Use consistent spacing: `gap-4`, `p-6`, `space-y-6`
- Use responsive prefixes: `md:grid-cols-2`

## Navigation & i18n

**ALWAYS use i18n-aware navigation:**

```tsx
// ✅ CORRECT
import { Link } from '@/i18n/navigation';
<Link href="/tools">Tools</Link>

// ❌ WRONG - Don't use next/link directly
import Link from 'next/link';
<Link href="/vi/tools">Tools</Link>
```

**For translations:**

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('tools.my_tool');
const tCommon = useTranslations('common');
```

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PasswordGenerator.tsx` |
| Hooks | camelCase with use prefix | `usePasswordGenerator.ts` |
| Utils | camelCase | `generatePassword.ts` |
| Folders | kebab-case | `password-generator/` |
| Types | PascalCase | `ToolProps` |

## Commit Messages

Format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Examples:
- `feat(tools): add password generator`
- `fix(i18n): resolve locale routing issue`

## Common Patterns

### Copy to Clipboard

```tsx
import { copyToClipboard } from '@/features/tools/_shared/utils';

const handleCopy = async () => {
  const success = await copyToClipboard(text);
  if (success) {
    // Show success feedback
  }
};
```

### File Download

```tsx
import { downloadAsFile } from '@/features/tools/_shared/utils';

const handleDownload = () => {
  downloadAsFile(content, 'output.txt', 'text/plain');
};
```

### Tool Output with Actions

```tsx
import { ToolOutput } from '@/features/tools/_shared/components';

<ToolOutput
  value={output}
  onCopy={handleCopy}
  onDownload={handleDownload}
  onClear={handleClear}
  label="Result"
/>
```

## Checklist for Code Generation

When generating code, ensure:
- [ ] `'use client'` directive for interactive components
- [ ] Uses `@/` path alias for imports
- [ ] Uses `Link` from `@/i18n/navigation`
- [ ] Uses semantic Tailwind color tokens
- [ ] Supports dark mode
- [ ] Has proper TypeScript types
- [ ] Follows component structure pattern
- [ ] Uses shared components from `_shared/`
