# Multi-Purpose Tool - Full Feature List

> **Source of Truth**: This document reflects `src/config/tools.registry.ts`  
> **Total**: 22 groups, 144 tools  
> **Last Updated**: December 2025

---

## Overview

**Goal**: Public multi-tools (no login), fast & scalable via **client-side first**, shareable via URL, minimal server usage.

**Routing**: `app/tools/[group]/[tool]/page.tsx`

**UI**: Sidebar groups + Search + Recent + Favorites (local) + Share link.

---

## Global Principles

- **Client-side first**: Web Crypto, Canvas, WebAssembly, Web Workers
- **Server-side only when needed**: Heavy processing, external APIs, CORS proxy
- **Public & multi-user**: No login required; share config via URL
- **Limits**: Upload max 10MB/file (MVP), debounce, abort controller
- **Caching & rate limit**: For API routes
- **Legal/Ethical**: No YouTube MP3/MP4 downloader

---

## Priority Tiers

| Tier | Groups | Description |
|------|--------|-------------|
| **P1** (1-10) | password, text, json, random, image, pdf, dev, data, datetime, youtube | Highest Traffic + Client-only |
| **P2/P3** (11-22) | file-convert, math, unit, finance, health, seo, network, language, audio, video, weather, crypto | Good traffic, may need API/Server |

---

## P1 — Highest Priority Groups (1-10)

### Group 1: Password & Security Tools 🔐
**Priority**: 1 | **Implementation**: Client-side | **Tools**: 8

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `generator` | Password Generator | Generate secure, random passwords with customizable rules |
| 2 | `strength-checker` | Password Strength Checker | Check password strength with entropy scoring and tips |
| 3 | `hash-encode` | Hash / Encode Toolkit | Generate SHA-256, MD5, HMAC hashes and Base64/URL encoding |
| 4 | `jwt-decoder` | JWT Decoder (Local Only) | Decode JWT tokens locally - view header, payload and expiration |
| 5 | `uuid-nanoid` | UUID / NanoID Generator | Generate UUIDs and NanoIDs in batch with various formats |
| 6 | `qr-generator` | QR Code Generator | Create QR codes for text, URLs, vCards with PNG/SVG download |
| 7 | `passphrase-generator` | Passphrase Generator | Generate memorable word-based passphrases that are still secure |
| 8 | `password-policy-checker` | Password Policy Checker | Check passwords against enterprise security policy rules |

**Tech Stack**: `crypto.getRandomValues()`, `zxcvbn`, `crypto-js`, `jwt-decode`, `uuid`, `nanoid`, `qrcode`

---

### Group 2: Text Tools 📝
**Priority**: 2 | **Implementation**: Client-side | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `diff` | Text Diff / Compare | Compare two texts and highlight additions, removals, and changes |
| 2 | `case-converter` | Case Converter | Convert text between camelCase, snake_case, kebab-case, PascalCase + remove diacritics |
| 3 | `regex-tester` | Regex Tester + Highlighter | Test regular expressions with real-time highlighting and group matching |
| 4 | `cleaner` | Text Cleaner | Trim, remove duplicate spaces, empty lines, sort and unique lines |
| 5 | `word-counter` | Word Counter | Count words, characters, sentences with reading time estimation |
| 6 | `markdown-preview` | Markdown Preview + Export HTML | Live markdown editor with preview and HTML export |
| 7 | `slug-generator` | Slug Generator | Generate SEO-friendly URL slugs from any text |

**Tech Stack**: `diff` (jsdiff), `unidecode`, Native RegExp, `react-markdown`, `marked`

---

### Group 3: JSON / YAML / XML Tools { }
**Priority**: 3 | **Implementation**: Client-side | **Tools**: 8

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `format-validate` | JSON Formatter / Minify / Validator | Format, minify and validate JSON with syntax highlighting |
| 2 | `diff` | JSON Diff / Compare | Compare JSON documents with path-based diff highlighting |
| 3 | `schema-generator` | JSON Schema Generator | Generate JSON Schema from JSON data automatically |
| 4 | `convert` | JSON ↔ YAML / XML Converter | Convert between JSON, YAML, and XML formats |
| 5 | `jsonpath` | JSONPath / jq Playground | Query JSON with JSONPath expressions interactively |
| 6 | `json-to-csv` | JSON to CSV Converter | Convert JSON arrays to CSV format for spreadsheets |
| 7 | `sort-keys` | Sort JSON Keys | Sort JSON keys alphabetically for stable output |
| 8 | `flatten-unflatten` | Flatten / Unflatten JSON | Convert nested JSON to/from dot-path notation |

