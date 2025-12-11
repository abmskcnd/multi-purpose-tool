# 🚀 Quick Flow Solo Dev Knowledge Base: Multi-Purpose Tool Platform

**Agent:** Barry (Quick Flow Solo Dev)  
**Last Updated:** December 11, 2025  
**Domain:** Full-Stack Development, Rapid Execution, MVP Delivery

---

## 🎯 Project Quick Context

**Multi-Purpose Tool Platform** = Ship 20 tools in 5 weeks with privacy-first architecture.

### Quick Flow Priorities
- ✅ Ship fast, iterate faster
- ✅ Specs and code together
- ✅ Documentation as you go
- ✅ No handoffs, no delays
- ✅ MVP scope discipline

---

## 🛠️ Tech Stack (Know It Cold)

| What | Tech | Notes |
|------|------|-------|
| Framework | Next.js 14 App Router | SSR + SSG |
| Lang | TypeScript strict | No `any` |
| Style | Tailwind + shadcn/ui | Utility-first |
| DB | Supabase | Analytics only |
| Processing | WASM | Client-side |
| Host | Vercel | Edge deploy |

---

## 📁 Quick Reference Paths

```
app/[locale]/tools/[slug]/page.tsx    → Tool page
components/tools/{ToolName}.tsx        → Tool component
lib/processors/{processor}.ts          → Processing logic
config/tools.config.ts                 → Tool registry
messages/en.json                       → Translations
```

---

## ⚡ MVP Tool List (20 Tools)

### Week 1 (5 tools)
1. ✅ Password Generator (RICE: 500)
2. ✅ Word to PDF (RICE: 250)
3. ✅ Base64 Encode (RICE: 240)
4. ✅ Image Rotate (RICE: 210)
5. ✅ Word Counter (RICE: 210)

### Week 2 (5 tools)
6. ⬜ JPG to PNG (RICE: 180)
7. ⬜ PNG to JPG (RICE: 180)
8. ⬜ QR Code Generator (RICE: 180)
9. ⬜ URL Encode (RICE: 180)
10. ⬜ JSON Formatter (RICE: 175)

### Week 3 (4 tools)
11. ⬜ PDF to Word (RICE: 167)
12. ⬜ Image Resize (RICE: 167)
13. ⬜ Image Compress (RICE: 167)
14. ⬜ Image Crop (RICE: 160)

### Week 4 (4 tools)
15. ⬜ UUID Generator (RICE: 150)
16. ⬜ PDF Merge (RICE: 107)
17. ⬜ PDF Split (RICE: 93)
18. ⬜ Image to PDF (RICE: 90)

### Week 5 (2 tools + polish)
19. ⬜ PDF Compress (RICE: 90)
20. ⬜ Hash Generator (RICE: 90)

---

## 🔧 Tool Implementation Checklist

### Per Tool Checklist
```
□ 1. Add to tools.config.ts
□ 2. Create component in components/tools/
□ 3. Add page in app/[locale]/tools/[slug]/
□ 4. Add i18n strings (en.json, vi.json)
□ 5. Write processing logic in lib/processors/
□ 6. Add file validation
□ 7. Wire up analytics events
□ 8. Test on mobile
□ 9. Quick unit test
□ 10. Deploy to preview
```

---

## 📝 Quick Tool Template

### Tool Config
```typescript
// config/tools.config.ts
export const passwordGenerator: ToolConfig = {
  id: 'password-generator',
  category: 'text',
  slug: { en: 'password-generator', vi: 'tao-mat-khau' },
  name: { en: 'Password Generator', vi: 'Tạo Mật Khẩu' },
  description: { 
    en: 'Create strong, secure passwords instantly',
    vi: 'Tạo mật khẩu mạnh và bảo mật ngay lập tức'
  },
  maxFileSize: 0, // No file
  allowedTypes: []
};
```

### Tool Component
```typescript
// components/tools/PasswordGenerator.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const { trackEvent } = useAnalytics();

  const generate = () => {
    const newPassword = generateSecurePassword();
    setPassword(newPassword);
    trackEvent('tool_used', { tool: 'password-generator' });
  };

  return (
    <div className="space-y-4">
      <input
        data-testid="password-output"
        value={password}
        readOnly
        className="w-full p-4 text-lg font-mono border rounded"
      />
      <Button 
        data-testid="generate-btn"
        onClick={generate}
        className="w-full"
      >
        Generate Password
      </Button>
    </div>
  );
}
```

### Tool Page
```typescript
// app/[locale]/tools/password-generator/page.tsx
import { PasswordGenerator } from '@/components/tools/PasswordGenerator';
import { getToolMetadata } from '@/lib/seo/metadata';

export const generateMetadata = ({ params }) => getToolMetadata('password-generator', params.locale);

export default function PasswordGeneratorPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
      <PasswordGenerator />
    </main>
  );
}
```

---

## 🚀 Speed Patterns

### Lazy Load Heavy Libs
```typescript
const ffmpeg = await import('@ffmpeg/ffmpeg').then(m => m.FFmpeg);
```

### File Validation (Quick)
```typescript
const isValid = file.size < MAX_SIZE && ALLOWED_TYPES.includes(file.type);
```

### Analytics (One-liner)
```typescript
trackEvent('conversion_complete', { tool, inputType, outputType });
```

---

## 🎯 Definition of Done (Quick)

- [ ] Tool works on desktop
- [ ] Tool works on mobile (tested)
- [ ] Analytics events fire
- [ ] No console errors
- [ ] Deployed to preview

---

## ⚡ Commands I Use

```bash
# Dev
npm run dev

# Build + Deploy
npm run build && vercel

# Quick test
npm run test -- --watch

# Type check
npm run typecheck
```

---

## 🚨 Don't Forget

1. **Mobile first** - 60%+ traffic is mobile
2. **Analytics** - Track everything
3. **Error handling** - Catch and log
4. **File limits** - Browser memory constraints
5. **i18n** - All strings translatable

---

## 📊 Quick Metrics Check

| Metric | Target |
|--------|--------|
| Page Load | <3s |
| Tool Response | <1s |
| Mobile Score | 90+ |
| Bundle Size | <100KB initial |

---

## 📚 Reference When Stuck

- [System Architecture](./architecture/01-system-architecture.md)
- [Project Structure](./architecture/02-project-structure.md)
- [Feature Prioritization](./pm/21-feature-prioritization.md)

---

**Ship it. 🚀**

**Version:** 1.0.0  
**Agent:** Quick Flow Solo Dev (Barry)
