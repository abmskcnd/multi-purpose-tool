# Team Assignment - Multi-Purpose Tool Development

> **Source of Truth**: `src/config/tools.registry.ts`  
> **Total**: 22 groups, 144 tools  
> **Team**: 3 developers  
> **Last Updated**: December 2025

---

## 📋 Overview

| Member | Groups | Tools | Difficulty | Focus |
|--------|--------|-------|------------|-------|
| **Developer A** | 7 groups | ~49 tools | ⭐⭐⭐⭐ | Security, Data, Text Processing |
| **Developer B** | 8 groups | ~48 tools | ⭐⭐⭐ | Media, UI/UX, Fun Tools |
| **Developer C** | 7 groups | ~47 tools | ⭐⭐⭐⭐ | Dev Tools, API Integration, Complex Logic |

---

## 👤 Developer A - Security & Data Specialist

### Assigned Groups

| # | Group ID | Group Name | Priority | Tools |
|---|----------|------------|----------|-------|
| 1 | `password` | Password & Security Tools | 1 | 8 |
| 2 | `text` | Text Tools | 2 | 7 |
| 3 | `json` | JSON / YAML / XML Tools | 3 | 8 |
| 4 | `data` | Encode/Decode & Data Utilities | 8 | 6 |
| 5 | `math` | Math & Calculator Tools | 12 | 7 |
| 6 | `finance` | Finance & Budget Tools | 14 | 7 |
| 7 | `datetime` | Date, Time & Calendar Tools | 9 | 6 |

**Total**: 7 groups, 49 tools

---

### 🔐 Group 1: Password & Security Tools (Priority 1)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `generator` | Password Generator | client-side |
| `strength-checker` | Password Strength Checker | client-side |
| `hash-encode` | Hash / Encode Toolkit | client-side |
| `jwt-decoder` | JWT Decoder (Local Only) | client-side |
| `uuid-nanoid` | UUID / NanoID Generator | client-side |
| `qr-generator` | QR Code Generator | client-side |
| `passphrase-generator` | Passphrase Generator | client-side |
| `password-policy-checker` | Password Policy Checker | client-side |

**Tech**: `crypto.getRandomValues()`, `zxcvbn`, `crypto-js`, `jwt-decode`, `uuid`, `nanoid`, `qrcode`

---

### 📝 Group 2: Text Tools (Priority 2)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `diff` | Text Diff / Compare | client-side |
| `case-converter` | Case Converter | client-side |
| `regex-tester` | Regex Tester + Highlighter | client-side |
| `cleaner` | Text Cleaner | client-side |
| `word-counter` | Word Counter | client-side |
| `markdown-preview` | Markdown Preview + Export HTML | client-side |
| `slug-generator` | Slug Generator | client-side |

**Tech**: `diff` (jsdiff), `unidecode`, Native RegExp, `react-markdown`, `marked`

---

### { } Group 3: JSON / YAML / XML Tools (Priority 3)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `format-validate` | JSON Formatter / Minify / Validator | client-side |
| `diff` | JSON Diff / Compare | client-side |
| `schema-generator` | JSON Schema Generator | client-side |
| `convert` | JSON ↔ YAML / XML Converter | client-side |
| `jsonpath` | JSONPath / jq Playground | client-side |
| `json-to-csv` | JSON to CSV Converter | client-side |
| `sort-keys` | Sort JSON Keys | client-side |
| `flatten-unflatten` | Flatten / Unflatten JSON | client-side |

**Tech**: Native JSON, `jsondiffpatch`, `json-schema-generator`, `js-yaml`, `xml2js`, `jsonpath-plus`, `papaparse`

---

### 🔤 Group 8: Encode/Decode & Data Utilities (Priority 8)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `base64` | Base64 Encode/Decode | client-side |
| `url-parser` | URL Parser | client-side |
| `csv-json` | CSV ↔ JSON Converter | client-side |
| `number-base` | Number Base Converter | client-side |
| `color-tools` | Color Tools | client-side |
| `file-hash` | File Hash Checker | client-side |

**Tech**: `TextEncoder/TextDecoder`, Native URL API, `papaparse`, `chroma-js`, Web Crypto API

---

### 🔢 Group 12: Math & Calculator Tools (Priority 12)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `basic-calculator` | Basic Calculator | client-side |
| `scientific-calculator` | Scientific Calculator | client-side |
| `equation-solver` | Equation Solver | client-side |
| `graph-plotter` | Graph Plotter | client-side |
| `matrix-calculator` | Matrix Calculator | client-side |
| `prime-tools` | Prime Number Checker/Generator | client-side |
| `fraction-simplifier` | Fraction Simplifier | client-side |

**Tech**: `mathjs`, `nerdamer`, `function-plot`, `fraction.js`

