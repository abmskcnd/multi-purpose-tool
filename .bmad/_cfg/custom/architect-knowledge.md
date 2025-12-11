# 🏗️ Architect Agent Knowledge Base: Multi-Purpose Tool Platform

**Agent:** Winston (Architect)  
**Last Updated:** December 11, 2025  
**Domain:** System Architecture, Technical Design, Scalability

---

## 🎯 Project Quick Context

**Multi-Purpose Tool Platform** = Free online toolbox với 100% client-side processing.

### Architecture Pillars
- ✅ **Client-Side First:** WASM processing, no server uploads
- ✅ **Server Components Default:** Use `'use client'` only when needed
- ✅ **Lazy Loading:** Heavy libraries load on demand
- ✅ **Mobile-First:** Design for mobile, enhance for desktop
- ✅ **i18n-Native:** Built-in internationalization

---

## 🛠️ Technology Stack

### Core Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Framework** | Next.js 14+ App Router | SSR + SSG for SEO |
| **Language** | TypeScript (strict) | No `any` allowed |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first |
| **Database** | Supabase PostgreSQL | Analytics + feedback |
| **Processing** | WASM | ffmpeg, pdf-lib |
| **Analytics** | GA4 + Supabase | Dual tracking |
| **Hosting** | Vercel | Edge network |

### Processing Libraries

| Tool Type | Library | Bundle Size | Strategy |
|-----------|---------|-------------|----------|
| Image | @ffmpeg/ffmpeg | ~31MB | Lazy load |
| Image | browser-image-compression | ~50KB | Pre-load |
| PDF | pdf-lib | ~400KB | Lazy load |
| QR Code | qrcode.react | ~20KB | Pre-load |
| Text | Native JS | 0KB | Always |

---

## 📁 Project Structure

```
multi-purpose-tool/
├── app/
│   ├── [locale]/                   # i18n routing
│   │   ├── tools/[slug]/          # Tool pages
│   │   ├── convert/[source]-to-[target]/ # SEO pages
│   │   └── blog/[slug]/           # Content
│   ├── api/                        # API routes
│   └── sitemap.ts                  # Dynamic sitemap
├── components/
│   ├── tools/                      # Tool-specific
│   ├── shared/                     # Reusable
│   └── ui/                         # shadcn/ui
├── lib/
│   ├── processors/                 # WASM processing
│   ├── analytics/                  # Tracking
│   ├── seo/                        # Metadata
│   └── security/                   # Validation
├── messages/                       # i18n translations
│   ├── en.json
│   └── vi.json
└── config/
    └── tools.config.ts             # Tool registry
```

---

## 🔧 Architecture Patterns

### 1. Server + Client Component Split

```typescript
// app/[locale]/tools/[slug]/page.tsx (Server)
export default async function ToolPage({ params }) {
  const { tool } = await getToolConfig(params.slug);
  return (
    <>
      <ToolHeader tool={tool} />       {/* Server */}
      <ToolInterface toolId={tool.id} /> {/* Client */}
      <ToolDescription tool={tool} />  {/* Server */}
    </>
  );
}
```

### 2. Lazy Loading Pattern

```typescript
export async function loadFFmpeg() {
  if (typeof window === 'undefined') return null;
  
  const { FFmpeg } = await import('@ffmpeg/ffmpeg');
  const ffmpeg = new FFmpeg();
  await ffmpeg.load({ /* config */ });
  return ffmpeg;
}
```

### 3. Processing Flow

```
User File → Local Validation → WASM Engine → Result Blob → Download
              ↓                                    ↓
         Magic Byte Check                    Track Event
```

### 4. ToolConfig Schema

```typescript
interface ToolConfig {
  id: string;
  category: 'image' | 'pdf' | 'text' | 'video' | 'dev';
  slug: Record<Locale, string>;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  seo: {
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    keywords: Record<Locale, string[]>;
  };
  processor: ProcessorConfig;
  maxFileSize: number;
  allowedTypes: string[];
}
```

