# 💻 Developer Agent Knowledge Base: Multi-Purpose Tool Platform

**Agent:** Amelia (Developer)  
**Last Updated:** December 13, 2025  
**Domain:** Code Implementation, Testing, Performance, Project Standards

---

## 🎯 Project Quick Context

**Multi-Purpose Tool Platform** = Free online toolbox với Next.js 14 + TypeScript + WASM.

### Development Principles
- ✅ TypeScript strict mode
- ✅ Server Components default
- ✅ Client-side processing only
- ✅ Test coverage required
- ✅ Mobile-first implementation

---

## 🛠️ Tech Stack Quick Reference

| Layer | Technology | 
|-------|------------|
| Framework | Next.js 14+ App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase PostgreSQL |
| Processing | WASM (ffmpeg, pdf-lib) |
| Testing | Jest + Playwright |
| Linting | ESLint + Prettier |

---

## 📁 Key File Locations

```
app/[locale]/tools/[slug]/page.tsx    → Tool pages
components/tools/                       → Tool components
lib/processors/                         → WASM processing
lib/analytics/                          → Tracking
config/tools.config.ts                  → Tool registry
messages/{locale}.json                  → Translations
```

---

## 🔧 Implementation Patterns

### 1. Tool Page Structure

```typescript
// app/[locale]/tools/[slug]/page.tsx (Server Component)
export default async function ToolPage({ params }) {
  const { tool } = await getToolConfig(params.slug);
  
  return (
    <>
      <ToolHeader tool={tool} />        {/* Server */}
      <ToolInterface toolId={tool.id} /> {/* 'use client' */}
      <ToolDescription tool={tool} />   {/* Server */}
    </>
  );
}
```

### 2. Tool Interface Pattern

```typescript
// components/tools/PasswordGenerator.tsx
'use client';

import { useState, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const { trackEvent } = useAnalytics();
  
  const generate = useCallback(() => {
    // Processing logic
    trackEvent('tool_usage', { tool: 'password-generator' });
  }, [trackEvent]);
  
  return (/* UI */);
}
```

### 3. Lazy Loading Pattern

```typescript
// lib/processors/lazy-loader.ts
export async function loadFFmpeg() {
  if (typeof window === 'undefined') return null;
  
  const { FFmpeg } = await import('@ffmpeg/ffmpeg');
  const { toBlobURL } = await import('@ffmpeg/util');
  
  const ffmpeg = new FFmpeg();
  await ffmpeg.load({
    coreURL: await toBlobURL(CORE_URL, 'text/javascript'),
    wasmURL: await toBlobURL(WASM_URL, 'application/wasm'),
  });
  
  return ffmpeg;
}
```

### 4. File Validation

```typescript
// lib/security/file-validator.ts
export async function validateFile(file: File, options: ValidationOptions) {
  // Size check
  if (file.size > options.maxSize) {
    throw new ValidationError('File too large');
  }
  
  // Magic bytes check
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const actualType = detectFileType(bytes);
  
  if (!options.allowedTypes.includes(actualType)) {
    throw new ValidationError('Invalid file type');
  }
  
  return { valid: true, type: actualType };
}
```

---

## 📋 ToolConfig Schema

```typescript
interface ToolConfig {
  id: string;
  category: 'image' | 'pdf' | 'text' | 'video' | 'dev';
  slug: Record<Locale, string>;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  seo: SEOConfig;
  processor: ProcessorConfig;
  maxFileSize: number;
  allowedTypes: string[];
}

// Example
const passwordGenerator: ToolConfig = {
  id: 'password-generator',
  category: 'text',
  slug: { en: 'password-generator', vi: 'tao-mat-khau' },
  name: { en: 'Password Generator', vi: 'Tạo Mật Khẩu' },
  // ...
};
```

---

## 🧪 Testing Patterns

### Unit Test Example

