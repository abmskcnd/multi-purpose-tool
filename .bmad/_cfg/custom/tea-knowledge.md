# 🧪 Test Architect Agent Knowledge Base: Multi-Purpose Tool Platform

**Agent:** Murat (Test Architect)  
**Last Updated:** December 11, 2025  
**Domain:** Test Strategy, Quality Gates, Automation

---

## 🎯 Project Quick Context

**Multi-Purpose Tool Platform** = Free online toolbox with client-side processing.

### Quality Priorities
- ✅ Client-side processing works correctly
- ✅ Mobile experience flawless
- ✅ Core Web Vitals all green
- ✅ No data leaks (privacy)
- ✅ Cross-browser compatibility

---

## 🧪 Test Strategy Overview

### Testing Pyramid

```
         /\
        /  \  E2E Tests (10%)
       /    \  - Critical user journeys
      /──────\  
     /        \  Integration (20%)
    /          \  - API, component interactions
   /────────────\
  /              \  Unit Tests (70%)
 /                \  - Processors, utilities, logic
/──────────────────\
```

### Test Types Distribution

| Type | Coverage | Focus |
|------|----------|-------|
| Unit | 70% | Processors, validators, utilities |
| Integration | 20% | API routes, component interactions |
| E2E | 10% | Critical user journeys |
| Performance | Continuous | Core Web Vitals, bundle size |
| Accessibility | Continuous | WCAG 2.1 AA |

---

## 🔧 Test Framework Stack

| Tool | Purpose |
|------|---------|
| Jest | Unit testing |
| React Testing Library | Component testing |
| Playwright | E2E testing |
| Lighthouse CI | Performance testing |
| axe-core | Accessibility testing |
| Bundle Analyzer | Size monitoring |

---

## 📋 Unit Test Patterns

### Processor Testing

```typescript
// __tests__/unit/processors/password-generator.test.ts
import { generatePassword } from '@/lib/processors/password-generator';

describe('Password Generator', () => {
  describe('length', () => {
    it('generates correct length', () => {
      const result = generatePassword({ length: 16 });
      expect(result).toHaveLength(16);
    });

    it('handles edge case: minimum length', () => {
      const result = generatePassword({ length: 4 });
      expect(result).toHaveLength(4);
    });

    it('handles edge case: maximum length', () => {
      const result = generatePassword({ length: 128 });
      expect(result).toHaveLength(128);
    });
  });

  describe('character sets', () => {
    it('includes lowercase by default', () => {
      const result = generatePassword({ length: 100 });
      expect(result).toMatch(/[a-z]/);
    });

    it('includes numbers when enabled', () => {
      const result = generatePassword({ 
        length: 100, 
        includeNumbers: true 
      });
      expect(result).toMatch(/[0-9]/);
    });

    it('includes special chars when enabled', () => {
      const result = generatePassword({ 
        length: 100, 
        includeSpecial: true 
      });
      expect(result).toMatch(/[!@#$%^&*]/);
    });
  });
});
```

### File Validator Testing

```typescript
// __tests__/unit/security/file-validator.test.ts
import { validateFile } from '@/lib/security/file-validator';

describe('File Validator', () => {
  describe('file size', () => {
    it('rejects files over limit', async () => {
      const file = new File(['x'.repeat(11 * 1024 * 1024)], 'test.jpg');
      await expect(validateFile(file, { maxSize: 10 * 1024 * 1024 }))
        .rejects.toThrow('File too large');
    });
  });

  describe('magic bytes', () => {
    it('detects JPEG correctly', async () => {
      // JPEG magic bytes: FF D8 FF
      const bytes = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0]);
      const file = new File([bytes], 'test.jpg');
      const result = await validateFile(file, { allowedTypes: ['image/jpeg'] });
      expect(result.type).toBe('image/jpeg');
    });

    it('rejects mismatched extension and type', async () => {
      // PNG bytes but .jpg extension
      const bytes = new Uint8Array([0x89, 0x50, 0x4E, 0x47]);
      const file = new File([bytes], 'fake.jpg');
      await expect(validateFile(file, { allowedTypes: ['image/jpeg'] }))
        .rejects.toThrow('Invalid file type');
    });
  });
});
```

---

## 🔗 Integration Test Patterns

### API Route Testing

```typescript
// __tests__/integration/api/track.test.ts
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';

describe('Track API', () => {
  it('records valid event', async () => {
    const request = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({
        event: 'tool_usage',
        properties: { tool: 'password-generator' }
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });

  it('rejects invalid event', async () => {
    const request = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ event: '' })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

### Component Integration Testing

```typescript
// __tests__/integration/tools/password-generator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordGenerator } from '@/components/tools/PasswordGenerator';

