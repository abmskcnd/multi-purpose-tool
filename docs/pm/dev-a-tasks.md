# Developer A - Task Checklist

**Focus**: Security & Data Specialist  
**Assigned Groups**: 7 groups (~49 tools)  
**Priority**: Security, Text Processing, Data Manipulation

---

## 🎯 Sprint Breakdown

### Sprint 1 (Week 1-2) - Foundation + Setup
- [ ] Set up development environment
- [ ] Review project standards & architecture
- [ ] Complete P0 foundation work (shared with team)

---

### Sprint 2 (Week 3-4) - P1 High Priority

#### 🔐 Group 1: Password & Security Tools (8 tools)

- [ ] **Password Generator** ⭐ Priority 1
  - [ ] Create component: `src/features/tools/password/generator/`
  - [ ] Implement with Web Crypto API (`crypto.getRandomValues()`)
  - [ ] Options: length, uppercase, lowercase, numbers, symbols
  - [ ] Copy to clipboard functionality
  - [ ] Strength indicator integration
  - [ ] Add translations (5 locales)
  - [ ] Register in tool-components.tsx
  - [ ] Update status to 'active' in registry

- [ ] **Password Strength Checker** ⭐ Priority 2
  - [ ] Create component: `src/features/tools/password/strength-checker/`
  - [ ] Use `zxcvbn` library for strength scoring
  - [ ] Visual strength meter (weak/medium/strong)
  - [ ] Security tips based on analysis
  - [ ] Real-time feedback as user types
  - [ ] Add translations
  - [ ] Register component

- [ ] **Hash / Encode Toolkit** ⭐ Priority 3
  - [ ] Create component: `src/features/tools/password/hash-encode/`
  - [ ] SHA-256, SHA-512, SHA-1 (Web Crypto API)
  - [ ] MD5, HMAC (use `crypto-js`)
  - [ ] Base64 encode/decode with Unicode support
  - [ ] URL encode/decode
  - [ ] Copy results functionality
  - [ ] Add translations
  - [ ] Register component

- [ ] **JWT Decoder** Priority 4
  - [ ] Create component: `src/features/tools/password/jwt-decoder/`
  - [ ] Use `jwt-decode` library
  - [ ] Parse header, payload, signature
  - [ ] Show expiration time with countdown
  - [ ] **Local-only warning** (no server)
  - [ ] Syntax highlighting for JSON output
  - [ ] Add translations
  - [ ] Register component

- [ ] **UUID / NanoID Generator** Priority 5
  - [ ] Create component: `src/features/tools/password/uuid-nanoid/`
  - [ ] Use `uuid` and `nanoid` libraries
  - [ ] Batch generation (1-100 IDs)
  - [ ] Multiple UUID versions (v1, v4)
  - [ ] Custom NanoID length and alphabet
  - [ ] Copy all functionality
  - [ ] Add translations
  - [ ] Register component

- [ ] **QR Code Generator** Priority 6
  - [ ] Create component: `src/features/tools/password/qr-generator/`
  - [ ] Use `qrcode` library
  - [ ] Support text, URL, vCard, WiFi
  - [ ] PNG and SVG download options
  - [ ] Size and error correction options
  - [ ] Preview before download
  - [ ] Add translations
  - [ ] Register component

- [ ] **Passphrase Generator** Priority 7
  - [ ] Create component: `src/features/tools/password/passphrase-generator/`
  - [ ] Word-based passphrases (memorable)
  - [ ] Word count options (3-8 words)
  - [ ] Separator options (space, dash, camelCase)
  - [ ] Use dictionary wordlist (embedded)
  - [ ] Strength indicator
  - [ ] Add translations
  - [ ] Register component

- [ ] **Password Policy Checker** Priority 8
  - [ ] Create component: `src/features/tools/password/password-policy-checker/`
  - [ ] Check against enterprise rules
  - [ ] Min/max length, character requirements
  - [ ] Common password dictionary check
  - [ ] Pass/fail with detailed feedback
  - [ ] Add translations
  - [ ] Register component

---

#### 📝 Group 2: Text Tools (7 tools)