**Tech Stack**: Native JSON, `jsondiffpatch`, `json-schema-generator`, `js-yaml`, `xml2js`, `jsonpath-plus`, `papaparse`

---

### Group 4: Random / Fun Tools 🎲
**Priority**: 4 | **Implementation**: Client-side | **Tools**: 5

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `wheel` | Wheel Spinner / Random Picker | Spin a wheel to pick random items with animation and history |
| 2 | `team-generator` | Random Team Generator | Divide people into random teams with size constraints |
| 3 | `dice-lottery` | Dice / Lottery / Random Name | Roll dice, generate lottery numbers, pick random names |
| 4 | `countdown` | Countdown / Timer Shareable | Create shareable countdown timers via URL |
| 5 | `random-lorem` | Random Number / Lorem Ipsum Generator | Generate random numbers or Lorem Ipsum placeholder text |

**Tech Stack**: Canvas/SVG, `chance`, `seedrandom`, `lorem-ipsum`

---

### Group 5: Image Tools 🖼️
**Priority**: 5 | **Implementation**: Client-first | **Tools**: 5

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `compress` | Image Compressor | Compress images while maintaining quality |
| 2 | `convert` | Convert Format | Convert images between PNG, JPG, WebP formats |
| 3 | `crop-resize-rotate` | Crop / Resize / Rotate | Crop, resize and rotate images with precision |
| 4 | `remove-bg` | Remove Background (Optional) | Remove image backgrounds using AI service (hybrid) |
| 5 | `qr-gen-scan` | QR Code Generator + Scanner | Generate and scan QR codes from images |

**Tech Stack**: `browser-image-compression`, Canvas, `exifr`, `react-easy-crop`, `jsqr`, remove.bg API

---

### Group 6: PDF Tools 📄
**Priority**: 6 | **Implementation**: Client-first (Hybrid for large files) | **Tools**: 5

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `merge-split` | PDF Merge / Split | Merge multiple PDFs into one or split a PDF into parts |
| 2 | `extract-rotate` | Extract / Rotate Pages | Extract specific pages or rotate PDF pages |
| 3 | `watermark` | Add Page Numbers / Watermark | Add page numbers or watermarks to PDF documents |
| 4 | `compress` | Compress (Basic) | Reduce PDF file size with basic compression |
| 5 | `pdf-to-text-images` | PDF to Text / Images | Extract text or images from PDF documents |

**Tech Stack**: `pdf-lib`, `pdfjs-dist`, Canvas

---

### Group 7: Dev Utilities 💻
**Priority**: 7 | **Implementation**: Client-first | **Tools**: 9

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `code-editor-formatter` | Online Code Editor / Formatter | Edit and format code with syntax highlighting (JS/TS/HTML/CSS/JSON) |
| 2 | `lint-typecheck-light` | Lint / Type Check Playground (Light) | Light linting and type checking in browser sandbox |
| 3 | `cron-builder` | Cron Expression Builder | Build and explain cron expressions visually |
| 4 | `timestamp-converter` | Timestamp Converter | Convert between Unix timestamps and readable dates |
| 5 | `curl-converter` | cURL → Fetch / Axios Converter | Convert cURL commands to JavaScript fetch or Axios code |
| 6 | `gitignore-generator` | Git Ignore Generator | Generate .gitignore files for various project types |
| 7 | `api-tester` | API Tester | Test REST APIs directly from browser (with CORS proxy option) |
| 8 | `json-to-ts` | JSON to TypeScript | Generate TypeScript interfaces from JSON data |
| 9 | `openapi-to-types` | OpenAPI to Types | Generate TypeScript types from OpenAPI specifications |

**Tech Stack**: `@monaco-editor/react`, `prettier/standalone`, `cronstrue`, `date-fns`, `curlconverter`

---

### Group 8: Encode/Decode & Data Utilities 🔤
**Priority**: 8 | **Implementation**: Client-side | **Tools**: 6

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `base64` | Base64 Encode/Decode | Encode or decode Base64 strings with Unicode support |
| 2 | `url-parser` | URL Parser | Parse and analyze URL components |
| 3 | `csv-json` | CSV ↔ JSON Converter | Convert between CSV and JSON formats |
| 4 | `number-base` | Number Base Converter | Convert numbers between binary, octal, decimal, hexadecimal |
| 5 | `color-tools` | Color Tools | Convert colors between HEX, RGB, HSL and generate palettes |
| 6 | `file-hash` | File Hash Checker | Calculate SHA-256 hash of files for verification |

