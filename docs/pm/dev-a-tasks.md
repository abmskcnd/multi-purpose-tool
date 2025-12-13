# Developer A - Task Checklist

> **Source of Truth**: `src/config/tools.registry.ts`  
> **Focus**: Security & Data Specialist  
> **Assigned Groups**: 7 groups (49 tools)  
> **Last Updated**: December 2025

---

## 📋 Assigned Groups Overview

| # | Group ID | Group Name | Priority | Tools | Status |
|---|----------|------------|----------|-------|--------|
| 1 | `password` | Password & Security Tools | 1 | 8 | P1 |
| 2 | `text` | Text Tools | 2 | 7 | P1 |
| 3 | `json` | JSON / YAML / XML Tools | 3 | 8 | P1 |
| 4 | `data` | Encode/Decode & Data Utilities | 8 | 6 | P1 |
| 5 | `datetime` | Date, Time & Calendar Tools | 9 | 6 | P1 |
| 6 | `math` | Math & Calculator Tools | 12 | 7 | P3 |
| 7 | `finance` | Finance & Budget Tools | 14 | 7 | P4 |

---

## 🎯 Sprint Breakdown

### Sprint 1 (Week 1-2) - Foundation + Setup

- [ ] Set up development environment
- [ ] Review `.github/copilot-instructions.md`
- [ ] Review project standards & architecture
- [ ] Complete P0 foundation work (shared with team)

---

### Sprint 2 (Week 3-4) - P1 High Priority

#### 🔐 Group 1: Password & Security Tools (8 tools)

**Path**: `src/features/tools/password/`

| # | Tool | Status | Tech Stack |
|---|------|--------|------------|
| 1 | `generator` - Password Generator | [ ] | `crypto.getRandomValues()` |
| 2 | `strength-checker` - Password Strength Checker | [ ] | `zxcvbn` |
| 3 | `hash-encode` - Hash / Encode Toolkit | [ ] | Web Crypto, `crypto-js` |
| 4 | `jwt-decoder` - JWT Decoder (Local Only) | [ ] | `jwt-decode` |
| 5 | `uuid-nanoid` - UUID / NanoID Generator | [ ] | `uuid`, `nanoid` |
| 6 | `qr-generator` - QR Code Generator | [ ] | `qrcode` |
| 7 | `passphrase-generator` - Passphrase Generator | [ ] | Dictionary wordlist |
| 8 | `password-policy-checker` - Password Policy Checker | [ ] | Plain JS |

**Priority Order**: 
1. ⭐ `generator` - Password Generator (highest traffic)
2. ⭐ `strength-checker` - Password Strength Checker
3. ⭐ `hash-encode` - Hash / Encode Toolkit
4. `jwt-decoder` - JWT Decoder
5. `uuid-nanoid` - UUID / NanoID Generator
6. `qr-generator` - QR Code Generator
7. `passphrase-generator` - Passphrase Generator
8. `password-policy-checker` - Password Policy Checker

---

#### 📝 Group 2: Text Tools (7 tools)

**Path**: `src/features/tools/text/`

| # | Tool | Status | Tech Stack |
|---|------|--------|------------|
| 1 | `diff` - Text Diff / Compare | [ ] | `diff` (jsdiff) |
| 2 | `case-converter` - Case Converter | [ ] | Plain JS, `unidecode` |
| 3 | `regex-tester` - Regex Tester + Highlighter | [ ] | Native RegExp |
| 4 | `cleaner` - Text Cleaner | [ ] | Plain JS |
| 5 | `word-counter` - Word Counter | [ ] | Plain JS |
| 6 | `markdown-preview` - Markdown Preview + Export HTML | [ ] | `react-markdown`, `marked` |
| 7 | `slug-generator` - Slug Generator | [ ] | Plain JS |

