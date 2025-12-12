# 📁 Project Structure

**Document:** Next.js 14 Project Organization  
**Version:** 3.0.0  
**Last Updated:** December 12, 2025  
**Status:** ✅ Production Ready

[← Back to Architecture Index](./README.md)

---

## 📁 Complete Project Structure

```
multi-purpose-tool/
├── src/                                    # ✅ All source code
│   ├── app/                                # Next.js App Router
│   │   ├── [locale]/                       # i18n routing wrapper
│   │   │   ├── layout.tsx                  # Root layout with providers
│   │   │   ├── page.tsx                    # Homepage (tools hub)
│   │   │   ├── loading.tsx                 # Loading UI
│   │   │   ├── not-found.tsx               # 404 page
│   │   │   └── tools/
│   │   │       ├── layout.tsx              # Tools section layout
│   │   │       ├── page.tsx                # Tools listing
│   │   │       └── [slug]/
│   │   │           ├── page.tsx            # Dynamic tool page
│   │   │           └── loading.tsx         # Loading UI
│   │   ├── api/
│   │   │   ├── track/                      # Analytics endpoints
│   │   │   │   └── route.ts
│   │   │   ├── feedback/
│   │   │   │   └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── globals.css                     # Global styles
│   │   ├── sitemap.ts                      # Dynamic sitemap generation
│   │   ├── robots.ts                       # SEO robots.txt
│   │   └── manifest.ts                     # PWA manifest
│   │
│   ├── components/
│   │   ├── layout/                         # App-wide layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── index.ts
│   │   ├── ui/                             # Reusable UI primitives
│   │   │   ├── ToolCard.tsx
│   │   │   ├── FakeProgressBar.tsx
│   │   │   └── index.ts
│   │   └── features/                       # Feature-specific components
│   │       ├── ToolInterface.tsx
│   │       ├── index.ts
│   │       └── password-generator/
│   │           └── PasswordGenerator.tsx
│   │
│   ├── config/                             # Configuration files
│   │   ├── tools.config.ts                 # Tools registry
│   │   ├── features.config.ts              # Feature flags
│   │   ├── constants.ts                    # App constants
│   │   └── index.ts
│   │
│   ├── hooks/                              # Custom React hooks
│   │   ├── useAnalytics.ts
│   │   ├── useFeatureFlag.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   │
│   ├── i18n/                               # Internationalization config
│   │   └── request.ts                      # next-intl configuration
│   │
│   ├── lib/                                # Shared utilities
│   │   ├── security/
│   │   │   ├── file-validator.ts
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── helpers.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── locales/                            # i18n translation files
│   │   ├── en.json
│   │   ├── vi.json
│   │   ├── es.json
│   │   ├── zh.json
│   │   └── ja.json
│   │
│   ├── store/                              # State management
│   │   └── use-app-store.ts                # Zustand global state
│   │
│   └── types/                              # TypeScript definitions
│       ├── tools.ts
│       └── index.ts
│
├── docs/                                   # Documentation
│   ├── project-context.md
│   ├── architecture/
│   ├── pm/
│   └── raw_documents/
│
├── public/                                 # Static assets
│   ├── tools-icons/
│   ├── ads.txt                             # AdSense verification
│   └── favicon.ico
│
├── middleware.ts                           # Next.js middleware (i18n)
├── next.config.js                          # Next.js configuration
├── tailwind.config.js                      # Tailwind CSS config
├── tsconfig.json                           # TypeScript config
├── package.json
├── .env.local.example
├── .eslintrc.json
├── .gitignore
└── README.md
```

---

## 📂 Directory Responsibilities

### `/src/app` - Application Routes

**Purpose:** Next.js 14 App Router file-based routing

**Key Files:**
- `[locale]/layout.tsx` - Root layout with providers (i18n, analytics)
- `[locale]/page.tsx` - Homepage with tools hub
- `[locale]/tools/[slug]/page.tsx` - Dynamic tool pages
- `api/*/route.ts` - API endpoints

**Conventions:**
- Server Components by default
- Use `'use client'` for interactivity
- Co-locate loading/error states

---

### `/src/components` - React Components

**Purpose:** Reusable UI components

**Structure:**
- `/layout` - App-wide layout components (Header, Footer, Navigation)
- `/ui` - Reusable UI primitives (no business logic)
- `/features` - Feature-specific components (tool implementations)