**Tech Stack**: `TextEncoder/TextDecoder`, Native URL API, `papaparse`, `chroma-js`, Web Crypto API

---

### Group 9: Date, Time & Calendar Tools 📅
**Priority**: 9 | **Implementation**: Client-side | **Tools**: 6

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `date-diff` | Date Difference Calculator | Calculate the difference between two dates |
| 2 | `timezone-converter` | Timezone Converter | Convert times between different timezones (DST aware) |
| 3 | `age-calculator` | Age Calculator | Calculate exact age from birth date |
| 4 | `ics-planner` | Calendar Event Planner / ICS Export | Create calendar events and export as ICS files |
| 5 | `lunar-converter` | Lunar Calendar Converter | Convert between lunar and solar calendar dates |
| 6 | `weekday-finder` | Weekday Finder | Find what day of the week any date falls on |

**Tech Stack**: `date-fns`, `luxon`, `ics`, `rrule`, lunar lib

---

### Group 10: YouTube Tools (Legal) ▶️
**Priority**: 10 | **Implementation**: Hybrid | **Tools**: 6

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `link-parser` | YouTube Link Parser | Extract video ID, playlist ID and canonical URLs from YouTube links |
| 2 | `metadata` | Metadata Viewer (oEmbed) | View YouTube video title, channel, date, and thumbnails |
| 3 | `thumbnails` | Thumbnail Downloader | Download YouTube video thumbnails in various resolutions |
| 4 | `chapters` | Timestamp / Chapters Builder | Build formatted timestamp chapters for video descriptions |
| 5 | `embed-generator` | Embed Player Generator | Generate YouTube embed iframe code with customization options |
| 6 | `transcript-helper` | Transcript Helper (Optional) | Help format and work with YouTube transcripts |

**Tech Stack**: Regex, oEmbed API + cache, string templates

---

## P2/P3 — Lower Priority Groups (11-22)

### Group 11: File Convert Tools 📁
**Priority**: 11 | **Implementation**: Hybrid | **Tools**: 5

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `md-to-pdf-docx` | Markdown → PDF / DOCX | Convert Markdown documents to PDF or DOCX format |
| 2 | `image-to-pdf` | Image → PDF | Convert images to PDF documents |
| 3 | `pdf-to-text` | PDF → Text | Extract text from PDF documents (non-OCR) |
| 4 | `office-lite-export` | Office-Lite Export | Export simple text/JSON to DOCX/PPTX formats |
| 5 | `unit-converter` | Unit Converter (Bonus) | Convert between various units with currency support |

**Tech Stack**: `docx`, `pdf-lib`, `pdfjs-dist`

---

### Group 12: Math & Calculator Tools 🔢
**Priority**: 12 | **Implementation**: Client-side | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `basic-calculator` | Basic Calculator | Simple calculator for basic arithmetic operations |
| 2 | `scientific-calculator` | Scientific Calculator | Advanced calculator with scientific functions |
| 3 | `equation-solver` | Equation Solver | Solve algebraic equations step by step |
| 4 | `graph-plotter` | Graph Plotter | Plot mathematical functions and equations |
| 5 | `matrix-calculator` | Matrix Calculator | Perform matrix operations like multiplication and inverse |
| 6 | `prime-tools` | Prime Number Checker/Generator | Check if numbers are prime or generate prime sequences |
| 7 | `fraction-simplifier` | Fraction Simplifier | Simplify fractions to their lowest terms |

**Tech Stack**: `mathjs`, `nerdamer`, `function-plot`, `fraction.js`

---

### Group 13: Unit & Measurement Converters 📏
**Priority**: 13 | **Implementation**: Client-side | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `length` | Length Converter | Convert between meters, feet, inches, kilometers, miles |
| 2 | `weight` | Weight Converter | Convert between kilograms, pounds, ounces, grams |
| 3 | `volume` | Volume Converter | Convert between liters, gallons, cups, milliliters |
| 4 | `temperature` | Temperature Converter | Convert between Celsius, Fahrenheit, Kelvin |
| 5 | `area` | Area Converter | Convert between square meters, acres, hectares, square feet |
| 6 | `speed` | Speed Converter | Convert between km/h, mph, m/s, knots |
| 7 | `energy` | Energy Converter | Convert between joules, calories, BTU, kilowatt-hours |