---

### 💰 Group 14: Finance & Budget Tools (Priority 14)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `currency` | Currency Converter | hybrid |
| `loan-emi` | Loan/EMI Calculator | client-side |
| `budget-planner` | Budget Planner | client-side |
| `investment` | Investment Calculator | client-side |
| `tax-estimator` | Tax Estimator ⚠️ | client-side |
| `tip-calculator` | Tip Calculator | client-side |
| `savings-goal` | Savings Goal Tracker | client-side |

**Tech**: Currency API + cache, `chart.js`, client formulas

---

### 📅 Group 9: Date, Time & Calendar Tools (Priority 9)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `date-diff` | Date Difference Calculator | client-side |
| `timezone-converter` | Timezone Converter | client-side |
| `age-calculator` | Age Calculator | client-side |
| `ics-planner` | Calendar Event Planner / ICS Export | client-side |
| `lunar-converter` | Lunar Calendar Converter | client-side |
| `weekday-finder` | Weekday Finder | client-side |

**Tech**: `date-fns`, `luxon`, `ics`, `rrule`, lunar lib

---

### Developer A Summary

- **Total Groups**: 7
- **Total Tools**: 49
- **Client-side Only**: ~42
- **Hybrid**: ~7
- **Key Skills**: TypeScript, Cryptography, Data structures, Algorithms

---

## 👤 Developer B - Media & UX Specialist

### Assigned Groups

| # | Group ID | Group Name | Priority | Tools |
|---|----------|------------|----------|-------|
| 1 | `random` | Random / Fun Tools | 4 | 5 |
| 2 | `image` | Image Tools | 5 | 5 |
| 3 | `pdf` | PDF Tools | 6 | 5 |
| 4 | `youtube` | YouTube Tools (Legal) | 10 | 6 |
| 5 | `file-convert` | File Convert Tools | 11 | 5 |
| 6 | `language` | Language & Translation Tools | 18 | 7 |
| 7 | `audio` | Audio Tools | 19 | 6 |
| 8 | `video` | Video Tools | 20 | 7 |

**Total**: 8 groups, 46 tools

---

### 🎲 Group 4: Random / Fun Tools (Priority 4)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `wheel` | Wheel Spinner / Random Picker | client-side |
| `team-generator` | Random Team Generator | client-side |
| `dice-lottery` | Dice / Lottery / Random Name | client-side |
| `countdown` | Countdown / Timer Shareable | client-side |
| `random-lorem` | Random Number / Lorem Ipsum Generator | client-side |

**Tech**: Canvas/SVG, `chance`, `seedrandom`, `lorem-ipsum`

---

### 🖼️ Group 5: Image Tools (Priority 5)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `compress` | Image Compressor | client-side |
| `convert` | Convert Format | client-side |
| `crop-resize-rotate` | Crop / Resize / Rotate | client-side |
| `remove-bg` | Remove Background (Optional) | hybrid |
| `qr-gen-scan` | QR Code Generator + Scanner | client-side |

**Tech**: `browser-image-compression`, Canvas, `exifr`, `react-easy-crop`, `jsqr`, remove.bg API

---

### 📄 Group 6: PDF Tools (Priority 6)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `merge-split` | PDF Merge / Split | client-side |
| `extract-rotate` | Extract / Rotate Pages | client-side |
| `watermark` | Add Page Numbers / Watermark | client-side |
| `compress` | Compress (Basic) | client-side |
| `pdf-to-text-images` | PDF to Text / Images | client-side |

**Tech**: `pdf-lib`, `pdfjs-dist`, Canvas

---

### ▶️ Group 10: YouTube Tools (Legal) (Priority 10)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `link-parser` | YouTube Link Parser | client-side |
| `metadata` | Metadata Viewer (oEmbed) | hybrid |
| `thumbnails` | Thumbnail Downloader | client-side |
| `chapters` | Timestamp / Chapters Builder | client-side |
| `embed-generator` | Embed Player Generator | client-side |
| `transcript-helper` | Transcript Helper (Optional) | client-side |

**Tech**: Regex, oEmbed API + cache, string templates

---

### 📁 Group 11: File Convert Tools (Priority 11)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `md-to-pdf-docx` | Markdown → PDF / DOCX | hybrid |
| `image-to-pdf` | Image → PDF | client-side |
| `pdf-to-text` | PDF → Text | client-side |
| `office-lite-export` | Office-Lite Export | hybrid |
| `unit-converter` | Unit Converter (Bonus) | hybrid |

**Tech**: `docx`, `pdf-lib`, `pdfjs-dist`

---

