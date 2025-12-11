# 📁 Project Structure

**Document:** Next.js 14 Project Organization  
**Version:** 2.0.0  
**Last Updated:** December 11, 2025  
**Status:** ✅ Production Ready

[← Back to Architecture Index](./README.md)

---

## 📁 Complete Project Structure

```
multi-purpose-tool/
├── app/
│   ├── [locale]/                           # i18n routing wrapper
│   │   ├── layout.tsx                      # Root layout with providers
│   │   ├── page.tsx                        # Homepage (tools hub)
│   │   ├── tools/
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx                # Dynamic tool page
│   │   │   │   └── loading.tsx             # Loading UI
│   │   │   └── layout.tsx                  # Tools section layout
│   │   ├── convert/
│   │   │   └── [source]-to-[target]/
│   │   │       ├── page.tsx                # Programmatic SEO pages
│   │   │       └── loading.tsx
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # Content marketing
│   │   ├── privacy-policy/
│   │   │   └── page.tsx                    # Legal page
│   │   ├── terms-of-service/
│   │   │   └── page.tsx
│   │   ├── disclaimer/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── api/
│   │   ├── track/                          # Analytics endpoints
│   │   │   └── route.ts
│   │   ├── feedback/
│   │   │   └── route.ts
│   │   └── health/
│   │       └── route.ts
│   ├── sitemap.ts                          # Dynamic sitemap generation
│   ├── robots.ts                           # SEO robots.txt
│   └── manifest.ts                         # PWA manifest
│
├── components/
│   ├── tools/                              # Tool-specific components
│   │   ├── image-converter/
│   │   │   ├── ImageConverter.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   └── FormatSelector.tsx
│   │   ├── pdf-merger/
│   │   │   ├── PDFMerger.tsx
│   │   │   └── PDFPreview.tsx
│   │   └── password-generator/
│   │       ├── PasswordGenerator.tsx
│   │       └── StrengthIndicator.tsx
│   ├── shared/                             # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── CookieBanner.tsx
│   │   ├── AdUnit.tsx
│   │   └── FakeProgressBar.tsx
│   ├── ui/                                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   └── error-boundary/
│       └── ErrorBoundary.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                       # Supabase client setup
│   │   ├── server.ts                       # Server-side Supabase
│   │   └── types.ts                        # Database types
│   ├── analytics/
│   │   ├── google-analytics.ts             # GA4 integration
│   │   ├── track-events.ts                 # Custom event tracking
│   │   └── supabase-tracker.ts             # Store events to Supabase
│   ├── processors/                         # Client-side processing
│   │   ├── image-processor.ts
│   │   ├── pdf-processor.ts
│   │   └── wasm-loader.ts
│   ├── seo/
│   │   ├── metadata.ts                     # Dynamic metadata generator
│   │   ├── schema.ts                       # JSON-LD schemas
│   │   └── sitemap-generator.ts
│   ├── error-handling/
│   │   ├── file-processor-errors.ts
│   │   ├── retry.ts
│   │   └── error-logger.ts
│   ├── security/
│   │   ├── file-validator.ts
│   │   ├── rate-limiter.ts
│   │   └── csp.ts
│   └── utils/
│       ├── i18n.ts                         # i18n utilities
│       └── helpers.ts
│
├── hooks/
│   ├── useAnalytics.ts                     # Analytics hook
│   ├── useFeatureFlag.ts                   # Feature toggle hook
│   ├── useToolTracking.ts                  # Tool usage tracking
│   └── useLocalStorage.ts                  # Local storage hook
│
├── store/
│   └── use-app-store.ts                    # Zustand global state
│
├── messages/                               # i18n translation files
│   ├── en.json
│   ├── vi.json
│   ├── es.json
│   ├── zh.json
│   └── ja.json
│
├── types/
│   ├── tools.ts
│   ├── analytics.ts
│   ├── supabase.ts
│   └── api.ts
│
├── public/
│   ├── tools-icons/
│   │   ├── password-generator.svg
│   │   ├── qr-code.svg
│   │   └── ...
│   ├── ads.txt                             # AdSense verification
│   ├── robots.txt                          # Fallback robots
│   └── favicon.ico
│
├── supabase/
│   ├── migrations/                         # Database migrations
│   │   ├── 20240101000000_initial.sql
│   │   ├── 20240102000000_analytics.sql
│   │   └── ...
│   └── seed.sql                            # Seed data
│
├── config/
│   ├── tools.config.ts                     # Tools registry
│   ├── features.config.ts                  # Feature flags
│   ├── constants.ts                        # App constants
│   └── env.ts                              # Type-safe env vars
│
├── __tests__/
│   ├── unit/
│   │   ├── processors/
│   │   │   └── image-processor.test.ts
│   │   └── utils/
│   │       └── i18n.test.ts
│   ├── integration/
│   │   ├── api/
│   │   │   └── track.test.ts
│   │   └── tools/
│   │       └── password-generator.test.tsx
│   └── e2e/
│       └── user-journey.spec.ts
│
├── scripts/
│   ├── backup-database.sh
│   └── generate-sitemap.ts
│
├── docs/
│   └── architecture/                       # This folder!
│       ├── README.md
│       ├── 00-executive-summary.md
│       └── ...
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── middleware.ts                           # Next.js middleware
├── next.config.js                          # Next.js configuration
├── tailwind.config.ts                      # Tailwind CSS config
├── tsconfig.json                           # TypeScript config
├── package.json
├── .env.local.example
├── .gitignore
└── README.md
```