**Priority Order**:
1. ⭐ `diff` - Text Diff / Compare (high demand)
2. ⭐ `case-converter` - Case Converter
3. ⭐ `regex-tester` - Regex Tester + Highlighter
4. `cleaner` - Text Cleaner
5. `word-counter` - Word Counter
6. `markdown-preview` - Markdown Preview + Export HTML
7. `slug-generator` - Slug Generator

---

### Sprint 3 (Week 5-6) - P1 Completion

#### { } Group 3: JSON / YAML / XML Tools (8 tools)

**Path**: `src/features/tools/json/`

| # | Tool | Status | Tech Stack |
|---|------|--------|------------|
| 1 | `format-validate` - JSON Formatter / Minify / Validator | [ ] | Native JSON |
| 2 | `diff` - JSON Diff / Compare | [ ] | `jsondiffpatch` |
| 3 | `schema-generator` - JSON Schema Generator | [ ] | `json-schema-generator` |
| 4 | `convert` - JSON ↔ YAML / XML Converter | [ ] | `js-yaml`, `xml2js` |
| 5 | `jsonpath` - JSONPath / jq Playground | [ ] | `jsonpath-plus` |
| 6 | `json-to-csv` - JSON to CSV Converter | [ ] | `papaparse` |
| 7 | `sort-keys` - Sort JSON Keys | [ ] | Plain JS |
| 8 | `flatten-unflatten` - Flatten / Unflatten JSON | [ ] | Plain JS |

**Priority Order**:
1. ⭐ `format-validate` - JSON Formatter / Minify / Validator
2. ⭐ `diff` - JSON Diff / Compare
3. `schema-generator` - JSON Schema Generator
4. `convert` - JSON ↔ YAML / XML Converter
5. `jsonpath` - JSONPath / jq Playground
6. `json-to-csv` - JSON to CSV Converter
7. `sort-keys` - Sort JSON Keys
8. `flatten-unflatten` - Flatten / Unflatten JSON

---

#### 🔤 Group 8: Encode/Decode & Data Utilities (6 tools)

**Path**: `src/features/tools/data/`

| # | Tool | Status | Tech Stack |
|---|------|--------|------------|
| 1 | `base64` - Base64 Encode/Decode | [ ] | `TextEncoder/TextDecoder` |
| 2 | `url-parser` - URL Parser | [ ] | Native URL API |
| 3 | `csv-json` - CSV ↔ JSON Converter | [ ] | `papaparse` |
| 4 | `number-base` - Number Base Converter | [ ] | Plain JS |
| 5 | `color-tools` - Color Tools | [ ] | `chroma-js` |
| 6 | `file-hash` - File Hash Checker | [ ] | Web Crypto API |

**Priority Order**:
1. ⭐ `base64` - Base64 Encode/Decode (high dev usage)
2. `url-parser` - URL Parser
3. `csv-json` - CSV ↔ JSON Converter
4. `number-base` - Number Base Converter
5. `color-tools` - Color Tools
6. `file-hash` - File Hash Checker

---

### Sprint 4+ (Week 7+) - P2/P3 Tools

#### 📅 Group 9: Date, Time & Calendar Tools (6 tools)

**Path**: `src/features/tools/datetime/`

| # | Tool | Status | Tech Stack |
|---|------|--------|------------|
| 1 | `date-diff` - Date Difference Calculator | [ ] | `date-fns` |
| 2 | `timezone-converter` - Timezone Converter | [ ] | `luxon` |
| 3 | `age-calculator` - Age Calculator | [ ] | `date-fns` |
| 4 | `ics-planner` - Calendar Event Planner / ICS Export | [ ] | `ics`, `rrule` |
| 5 | `lunar-converter` - Lunar Calendar Converter | [ ] | Lunar lib |
| 6 | `weekday-finder` - Weekday Finder | [ ] | Native Date |

---

#### 🔢 Group 12: Math & Calculator Tools (7 tools)

**Path**: `src/features/tools/math/`