---

## 🌐 URL & SEO Strategy

### URL Structure

```
/{locale}/                              # Homepage
/{locale}/tools/{slug}                  # Tool page
/{locale}/convert/{source}-to-{target} # Programmatic SEO
/{locale}/blog/{slug}                   # Content
```

### Programmatic SEO

- **500+ pages** generated from format matrix
- **Formula:** Data + Logic + Templates = Pages at scale
- **Example:** 25 formats × 20 targets = 500 conversion pages

### Hreflang Implementation

```typescript
alternates: {
  canonical: `/${locale}/tools/${toolId}`,
  languages: {
    'en': '/en/tools/password-generator',
    'vi': '/vi/tools/tao-mat-khau',
    'es': '/es/tools/generador-contrasenas'
  }
}
```

---

## 🔒 Security Architecture

### File Validation

```typescript
// Validate magic bytes, not just extension
const arrayBuffer = await file.slice(0, 12).arrayBuffer();
const bytes = new Uint8Array(arrayBuffer);
const actualType = detectFileType(bytes);
```

### Security Checklist

- ✅ Magic byte validation
- ✅ File size limits (browser memory)
- ✅ No server uploads (privacy)
- ✅ CSP headers configured
- ✅ Rate limiting on API routes
- ✅ Input sanitization

---

## ⚡ Performance Architecture

### Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| LCP | <2.5s |
| FID | <100ms |
| CLS | <0.1 |

### Performance Strategies

1. **Route Prefetching** - Next.js Link prefetch
2. **Image Optimization** - next/image, WebP/AVIF
3. **Bundle Splitting** - Dynamic imports
4. **Edge Caching** - Vercel Edge Network
5. **WASM Streaming** - Load while parsing

### Bundle Size Budgets

| Chunk | Budget |
|-------|--------|
| Initial JS | <100KB |
| Tool-specific | <50KB |
| WASM (lazy) | <35MB |

---

## 📊 Analytics Architecture

### Event Taxonomy

```typescript
type EventCategory = 
  | 'tool_usage'      // Tool interactions
  | 'conversion'      // File processed
  | 'engagement'      // Time, scroll
  | 'error'           // Client errors
  | 'monetization';   // Ad interactions
```

### Tracking Flow

```
Client Event → GA4 (immediate)
            → Supabase API (batch)
```

---

## 🎛️ Architect Workflow Commands

```
*create-architecture     → Create Architecture Document
*implementation-readiness → Validate PRD/UX/Arch alignment
*create-excalidraw-diagram → System diagram
*create-excalidraw-dataflow → Data flow diagram
*party-mode              → Discuss with other agents
```

---

## 📋 Technical Decision Log

### Decision 1: Client-Side Processing
- **Why:** Privacy-first, no server costs for processing
- **Trade-off:** Limited to browser memory (~2GB files)
- **Mitigation:** Clear file size limits in UI

### Decision 2: Next.js App Router
- **Why:** Best SEO, Server Components, streaming
- **Trade-off:** Newer, less ecosystem maturity
- **Mitigation:** Fallback patterns documented

### Decision 3: Supabase over Custom Backend
- **Why:** Rapid development, free tier, real-time
- **Trade-off:** Vendor lock-in
- **Mitigation:** Abstract database layer

### Decision 4: WASM for Processing
- **Why:** Near-native performance, privacy
- **Trade-off:** Large initial download
- **Mitigation:** Lazy loading, progress UI

---

## 📚 Reference Documents

- [System Architecture](./architecture/01-system-architecture.md)
- [Project Structure](./architecture/02-project-structure.md)
- [Routing & SEO](./architecture/03-routing-seo.md)
- [Executive Summary](./architecture/00-executive-summary.md)
- [Implementation Guide](./architecture/IMPLEMENTATION_GUIDE.md)

---

**Version:** 1.0.0  
**Agent:** Architect (Winston)