- [ ] **Text Diff / Compare** ⭐ Priority 1
  - [ ] Create component: `src/features/tools/text/diff/`
  - [ ] Use `diff` (jsdiff) library
  - [ ] Two-panel input (original vs new)
  - [ ] Highlight additions (green), deletions (red), changes (yellow)
  - [ ] Line-by-line and character-level modes
  - [ ] Export diff as text
  - [ ] Add translations
  - [ ] Register component

- [ ] **Case Converter** ⭐ Priority 2
  - [ ] Create component: `src/features/tools/text/case-converter/`
  - [ ] camelCase, PascalCase, snake_case, kebab-case
  - [ ] UPPERCASE, lowercase, Title Case
  - [ ] Remove Vietnamese diacritics (unidecode)
  - [ ] One-click convert to all formats
  - [ ] Add translations
  - [ ] Register component

- [ ] **Regex Tester + Highlighter** ⭐ Priority 3
  - [ ] Create component: `src/features/tools/text/regex-tester/`
  - [ ] Regex input with flags (g, i, m, s, u)
  - [ ] Test string input (multi-line)
  - [ ] Highlight all matches in real-time
  - [ ] Show capture groups
  - [ ] Match count and results list
  - [ ] Add translations
  - [ ] Register component

- [ ] **Text Cleaner** Priority 4
  - [ ] Create component: `src/features/tools/text/cleaner/`
  - [ ] Trim whitespace
  - [ ] Remove duplicate spaces/lines
  - [ ] Remove empty lines
  - [ ] Sort lines (A-Z, Z-A)
  - [ ] Remove duplicate lines
  - [ ] Batch operations
  - [ ] Add translations
  - [ ] Register component

- [ ] **Word Counter** Priority 5
  - [ ] Create component: `src/features/tools/text/word-counter/`
  - [ ] Count words, characters (with/without spaces)
  - [ ] Count sentences, paragraphs
  - [ ] Reading time estimation (200 WPM)
  - [ ] Real-time updates
  - [ ] Add translations
  - [ ] Register component

- [ ] **Markdown Preview + Export HTML** Priority 6
  - [ ] Create component: `src/features/tools/text/markdown-preview/`
  - [ ] Use `react-markdown` for preview
  - [ ] Split-panel editor + preview
  - [ ] Export as HTML (use `marked`)
  - [ ] Syntax highlighting for code blocks
  - [ ] Add translations
  - [ ] Register component

- [ ] **Slug Generator** Priority 7
  - [ ] Create component: `src/features/tools/text/slug-generator/`
  - [ ] Convert text to SEO-friendly slugs
  - [ ] Remove diacritics, special characters
  - [ ] Lowercase with hyphens
  - [ ] Preview before copy
  - [ ] Add translations
  - [ ] Register component

---

### Sprint 3 (Week 5-6) - P1 Completion

#### { } Group 3: JSON / YAML / XML Tools (8 tools)

- [ ] **JSON Formatter / Minify / Validator** ⭐ Priority 1
  - [ ] Create component: `src/features/tools/json/format-validate/`
  - [ ] Validate with `JSON.parse()`
  - [ ] Format (pretty-print) with indentation options
  - [ ] Minify (remove whitespace)
  - [ ] Syntax highlighting
  - [ ] Error messages with line numbers
  - [ ] Add translations
  - [ ] Register component

- [ ] **JSON Diff / Compare** ⭐ Priority 2
  - [ ] Create component: `src/features/tools/json/diff/`
  - [ ] Use `jsondiffpatch` library
  - [ ] Two-panel JSON input
  - [ ] Show added, removed, modified paths
  - [ ] Visual diff with colors
  - [ ] Export diff report
  - [ ] Add translations
  - [ ] Register component

- [ ] **JSON Schema Generator** Priority 3
  - [ ] Create component: `src/features/tools/json/schema-generator/`
  - [ ] Generate schema from JSON input
  - [ ] Infer types (string, number, boolean, object, array)
  - [ ] Optional vs required fields
  - [ ] Copy schema as JSON
  - [ ] Add translations
  - [ ] Register component