| # | Tool | Status | Tech Stack |
|---|------|--------|------------|
| 1 | `basic-calculator` - Basic Calculator | [ ] | `mathjs` |
| 2 | `scientific-calculator` - Scientific Calculator | [ ] | `mathjs` |
| 3 | `equation-solver` - Equation Solver | [ ] | `nerdamer` / `mathjs` |
| 4 | `graph-plotter` - Graph Plotter | [ ] | `function-plot` |
| 5 | `matrix-calculator` - Matrix Calculator | [ ] | `mathjs` |
| 6 | `prime-tools` - Prime Number Checker/Generator | [ ] | Plain JS (sieve) |
| 7 | `fraction-simplifier` - Fraction Simplifier | [ ] | `fraction.js` |

---

#### 💰 Group 14: Finance & Budget Tools (7 tools)

**Path**: `src/features/tools/finance/`

| # | Tool | Status | Tech Stack |
|---|------|--------|------------|
| 1 | `currency` - Currency Converter | [ ] | Currency API + cache |
| 2 | `loan-emi` - Loan/EMI Calculator | [ ] | Client formula |
| 3 | `budget-planner` - Budget Planner | [ ] | `chart.js` |
| 4 | `investment` - Investment Calculator | [ ] | Client formula |
| 5 | `tax-estimator` - Tax Estimator ⚠️ | [ ] | Client formula |
| 6 | `tip-calculator` - Tip Calculator | [ ] | Plain JS |
| 7 | `savings-goal` - Savings Goal Tracker | [ ] | Client formula |

**⚠️ Note**: `tax-estimator` requires disclaimer: "For estimation only. Not legal/financial advice."

---

## ✅ Quality Checklist (Per Tool)

### Before Starting
- [ ] Read `.github/copilot-instructions.md`
- [ ] Set up folder: `src/features/tools/[group]/[tool]/`
- [ ] Review tool definition in `tools.registry.ts`

### Component Requirements
- [ ] `'use client'` directive present
- [ ] Uses `ToolCardContainer`, `ToolSection`, `ToolButton` from `_shared/`
- [ ] TypeScript types defined (no `any`)
- [ ] Uses `useCallback` for event handlers
- [ ] Uses `useMemo` for expensive computations

### UI Requirements
- [ ] Dark mode supported
- [ ] Mobile responsive
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Copy/download functionality where applicable

### Localization
- [ ] Translations added to `src/locales/en.json`
- [ ] Translations added to `src/locales/vi.json`
- [ ] Translations added to `src/locales/es.json`
- [ ] Translations added to `src/locales/zh.json`
- [ ] Translations added to `src/locales/ja.json`

### Registration
- [ ] Component registered in `src/config/tool-components.tsx`
- [ ] Status updated to `'active'` in `tools.registry.ts`

### Verification
- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn build` succeeds
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Git commit follows convention: `feat(tools): add [tool-name]`

---

## 📊 Progress Tracker

| Group | Tools | Completed | Progress |
|-------|-------|-----------|----------|
| password | 8 | 0 | ░░░░░░░░░░ 0% |
| text | 7 | 0 | ░░░░░░░░░░ 0% |
| json | 8 | 0 | ░░░░░░░░░░ 0% |
| data | 6 | 0 | ░░░░░░░░░░ 0% |
| datetime | 6 | 0 | ░░░░░░░░░░ 0% |
| math | 7 | 0 | ░░░░░░░░░░ 0% |
| finance | 7 | 0 | ░░░░░░░░░░ 0% |
| **Total** | **49** | **0** | ░░░░░░░░░░ **0%** |

---

## 🎯 Priority Focus

### Must-Have (Sprint 2-3)
- Password Generator ⭐
- Text Diff ⭐
- JSON Formatter ⭐
- Base64 Encode/Decode ⭐

### Should-Have (Sprint 3-4)
- All Password & Security tools
- All Text tools
- All JSON tools

### Nice-to-Have (Sprint 4+)
- Math tools
- Finance tools (requires API)
- DateTime tools

---

*Focus on client-side first, security best practices, and data integrity*