describe('Password Generator Integration', () => {
  it('generates and displays password', async () => {
    render(<PasswordGenerator />);
    
    fireEvent.click(screen.getByTestId('generate-btn'));
    
    const output = await screen.findByTestId('password-output');
    expect(output).toHaveValue(expect.any(String));
  });

  it('copies to clipboard', async () => {
    const mockClipboard = { writeText: jest.fn() };
    Object.assign(navigator, { clipboard: mockClipboard });
    
    render(<PasswordGenerator />);
    fireEvent.click(screen.getByTestId('generate-btn'));
    fireEvent.click(screen.getByTestId('copy-btn'));
    
    expect(mockClipboard.writeText).toHaveBeenCalled();
  });
});
```

---

## 🎭 E2E Test Patterns

### User Journey Test

```typescript
// __tests__/e2e/user-journeys/convert-image.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Image Conversion Journey', () => {
  test('converts JPG to PNG successfully', async ({ page }) => {
    // Navigate
    await page.goto('/en/tools/jpg-to-png');
    
    // Upload file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('./fixtures/sample.jpg');
    
    // Wait for processing
    await expect(page.getByTestId('processing')).toBeVisible();
    await expect(page.getByTestId('complete')).toBeVisible({ timeout: 30000 });
    
    // Download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('[data-testid="download-btn"]')
    ]);
    
    expect(download.suggestedFilename()).toMatch(/\.png$/);
  });

  test('shows error for invalid file', async ({ page }) => {
    await page.goto('/en/tools/jpg-to-png');
    
    // Try to upload non-image
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('./fixtures/sample.pdf');
    
    // Should show error
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('Invalid file type');
  });
});
```

### Mobile E2E Test

```typescript
// __tests__/e2e/mobile/tools.spec.ts
import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 12'] });

test.describe('Mobile Tool Usage', () => {
  test('password generator works on mobile', async ({ page }) => {
    await page.goto('/en/tools/password-generator');
    
    // Check touch target sizes
    const button = page.getByTestId('generate-btn');
    const box = await button.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(48);
    expect(box.width).toBeGreaterThanOrEqual(48);
    
    // Generate password
    await button.tap();
    const output = await page.getByTestId('password-output').inputValue();
    expect(output.length).toBeGreaterThan(0);
  });
});
```

---

## ⚡ Performance Test Patterns

### Lighthouse CI Config

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/tools/password-generator',
        'http://localhost:3000/en/tools/jpg-to-png'
      ],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }]
      }
    }
  }
};
```

### Bundle Size Test

```typescript
// __tests__/performance/bundle-size.test.ts
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Bundle Size', () => {
  it('initial JS under 100KB', () => {
    const buildManifest = JSON.parse(
      readFileSync(join(__dirname, '../../.next/build-manifest.json'), 'utf-8')
    );
    
    const initialChunks = buildManifest.pages['/_app'];
    const totalSize = initialChunks.reduce((sum, chunk) => {
      const stats = statSync(join(__dirname, '../../.next', chunk));
      return sum + stats.size;
    }, 0);
    
    expect(totalSize).toBeLessThan(100 * 1024); // 100KB
  });
});
```

---

## ♿ Accessibility Test Patterns

```typescript
// __tests__/a11y/tools.test.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('password generator has no violations', async ({ page }) => {
    await page.goto('/en/tools/password-generator');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(results.violations).toEqual([]);
  });
});
```

---

## 🎯 Quality Gates

### Pre-Merge Gates

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Coverage > 80%
- [ ] No linting errors
- [ ] TypeScript strict passes

### Pre-Deploy Gates

- [ ] E2E tests pass
- [ ] Lighthouse scores > 90
- [ ] Accessibility audit clean
- [ ] Bundle size within budget
- [ ] No security vulnerabilities

---

## 📊 Test Coverage Requirements

| Area | Minimum Coverage |
|------|------------------|
| Processors | 90% |
| Validators | 90% |
| API Routes | 80% |
| Components | 70% |
| Utilities | 80% |
| **Overall** | **80%** |

---

## 📚 Reference Documents

- [System Architecture](./architecture/01-system-architecture.md)
- [Project Structure](./architecture/02-project-structure.md)
- [Success Metrics](./pm/30-success-metrics.md)

---

**Version:** 1.0.0  
**Agent:** Test Architect (Murat)