- [ ] **JSON ↔ YAML / XML Converter** Priority 4
  - [ ] Create component: `src/features/tools/json/convert/`
  - [ ] Use `js-yaml` and `xml2js`
  - [ ] Bidirectional conversion
  - [ ] Validate before conversion
  - [ ] Error handling with messages
  - [ ] Add translations
  - [ ] Register component

- [ ] **JSONPath / jq Playground** Priority 5
  - [ ] Create component: `src/features/tools/json/jsonpath/`
  - [ ] Use `jsonpath-plus` library
  - [ ] JSON input + JSONPath query input
  - [ ] Show matching results
  - [ ] Query examples/templates
  - [ ] Add translations
  - [ ] Register component

- [ ] **JSON to CSV Converter** Priority 6
  - [ ] Create component: `src/features/tools/json/json-to-csv/`
  - [ ] Use `papaparse` library
  - [ ] Handle array of objects
  - [ ] Flatten nested objects (optional)
  - [ ] Download CSV file
  - [ ] Add translations
  - [ ] Register component

- [ ] **Sort JSON Keys** Priority 7
  - [ ] Create component: `src/features/tools/json/sort-keys/`
  - [ ] Sort keys alphabetically
  - [ ] Recursive sorting (nested objects)
  - [ ] Preserve arrays
  - [ ] Output formatted JSON
  - [ ] Add translations
  - [ ] Register component

- [ ] **Flatten / Unflatten JSON** Priority 8
  - [ ] Create component: `src/features/tools/json/flatten-unflatten/`
  - [ ] Flatten: nested → dot-path notation
  - [ ] Unflatten: dot-path → nested
  - [ ] Bidirectional conversion
  - [ ] Add translations
  - [ ] Register component

---

#### 🔤 Group 8: Encode/Decode & Data Utilities (6 tools)

- [ ] **Base64 Encode/Decode** ⭐ Priority 1
  - [ ] Create component: `src/features/tools/data/base64/`
  - [ ] Use `TextEncoder/TextDecoder` (Unicode safe)
  - [ ] Encode and decode modes
  - [ ] File upload for encoding
  - [ ] Error handling for invalid input
  - [ ] Add translations
  - [ ] Register component

- [ ] **URL Parser** Priority 2
  - [ ] Create component: `src/features/tools/data/url-parser/`
  - [ ] Use native `URL` API
  - [ ] Parse protocol, host, port, path, query, hash
  - [ ] Display components in structured format
  - [ ] Query params as key-value table
  - [ ] Add translations
  - [ ] Register component

- [ ] **CSV ↔ JSON Converter** Priority 3
  - [ ] Create component: `src/features/tools/data/csv-json/`
  - [ ] Use `papaparse` library
  - [ ] Bidirectional conversion
  - [ ] Delimiter options (comma, tab, semicolon)
  - [ ] Headers handling
  - [ ] Download output
  - [ ] Add translations
  - [ ] Register component

- [ ] **Number Base Converter** Priority 4
  - [ ] Create component: `src/features/tools/data/number-base/`
  - [ ] Binary, Octal, Decimal, Hexadecimal
  - [ ] Convert between all bases
  - [ ] Real-time conversion
  - [ ] Add translations
  - [ ] Register component

- [ ] **Color Tools** Priority 5
  - [ ] Create component: `src/features/tools/data/color-tools/`
  - [ ] Use `chroma-js` library
  - [ ] Convert HEX ↔ RGB ↔ HSL ↔ CMYK
  - [ ] Color picker
  - [ ] Generate palette (shades/tints)
  - [ ] Preview colors
  - [ ] Add translations
  - [ ] Register component

- [ ] **File Hash Checker** Priority 6
  - [ ] Create component: `src/features/tools/data/file-hash/`
  - [ ] Use Web Crypto API
  - [ ] Calculate SHA-256 hash from file
  - [ ] Support large files (chunked processing)
  - [ ] Compare with expected hash
  - [ ] Add translations
  - [ ] Register component

---

### Sprint 4+ (Week 7+) - P3/P4 Tools