**Tech Stack**: Plain JS (static ratios)

---

### Group 14: Finance & Budget Tools 💰
**Priority**: 14 | **Implementation**: Hybrid (API for currency) | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `currency` | Currency Converter | Convert between currencies with real-time rates |
| 2 | `loan-emi` | Loan/EMI Calculator | Calculate loan EMI, interest, and amortization |
| 3 | `budget-planner` | Budget Planner | Plan and visualize your budget with charts |
| 4 | `investment` | Investment Calculator | Calculate compound interest and investment returns |
| 5 | `tax-estimator` | Tax Estimator ⚠️ | Estimate taxes (for reference only, not tax advice) |
| 6 | `tip-calculator` | Tip Calculator | Calculate tips and split bills among groups |
| 7 | `savings-goal` | Savings Goal Tracker | Track progress toward savings goals |

**Tech Stack**: Currency API + cache, `chart.js`, client formulas

---

### Group 15: Health & Fitness Calculators 💪
**Priority**: 15 | **Implementation**: Client-side (with disclaimers) | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `bmi` | BMI Calculator ⚠️ | Calculate Body Mass Index from height and weight |
| 2 | `calories-burn` | Calorie Burn Estimator ⚠️ | Estimate calories burned based on activity and duration |
| 3 | `body-fat` | Body Fat Percentage ⚠️ | Estimate body fat percentage using Navy method |
| 4 | `water-intake` | Water Intake Calculator | Calculate recommended daily water intake |
| 5 | `sleep-cycle` | Sleep Cycle Calculator | Calculate optimal sleep and wake times based on sleep cycles |
| 6 | `heart-rate-zone` | Heart Rate Zone | Calculate target heart rate zones for exercise |
| 7 | `pregnancy-due-date` | Pregnancy Due Date ⚠️ | Estimate pregnancy due date from last period |

**Tech Stack**: Client formulas, MET tables

---

### Group 16: SEO & Website Analysis Tools 🔍
**Priority**: 16 | **Implementation**: Hybrid | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `keyword-density` | Keyword Density Analyzer | Analyze keyword density in text or from URL |
| 2 | `meta-tag-generator` | Meta Tag Generator | Generate SEO-optimized meta tags for your pages |
| 3 | `site-speed` | Site Speed Tester | Test website loading speed and performance |
| 4 | `broken-link-checker` | Broken Link Checker | Check for broken links on a webpage |
| 5 | `sitemap-generator` | Sitemap Generator | Generate XML sitemaps for websites |
| 6 | `robots-tester` | Robots.txt Tester | Test and validate robots.txt files |
| 7 | `mobile-friendly` | Mobile-Friendly Checker | Check if a webpage is mobile-friendly |

**Tech Stack**: Text analysis, 3rd-party services, crawler (rate limited)

---

### Group 17: Network & IP Tools 🌐
**Priority**: 17 | **Implementation**: Server + STRICT rate limit | **Tools**: 6

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `ip-lookup` | IP Address Lookup | Look up IP address geolocation and details |
| 2 | `ping` | Ping Tool | Measure latency to a URL or IP address |
| 3 | `whois` | WHOIS Lookup | Look up domain registration information |
| 4 | `dns-resolver` | DNS Resolver | Resolve domain names to IP addresses |
| 5 | `port-checker` | Port Scanner (Basic) ⚠️ | Check if specific ports are open (limited scope) |
| 6 | `subnet-calculator` | Subnet Calculator | Calculate subnet ranges, CIDR notation, and IP math |

**Tech Stack**: External APIs, DNS queries, IP math (client)

---

### Group 18: Language & Translation Tools 🌍
**Priority**: 18 | **Implementation**: Hybrid | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `translator` | Text Translator | Translate text between languages |
| 2 | `spell-checker` | Spell Checker | Check spelling in multiple languages |
| 3 | `grammar-checker` | Grammar Checker | Check grammar and writing style |
| 4 | `synonym-finder` | Synonym Finder | Find synonyms and related words |
| 5 | `language-detector` | Language Detector | Detect the language of text automatically |
| 6 | `morse` | Morse Code Converter | Convert text to/from Morse code |
| 7 | `braille` | Braille Converter | Convert text to/from Braille notation |

**Tech Stack**: LibreTranslate/API, Hunspell, LanguageTool API, `franc`

---