**Conventions:**
- One component per file
- Use PascalCase for file names
- Export via barrel files (`index.ts`)
- Co-locate styles if needed

---

### `/src/lib` - Business Logic

**Purpose:** Non-React logic, utilities, integrations

**Modules:**
- `/security` - Validation & file protection
- `/utils` - Generic helpers (cn, formatBytes, etc.)

**Conventions:**
- Pure functions preferred
- No React components
- Export named functions
- TypeScript strict mode

---

### `/src/hooks` - Custom React Hooks

**Purpose:** Reusable stateful logic

**Examples:**
```typescript
// useAnalytics.ts
export function useAnalytics() {
  const trackEvent = useCallback((name: string, params?: any) => {
    // Track to GA4 + Supabase
  }, []);

  return { trackEvent };
}

// useFeatureFlag.ts
export function useFeatureFlag(flagName: string): boolean {
  return useAppStore((state) => state.features[flagName]);
}
```

**Conventions:**
- Prefix with `use`
- Return object or array
- Use TypeScript generics

---

### `/src/store` - Global State

**Purpose:** Zustand state management

**Structure:**
```typescript
// use-app-store.ts
export const useAppStore = create<AppState>((set) => ({
  locale: 'en',
  features: {},
  setLocale: (locale) => set({ locale }),
  toggleFeature: (name) => set((state) => ({
    features: { ...state.features, [name]: !state.features[name] }
  })),
}));
```

**When to use:**
- Cross-component state
- User preferences
- Feature flags
- Analytics state

---

### `/src/locales` - i18n Translations

**Purpose:** Translation files for next-intl

**Structure:**
```json
// en.json
{
  "common": {
    "site_name": "ToolHub",
    "home": "Home"
  },
  "tools": {
    "password_generator": {
      "title": "Password Generator",
      "description": "Generate secure passwords"
    }
  }
}
```

**Conventions:**
- Nested object structure
- Use snake_case for keys
- Keep translations flat where possible
- Include pluralization rules

---

### `/src/types` - TypeScript Definitions

**Purpose:** Shared TypeScript types

**Structure:**
```typescript
// tools.ts
export interface Tool {
  id: string;
  name: LocalizedString;
  category: ToolCategory;
  icon: string;
  // ...
}
```

**Conventions:**
- One domain per file
- Export interfaces/types
- Avoid circular dependencies

---

### `/src/config` - Configuration Files

**Purpose:** Application configuration

**Files:**
- `tools.config.ts` - Tool registry
- `features.config.ts` - Feature flags
- `constants.ts` - App-wide constants

---

### `/public` - Static Assets

**Purpose:** Publicly accessible files

**Contents:**
- Tool icons (SVG)
- Favicon files
- `ads.txt` (AdSense)
- Static images

**Access:**
```tsx
<Image src="/tools-icons/password-generator.svg" />
```

---

## 📄 Key Configuration Files

### `next.config.js`

```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = withNextIntl(nextConfig);
```

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        // shadcn/ui variables
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## 🔧 Import Aliases

```typescript
// All imports use @/ which resolves to ./src/
import { Button } from '@/components/ui';
import { Header, Footer } from '@/components/layout';
import { ToolInterface } from '@/components/features';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/hooks';
import { useAppStore } from '@/store/use-app-store';
import { tools } from '@/config';
import type { Tool } from '@/types';
```

**Benefits:**
- Cleaner imports
- Easier refactoring
- No relative path hell (`../../..`)
- Single source path alias

---

## 📊 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `PasswordGenerator.tsx` |
| **Utilities** | kebab-case | `file-validator.ts` |
| **Hooks** | camelCase with `use` | `useAnalytics.ts` |
| **Types** | kebab-case | `tools.ts` |
| **Config** | kebab-case with `.config` | `tools.config.ts` |
| **Barrel exports** | `index.ts` | `index.ts` |

---

## 🔗 Related Documents

- **System Architecture:** [System Architecture](./01-system-architecture.md)
- **Routing Strategy:** [Routing & SEO](./03-routing-seo.md)
- **Implementation Guide:** [Implementation Guide](./IMPLEMENTATION_GUIDE.md)

---

[← Back to Architecture Index](./README.md)

**Document Version:** 3.0.0  
**Last Updated:** December 12, 2025  
**Next Review:** Post-Launch (Q1 2026)
