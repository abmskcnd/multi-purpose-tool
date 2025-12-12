# Hướng Dẫn Next.js Cho React Developer 🚀

> Tài liệu này được viết dựa trên dự án **multi-purpose-tool** của bạn, giúp bạn hiểu rõ Next.js thông qua code thực tế.

## Mục Lục

1. [So Sánh React vs Next.js](#1-so-sánh-react-vs-nextjs)
2. [Cấu Trúc Dự Án Next.js](#2-cấu-trúc-dự-án-nextjs)
3. [App Router - Hệ Thống Routing](#3-app-router---hệ-thống-routing)
4. [Server Components vs Client Components](#4-server-components-vs-client-components)
5. [Layout và Page](#5-layout-và-page)
6. [Dynamic Routes](#6-dynamic-routes)
7. [API Routes](#7-api-routes)
8. [Middleware](#8-middleware)
9. [Data Fetching](#9-data-fetching)
10. [Metadata và SEO](#10-metadata-và-seo)
11. [Internationalization (i18n)](#11-internationalization-i18n)
12. [Static Generation (SSG) vs Server-Side Rendering (SSR)](#12-static-generation-ssg-vs-server-side-rendering-ssr)
13. [Loading, Error, Not Found States](#13-loading-error-not-found-states)
14. [Các Lệnh CLI Quan Trọng](#14-các-lệnh-cli-quan-trọng)
15. [Best Practices](#15-best-practices)

---

## 1. So Sánh React vs Next.js

### Bạn đã biết (React/React Native):
```jsx
// React: Routing bằng react-router
<BrowserRouter>
  <Route path="/tools/:id" element={<ToolPage />} />
</BrowserRouter>

// React Native Expo: File-based routing
app/(tabs)/index.tsx
app/tools/[id].tsx
```

### Next.js khác gì:
| React SPA | Next.js |
|-----------|---------|
| Client-side only | Server + Client |
| Manual routing | File-based routing |
| Single `index.html` | Pre-rendered pages |
| No SEO | Full SEO support |
| `create-react-app` | `create-next-app` |

**💡 Key Insight:** Next.js = React + Server Rendering + File Routing + API Routes + nhiều tính năng built-in.

---

## 2. Cấu Trúc Dự Án Next.js

### Dự án của bạn:
```
multi-purpose-tool/
├── src/
│   ├── app/                    # 🔥 App Router (Next.js 13+)
│   │   ├── layout.tsx          # Root Layout
│   │   ├── page.tsx            # Trang / (root redirect)
│   │   ├── globals.css         # Global styles
│   │   ├── [locale]/           # Dynamic locale routes
│   │   │   ├── layout.tsx      # Layout cho mỗi locale
│   │   │   ├── page.tsx        # Trang /{locale}
│   │   │   └── tools/
│   │   │       ├── page.tsx    # /{locale}/tools
│   │   │       └── [slug]/     # /{locale}/tools/{slug}
│   │   │           └── page.tsx
│   │   └── api/                # API Routes
│   │       └── health/
│   │           └── route.ts
│   ├── components/             # React components
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilities
│   ├── locales/                # Translation files
│   └── i18n/                   # Internationalization config
├── middleware.ts               # 🔥 Request middleware
├── next.config.js              # Next.js configuration
└── package.json
```

### Các file đặc biệt trong `app/`:
| File | Chức năng |
|------|-----------|
| `page.tsx` | UI cho route (tương tự màn hình) |
| `layout.tsx` | Wrapper chung cho các page con |
| `loading.tsx` | Loading UI (Suspense fallback) |
| `error.tsx` | Error boundary |
| `not-found.tsx` | 404 page |
| `route.ts` | API endpoint (không có UI) |

---

## 3. App Router - Hệ Thống Routing

### 3.1 File-Based Routing

Trong dự án của bạn:

```
src/app/[locale]/page.tsx        → URL: /vi, /en, /es...
src/app/[locale]/tools/page.tsx  → URL: /vi/tools, /en/tools...
src/app/[locale]/tools/[slug]/page.tsx → URL: /vi/tools/password-generator...
```

**So sánh với React Native Expo:**
```
app/(tabs)/index.tsx  ← Expo
src/app/page.tsx      ← Next.js
```

### 3.2 Cách tạo route mới

**Ví dụ:** Tạo trang About `/vi/about`

```tsx
// src/app/[locale]/about/page.tsx
export default function AboutPage() {
  return <h1>About Us</h1>;
}
```

Chỉ cần tạo file → route tự động được tạo! 🎉

---

## 4. Server Components vs Client Components

### 🔥 Đây là điểm KHÁC BIỆT LỚN NHẤT với React!

### 4.1 Server Components (Mặc định)

```tsx
// src/app/[locale]/page.tsx - SERVER COMPONENT
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');  // ✅ Chạy trên server
  
  return <h1>{t('hero_title')}</h1>;
}
```

**Đặc điểm:**
- Chạy trên server, không gửi JS xuống client
- Có thể truy cập database, file system trực tiếp
- Không thể dùng `useState`, `useEffect`, event handlers
- Nhẹ hơn, SEO tốt hơn

### 4.2 Client Components

```tsx
// src/components/ui/ToolCard.tsx - CLIENT COMPONENT
'use client';  // 🔥 Directive bắt buộc!

import { useState } from 'react';
import { useLocale } from 'next-intl';

export function ToolCard({ tool }) {
  const locale = useLocale();  // ✅ Client hook
  const [isHovered, setIsHovered] = useState(false);  // ✅ useState

  return (
    <div onMouseEnter={() => setIsHovered(true)}>  {/* ✅ Event handler */}
      {tool.name[locale]}
    </div>
  );
}
```

**Khi nào dùng `'use client'`:**
- Dùng hooks: `useState`, `useEffect`, `useContext`
- Dùng event handlers: `onClick`, `onChange`
- Dùng browser APIs: `window`, `localStorage`
- Dùng third-party libs chỉ chạy trên browser

### 4.3 Bảng so sánh

| Feature | Server Component | Client Component |
|---------|------------------|------------------|
| Render | Server | Browser |
| `useState` | ❌ | ✅ |
| `useEffect` | ❌ | ✅ |
| Event handlers | ❌ | ✅ |
| Truy cập DB | ✅ | ❌ |
| Bundle size | Nhỏ | Lớn hơn |
| SEO | Tốt | Cần hydration |

### 4.4 Pattern: Kết hợp cả hai

```tsx
// src/app/[locale]/page.tsx (Server Component)
import { Header } from '@/components/layout';  // Client
import { getPopularTools } from '@/config/tools.config';  // Server logic

export default function HomePage() {
  const tools = getPopularTools();  // ✅ Server-side data
  
  return (
    <>
      <Header />  {/* Client component tự động hoạt động */}
      {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
    </>
  );
}
```

---

## 5. Layout và Page

### 5.1 Root Layout (Bắt buộc)

```tsx
// src/app/layout.tsx
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        {children}  {/* 👈 Nơi render page/layout con */}
      </body>
    </html>
  );
}
```

### 5.2 Nested Layout

```tsx
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
```

### 5.3 Cách Layout hoạt động

```
URL: /vi/tools/password-generator

Render order:
1. RootLayout (src/app/layout.tsx)
   └── 2. LocaleLayout (src/app/[locale]/layout.tsx)
       └── 3. ToolsLayout? (nếu có src/app/[locale]/tools/layout.tsx)
           └── 4. ToolPage (src/app/[locale]/tools/[slug]/page.tsx)
```

**💡 Layout được cache và không re-render khi navigate giữa các trang con!**

---

## 6. Dynamic Routes

### 6.1 Single Parameter: `[slug]`

```tsx
// src/app/[locale]/tools/[slug]/page.tsx
interface ToolPageProps {
  params: {
    locale: string;  // từ [locale]
    slug: string;    // từ [slug]
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);
  // URL /vi/tools/password-generator
  // → params = { locale: 'vi', slug: 'password-generator' }
  
  return <div>{tool.name}</div>;
}
```

### 6.2 Static Params Generation

```tsx
// Tạo static pages tại build time
export function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}
// → Build ra: /vi/tools/password-generator, /vi/tools/qr-code-generator...
```

### 6.3 Các loại Dynamic Routes

| Pattern | Ví dụ | Matches |
|---------|-------|---------|
| `[slug]` | `/tools/[slug]` | `/tools/abc` → `{ slug: 'abc' }` |
| `[...slug]` | `/docs/[...slug]` | `/docs/a/b/c` → `{ slug: ['a','b','c'] }` |
| `[[...slug]]` | `/shop/[[...slug]]` | `/shop` hoặc `/shop/a/b` |

---

## 7. API Routes

### 7.1 Tạo API Endpoint

```ts
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}

// Truy cập: GET /api/health
```

### 7.2 Các HTTP Methods

```ts
// src/app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Xử lý GET request
  return NextResponse.json({ feedbacks: [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Xử lý POST request
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) { /* ... */ }
export async function DELETE(request: NextRequest) { /* ... */ }
```

### 7.3 Dynamic API Routes

```ts
// src/app/api/tools/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tool = getToolById(params.id);
  return NextResponse.json(tool);
}
// GET /api/tools/password-generator → params.id = 'password-generator'
```

---

## 8. Middleware

### 8.1 Middleware là gì?

Middleware chạy **trước** mỗi request, dùng để:
- Redirect/Rewrite URLs
- Authentication
- i18n locale detection
- A/B testing

### 8.2 Middleware trong dự án của bạn

```ts
// middleware.ts (ở root)
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Chỉ apply middleware cho các paths này
  matcher: [
    '/', 
    '/(vi|en|es|zh|ja)/:path*', 
    '/((?!api|_next|_vercel|.*\\..*).*)' // Loại trừ api, static files
  ]
};
```

**Khi user truy cập `/tools`:**
1. Middleware detect locale (từ cookie/header)
2. Redirect tới `/vi/tools` (nếu locale = 'vi')

---

## 9. Data Fetching

### 9.1 Server Components - Fetch trực tiếp

```tsx
// src/app/[locale]/tools/page.tsx
async function getTools() {
  const res = await fetch('https://api.example.com/tools', {
    next: { revalidate: 3600 } // Cache 1 giờ
  });
  return res.json();
}

export default async function ToolsPage() {
  const tools = await getTools();  // ✅ Async trực tiếp!
  return <div>{tools.map(t => <ToolCard key={t.id} tool={t} />)}</div>;
}
```

### 9.2 Client Components - Hook pattern

```tsx
'use client';
import { useState, useEffect } from 'react';

export function ToolsList() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => {
        setTools(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{tools.map(t => <div key={t.id}>{t.name}</div>)}</div>;
}
```

### 9.3 Caching Strategies

```tsx
// Không cache (mỗi request fetch mới)
fetch(url, { cache: 'no-store' });

// Cache mãi mãi (default)
fetch(url, { cache: 'force-cache' });

// Revalidate sau N giây
fetch(url, { next: { revalidate: 60 } });

// Revalidate theo tag
fetch(url, { next: { tags: ['tools'] } });
// Sau đó: revalidateTag('tools') để clear cache
```

---

## 10. Metadata và SEO

### 10.1 Static Metadata

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | ToolHub',  // %s sẽ được thay bởi page title
    default: 'ToolHub - Công Cụ Online Miễn Phí',
  },
  description: 'Công cụ online miễn phí...',
  keywords: ['công cụ online', 'free tools'],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'ToolHub',
  },
};
```

### 10.2 Dynamic Metadata

```tsx
// src/app/[locale]/page.tsx
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}
```

### 10.3 Các file SEO đặc biệt

```tsx
// src/app/robots.ts - Robot.txt
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://toolhub.com/sitemap.xml',
  };
}

// src/app/sitemap.ts - Sitemap.xml
export default function sitemap() {
  return [
    { url: 'https://toolhub.com', lastModified: new Date() },
    { url: 'https://toolhub.com/tools', lastModified: new Date() },
  ];
}

// src/app/manifest.ts - PWA Manifest
export default function manifest() {
  return {
    name: 'ToolHub',
    short_name: 'ToolHub',
    // ...
  };
}
```

---

## 11. Internationalization (i18n)

### 11.1 Cấu hình routing

```ts
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en', 'es', 'zh', 'ja'],
  defaultLocale: 'vi',
  localePrefix: 'always'  // URL luôn có locale: /vi/tools
});
```

### 11.2 Translation files

```json
// src/locales/en.json
{
  "common": {
    "site_name": "ToolHub",
    "home": "Home"
  },
  "home": {
    "hero_title": "Powerful Tools, Zero Friction"
  }
}
```

### 11.3 Sử dụng translations

**Server Component:**
```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  return <h1>{t('hero_title')}</h1>;
}
```

**Client Component:**
```tsx
'use client';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('common');
  return <span>{t('site_name')}</span>;
}
```

### 11.4 Locale-aware Navigation

```tsx
// src/i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, useRouter, usePathname, redirect } = createNavigation(routing);
```

```tsx
'use client';
import { Link } from '@/i18n/navigation';

// Thay vì:
<Link href={`/${locale}/tools`}>Tools</Link>

// Dùng:
<Link href="/tools">Tools</Link>  // Tự động thêm locale!
```

---

## 12. Static Generation (SSG) vs Server-Side Rendering (SSR)

### 12.1 Static Generation (SSG) - Build time

```tsx
// Mặc định, Next.js sẽ static generate nếu có thể

// Buộc static với dynamic routes:
export function generateStaticParams() {
  return [
    { slug: 'password-generator' },
    { slug: 'qr-code-generator' },
  ];
}
```

### 12.2 Server-Side Rendering (SSR) - Request time

```tsx
// Buộc SSR:
export const dynamic = 'force-dynamic';

// Hoặc dùng cookies/headers:
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies();  // → Tự động SSR
  // ...
}
```

### 12.3 Incremental Static Regeneration (ISR)

```tsx
// Revalidate sau 60 giây
export const revalidate = 60;

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

---

## 13. Loading, Error, Not Found States

### 13.1 Loading State

```tsx
// src/app/[locale]/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
```

**Cách hoạt động:** Next.js tự động wrap page trong `<Suspense fallback={<Loading />}>`

### 13.2 Error Handling

```tsx
// src/app/[locale]/error.tsx
'use client';  // Error components phải là client component!

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### 13.3 Not Found

```tsx
// src/app/[locale]/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Page not found</p>
      <Link href="/">Go Home</Link>
    </div>
  );
}
```

**Trigger manually:**
```tsx
import { notFound } from 'next/navigation';

export default function Page({ params }) {
  const data = getData(params.id);
  if (!data) notFound();  // → Render not-found.tsx
  return <div>{data}</div>;
}
```

---

## 14. Các Lệnh CLI Quan Trọng

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint check
npm run lint

# Type check
npm run type-check
```

### Build Output

```bash
npm run build

Route (app)                    Size     First Load JS
┌ ○ /                          142 B    85.2 kB
├ ○ /[locale]                  5.2 kB   90.4 kB
├ ○ /[locale]/tools            1.8 kB   87.0 kB
└ ● /[locale]/tools/[slug]     3.1 kB   88.3 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
λ  (Server)   server-rendered on demand
```

---

## 15. Best Practices

### 15.1 Khi nào dùng `'use client'`

✅ **Dùng khi:**
- Cần interactivity (onClick, onChange...)
- Cần hooks (useState, useEffect...)
- Dùng browser APIs (localStorage, window...)

❌ **Không dùng khi:**
- Chỉ render static content
- Fetch data từ server
- Không cần interactivity

### 15.2 Tổ chức Components

```
components/
├── ui/           # Client components (buttons, inputs...)
├── layout/       # Mixed (có thể cả Server và Client)
└── features/     # Feature-specific (thường là Client)
```

### 15.3 Import Paths

```tsx
// Dùng path aliases thay vì relative imports
import { Header } from '@/components/layout';  // ✅
import { Header } from '../../../components/layout';  // ❌
```

### 15.4 Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com  # Accessible on client
DATABASE_URL=postgresql://...                  # Server only
```

```tsx
// Client
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server only (API routes, Server Components)
const dbUrl = process.env.DATABASE_URL;
```

---

## Quick Reference Card

| React/Expo | Next.js |
|------------|---------|
| `react-router` | File-based routing |
| Components | Server + Client Components |
| `useEffect` fetch | `async` Server Component |
| Express API | `route.ts` API Routes |
| `react-helmet` | `metadata` export |
| Manual SSR | Built-in SSG/SSR/ISR |

---

## Tài Liệu Tham Khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Vercel Deployment](https://vercel.com/docs)

---

**📝 Note:** Tài liệu này được tạo dựa trên dự án multi-purpose-tool của bạn. Khi có thắc mắc về phần nào, hãy hỏi và tôi sẽ giải thích chi tiết hơn với ví dụ từ code thực tế của bạn!
