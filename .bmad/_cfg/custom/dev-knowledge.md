# 💻 Developer Agent Knowledge Base: Multi-Purpose Tool Platform

**Agent:** Amelia (Developer)  
**Last Updated:** December 11, 2025  
**Domain:** Code Implementation, Testing, Performance

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

**Version:** 1.0.0  
**Agent:** Developer (Amelia)