```typescript
// __tests__/unit/processors/password-generator.test.ts
describe('Password Generator', () => {
  it('generates password of correct length', () => {
    const password = generatePassword({ length: 16 });
    expect(password).toHaveLength(16);
  });
  
  it('includes special characters when enabled', () => {
    const password = generatePassword({ 
      length: 16, 
      includeSpecial: true 
    });
    expect(password).toMatch(/[!@#$%^&*]/);
  });
});
```

### E2E Test Example

```typescript
// __tests__/e2e/tools/password-generator.spec.ts
import { test, expect } from '@playwright/test';

test('generates password successfully', async ({ page }) => {
  await page.goto('/en/tools/password-generator');
  await page.click('[data-testid="generate-btn"]');
  
  const password = await page.inputValue('[data-testid="password-output"]');
  expect(password.length).toBeGreaterThan(0);
});
```

---

## ⚡ Performance Guidelines

### Bundle Size Budgets

| Chunk | Budget |
|-------|--------|
| Initial JS | <100KB |
| Tool-specific | <50KB |
| WASM (lazy) | <35MB |

### Performance Checklist

- [ ] Use dynamic imports for heavy libraries
- [ ] Optimize images with next/image
- [ ] Lazy load below-fold content
- [ ] Prefetch likely navigation targets
- [ ] Use React.memo for expensive components

---

## 🔒 Security Checklist

- [ ] Validate file magic bytes (not just extension)
- [ ] Enforce file size limits
- [ ] Sanitize user inputs
- [ ] No server file processing
- [ ] CSP headers configured
- [ ] Rate limiting on API routes

---

## 📊 MVP Tool Implementation Order

| Week | Tools |
|------|-------|
| 1 | Password Generator, Word to PDF, Base64, Image Rotate, Word Counter |
| 2 | JPG↔PNG, QR Code, URL Encode, JSON Formatter |
| 3 | PDF to Word, Image Resize, Image Compress, Image Crop |
| 4 | UUID Generator, PDF Merge, PDF Split, Image to PDF |
| 5 | PDF Compress, Hash Generator |

---

## 🎛️ Developer Workflow Commands

```
# Development
npm run dev          → Start dev server
npm run build        → Production build
npm run lint         → Run linter
npm run test         → Run unit tests
npm run test:e2e     → Run E2E tests
```

---

## 📚 Reference Documents

- [System Architecture](./architecture/01-system-architecture.md)
- [Project Structure](./architecture/02-project-structure.md)
- [Feature Prioritization](./pm/21-feature-prioritization.md)

---

## 📐 PROJECT CODING STANDARDS

> **CRITICAL**: These standards MUST be followed for ALL code implementation

### Tech Stack Details

| Category | Technology | Version | Config |
|----------|------------|---------|--------|
| Framework | Next.js (App Router) | 14.x | next.config.js |
| Language | TypeScript | 5.x | tsconfig.json (strict mode) |
| Styling | Tailwind CSS | 3.x | tailwind.config.js |
| i18n | next-intl | 4.x | i18n/routing.ts |
| State | Zustand | 5.x | store/ |
| Package Manager | Yarn | 1.x | yarn.lock |

---

### 🏗️ Tool Implementation Architecture

**⚠️ CRITICAL RULE: Tool Implementation Location**

```
✅ CORRECT - NEW ARCHITECTURE:
src/features/tools/[group-id]/[tool-id]/
├── index.ts                    # REQUIRED: Re-export default
├── [ToolName].tsx              # REQUIRED: Main component with 'use client'
├── hooks/                      # OPTIONAL: Tool-specific hooks
│   └── use[ToolName].ts
└── utils/                      # OPTIONAL: Pure utility functions
    └── [utilName].ts

❌ WRONG - DEPRECATED:
src/components/features/        # Legacy, DO NOT USE
src/app/                        # Routes only, NO business logic
```

**Step-by-Step Tool Creation:**