### 🌍 Group 18: Language & Translation Tools (Priority 18)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `translator` | Text Translator | hybrid |
| `spell-checker` | Spell Checker | hybrid |
| `grammar-checker` | Grammar Checker | hybrid |
| `synonym-finder` | Synonym Finder | hybrid |
| `language-detector` | Language Detector | client-side |
| `morse` | Morse Code Converter | client-side |
| `braille` | Braille Converter | client-side |

**Tech**: LibreTranslate/API, Hunspell, LanguageTool API, `franc`

---

### 🎵 Group 19: Audio Tools (Priority 19)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `audio-converter` | Audio Converter | client-side |
| `volume-normalizer` | Volume Normalizer | client-side |
| `bpm-detector` | BPM Detector | client-side |
| `audio-cutter` | Audio Cutter | client-side |
| `tts` | Text to Speech | client-side |
| `sfx-generator` | Sound Effect Generator | client-side |

**Tech**: `ffmpeg.wasm`, Web Audio API, `music-metadata`, `wavesurfer.js`, Web Speech API, `tone`

---

### 🎬 Group 20: Video Tools (Priority 20)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `video-compressor` | Video Compressor | server-side |
| `format-converter` | Format Converter | server-side |
| `frame-extractor` | Frame Extractor | client-side |
| `subtitle-generator` | Subtitle Generator | hybrid |
| `video-merger` | Video Merger | server-side |
| `gif-maker` | GIF Maker | client-side |
| `resolution-changer` | Resolution Changer | server-side |

**Tech**: Server ffmpeg, Canvas, Speech-to-text API, `gif.js`

---

### Developer B Summary

- **Total Groups**: 8
- **Total Tools**: 46
- **Client-side Only**: ~28
- **Hybrid/Server**: ~18
- **Key Skills**: Canvas API, Media processing, UX/UI design, Animation

---

## 👤 Developer C - DevOps & Integration Specialist

### Assigned Groups

| # | Group ID | Group Name | Priority | Tools |
|---|----------|------------|----------|-------|
| 1 | `dev` | Dev Utilities | 7 | 9 |
| 2 | `unit` | Unit & Measurement Converters | 13 | 7 |
| 3 | `health` | Health & Fitness Calculators | 15 | 7 |
| 4 | `seo` | SEO & Website Analysis Tools | 16 | 7 |
| 5 | `network` | Network & IP Tools | 17 | 6 |
| 6 | `weather` | Weather & Environment Tools | 21 | 6 |
| 7 | `crypto` | Cryptocurrency Tools | 22 | 7 |

**Total**: 7 groups, 49 tools

---

### 💻 Group 7: Dev Utilities (Priority 7)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `code-editor-formatter` | Online Code Editor / Formatter | client-side |
| `lint-typecheck-light` | Lint / Type Check Playground (Light) | client-side |
| `cron-builder` | Cron Expression Builder | client-side |
| `timestamp-converter` | Timestamp Converter | client-side |
| `curl-converter` | cURL → Fetch / Axios Converter | client-side |
| `gitignore-generator` | Git Ignore Generator | client-side |
| `api-tester` | API Tester | hybrid |
| `json-to-ts` | JSON to TypeScript | client-side |
| `openapi-to-types` | OpenAPI to Types | client-side |

**Tech**: `@monaco-editor/react`, `prettier/standalone`, `cronstrue`, `date-fns`, `curlconverter`

---

### 📏 Group 13: Unit & Measurement Converters (Priority 13)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `length` | Length Converter | client-side |
| `weight` | Weight Converter | client-side |
| `volume` | Volume Converter | client-side |
| `temperature` | Temperature Converter | client-side |
| `area` | Area Converter | client-side |
| `speed` | Speed Converter | client-side |
| `energy` | Energy Converter | client-side |

**Tech**: Plain JS (static ratios)

---

### 💪 Group 15: Health & Fitness Calculators (Priority 15)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `bmi` | BMI Calculator ⚠️ | client-side |
| `calories-burn` | Calorie Burn Estimator ⚠️ | client-side |
| `body-fat` | Body Fat Percentage ⚠️ | client-side |
| `water-intake` | Water Intake Calculator | client-side |
| `sleep-cycle` | Sleep Cycle Calculator | client-side |
| `heart-rate-zone` | Heart Rate Zone | client-side |
| `pregnancy-due-date` | Pregnancy Due Date ⚠️ | client-side |

**Tech**: Client formulas, MET tables

---

### 🔍 Group 16: SEO & Website Analysis Tools (Priority 16)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `keyword-density` | Keyword Density Analyzer | client-side |
| `meta-tag-generator` | Meta Tag Generator | client-side |
| `site-speed` | Site Speed Tester | hybrid |
| `broken-link-checker` | Broken Link Checker | server-side |
| `sitemap-generator` | Sitemap Generator | client-side |
| `robots-tester` | Robots.txt Tester | client-side |
| `mobile-friendly` | Mobile-Friendly Checker | hybrid |

