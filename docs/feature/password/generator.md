# 🔑 Password Generator

> **Tool ID:** `password/generator`  
> **Group:** Password & Security Tools  
> **Status:** `active`  
> **Implementation:** Client-side only  
> **Last Updated:** December 13, 2025

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technical Specifications](#technical-specifications)
4. [File Structure](#file-structure)
5. [Dependencies](#dependencies)
6. [Component API](#component-api)
7. [Core Logic](#core-logic)
8. [UI/UX Specifications](#uiux-specifications)
9. [Accessibility](#accessibility)
10. [i18n Keys](#i18n-keys)
11. [Testing Checklist](#testing-checklist)
12. [Future Enhancements](#future-enhancements)
13. [Changelog](#changelog)

---

## Overview

### Description
Password Generator là công cụ tạo mật khẩu ngẫu nhiên, an toàn với các tùy chọn tùy chỉnh. Tất cả quá trình xử lý diễn ra **hoàn toàn trên client** sử dụng Web Crypto API, không gửi bất kỳ dữ liệu nào lên server.

### User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| User | Generate a random password | I can create secure accounts |
| User | Customize password length | I can meet different site requirements |
| User | Choose character types | I can comply with password policies |
| User | See password strength | I know if my password is secure enough |
| User | Copy password easily | I can paste it into registration forms |
| User | Exclude ambiguous characters | I can read/type password easier when needed |

### Security Considerations

- ✅ Uses `crypto.getRandomValues()` for cryptographically secure randomness
- ✅ No server requests - 100% client-side processing
- ✅ No password storage or logging
- ✅ No analytics tracking of generated passwords
- ⚠️ Password displayed in plain text on screen (user responsibility)

---

## Features

### Core Features

| Feature | Status | Description |
|---------|--------|-------------|
| Password Generation | ✅ Done | Generate random passwords |
| Length Control | ✅ Done | Slider 4-128 characters |
| Character Types | ✅ Done | Uppercase, lowercase, numbers, symbols |
| Ambiguous Exclusion | ✅ Done | Exclude 0, O, l, 1, I |
| Strength Indicator | ✅ Done | Visual strength meter with score |
| Copy to Clipboard | ✅ Done | One-click copy with feedback |
| Entropy Display | ✅ Done | Show approximate entropy bits |

### Character Sets

```typescript
const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',           // 26 chars
  uppercaseUnambiguous: 'ABCDEFGHJKLMNPQRSTUVWXYZ', // 24 chars (no I, O)
  lowercase: 'abcdefghijklmnopqrstuvwxyz',           // 26 chars
  lowercaseUnambiguous: 'abcdefghjkmnpqrstuvwxyz',  // 24 chars (no i, l, o)
  numbers: '0123456789',                             // 10 chars
  numbersUnambiguous: '23456789',                    // 8 chars (no 0, 1)
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',            // 27 chars
};
```

### Strength Scoring Algorithm

| Criteria | Points |
|----------|--------|
| Length ≥ 8 | +1 |
| Length ≥ 12 | +1 |
| Length ≥ 16 | +1 |
| Contains lowercase | +1 |
| Contains uppercase | +1 |
| Contains numbers | +1 |
| Contains symbols | +1 |

| Score Range | Label | Color |
|-------------|-------|-------|
| 0-2 | Weak | Red (`bg-red-500`) |
| 3-4 | Fair | Yellow (`bg-yellow-500`) |
| 5-6 | Good | Blue (`bg-blue-500`) |
| 7 | Strong | Green (`bg-green-500`) |

---

## Technical Specifications

### Performance

| Metric | Target | Actual |
|--------|--------|--------|
| Initial Load | < 50ms | ~20ms |
| Generation Time | < 10ms | ~1ms |
| Bundle Size | < 5KB | ~3KB |

### Browser Support

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | 43+ | Full support |
| Firefox | 36+ | Full support |
| Safari | 10.1+ | Full support |
| Edge | 12+ | Full support |

### API Dependencies

| API | Usage | Fallback |
|-----|-------|----------|
| `crypto.getRandomValues()` | Secure random generation | None (required) |
| `navigator.clipboard.writeText()` | Copy to clipboard | Manual selection |

---

## File Structure

```
src/features/tools/password/generator/
├── index.ts                    # Re-export entry point
├── PasswordGenerator.tsx       # Main component (237 lines)
├── hooks/                      # (Future) Custom hooks
│   └── usePasswordGenerator.ts # (Future) Logic extraction
└── utils/                      # (Future) Utility functions
    ├── generatePassword.ts     # (Future) Password generation
    └── calculateStrength.ts    # (Future) Strength calculation
```

### Current Implementation

All logic is currently in `PasswordGenerator.tsx`. Consider extracting to separate files as complexity grows.

### Recommended Refactoring (Future)

```typescript
// hooks/usePasswordGenerator.ts
export function usePasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  // ... logic
  return { password, options, generate, updateOption };
}

// utils/generatePassword.ts
export function generatePassword(options: PasswordOptions): string { }

// utils/calculateStrength.ts
export function calculateStrength(password: string): StrengthResult { }
```

---

## Dependencies

### External Dependencies

| Package | Version | Purpose | Required |
|---------|---------|---------|----------|
| `react` | ^18.x | Component framework | ✅ Yes |
| `next` | ^14.x | Framework (for 'use client') | ✅ Yes |

### Internal Dependencies

| Module | Path | Purpose |
|--------|------|---------|
| `ToolCardContainer` | `@/features/tools/_shared/components` | Card wrapper |
| `ToolSection` | `@/features/tools/_shared/components` | Section component |
| `ToolButton` | `@/features/tools/_shared/components` | Action button |

### Web APIs

| API | Purpose | Documentation |
|-----|---------|---------------|
| `crypto.getRandomValues()` | Cryptographic randomness | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) |
| `navigator.clipboard` | Copy functionality | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) |

---

## Component API

### Props

```typescript
// Currently no props - self-contained component
interface PasswordGeneratorProps {
  // Future props:
  // initialLength?: number;
  // onGenerate?: (password: string) => void;
  // showStrength?: boolean;
}
```

### State

```typescript
interface PasswordOptions {
  length: number;           // 4-128, default: 16
  uppercase: boolean;       // default: true
  lowercase: boolean;       // default: true
  numbers: boolean;         // default: true
  symbols: boolean;         // default: true
  excludeAmbiguous: boolean; // default: false
}

// Component state
const [password, setPassword] = useState<string>('');
const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
const [copied, setCopied] = useState<boolean>(false);
```

### Callbacks

| Function | Purpose | Dependencies |
|----------|---------|--------------|
| `handleGenerate` | Generate new password | `[options]` |
| `handleCopy` | Copy to clipboard | `[password]` |
| `updateOption` | Update single option | `[]` (stable) |

### Computed Values

| Value | Computation | Dependencies |
|-------|-------------|--------------|
| `strength` | `calculateStrength(password)` | `[password]` |

---

## Core Logic

### Password Generation Algorithm

```typescript
function generatePassword(options: PasswordOptions): string {
  // 1. Build character pool based on options
  let chars = '';
  if (options.uppercase) chars += CHAR_SETS.uppercase;
  if (options.lowercase) chars += CHAR_SETS.lowercase;
  if (options.numbers) chars += CHAR_SETS.numbers;
  if (options.symbols) chars += CHAR_SETS.symbols;
  
  // 2. Handle empty pool
  if (chars.length === 0) return '';
  
  // 3. Generate cryptographically secure random indices
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);
  
  // 4. Map indices to characters
  return Array.from(array, (num) => chars[num % chars.length]).join('');
}
```

### Entropy Calculation

```
Entropy (bits) = length × log2(pool_size)
Simplified: ~length × 4 bits (assuming mixed character set)
```

---

## UI/UX Specifications

### Layout Structure

```
┌─────────────────────────────────────────┐
│  Password Options                       │
│  ─────────────────────────────────────  │
│  Length:                           16   │
│  [━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━]  │
│                                         │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │ ☑ Uppercase  │  │ ☑ Lowercase      │ │
│  └──────────────┘  └──────────────────┘ │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │ ☑ Numbers    │  │ ☑ Symbols        │ │
│  └──────────────┘  └──────────────────┘ │
│  ┌──────────────────────────────────┐   │
│  │ ☐ Exclude Ambiguous              │   │
│  └──────────────────────────────────┘   │
│                                         │
│  [ Generate Password ]                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Generated Password                     │
│  ─────────────────────────────────────  │
│  ┌────────────────────────────────[📋]┐ │
│  │ xK9#mP2$vL5@nR8!                   │ │
│  └────────────────────────────────────┘ │
│                                         │
│  Strength:                      Strong  │
│  [████████████████████████████████████] │
│                                         │
│  Length: 16 • Entropy: ~64 bits         │
└─────────────────────────────────────────┘
```

### Interactive States

| Element | Default | Hover | Active/Focus | Disabled |
|---------|---------|-------|--------------|----------|
| Checkbox | `border-zinc-200` | `bg-zinc-50` | `ring-blue-500` | `opacity-50` |
| Slider | `bg-zinc-200` | - | `accent-blue-600` | `opacity-50` |
| Generate Button | `bg-primary` | `opacity-90` | `scale-98` | `opacity-50` |
| Copy Button | `text-zinc-500` | `bg-zinc-200` | - | - |

### Copy Feedback

```
Before copy: 📋 (clipboard icon)
After copy:  ✓ (checkmark, green) → Reset after 2000ms
```

---

## Accessibility

### ARIA Labels

| Element | Attribute | Value |
|---------|-----------|-------|
| Length Slider | `aria-label` | "Password length" |
| Length Slider | `aria-valuemin` | "4" |
| Length Slider | `aria-valuemax` | "128" |
| Length Slider | `aria-valuenow` | `{options.length}` |
| Checkbox | `role` | "checkbox" |
| Copy Button | `title` | "Copy to clipboard" |
| Strength Bar | `role` | "progressbar" |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move between controls |
| `Space` | Toggle checkbox |
| `Enter` | Activate button |
| `Arrow Left/Right` | Adjust slider |

### Screen Reader Announcements

- Password generated: Announce new password
- Copy success: "Password copied to clipboard"
- Strength change: Announce new strength level

---

## i18n Keys

### Translation Namespace: `tools.password_generator`

```json
{
  "tools": {
    "password_generator": {
      "title": "Password Generator",
      "description": "Generate secure, random passwords",
      "options": {
        "title": "Password Options",
        "description": "Customize your password settings",
        "length": "Length",
        "uppercase": "Uppercase (A-Z)",
        "lowercase": "Lowercase (a-z)",
        "numbers": "Numbers (0-9)",
        "symbols": "Symbols (!@#$...)",
        "excludeAmbiguous": "Exclude Ambiguous (0, O, l, 1)"
      },
      "output": {
        "title": "Generated Password",
        "strength": "Strength",
        "entropy": "Entropy",
        "bits": "bits"
      },
      "actions": {
        "generate": "Generate Password",
        "copy": "Copy to clipboard",
        "copied": "Copied!"
      },
      "strength": {
        "weak": "Weak",
        "fair": "Fair",
        "good": "Good",
        "strong": "Strong"
      }
    }
  }
}
```

---

## Testing Checklist

### Unit Tests

- [ ] `generatePassword()` returns correct length
- [ ] `generatePassword()` includes only selected character types
- [ ] `generatePassword()` excludes ambiguous when enabled
- [ ] `generatePassword()` returns empty for no character types
- [ ] `calculateStrength()` returns correct score for each criteria
- [ ] `calculateStrength()` returns correct labels

### Component Tests

- [ ] Renders with default options
- [ ] Slider updates length state
- [ ] Checkboxes toggle correctly
- [ ] Generate button creates password
- [ ] Copy button copies to clipboard
- [ ] Strength indicator updates with password
- [ ] Shows correct entropy calculation

### E2E Tests

```typescript
// e2e/tools/password-generator.spec.ts
test('generates password with custom settings', async ({ page }) => {
  await page.goto('/en/tools/password/generator');
  
  // Set length to 24
  await page.locator('input[type="range"]').fill('24');
  
  // Uncheck symbols
  await page.locator('text=Symbols').click();
  
  // Generate
  await page.click('text=Generate Password');
  
  // Verify
  const password = await page.locator('[data-testid="password-output"]').textContent();
  expect(password.length).toBe(24);
  expect(password).not.toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
});

test('copies password to clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en/tools/password/generator');
  
  await page.click('text=Generate Password');
  await page.click('[title="Copy to clipboard"]');
  
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard.length).toBeGreaterThan(0);
});
```

### Manual Testing

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test dark mode appearance
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Test keyboard-only navigation
- [ ] Verify no network requests during generation

---

## Future Enhancements

### Phase 2 - Planned

| Feature | Priority | Complexity | Notes |
|---------|----------|------------|-------|
| Generate multiple passwords | Medium | Low | Batch generation |
| Custom character set | Low | Medium | User-defined chars |
| Password history (session) | Low | Medium | LocalStorage |
| Export to file | Low | Low | .txt download |

### Phase 3 - Considered

| Feature | Priority | Complexity | Notes |
|---------|----------|------------|-------|
| Pronounceable passwords | Low | High | Word-like patterns |
| Password patterns | Low | High | e.g., `Cvcc-9999-cvcc` |
| Memorable password tips | Low | Low | Display recommendations |

---

## Changelog

### v1.0.0 (December 2024)

**Initial Release**
- ✅ Basic password generation
- ✅ Character type options
- ✅ Length slider (4-128)
- ✅ Strength indicator
- ✅ Copy to clipboard
- ✅ Exclude ambiguous characters
- ✅ Entropy display

### v1.1.0 (Planned)

- [ ] Add i18n support
- [ ] Add keyboard shortcuts
- [ ] Improve accessibility
- [ ] Add unit tests

---

## Related Tools

| Tool | Relationship |
|------|--------------|
| [Password Strength Checker](./strength-checker.md) | Complements - verify password strength |
| [Passphrase Generator](./passphrase-generator.md) | Alternative - word-based passwords |
| [Hash/Encode Toolkit](./hash-encode.md) | Related - hash generated passwords |

---

## Owner & Contact

| Role | Name | Responsibility |
|------|------|----------------|
| Owner | TBD | Feature development |
| Reviewer | TBD | Code review |

---

*Document generated for Multi-Purpose Tool project*  
*Template version: 1.0.0*
