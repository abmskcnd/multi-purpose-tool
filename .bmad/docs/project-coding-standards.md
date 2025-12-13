# Multi-Purpose Tool - Project Standards & Guidelines

> **For GitHub Copilot & Team Members**: This document defines the coding standards, project structure, and conventions for the Multi-Purpose Tool project. Follow these guidelines strictly when implementing new features or tools.
>
> **Reference Implementation**: Password Generator (`src/features/tools/password/generator/`)

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Tool Implementation Guide](#tool-implementation-guide)
4. [UI Component Library](#ui-component-library)
5. [Tracking & Analytics](#tracking--analytics)
6. [SEO & Layout](#seo--layout)
7. [Coding Standards](#coding-standards)
8. [Component Patterns](#component-patterns)
9. [Styling Guidelines](#styling-guidelines)
10. [i18n Guidelines](#i18n-guidelines)
11. [Documentation Requirements](#documentation-requirements)
12. [Git & Commit Conventions](#git--commit-conventions)
13. [File Naming Conventions](#file-naming-conventions)
14. [Testing Standards](#testing-standards)

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| i18n | next-intl | 4.x |
| State | Zustand | 5.x |
| Database | Supabase (PostgreSQL) | - |
| Analytics | Google Analytics 4 | - |
| UI Library | Radix UI + CVA | - |
| Icons | Lucide React | - |
| Package Manager | Yarn | 1.x |

### Key Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "next-intl": "4.x",
  "zustand": "5.x",
  "@supabase/supabase-js": "2.x",
  "@radix-ui/react-checkbox": "1.x",
  "@radix-ui/react-slider": "1.x",
  "@radix-ui/react-switch": "1.x",
  "@radix-ui/react-tabs": "1.x",
  "@radix-ui/react-tooltip": "1.x",
  "@radix-ui/react-label": "2.x",
  "class-variance-authority": "0.7.x",
  "lucide-react": "0.x"
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
│   ├── analytics/                # ⭐ Google Analytics component
│   │   └── GoogleAnalytics.tsx
│   ├── features/                 # Legacy feature components
│   ├── layout/                   # Layout components (Header, Footer, Sidebar)
│   └── ui/                       # ⭐ Shadcn-style UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── checkbox.tsx
│       ├── slider.tsx
│       ├── tabs.tsx
│       ├── card.tsx
│       └── ...
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
│       │   │   ├── ToolPageLayout.tsx  # ⭐ SEO layout with ad slots
│       │   │   └── ToolComponents.tsx  # ⭐ Shared tool UI
│       │   ├── hooks/            # Shared hooks
│       │   └── utils/            # Utility functions
│       ├── password/             # Password tool group
│       │   └── generator/        # ⭐ Reference implementation
│       │       ├── index.ts
│       │       └── PasswordGenerator.tsx
│       └── [group-id]/           # Other groups...
│
├── hooks/
│   ├── useToolTracking.ts        # ⭐ Supabase + GA tracking hook
│   └── ...
│
├── lib/
│   └── supabase/                 # ⭐ Supabase client
│       ├── client.ts
│       └── types.ts
│
├── i18n/                         # i18n configuration
├── locales/                      # Translation files (en, vi, es, zh, ja)
├── store/                        # Zustand stores
└── types/                        # TypeScript type definitions

supabase/
└── schema.sql                    # ⭐ Database schema
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

import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useToolTracking } from '@/hooks/useToolTracking';

// UI Components (shadcn-style)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// Icons
import { Copy, Check, RefreshCw } from 'lucide-react';

interface ToolState {
  // Define state with explicit types
}

const DEFAULT_STATE: ToolState = {
  // Default values
};

export default function PasswordGenerator() {
  const t = useTranslations('tools.password_generator');
  const { trackGenerate, trackCopy, trackConfigure } = useToolTracking({
    toolId: 'password-generator',
    toolGroup: 'password',
  });

  const [state, setState] = useState<ToolState>(DEFAULT_STATE);

  const handleGenerate = useCallback(() => {
    // Implementation
    trackGenerate({ /* metadata */ });
  }, [trackGenerate]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    trackCopy();
  }, [output, trackCopy]);

  return (
    <div className="space-y-6">
      {/* Output Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('generated_password')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Output display */}
        </CardContent>
      </Card>

      {/* Options Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('options')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tool options */}
        </CardContent>
      </Card>
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

### Step 5: Add Translations (All 5 Locales)

```json
// src/locales/en.json (repeat for vi, es, zh, ja)
{
  "tools": {
    "tool_name": {
      "title": "Tool Title",
      "description": "Short description",
      "meta_description": "SEO meta description",
      "generated_output": "Output",
      "click_generate": "Click to generate",
      "generate": "Generate",
      "copy": "Copy",
      "copied": "Copied!",
      "options": "Options",
      "advanced_options": "Advanced Options",
      "faq_title": "FAQ",
      "faq_q1": "Question?",
      "faq_a1": "Answer.",
      "related_title": "Related Tools"
    }
  }
}
```

### Step 6: Update Tool Status

```ts
// src/config/tools.registry.ts
// Change status from 'coming-soon' to 'active'
{ id: 'generator', ..., status: 'active' }
```

### Step 7: Update Feature Documentation (REQUIRED)

After completing a tool implementation, you **MUST** update or create the corresponding documentation in `docs/feature/`:

```bash
# Create or update docs for your tool
docs/feature/[group]/[tool-id].md
```

**Required Documentation:**
1. Copy template from `docs/feature/_TEMPLATE.md`
2. Fill in all required sections (see `docs/feature/README.md`)
3. Update status from `coming-soon` to `active`
4. Document all i18n keys used
5. Add testing checklist results

**Example:**
```bash
# For password generator:
docs/feature/password/generator.md
```

⚠️ **PRs without updated documentation will not be merged.**

---

## UI Component Library

### Available Components

Use shadcn-style components from `@/components/ui/`:

| Component | Import | Description |
|-----------|--------|-------------|
| `Button` | `@/components/ui/button` | Variants: default, destructive, outline, secondary, ghost, link, success |
| `Input` | `@/components/ui/input` | Text input with error state |
| `Textarea` | `@/components/ui/textarea` | Multi-line input |
| `Checkbox` | `@/components/ui/checkbox` | Radix checkbox |
| `Label` | `@/components/ui/label` | Form label |
| `Slider` | `@/components/ui/slider` | Range slider |
| `Switch` | `@/components/ui/switch` | Toggle switch |
| `Tabs` | `@/components/ui/tabs` | Tab navigation |
| `Card` | `@/components/ui/card` | Container card |
| `Badge` | `@/components/ui/badge` | Status badges |
| `Progress` | `@/components/ui/progress` | Progress bar |
| `Tooltip` | `@/components/ui/tooltip` | Hover tooltips |
| `Skeleton` | `@/components/ui/skeleton` | Loading placeholder |
| `Alert` | `@/components/ui/alert` | Alert messages |

### Button Usage

```tsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="success">Success</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Copy className="h-4 w-4" /></Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

### Card Layout

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

### Form Controls

```tsx
// Checkbox with Label
<div className="flex items-center space-x-2">
  <Checkbox 
    id="option" 
    checked={checked} 
    onCheckedChange={setChecked} 
  />
  <Label htmlFor="option">Option Label</Label>
</div>

// Slider with Label
<div className="space-y-2">
  <div className="flex justify-between">
    <Label>Length</Label>
    <span className="text-sm text-muted-foreground">{value}</span>
  </div>
  <Slider
    value={[value]}
    onValueChange={([v]) => setValue(v)}
    min={4}
    max={128}
    step={1}
  />
</div>
```

---

## Tracking & Analytics

### useToolTracking Hook

Every tool MUST use the tracking hook:

```tsx
import { useToolTracking } from '@/hooks/useToolTracking';

const {
  trackView,      // Auto-called on mount
  trackGenerate,  // Main action (generate, convert, etc.)
  trackCopy,      // Copy to clipboard
  trackDownload,  // Download file
  trackShare,     // Share action
  trackConfigure, // Settings change
  trackReset,     // Reset to defaults
  trackError,     // Error occurred
  trackComplete,  // Task completed
} = useToolTracking({
  toolId: 'password-generator',
  toolGroup: 'password',
});
```

### Tracking Events

```tsx
// Generate with metadata
trackGenerate({
  length: 16,
  hasUppercase: true,
  hasNumbers: true,
});

// Copy
trackCopy({ contentLength: output.length });

// Configure
trackConfigure({
  setting: 'excludeAmbiguous',
  value: true,
});

// Error
trackError(error, { context: 'generation' });
```

### Database Schema (Supabase)

```sql
-- tool_actions table
CREATE TABLE tool_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id TEXT NOT NULL,
  tool_group TEXT NOT NULL,
  action_type TEXT NOT NULL, -- view, generate, copy, download, share, configure, reset, error, complete
  metadata JSONB,
  session_id TEXT,
  user_agent TEXT,
  locale TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

### Google Analytics 4

Events automatically sent to GA4:

```tsx
// Event format
gtag('event', 'tool_generate', {
  tool_id: 'password-generator',
  tool_group: 'password',
  // ... metadata
});
```

---

## SEO & Layout

### ToolPageLayout Component

For SEO-optimized pages with ad slots:

```tsx
import { ToolPageLayout } from '@/features/tools/_shared/components/ToolPageLayout';

export default function PasswordGeneratorPage() {
  return (
    <ToolPageLayout
      toolId="password-generator"
      toolGroup="password"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Password', href: '/tools/password' },
        { label: 'Generator' },
      ]}
      faqItems={[
        { question: 'How secure?', answer: 'Uses crypto.getRandomValues...' },
      ]}
      relatedTools={[
        { id: 'hash-generator', name: 'Hash Generator', href: '/tools/password/hash-generator' },
      ]}
    >
      <PasswordGenerator />
    </ToolPageLayout>
  );
}
```

### Ad Slots (Auto-generated)

- **Top Banner**: 728x90 desktop, 320x100 mobile
- **Middle Ad**: Between tool and FAQ
- **Sidebar Ad**: Right side (desktop only)
- **Mobile Bottom**: Sticky bottom (mobile only)

### Schema.org FAQ Markup

FAQ items automatically get structured data for SEO.

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
  const t = useTranslations('tools.my_tool');
  const { trackGenerate, trackCopy } = useToolTracking({
    toolId: 'my-tool',
    toolGroup: 'group',
  });
  
  const [state, setState] = useState(initialState);
  
  // ✅ DO: Memoize callbacks
  const handleClick = useCallback(() => {
    // ...
    trackGenerate({ key: value });
  }, [trackGenerate, value]);
  
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
import { useTranslations } from 'next-intl';

// 2. Third-party imports
import { Copy, Check, RefreshCw } from 'lucide-react';

// 3. Internal hooks
import { useToolTracking } from '@/hooks/useToolTracking';

// 4. UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 5. Internal imports (absolute paths with @/)
import { Link } from '@/i18n/navigation';

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
import { useTranslations } from 'next-intl';
import { useToolTracking } from '@/hooks/useToolTracking';

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// Icons
import { Copy, Check, RefreshCw } from 'lucide-react';

// Types
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
  const t = useTranslations('tools.tool_name');
  const { trackGenerate, trackCopy, trackConfigure } = useToolTracking({
    toolId: 'tool-name',
    toolGroup: 'group',
  });

  // State
  const [state, setState] = useState<ToolState>(initialState);
  const [copied, setCopied] = useState(false);
  
  // Derived state (useMemo)
  const isValid = useMemo(() => validate(state.input), [state.input]);
  
  // Callbacks
  const handleGenerate = useCallback(() => {
    const result = processInput(state.input, state.options);
    setState(prev => ({ ...prev, output: result }));
    trackGenerate({ /* metadata */ });
  }, [state.input, state.options, trackGenerate]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(state.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackCopy();
  }, [state.output, trackCopy]);
  
  // Render
  return (
    <div className="space-y-6">
      {/* Output Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('generated_output')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Output with copy button */}
          <Button onClick={handleCopy} size="icon" variant="ghost">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </CardContent>
      </Card>

      {/* Options Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('options')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Options using Checkbox, Slider, etc. */}
        </CardContent>
      </Card>
    </div>
  );
}
```

### Legacy Shared UI Components (Optional)

For backward compatibility, these are still available from `@/features/tools/_shared/components`:

```tsx
import {
  ToolCardContainer,  // Card wrapper (prefer Card from ui/)
  ToolSection,        // Section with title
  ToolButton,         // Styled button (prefer Button from ui/)
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

### Critical: setRequestLocale for Server Components

**ALL server components in `[locale]` folder MUST call `setRequestLocale(locale)`** to enable static rendering with correct locale:

```tsx
// src/app/[locale]/tools/[group]/[tool]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

interface ToolPageProps {
  params: Promise<{
    locale: string;
    group: string;
    tool: string;
  }>;
}

export function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) {
    for (const group of groups) {
      for (const tool of tools) {
        params.push({ locale, group: group.id, tool: tool.id });
      }
    }
  }
  return params;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { locale, group: groupId, tool: toolId } = await params;
  
  // ⚠️ CRITICAL: Must call this for proper locale detection
  setRequestLocale(locale);
  
  const t = await getTranslations('common');
  // ... rest of component
}
```

**Without `setRequestLocale`**: Next-intl will fallback to `defaultLocale` (vi) regardless of URL, causing incorrect translations even when URL shows `/es/...` or `/ja/...`.

### Using Translations in Client Components

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

### Using Translations in Server Components

```tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MyPage({ params }: PageProps) {
  const { locale } = await params;
  
  // ⚠️ REQUIRED for static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations('tools.password_generator');
  const tCommon = await getTranslations('common');
  
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
    "search_placeholder": "Search tools...",
    "result": "result",
    "results": "results",
    "no_tools_found": "No tools found for",
    "more": "more"
  },
  "toolGroups": {
    "password": {
      "title": "Password & Security Tools",
      "description": "Generate secure passwords, check strength, encode data..."
    }
  },
  "toolItems": {
    "password": {
      "generator": {
        "title": "Password Generator",
        "description": "Generate secure, random passwords instantly"
      },
      "strength-checker": {
        "title": "Password Strength Checker",
        "description": "Analyze password security and get improvement tips"
      }
    },
    "text": {
      "case-converter": {
        "title": "Text Case Converter",
        "description": "Convert text to uppercase, lowercase, title case..."
      }
    }
  },
  "tools": {
    "password_generator": {
      "title": "Password Generator",
      "description": "Generate secure, random passwords instantly",
      "meta_description": "Create strong, secure passwords with our free online password generator...",
      
      "generated_password": "Generated Password",
      "click_generate": "Click generate to create a password",
      "hide_password": "Hide password",
      "show_password": "Show password",
      
      "strength": "Strength",
      "strength_weak": "Weak",
      "strength_fair": "Fair", 
      "strength_good": "Good",
      "strength_strong": "Strong",
      
      "generate": "Generate Password",
      "regenerate": "Regenerate",
      "copy": "Copy",
      "copied": "Copied!",
      
      "options": "Options",
      "length": "Length",
      "characters": "characters",
      "character_types": "Character Types",
      "uppercase": "Uppercase (A-Z)",
      "lowercase": "Lowercase (a-z)",
      "numbers": "Numbers (0-9)",
      "symbols": "Symbols (!@#$...)",
      "select_at_least_one": "Select at least one character type",
      
      "advanced_options": "Advanced Options",
      "exclude_ambiguous": "Exclude Ambiguous",
      "exclude_ambiguous_desc": "Remove 0, O, l, 1, I",
      "reset_defaults": "Reset to Defaults",
      
      "recent_passwords": "Recent Passwords",
      "no_recent": "No recent passwords",
      "clear_history": "Clear History",
      
      "faq_title": "Frequently Asked Questions",
      "faq_q1": "How secure is this password generator?",
      "faq_a1": "Our generator uses cryptographically secure random number generation...",
      
      "related_title": "Related Tools"
    }
  }
}
```

### Key Translation Sections

| Section | Purpose | Example |
|---------|---------|---------|
| `common` | Shared UI text across all tools | copy, download, clear, results |
| `toolGroups` | Tool group titles/descriptions for navigation | Password & Security Tools |
| `toolItems` | Tool card titles/descriptions (for listings) | Password Generator - Generate secure... |
| `tools.[tool_id]` | Full tool interface text | All labels, options, FAQ for specific tool |

### Translation Pattern for Tool Titles/Descriptions

To display translated tool titles in cards, sidebar, breadcrumbs:

```tsx
// In client components
const tToolItems = useTranslations('toolItems');
const tToolGroups = useTranslations('toolGroups');

// Get translated title with fallback
let toolTitle = tool.title;
try {
  toolTitle = tToolItems(`${group.id}.${tool.id}.title`);
} catch {
  // Use fallback from registry
}

// Get translated group title
let groupTitle = group.title;
try {
  groupTitle = tToolGroups(`${group.id}.title`);
} catch {
  // Use fallback from registry
}
```

```tsx
// In server components
const tToolItems = await getTranslations('toolItems');
const tToolGroups = await getTranslations('toolGroups');

// Same pattern as above
```

### Supported Locales

| Code | Language | Flag |
|------|----------|------|
| `en` | English | 🇺🇸 |
| `vi` | Vietnamese | 🇻🇳 |
| `es` | Spanish | 🇪🇸 |
| `zh` | Chinese (Simplified) | 🇨🇳 |
| `ja` | Japanese | 🇯🇵 |

**IMPORTANT**: All 5 locales MUST have complete translations for every tool.

### Common Mistakes to Avoid

❌ **DON'T**: Use `next/link` directly
```tsx
import Link from 'next/link';
<Link href="/tools">Tools</Link>  // Will break i18n routing
```

✅ **DO**: Use `Link` from `@/i18n/navigation`
```tsx
import { Link } from '@/i18n/navigation';
<Link href="/tools">Tools</Link>  // Auto-adds locale prefix
```

❌ **DON'T**: Forget `setRequestLocale` in server components
```tsx
// This will always show Vietnamese (defaultLocale)
export default async function ToolPage({ params }: ToolPageProps) {
  const { group, tool } = await params;
  const t = await getTranslations('common');
  // Missing setRequestLocale!
}
```

✅ **DO**: Always call `setRequestLocale` in server components
```tsx
export default async function ToolPage({ params }: ToolPageProps) {
  const { locale, group, tool } = await params;
  setRequestLocale(locale);  // ✅ Required!
  const t = await getTranslations('common');
}
```

❌ **DON'T**: Use hardcoded text
```tsx
<button>Copy</button>  // Not translated
```

✅ **DO**: Use translation keys
```tsx
<button>{t('copy')}</button>  // Translated
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

## Documentation Requirements

### Mandatory Documentation

Every completed tool **MUST** have corresponding documentation in `docs/feature/`. This is a **non-negotiable requirement** for all PRs.

### Documentation Location

```
docs/feature/
├── _TEMPLATE.md              # Template (copy to create new docs)
├── README.md                 # Guide for documentation
├── [group-id]/               # Match tool group ID
│   └── [tool-id].md          # Match tool ID
```

### Documentation Workflow

| Step | Action | When |
|------|--------|------|
| 1 | Copy `_TEMPLATE.md` | Before coding |
| 2 | Fill Overview & Features | Before coding |
| 3 | Fill File Structure & Dependencies | Before coding |
| 4 | Update Component API & Core Logic | During coding |
| 5 | Complete i18n Keys & Testing | After coding |
| 6 | Update Changelog | Before PR |

### Required Sections (Minimum)

For a PR to be approved, documentation must include:

```markdown
✅ Tool ID, Group, Status (accurate)
✅ Overview with User Stories
✅ Features list with status
✅ File Structure
✅ Dependencies (external + internal)
✅ Component API (Props, State)
✅ i18n Keys used
```

### Documentation Quality Checklist

Before submitting PR:

- [ ] Tool ID matches `tools.registry.ts`
- [ ] Status updated to `active`
- [ ] All dependencies listed
- [ ] Core logic documented
- [ ] All i18n keys defined
- [ ] Testing checklist completed

### Example: Password Generator

```
docs/feature/password/generator.md
```

References the implementation at:
```
src/features/tools/password/generator/PasswordGenerator.tsx
```

⚠️ **Important**: Documentation is part of the Definition of Done. No tool is considered complete without updated docs.

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

### Code Quality
- [ ] `'use client'` directive for interactive components
- [ ] Uses `useToolTracking` hook for all user actions
- [ ] Uses UI components from `@/components/ui/`
- [ ] Uses `Link` from `@/i18n/navigation`
- [ ] **ALL server components call `setRequestLocale(locale)`**
- [ ] **`generateStaticParams()` includes locale parameter**
- [ ] TypeScript has no errors (`yarn tsc`)
- [ ] ESLint passes (`yarn lint`)
- [ ] Build succeeds (`yarn build`)

### i18n (All 5 Locales)
- [ ] Added translations to `en.json`
- [ ] Added translations to `vi.json`
- [ ] Added translations to `es.json`
- [ ] Added translations to `zh.json`
- [ ] Added translations to `ja.json`
- [ ] Includes: title, description, meta_description
- [ ] Includes: all UI labels
- [ ] Includes: FAQ items (3-5 questions)
- [ ] Added tool to `toolItems` section (for card/sidebar display)
- [ ] No hardcoded text in components

### Configuration
- [ ] Updated tool status in `tools.registry.ts`
- [ ] Registered component in `tool-components.tsx`

### Documentation
- [ ] Created/updated feature documentation in `docs/feature/`
- [ ] All required sections completed

### Git
- [ ] Commit messages follow convention
- [ ] Branch name follows convention

### Testing (Manual)
- [ ] Test in all 5 locales (vi, en, es, zh, ja)
- [ ] Verify tool titles/descriptions translated in:
  - [ ] Tool cards (GroupToolCard)
  - [ ] Sidebar navigation
  - [ ] Breadcrumbs
  - [ ] Page title and meta tags
- [ ] Refresh page in different locale - locale persists
- [ ] Switch language - all text updates correctly

---

## Reference Implementation

**Password Generator** is the reference implementation. Study it before creating new tools:

- **Component**: `src/features/tools/password/generator/PasswordGenerator.tsx`
- **Translations**: `src/locales/[locale].json` → `tools.password_generator`

---

## Useful Links

| Resource | Path |
|----------|------|
| UI Components | `src/components/ui/` |
| Tool Layout | `src/features/tools/_shared/components/ToolPageLayout.tsx` |
| Tracking Hook | `src/hooks/useToolTracking.ts` |
| Supabase Schema | `supabase/schema.sql` |
| Google Analytics | `src/components/analytics/GoogleAnalytics.tsx` |
| Reference Tool | `src/features/tools/password/generator/PasswordGenerator.tsx` |

---

*Last updated: December 2024*