#### 🔢 Group 12: Math & Calculator Tools (7 tools)

- [ ] **Basic Calculator** Priority 1
  - [ ] Create component: `src/features/tools/math/basic-calculator/`
  - [ ] Use `mathjs` for safe evaluation
  - [ ] +, -, ×, ÷ operations
  - [ ] Button grid UI
  - [ ] Keyboard support
  - [ ] History of calculations
  - [ ] Add translations
  - [ ] Register component

- [ ] **Scientific Calculator** Priority 2
  - [ ] Create component: `src/features/tools/math/scientific-calculator/`
  - [ ] Use `mathjs` library
  - [ ] Trigonometric, logarithmic functions
  - [ ] Constants (π, e)
  - [ ] Advanced operations
  - [ ] History
  - [ ] Add translations
  - [ ] Register component

- [ ] **Equation Solver** Priority 3
  - [ ] Create component: `src/features/tools/math/equation-solver/`
  - [ ] Use `nerdamer` or `mathjs`
  - [ ] Solve linear equations
  - [ ] Solve quadratic equations
  - [ ] Show steps (if possible)
  - [ ] Add translations
  - [ ] Register component

- [ ] **Graph Plotter** Priority 4
  - [ ] Create component: `src/features/tools/math/graph-plotter/`
  - [ ] Use `function-plot` library
  - [ ] Plot mathematical functions
  - [ ] Zoom and pan controls
  - [ ] Multiple functions on same graph
  - [ ] Export as image
  - [ ] Add translations
  - [ ] Register component

- [ ] **Matrix Calculator** Priority 5
  - [ ] Create component: `src/features/tools/math/matrix-calculator/`
  - [ ] Use `mathjs` library
  - [ ] Matrix input (dynamic size)
  - [ ] Operations: add, subtract, multiply
  - [ ] Determinant, inverse, transpose
  - [ ] Add translations
  - [ ] Register component

- [ ] **Prime Number Checker/Generator** Priority 6
  - [ ] Create component: `src/features/tools/math/prime-tools/`
  - [ ] Check if number is prime
  - [ ] Generate list of primes up to N
  - [ ] Sieve of Eratosthenes algorithm
  - [ ] Add translations
  - [ ] Register component

- [ ] **Fraction Simplifier** Priority 7
  - [ ] Create component: `src/features/tools/math/fraction-simplifier/`
  - [ ] Use `fraction.js` library
  - [ ] Simplify fractions to lowest terms
  - [ ] Convert decimal to fraction
  - [ ] Add, subtract, multiply, divide fractions
  - [ ] Add translations
  - [ ] Register component

---

#### 💰 Group 13: Finance & Budget Tools (7 tools)

- [ ] **Currency Converter** ⭐ Priority 1 (API Integration)
  - [ ] Create component: `src/features/tools/finance/currency/`
  - [ ] Integrate currency exchange rate API
  - [ ] Implement caching (1-hour TTL)
  - [ ] Support 50+ currencies
  - [ ] Real-time rate display
  - [ ] Historical rate view (optional)
  - [ ] Add translations
  - [ ] Register component
  - [ ] **Coordinate with Dev C for API rate limiting**

- [ ] **Loan/EMI Calculator** Priority 2
  - [ ] Create component: `src/features/tools/finance/loan-emi/`
  - [ ] EMI formula: `P * r * (1 + r)^n / ((1 + r)^n - 1)`
  - [ ] Principal, rate, tenure inputs
  - [ ] Show monthly EMI
  - [ ] Amortization schedule
  - [ ] Total interest paid
  - [ ] Add translations
  - [ ] Register component

- [ ] **Budget Planner** Priority 3
  - [ ] Create component: `src/features/tools/finance/budget-planner/`
  - [ ] Use `chart.js` for visualization
  - [ ] Income vs expenses tracking
  - [ ] Category breakdown (pie chart)
  - [ ] Save to localStorage
  - [ ] Export as CSV
  - [ ] Add translations
  - [ ] Register component