### Group 19: Audio Tools 🎵
**Priority**: 19 | **Implementation**: Client-side (Heavy) | **Tools**: 6

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `audio-converter` | Audio Converter | Convert audio files between formats |
| 2 | `volume-normalizer` | Volume Normalizer | Normalize audio volume levels |
| 3 | `bpm-detector` | BPM Detector | Detect beats per minute in audio files |
| 4 | `audio-cutter` | Audio Cutter | Cut and trim audio files |
| 5 | `tts` | Text to Speech | Convert text to spoken audio |
| 6 | `sfx-generator` | Sound Effect Generator | Generate simple sound effects and tones |

**Tech Stack**: `ffmpeg.wasm`, Web Audio API, `music-metadata`, `wavesurfer.js`, Web Speech API, `tone`

---

### Group 20: Video Tools 🎬
**Priority**: 20 | **Implementation**: Server-side (Heavy) | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `video-compressor` | Video Compressor | Compress video files to reduce size |
| 2 | `format-converter` | Format Converter | Convert videos between different formats |
| 3 | `frame-extractor` | Frame Extractor | Extract frames/screenshots from videos |
| 4 | `subtitle-generator` | Subtitle Generator | Generate subtitles using speech-to-text |
| 5 | `video-merger` | Video Merger | Merge multiple video files into one |
| 6 | `gif-maker` | GIF Maker | Create GIFs from video clips |
| 7 | `resolution-changer` | Resolution Changer | Change video resolution and aspect ratio |

**Tech Stack**: Server ffmpeg, Canvas, Speech-to-text API, `gif.js`

---

### Group 21: Weather & Environment Tools 🌤️
**Priority**: 21 | **Implementation**: Hybrid | **Tools**: 6

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `forecast` | Weather Forecast | Get weather forecasts for any location |
| 2 | `aqi` | Air Quality Index | Check air quality index for locations |
| 3 | `sunrise-sunset` | Sunrise/Sunset Calculator | Calculate sunrise and sunset times for any date and location |
| 4 | `uv-index` | UV Index Checker | Check UV index and sun protection recommendations |
| 5 | `carbon-footprint` | Carbon Footprint Estimator | Estimate carbon footprint from activities |
| 6 | `tide` | Tide Predictor | Check tide times and heights for coastal locations |

**Tech Stack**: Weather API + cache, `suncalc`, AQI API, client formulas

---

### Group 22: Cryptocurrency Tools ₿
**Priority**: 22 | **Implementation**: Hybrid | **Tools**: 7

| # | Tool ID | Title | Description |
|---|---------|-------|-------------|
| 1 | `price-tracker` | Crypto Price Tracker | Track real-time cryptocurrency prices |
| 2 | `portfolio` | Portfolio Calculator | Calculate cryptocurrency portfolio value |
| 3 | `mining-profit` | Mining Profitability | Calculate cryptocurrency mining profitability |
| 4 | `wallet-validator` | Wallet Address Validator | Validate cryptocurrency wallet addresses |
| 5 | `fee-estimator` | Transaction Fee Estimator | Estimate transaction fees for different networks |
| 6 | `crypto-converter` | Crypto Converter | Convert between cryptocurrencies |
| 7 | `market-cap-ranker` | Market Cap Ranker | View cryptocurrencies ranked by market cap |

**Tech Stack**: CoinGecko API + cache, crypto libs (client), formulas

---

## Summary

| Metric | Count |
|--------|-------|
| **Total Groups** | 22 |
| **Total Tools** | 144 |
| **P1 Groups** | 10 (65 tools) |
| **P2/P3 Groups** | 12 (79 tools) |
| **Client-side Only** | ~100 tools |
| **Hybrid/Server** | ~44 tools |

---

## Implementation Notes

### Suggested Libraries

| Category | Library |
|----------|---------|
| UI | `tailwindcss`, `shadcn/ui`, `lucide-react`, `clsx` |
| Forms | `react-hook-form`, `zod` |
| State Share | `lz-string` (compress), `query-string` |
| Fetching | `@tanstack/react-query` |
| Rate Limit | Upstash Redis / Vercel KV |

### File Structure

```
src/features/tools/[group]/[tool]/
├── index.ts                    # Re-export default
├── [ToolName].tsx              # Main component
├── hooks/                      # Tool-specific hooks
└── utils/                      # Pure utility functions
```

### Status Workflow

1. Tool defined in `tools.registry.ts` with `status: 'coming-soon'`
2. Component created in `src/features/tools/[group]/[tool]/`
3. Component registered in `src/config/tool-components.tsx`
4. Status updated to `'active'` in registry