```bash
# 1. Create Tool Folder
mkdir -p src/features/tools/[group]/[tool]

# 2. Create Component with this template:
```

```tsx
// src/features/tools/[group]/[tool]/[ToolName].tsx
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

```bash
# 3. Create index.ts
echo "export { default } from './ToolName';" > index.ts

# 4. Register in tool-components.tsx
# Add to TOOL_COMPONENTS object:
'group/tool': dynamic(
  () => import('@/features/tools/group/tool'),
  { loading: () => <ToolLoading />, ssr: false }
),

# 5. Update status in tools.registry.ts
# Change from 'coming-soon' to 'active'
```

---

### 💻 TypeScript Standards

```typescript
// ✅ DO: Use explicit types for function parameters
interface ToolProps {
  initialValue?: string;
  onComplete: (result: string) => void;
}

function MyTool({ initialValue = '', onComplete }: ToolProps) {}

// ✅ DO: Use type inference for simple cases
const [value, setValue] = useState(''); // string is inferred
const count = 42; // number is inferred

// ✅ DO: Use const assertions for literal types
const STATUS = ['active', 'pending', 'completed'] as const;
type Status = typeof STATUS[number];

// ✅ DO: Use unknown instead of any
const data: unknown = fetchData();
if (isValidData(data)) {
  // data is now properly typed
}

// ❌ DON'T: Use any type
const data: any = fetchData(); // BAD - avoid any

// ❌ DON'T: Use @ts-ignore or @ts-expect-error
// @ts-ignore
someBuggyCode(); // BAD - fix the type issue instead
```

---

### ⚛️ React Patterns

```tsx
// ✅ DO: Always use functional components
export default function MyTool() {
  const [state, setState] = useState(initialState);
  
  // ✅ DO: Memoize callbacks to prevent re-renders
  const handleClick = useCallback(() => {
    setState(prev => ({ ...prev, value: newValue }));
  }, [dependencies]);
  
  // ✅ DO: Memoize expensive computations
  const computed = useMemo(() => {
    return expensiveCalculation(state);
  }, [state]);
  
  // ✅ DO: Destructure props in function signature
  return <div>{/* UI */}</div>;
}

// ✅ DO: Always add 'use client' for interactive components
'use client';

// ❌ DON'T: Use class components
class MyComponent extends React.Component {} // BAD - use functions
```

---

### 📦 Import Order (Enforced)

```typescript
// 1. React/Next.js imports
import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// 2. Third-party library imports
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

// 3. Internal imports (absolute paths with @/)
import { Link } from '@/i18n/navigation';
import { ToolCardContainer } from '@/features/tools/_shared/components';
import { copyToClipboard } from '@/features/tools/_shared/utils';

// 4. Relative imports
import { localHelper } from './utils';
import styles from './styles.module.css';

// 5. Types (at the end)
import type { ToolProps } from './types';
import type { FC } from 'react';
```

---

### 🎨 Tailwind CSS Standards

```tsx
// ✅ DO: Use semantic color tokens (supports dark mode)
<p className="text-foreground">          // Primary text
<p className="text-muted-foreground">    // Secondary text
<div className="bg-card border-border">  // Card background
<button className="bg-primary text-primary-foreground"> // Primary button

// ✅ DO: Use standard spacing
<div className="gap-2">   // 8px - Tight spacing
<div className="gap-4">   // 16px - Standard spacing
<div className="gap-6">   // 24px - Section spacing
<div className="p-6">     // Card padding

// ✅ DO: Support dark mode explicitly
<div className="bg-white dark:bg-zinc-900">
<p className="text-zinc-900 dark:text-zinc-100">