- [ ] **Investment Calculator** Priority 4
  - [ ] Create component: `src/features/tools/finance/investment/`
  - [ ] Compound interest formula
  - [ ] Initial investment + monthly contribution
  - [ ] Growth chart over time
  - [ ] Different compounding periods
  - [ ] Add translations
  - [ ] Register component

- [ ] **Tax Estimator** Priority 5 ⚠️
  - [ ] Create component: `src/features/tools/finance/tax-estimator/`
  - [ ] **Add prominent disclaimer** (not tax advice)
  - [ ] Simple tax bracket calculator
  - [ ] Income, deductions inputs
  - [ ] Estimated tax liability
  - [ ] Reference only
  - [ ] Add translations
  - [ ] Register component

- [ ] **Tip Calculator** Priority 6
  - [ ] Create component: `src/features/tools/finance/tip-calculator/`
  - [ ] Bill amount input
  - [ ] Tip percentage options (10%, 15%, 20%, custom)
  - [ ] Split bill among N people
  - [ ] Show per-person amount
  - [ ] Add translations
  - [ ] Register component

- [ ] **Savings Goal Tracker** Priority 7
  - [ ] Create component: `src/features/tools/finance/savings-goal/`
  - [ ] Goal amount and target date
  - [ ] Current savings
  - [ ] Monthly savings needed
  - [ ] Progress bar and chart
  - [ ] Save to localStorage
  - [ ] Add translations
  - [ ] Register component

---

#### 📅 Group 15: Date, Time & Calendar Tools (6 tools)

- [ ] **Date Difference Calculator** ⭐ Priority 1
  - [ ] Create component: `src/features/tools/datetime/date-diff/`
  - [ ] Use `date-fns` library
  - [ ] Two date inputs
  - [ ] Show difference in years, months, days, hours
  - [ ] Include/exclude weekends option
  - [ ] Add translations
  - [ ] Register component

- [ ] **Timezone Converter** Priority 2
  - [ ] Create component: `src/features/tools/datetime/timezone-converter/`
  - [ ] Use `luxon` library (DST aware)
  - [ ] Select source and target timezones
  - [ ] Convert date-time between zones
  - [ ] Show UTC offset
  - [ ] Add translations
  - [ ] Register component

- [ ] **Age Calculator** Priority 3
  - [ ] Create component: `src/features/tools/datetime/age-calculator/`
  - [ ] Use `date-fns` library
  - [ ] Birth date input
  - [ ] Show exact age (years, months, days)
  - [ ] Next birthday countdown
  - [ ] Add translations
  - [ ] Register component

- [ ] **Calendar Event Planner / ICS Export** Priority 4
  - [ ] Create component: `src/features/tools/datetime/ics-planner/`
  - [ ] Use `ics` library
  - [ ] Event title, start/end time
  - [ ] Location, description
  - [ ] Recurring events (use `rrule`)
  - [ ] Download .ics file
  - [ ] Add translations
  - [ ] Register component

- [ ] **Lunar Calendar Converter** Priority 5
  - [ ] Create component: `src/features/tools/datetime/lunar-converter/`
  - [ ] Use lunar calendar library (Vietnamese/Asian)
  - [ ] Convert solar ↔ lunar dates
  - [ ] Show lunar month and year
  - [ ] Add translations
  - [ ] Register component

- [ ] **Weekday Finder** Priority 6
  - [ ] Create component: `src/features/tools/datetime/weekday-finder/`
  - [ ] Use native `Date` object
  - [ ] Input any date
  - [ ] Show day of week
  - [ ] Add translations
  - [ ] Register component

---

## 📋 Quality Checklist (For Every Tool)

- [ ] Component structure follows template
- [ ] `'use client'` directive present
- [ ] Uses shared components from `_shared/`
- [ ] TypeScript types defined (no `any`)
- [ ] Dark mode supported
- [ ] Mobile responsive
- [ ] Translations added for all 5 locales (vi, en, es, zh, ja)
- [ ] Component registered in `tool-components.tsx`
- [ ] Status updated to 'active' in `tools.registry.ts`
- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn build` succeeds
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Git commit follows convention

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