---

## 📂 Directory Responsibilities

### `/app` - Application Routes

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

### `/components` - React Components

**Purpose:** Reusable UI components

**Structure:**
- `/tools` - Tool-specific components (not reusable)
- `/shared` - Shared across multiple pages
- `/ui` - shadcn/ui base components
- `/error-boundary` - Error handling components

**Conventions:**
- One component per file
- Use PascalCase for file names
- Export named components
- Co-locate styles if needed

---

### `/lib` - Business Logic

**Purpose:** Non-React logic, utilities, integrations

**Modules:**
- `/supabase` - Database client & types
- `/analytics` - GA4 + custom tracking
- `/processors` - File processing logic
- `/seo` - Metadata generation
- `/error-handling` - Error patterns
- `/security` - Validation & protection
- `/utils` - Generic helpers

**Conventions:**
- Pure functions preferred
- No React components
- Export named functions
- TypeScript strict mode

---

### `/hooks` - Custom React Hooks

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

### `/store` - Global State

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

### `/messages` - i18n Translations

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

### `/types` - TypeScript Definitions

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

// analytics.ts
export interface TrackEvent {
  name: string;
  params?: Record<string, any>;
  timestamp: string;
}
```

**Conventions:**
- One domain per file
- Export interfaces/types
- Avoid circular dependencies

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

### `/supabase` - Database Files

**Purpose:** Supabase migrations & seeds

**Structure:**
```
migrations/
  20240101000000_initial.sql
  20240102000000_analytics.sql
seed.sql
```

**Conventions:**
- Migration files: `YYYYMMDDHHMMSS_description.sql`
- Run in order
- Never modify old migrations
- Test on staging first

---

### `/config` - Configuration Files

**Purpose:** Application configuration

**Files:**
- `tools.config.ts` - Tool registry
- `features.config.ts` - Feature flags
- `constants.ts` - App-wide constants
- `env.ts` - Type-safe environment variables

**Example:**
```typescript
// env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  GA_MEASUREMENT_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

---

### `/__tests__` - Test Files

**Purpose:** All test files

**Structure:**
- `/unit` - Pure logic tests
- `/integration` - Component + API tests
- `/e2e` - Full user journey tests

**Conventions:**
- Mirror source file structure
- Use `.test.ts` or `.spec.ts`
- Co-locate test utilities

See [Testing Strategy](./40-testing-strategy.md) for details.

---

## 📄 Key Configuration Files

### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['your-supabase-project.supabase.co'],
  },
  i18n: {
    locales: ['en', 'vi', 'es', 'zh', 'ja'],
    defaultLocale: 'en',
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
```

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        // shadcn/ui variables
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## 🔧 Import Aliases

```typescript
// Available aliases (configured in tsconfig.json)
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { trackEvent } from '@/lib/analytics/track-events';
import type { Tool } from '@/types/tools';
```

**Benefits:**
- Cleaner imports
- Easier refactoring
- No relative path hell (`../../..`)

---

## 📊 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `PasswordGenerator.tsx` |
| **Utilities** | kebab-case | `track-events.ts` |
| **Hooks** | camelCase with `use` | `useAnalytics.ts` |
| **Types** | kebab-case | `tools.ts` |
| **Config** | kebab-case | `tools.config.ts` |
| **Tests** | Match source + `.test` | `image-processor.test.ts` |

---

## 🔗 Related Documents

- **System Architecture:** [System Architecture](./01-system-architecture.md)
- **Routing Strategy:** [Routing & SEO](./03-routing-seo.md)
- **Tech Stack:** [Technology Stack](./10-technology-stack.md)
- **Development Guide:** [Development Guidelines](./41-development-guidelines.md)

---

[← Back to Architecture Index](./README.md)

**Document Version:** 2.0.0  
**Last Updated:** December 11, 2025  
**Next Review:** Post-Launch (Q1 2026)