// ✅ DO: Use responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ DON'T: Use arbitrary values unless absolutely necessary
<div className="w-[347px]"> // BAD - use w-80, w-96, etc.
```

**Color Token Reference:**

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `bg-background` | white | zinc-950 | Page background |
| `bg-card` | white | zinc-900 | Card/panel |
| `bg-muted` | zinc-100 | zinc-800 | Subtle bg |
| `text-foreground` | zinc-900 | zinc-50 | Primary text |
| `text-muted-foreground` | zinc-500 | zinc-400 | Secondary text |
| `border-border` | zinc-200 | zinc-800 | Borders |

---

### 🌍 i18n Implementation

```tsx
// ✅ DO: Use next-intl for translations
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

// ✅ DO: Use Link from i18n/navigation (auto locale handling)
import { Link } from '@/i18n/navigation';
<Link href="/tools">Tools</Link>  // Auto-adds locale prefix

// ❌ DON'T: Use next/link directly
import Link from 'next/link';
<Link href="/vi/tools">Tools</Link>  // BAD - manual locale
```

**Translation File Structure:**

```json
// src/locales/en.json
{
  "common": {
    "copy": "Copy",
    "download": "Download",
    "clear": "Clear"
  },
  "toolGroups": {
    "password": {
      "title": "Password & Security Tools"
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

---

### 📝 File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.tsx | `PasswordGenerator.tsx` |
| Hooks | camelCase (use prefix) | `usePasswordGenerator.ts` |
| Utils | camelCase | `generatePassword.ts` |
| Folders | kebab-case | `password-generator/` |
| Types | PascalCase | `ToolProps`, `ToolState` |
| Constants | UPPER_SNAKE_CASE | `MAX_PASSWORD_LENGTH` |

---

### 🔄 Common Patterns

**1. Copy to Clipboard:**

```tsx
import { copyToClipboard } from '@/features/tools/_shared/utils';

const handleCopy = async () => {
  const success = await copyToClipboard(text);
  if (success) {
    // Show success toast/feedback
  }
};
```

**2. File Download:**

```tsx
import { downloadAsFile } from '@/features/tools/_shared/utils';

const handleDownload = () => {
  downloadAsFile(content, 'output.txt', 'text/plain');
};
```

**3. Tool Output with Actions:**

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

---

### 🔧 Git Commit Standards

**Format:** `<type>(<scope>): <subject>`

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding tests
- `chore` - Maintenance

**Examples:**

```bash
feat(tools): add password generator with strength indicator
fix(i18n): resolve locale routing issue in breadcrumbs
refactor(tools): migrate to isolated module architecture
docs: update tool implementation guide
```

---

### ✅ Pre-Commit Checklist

**BEFORE submitting ANY code, verify:**

- [ ] Component has `'use client'` directive if interactive
- [ ] Uses `Link` from `@/i18n/navigation` (NOT next/link)
- [ ] TypeScript has no errors (`yarn type-check`)
- [ ] ESLint passes (`yarn lint`)
- [ ] Build succeeds (`yarn build`)
- [ ] Added translations to all locale files if needed
- [ ] Updated tool status in `tools.registry.ts`
- [ ] Registered component in `tool-components.tsx`
- [ ] Commit message follows convention
- [ ] Branch name follows pattern

---

### 📋 Shared Components Reference

**Available from `@/features/tools/_shared/components`:**

```tsx
import {
  ToolCardContainer,   // Card wrapper with consistent styling
  ToolSection,         // Section with title and optional description
  ToolButton,          // Styled button component
  ToolTextarea,        // Textarea with character count
  ToolOutput,          // Output display with copy/download actions
  CopyButton,          // Copy to clipboard button
  ToolLoading,         // Loading skeleton
} from '@/features/tools/_shared/components';
```

**Available from `@/features/tools/_shared/utils`:**

```tsx
import {
  copyToClipboard,     // Copy text to clipboard
  downloadAsFile,      // Download content as file
  formatFileSize,      // Format bytes to human readable
  validateFileType,    // Validate file MIME type
} from '@/features/tools/_shared/utils';
```

---

**Version:** 2.0.0  
**Agent:** Developer (Amelia)  
**Last Standards Update:** December 13, 2025
