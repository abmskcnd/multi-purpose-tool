# Multi-Purpose Tool - Project Standards & Guidelines

> **For GitHub Copilot & Team Members**: This document defines the coding standards, project structure, and conventions for the Multi-Purpose Tool project. Follow these guidelines strictly when implementing new features or tools.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Tool Implementation Guide](#tool-implementation-guide)
4. [Coding Standards](#coding-standards)
5. [Component Patterns](#component-patterns)
6. [Styling Guidelines](#styling-guidelines)
7. [i18n Guidelines](#i18n-guidelines)
8. [Git & Commit Conventions](#git--commit-conventions)
9. [File Naming Conventions](#file-naming-conventions)
10. [Testing Standards](#testing-standards)

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| i18n | next-intl | 4.x |
| State | Zustand | 5.x |
| Package Manager | Yarn | 1.x |

### Key Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "next-intl": "4.x",
  "zustand": "5.x"
}
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Locale-based routing
│   │   ├── tools/               
│   │   │   ├── page.tsx          # All tools listing
│   │   │   ├── layout.tsx        # Tools layout with sidebar
│   │   │   ├── [group]/          # Tool group pages
│   │   │   │   ├── page.tsx      # Group overview
│   │   │   │   └── [tool]/       # Individual tool pages
│   │   │   │       └── page.tsx  # Tool page (renders component)
│   │   └── layout.tsx            # Root locale layout
│   └── api/                      # API routes
│
├── components/
│   ├── features/                 # Legacy feature components
│   ├── layout/                   # Layout components (Header, Footer, Sidebar)
│   └── ui/                       # Reusable UI components
│
├── config/
│   ├── tools.registry.ts         # ⭐ Tool definitions (SINGLE SOURCE OF TRUTH)
│   ├── tool-components.tsx       # ⭐ Dynamic component registry
│   └── constants.ts              # App constants
│
├── features/
│   └── tools/                    # ⭐ TOOL IMPLEMENTATIONS GO HERE
│       ├── _shared/              # Shared utilities across tools
│       │   ├── components/       # Reusable tool UI components
│       │   ├── hooks/            # Shared hooks
│       │   └── utils/            # Utility functions
│       ├── password/             # Password tool group
│       │   ├── generator/        # Password Generator tool
│       │   │   ├── index.ts
│       │   │   └── PasswordGenerator.tsx
│       │   └── strength-checker/ # Another tool...
│       ├── text/                 # Text tool group
│       └── [group-id]/           # Other groups...
│
├── hooks/                        # Global custom hooks
├── i18n/                         # i18n configuration
├── lib/                          # Utility libraries
├── locales/                      # Translation files (en.json, vi.json, etc.)
├── store/                        # Zustand stores
└── types/                        # TypeScript type definitions
```

---

## Tool Implementation Guide

### Step 1: Create Tool Folder

```bash
# Pattern: src/features/tools/[group-id]/[tool-id]/
mkdir -p src/features/tools/password/generator
```

### Step 2: Create Main Component

```tsx
// src/features/tools/password/generator/PasswordGenerator.tsx
'use client';

import { useState, useCallback } from 'react';
// Import shared components
import {
  ToolCardContainer,
  ToolSection,
  ToolButton,
} from '../../_shared/components';

export default function PasswordGenerator() {
  const [output, setOutput] = useState('');

  const handleGenerate = useCallback(() => {
    // Implementation
  }, []);

  return (
    <div className="space-y-6">
      <ToolCardContainer className="p-6">
        <ToolSection title="Options">
          {/* Tool controls */}
        </ToolSection>
        
        <ToolButton onClick={handleGenerate}>
          Generate
        </ToolButton>
      </ToolCardContainer>

      {output && (
        <ToolCardContainer className="p-6">
          <ToolSection title="Output">
            {/* Output display */}
          </ToolSection>
        </ToolCardContainer>
      )}
    </div>
  );
}
```

### Step 3: Create Index Export

```ts
// src/features/tools/password/generator/index.ts
export { default } from './PasswordGenerator';
```

### Step 4: Register Component

```tsx
// src/config/tool-components.tsx
export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  // Add your tool
  'password/generator': dynamic(
    () => import('@/features/tools/password/generator'),
    { loading: () => <ToolLoading />, ssr: false }
  ),
};
```

### Step 5: Update Tool Status

```ts
// src/config/tools.registry.ts
// Change status from 'coming-soon' to 'active'
{ id: 'generator', ..., status: 'active' }
```

---

## Coding Standards

### TypeScript

```typescript
// ✅ DO: Use explicit types
interface ToolProps {
  initialValue?: string;
  onComplete: (result: string) => void;
}

// ✅ DO: Use type inference when obvious
const [value, setValue] = useState(''); // string is inferred

// ✅ DO: Use const assertions
const STATUS = ['active', 'pending'] as const;
type Status = typeof STATUS[number];

// ❌ DON'T: Use `any`
const data: any = fetchData(); // BAD

// ✅ DO: Use `unknown` and type guards
const data: unknown = fetchData();
if (isValidData(data)) {
  // data is now typed
}
```

### React Patterns

```tsx
// ✅ DO: Use functional components with hooks
export default function MyTool() {
  const [state, setState] = useState(initialState);
  
  // ✅ DO: Memoize callbacks
  const handleClick = useCallback(() => {
    // ...
  }, [dependencies]);
  
  // ✅ DO: Memoize expensive computations
  const computed = useMemo(() => expensiveCalc(state), [state]);
  
  return <div>{/* ... */}</div>;
}

// ✅ DO: Use 'use client' for interactive components
'use client';

// ❌ DON'T: Use class components
class MyComponent extends React.Component {} // BAD
```

### Import Order

```typescript
// 1. React/Next.js imports
import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// 2. Third-party imports
import { useTranslations } from 'next-intl';

// 3. Internal imports (absolute paths with @/)
import { Link } from '@/i18n/navigation';
import { ToolCardContainer } from '@/features/tools/_shared/components';
import { copyToClipboard } from '@/features/tools/_shared/utils';

// 4. Relative imports
import { localHelper } from './utils';

// 5. Types (at the end)
import type { ToolProps } from './types';
```

### Exports

```typescript
// ✅ DO: Use named exports for utilities
export function formatDate(date: Date): string { }
export const MAX_LENGTH = 100;

// ✅ DO: Use default export for main component
export default function PasswordGenerator() { }

// ✅ DO: Re-export from index
// components/index.ts
export { Header } from './Header';
export { Footer } from './Footer';
```

---

## Component Patterns

### Tool Component Structure

```tsx
'use client';

import { useState, useCallback, useMemo } from 'react';
// Imports...

// Types at the top
interface ToolState {
  input: string;
  output: string;
  options: Options;
}

// Constants
const DEFAULT_OPTIONS: Options = {
  // ...
};

// Helper functions (pure functions)
function processInput(input: string, options: Options): string {
  // ...
}

// Main component
export default function ToolName() {
  // State
  const [state, setState] = useState<ToolState>(initialState);
  
  // Derived state (useMemo)
  const isValid = useMemo(() => validate(state.input), [state.input]);
  
  // Callbacks
  const handleProcess = useCallback(() => {
    const result = processInput(state.input, state.options);
    setState(prev => ({ ...prev, output: result }));
  }, [state.input, state.options]);
  
  // Render
  return (
    <div className="space-y-6">
      {/* Input Section */}
      {/* Options Section */}
      {/* Action Buttons */}
      {/* Output Section */}
    </div>
  );
}
```

### Shared UI Components

Use components from `@/features/tools/_shared/components`:

```tsx
import {
  ToolCardContainer,  // Card wrapper
  ToolSection,        // Section with title
  ToolButton,         // Styled button
  ToolTextarea,       // Textarea input
  ToolOutput,         // Output with copy/download
  CopyButton,         // Copy to clipboard
} from '@/features/tools/_shared/components';
```

---

## Styling Guidelines

### Tailwind CSS Classes

```tsx
// ✅ DO: Use Tailwind utility classes
<div className="flex items-center gap-4 p-6 rounded-lg border">

// ✅ DO: Use semantic color tokens
<p className="text-muted-foreground">  // For secondary text
<div className="bg-card border-border"> // For cards
<button className="bg-primary text-primary-foreground"> // For buttons

// ✅ DO: Support dark mode
<div className="bg-white dark:bg-zinc-900">
<p className="text-zinc-900 dark:text-zinc-100">

// ❌ DON'T: Use arbitrary values unless necessary
<div className="w-[347px]"> // BAD - use standard widths

// ✅ DO: Use responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Color Tokens

| Token | Usage |
|-------|-------|
| `bg-background` | Main background |
| `bg-card` | Card/panel background |
| `bg-muted` | Subtle background |
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary text |
| `border-border` | Default border |
| `bg-primary` | Primary actions |
| `bg-destructive` | Danger actions |

### Spacing

Use Tailwind's spacing scale consistently:
- `gap-2` (8px) - Tight spacing
- `gap-4` (16px) - Standard spacing  
- `gap-6` (24px) - Section spacing
- `p-4` / `p-6` - Card padding

---

## i18n Guidelines

### Using Translations

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('tools.password_generator');
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{tCommon('copy')}</button>
    </div>
  );
}
```

### Translation File Structure

```json
// src/locales/en.json
{
  "common": {
    "copy": "Copy",
    "download": "Download",
    "clear": "Clear",
    "tools": "Tools",
    "search_placeholder": "Search tools..."
  },
  "toolGroups": {
    "password": {
      "title": "Password & Security Tools",
      "description": "Generate secure passwords..."
    }
  },
  "tools": {
    "password_generator": {
      "title": "Password Generator",
      "length": "Length",
      "generate": "Generate Password"
    }
  }
}
```

### Navigation Links

Always use `Link` from `@/i18n/navigation`:

```tsx
// ✅ DO: Use i18n-aware Link
import { Link } from '@/i18n/navigation';
<Link href="/tools">Tools</Link>  // Auto-adds locale

// ❌ DON'T: Use next/link directly
import Link from 'next/link';
<Link href="/vi/tools">Tools</Link>  // Manual locale
```

---

## Git & Commit Conventions

### Branch Naming

```
feature/[scope]/[description]
fix/[scope]/[description]
refactor/[scope]/[description]
docs/[description]

# Examples:
feature/tools/password-generator
fix/i18n/locale-routing
refactor/202512/restructure-tools
```

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Code style (formatting, no logic change) |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Adding tests |
| `chore` | Maintenance tasks |

### Examples

```bash
# Feature
feat(tools): add password generator with strength indicator

# Fix
fix(i18n): resolve locale not persisting in breadcrumbs

# Refactor
refactor(tools): migrate to isolated module architecture

# Docs
docs: update tool implementation guide

# With body
feat(tools): implement JSON formatter

- Add syntax highlighting with Prism
- Support minify and beautify modes
- Add copy and download functionality

Closes #123
```

### Commit Best Practices

1. **Atomic commits**: One logical change per commit
2. **Present tense**: "add feature" not "added feature"
3. **Imperative mood**: "fix bug" not "fixes bug"
4. **No period** at end of subject line
5. **50/72 rule**: Subject ≤50 chars, body wrap at 72

---

## File Naming Conventions

### Components

```
PascalCase.tsx for components
├── PasswordGenerator.tsx     # Main component
├── PasswordOptions.tsx       # Sub-component
└── index.ts                  # Re-export
```

### Utilities & Hooks

```
camelCase.ts for utilities and hooks
├── usePasswordGenerator.ts   # Custom hook
├── generatePassword.ts       # Utility function
└── helpers.ts                # Multiple helpers
```

### Folders

```
kebab-case for folders
├── password-generator/       # Tool folder
├── _shared/                  # Shared (underscore = special)
└── api/                      # Route handlers
```

### Test Files

```
ComponentName.test.tsx        # Component tests
utilityName.test.ts          # Unit tests
```

---

## Testing Standards

### Test File Location

```
src/features/tools/password/generator/
├── PasswordGenerator.tsx
├── PasswordGenerator.test.tsx    # Component tests
├── utils/
│   ├── generatePassword.ts
│   └── generatePassword.test.ts  # Unit tests
└── index.ts
```

### Test Structure

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordGenerator from './PasswordGenerator';

describe('PasswordGenerator', () => {
  it('should render with default options', () => {
    render(<PasswordGenerator />);
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
  });

  it('should generate password when button clicked', async () => {
    render(<PasswordGenerator />);
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));
    // Assert output
  });
});
```

---

## Quick Reference Commands

```bash
# Development
yarn dev              # Start dev server
yarn build            # Production build
yarn lint             # Run ESLint
yarn type-check       # TypeScript check

# Git
git checkout -b feature/tools/my-tool
git add -A
git commit -m "feat(tools): add my tool"
git push origin feature/tools/my-tool
```

---

## Team Collaboration

### Folder Ownership

Assign tool groups to team members to avoid conflicts:

```
Person A: password/, data/, dev/
Person B: text/, json/, image/
Person C: pdf/, random/, datetime/
```

### Files to Coordinate

These files may have conflicts - communicate before editing:

1. `src/config/tool-components.tsx` - Single line per tool
2. `src/config/tools.registry.ts` - Status changes only
3. `src/locales/*.json` - Translation additions

### Safe Files (No Conflicts)

Everything inside your assigned tool folder:
- `src/features/tools/[your-group]/[your-tool]/*`

---

## Checklist: Before Submitting PR

- [ ] Component has `'use client'` if interactive
- [ ] Uses `Link` from `@/i18n/navigation`
- [ ] TypeScript has no errors (`yarn type-check`)
- [ ] ESLint passes (`yarn lint`)
- [ ] Build succeeds (`yarn build`)
- [ ] Added translations if needed
- [ ] Updated tool status in registry
- [ ] Registered component in tool-components.tsx
- [ ] Commit messages follow convention
- [ ] Branch name follows convention

---

*Last updated: December 2024*