**Tech**: Text analysis, 3rd-party services, crawler (rate limited)

---

### 🌐 Group 17: Network & IP Tools (Priority 17)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `ip-lookup` | IP Address Lookup | hybrid |
| `ping` | Ping Tool | hybrid |
| `whois` | WHOIS Lookup | server-side |
| `dns-resolver` | DNS Resolver | server-side |
| `port-checker` | Port Scanner (Basic) ⚠️ | server-side |
| `subnet-calculator` | Subnet Calculator | client-side |

**Tech**: External APIs, DNS queries, IP math (client)

---

### 🌤️ Group 21: Weather & Environment Tools (Priority 21)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `forecast` | Weather Forecast | hybrid |
| `aqi` | Air Quality Index | hybrid |
| `sunrise-sunset` | Sunrise/Sunset Calculator | client-side |
| `uv-index` | UV Index Checker | hybrid |
| `carbon-footprint` | Carbon Footprint Estimator | client-side |
| `tide` | Tide Predictor | hybrid |

**Tech**: Weather API + cache, `suncalc`, AQI API, client formulas

---

### ₿ Group 22: Cryptocurrency Tools (Priority 22)

| Tool ID | Title | Implementation |
|---------|-------|----------------|
| `price-tracker` | Crypto Price Tracker | hybrid |
| `portfolio` | Portfolio Calculator | hybrid |
| `mining-profit` | Mining Profitability | client-side |
| `wallet-validator` | Wallet Address Validator | client-side |
| `fee-estimator` | Transaction Fee Estimator | hybrid |
| `crypto-converter` | Crypto Converter | hybrid |
| `market-cap-ranker` | Market Cap Ranker | hybrid |

**Tech**: CoinGecko API + cache, crypto libs (client), formulas

---

### Developer C Summary

- **Total Groups**: 7
- **Total Tools**: 49
- **Client-side Only**: ~26
- **Hybrid/Server**: ~23
- **Key Skills**: API integration, Rate limiting, Caching, DevOps, Security

---

## 📊 Workload Balance

| Metric | Dev A | Dev B | Dev C |
|--------|-------|-------|-------|
| **Total Groups** | 7 | 8 | 7 |
| **Total Tools** | 49 | 46 | 49 |
| **Client-only Tools** | ~42 | ~28 | ~26 |
| **Hybrid/Server Tools** | ~7 | ~18 | ~23 |
| **API Integration** | Low | Medium | **High** |
| **UI Complexity** | Medium | **High** | Low |
| **Algorithm Complexity** | **High** | Low | Medium |
| **Security Focus** | **High** | Low | **High** |

---

## 🚀 Sprint Plan

### Sprint 1 (Week 1-2) - Foundation
**All devs work together:**
- P0 Foundation (shell, sidebar, search, shared components)
- Deploy infrastructure (rate limiting, caching, error handling)

### Sprint 2 (Week 3-4) - P1 High Priority
| Dev A | Dev B | Dev C |
|-------|-------|-------|
| password (Group 1) | random (Group 4) | dev (Group 7) |
| text (Group 2) | image (Group 5) | - |

### Sprint 3 (Week 5-6) - P1 Completion
| Dev A | Dev B | Dev C |
|-------|-------|-------|
| json (Group 3) | pdf (Group 6) | unit (Group 13) |
| data (Group 8) | - | - |

### Sprint 4+ (Week 7+) - P2/P3
| Dev A | Dev B | Dev C |
|-------|-------|-------|
| datetime (Group 9) | youtube (Group 10) | health (Group 15) |
| math (Group 12) | file-convert (Group 11) | seo (Group 16) |
| finance (Group 14) | language (Group 18) | network (Group 17) |
| - | audio (Group 19) | weather (Group 21) |
| - | video (Group 20) | crypto (Group 22) |

---

## ⚠️ Coordination Points

### Shared Files
1. `src/config/tool-components.tsx` - Single line per tool (coordinate before editing)
2. `src/config/tools.registry.ts` - Status changes only
3. `src/locales/*.json` - Namespace by group

### Branch Strategy
```
feature/dev-a/[group]-[tool]
feature/dev-b/[group]-[tool]
feature/dev-c/[group]-[tool]
```

### Quality Checklist (Per Tool)
- [ ] Component follows template
- [ ] `'use client'` directive
- [ ] Uses shared components from `_shared/`
- [ ] TypeScript types (no `any`)
- [ ] Dark mode support
- [ ] Mobile responsive
- [ ] Translations (5 locales)
- [ ] Registered in `tool-components.tsx`
- [ ] Status updated to `'active'`
- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn build` succeeds
