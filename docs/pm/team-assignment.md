# Team Assignment - Multi-Purpose Tool Development

> **Tổng quan**: 22 nhóm công cụ, ~150+ tools. Chia đều cho 3 thành viên theo độ khó và tác động.

---

## 📋 Tổng Quan Phân Công

| Thành viên | Nhóm công cụ | Số tools | Độ khó | Focus chính |
|------------|--------------|----------|---------|-------------|
| **Developer A** | 7 groups | ~50 tools | ⭐⭐⭐⭐ | Security, Data, Text Processing |
| **Developer B** | 8 groups | ~53 tools | ⭐⭐⭐ | Media, UI/UX, Fun Tools |
| **Developer C** | 7 groups | ~50 tools | ⭐⭐⭐⭐ | Dev Tools, API Integration, Complex Logic |

---

## 👤 Developer A - Security & Data Specialist

### Assigned Groups (Priority 1, 2, 3, 8, 12, 13, 15)

#### 🔐 Group 1: Password & Security Tools (Priority 1)
**Status**: P1 - Highest Traffic + Client-only  
**Tools**: 8 tools
- Password Generator
- Password Strength Checker
- Hash / Encode Toolkit
- JWT Decoder (Local Only)
- UUID / NanoID Generator
- QR Code Generator
- Passphrase Generator
- Password Policy Checker

**Tech Stack**: `crypto.getRandomValues()`, `zxcvbn`, `crypto-js`, `jwt-decode`, `uuid`, `nanoid`, `qrcode`

---

#### 📝 Group 2: Text Tools (Priority 2)
**Status**: P1 - Client-only  
**Tools**: 7 tools
- Text Diff / Compare
- Case Converter
- Regex Tester + Highlighter
- Text Cleaner
- Word Counter
- Markdown Preview + Export HTML
- Slug Generator

**Tech Stack**: `jsdiff`, `unidecode`, Native RegExp, `react-markdown`, `marked`

---

#### { } Group 3: JSON / YAML / XML Tools (Priority 3)
**Status**: P1 - Client-first  
**Tools**: 8 tools
- JSON Formatter / Minify / Validator
- JSON Diff / Compare
- JSON Schema Generator
- JSON ↔ YAML / XML Converter
- JSONPath / jq Playground
- JSON to CSV Converter
- Sort JSON Keys
- Flatten / Unflatten JSON

**Tech Stack**: Native JSON, `jsondiffpatch`, `json-schema-generator`, `js-yaml`, `xml2js`, `jsonpath-plus`, `papaparse`

---

#### 🔤 Group 8: Encode/Decode & Data Utilities (Priority 8)
**Status**: P2 - Client-only  
**Tools**: 6 tools
- Base64 Encode/Decode
- URL Parser
- CSV ↔ JSON Converter
- Number Base Converter
- Color Tools (HEX↔RGB↔HSL)
- File Hash Checker (SHA-256)

**Tech Stack**: `TextEncoder/TextDecoder`, Native URL API, `papaparse`, `chroma-js`, Web Crypto API

---

#### 🔢 Group 12: Math & Calculator Tools (Priority 12)
**Status**: P3 - Client-only  
**Tools**: 7 tools
- Basic Calculator
- Scientific Calculator
- Equation Solver
- Graph Plotter
- Matrix Calculator
- Prime Number Checker/Generator
- Fraction Simplifier

**Tech Stack**: `mathjs`, `nerdamer`, `function-plot`, `fraction.js`

---

#### 💰 Group 13: Finance & Budget Tools (Priority 14)
**Status**: P4 - Hybrid (API-heavy)  
**Tools**: 7 tools
- Currency Converter (real-time API)
- Loan/EMI Calculator
- Budget Planner
- Investment Calculator
- Tax Estimator (with disclaimer)
- Tip Calculator
- Savings Goal Tracker

**Tech Stack**: Currency API + cache, `chart.js`, client formulas

---

#### 📅 Group 15: Date, Time & Calendar Tools (Priority 9)
**Status**: P3 - Client-only  
**Tools**: 6 tools
- Date Difference Calculator
- Timezone Converter (DST aware)
- Age Calculator
- Calendar Event Planner / ICS Export
- Lunar Calendar Converter
- Weekday Finder

**Tech Stack**: `date-fns`, `luxon`, `ics`, `rrule`, lunar lib

---

### Developer A Summary
- **Total Groups**: 7
- **Total Tools**: ~49 tools
- **Difficulty**: ⭐⭐⭐⭐ (High - Security, Complex Data Manipulation)
- **Key Strengths Needed**: TypeScript, Cryptography, Data structures, Algorithms
- **External Dependencies**: Mostly client-side, minimal API integration

---

## 👤 Developer B - Media & UX Specialist

### Assigned Groups (Priority 4, 5, 6, 10, 11, 18, 19, 20)

#### 🎲 Group 4: Random / Fun Tools (Priority 4)
**Status**: P1 - Client-only + Share virality  
**Tools**: 5 tools
- Wheel Spinner / Random Picker
- Random Team Generator
- Dice / Lottery / Random Name
- Countdown / Timer Shareable
- Random Number / Lorem Ipsum Generator

**Tech Stack**: Canvas/SVG, `chance`, `seedrandom`, `lorem-ipsum`

---

#### 🖼️ Group 5: Image Tools (Priority 5)
**Status**: P2 - Client-first  
**Tools**: 5 tools
- Image Compressor
- Convert Format (PNG↔JPG↔WebP)
- Crop / Resize / Rotate
- Remove Background (Optional, API)
- QR Code Generator + Scanner

**Tech Stack**: `browser-image-compression`, Canvas, `exifr`, `react-easy-crop`, `jsqr`, remove.bg API

---

#### 📄 Group 6: PDF Tools (Priority 6)
**Status**: P2 - Hybrid  
**Tools**: 5 tools
- PDF Merge / Split
- Extract / Rotate Pages
- Add Page Numbers / Watermark
- Compress (Basic)
- PDF to Text / Images

**Tech Stack**: `pdf-lib`, `pdfjs-dist`, Canvas

---

#### ▶️ Group 10: YouTube Tools (Legal) (Priority 10)
**Status**: P3 - Hybrid  
**Tools**: 6 tools
- YouTube Link Parser
- Metadata Viewer (oEmbed)
- Thumbnail Downloader
- Timestamp / Chapters Builder
- Embed Player Generator
- Transcript Helper (Optional)

**Tech Stack**: Regex, oEmbed API + cache, string templates

---

#### 📁 Group 11: File Convert Tools (Priority 11)
**Status**: P3 - Hybrid  
**Tools**: 5 tools
- Markdown → PDF / DOCX
- Image → PDF
- PDF → Text
- Office-Lite Export
- Unit Converter (Bonus)

**Tech Stack**: `docx`, `pdf-lib`, `pdfjs-dist`

---

#### 🌍 Group 18: Language & Translation Tools (Priority 18)
**Status**: P4 - Hybrid  
**Tools**: 7 tools
- Text Translator (LibreTranslate API)
- Spell Checker (Hunspell API)
- Grammar Checker (LanguageTool API)
- Synonym Finder (API)
- Language Detector
- Morse Code Converter
- Braille Converter

**Tech Stack**: LibreTranslate/API, Hunspell, LanguageTool API, `franc`

---

#### 🎵 Group 19: Audio Tools (Priority 19)
**Status**: P4 - Heavy  
**Tools**: 6 tools
- Audio Converter
- Volume Normalizer
- BPM Detector
- Audio Cutter
- Text to Speech
- Sound Effect Generator

**Tech Stack**: `ffmpeg.wasm`, Web Audio API, `music-metadata`, `wavesurfer.js`, Web Speech API, `tone`

---

#### 🎬 Group 20: Video Tools (Priority 20)
**Status**: P4 - Very Heavy  
**Tools**: 7 tools
- Video Compressor
- Format Converter
- Frame Extractor
- Subtitle Generator
- Video Merger
- GIF Maker
- Resolution Changer

**Tech Stack**: Server ffmpeg, Canvas, Speech-to-text API, `gif.js`

---

### Developer B Summary
- **Total Groups**: 8
- **Total Tools**: ~46 tools
- **Difficulty**: ⭐⭐⭐ (Medium - Media processing, UX-heavy)
- **Key Strengths Needed**: Canvas API, Media processing, UX/UI design, Animation
- **External Dependencies**: Mixed (client + server for heavy processing)

---

## 👤 Developer C - DevOps & Integration Specialist

### Assigned Groups (Priority 7, 14, 16, 17, 21, 22, 9)

#### 💻 Group 7: Dev Utilities (Priority 7)
**Status**: P2 - Client-first  
**Tools**: 9 tools
- Online Code Editor / Formatter
- Lint / Type Check Playground (Light)
- Cron Expression Builder
- Timestamp Converter
- cURL → Fetch / Axios Converter
- Git Ignore Generator
- API Tester (with CORS proxy)
- JSON to TypeScript
- OpenAPI to Types

**Tech Stack**: `@monaco-editor/react`, `prettier/standalone`, `cronstrue`, `date-fns`, `curlconverter`

---

#### 📏 Group 14: Unit & Measurement Converters (Priority 13)
**Status**: P3 - Client-only  
**Tools**: 7 tools
- Length Converter
- Weight Converter
- Volume Converter
- Temperature Converter
- Area Converter
- Speed Converter
- Energy Converter

**Tech Stack**: Plain JS (static ratios)

---

#### 💪 Group 15: Health & Fitness Calculators (Priority 15)
**Status**: P4 - Client-only + disclaimers  
**Tools**: 7 tools
- BMI Calculator
- Calorie Burn Estimator
- Body Fat Percentage
- Water Intake Calculator
- Sleep Cycle Calculator
- Heart Rate Zone
- Pregnancy Due Date

**Tech Stack**: Client formulas, MET tables

---

#### 🔍 Group 16: SEO & Website Analysis Tools (Priority 16)
**Status**: P4 - Hybrid  
**Tools**: 7 tools
- Keyword Density Analyzer
- Meta Tag Generator
- Site Speed Tester
- Broken Link Checker
- Sitemap Generator
- Robots.txt Tester
- Mobile-Friendly Checker

**Tech Stack**: Text analysis, 3rd-party services, crawler (rate limited)

---

#### 🌐 Group 17: Network & IP Tools (Priority 17)
**Status**: P4 - Server + STRICT rate limit  
**Tools**: 6 tools
- IP Address Lookup
- Ping Tool (latency check)
- WHOIS Lookup
- DNS Resolver
- Port Scanner (Basic) - **High abuse risk, restrict heavily**
- Subnet Calculator

**Tech Stack**: External APIs, DNS queries, IP math (client)

---

#### 🌤️ Group 21: Weather & Environment Tools (Priority 21)
**Status**: P4 - Hybrid  
**Tools**: 6 tools
- Weather Forecast
- Air Quality Index
- Sunrise/Sunset Calculator
- UV Index Checker
- Carbon Footprint Estimator
- Tide Predictor

**Tech Stack**: Weather API + cache, `suncalc`, AQI API, client formulas

---

#### ₿ Group 22: Cryptocurrency Tools (Priority 22)
**Status**: P4 - Hybrid  
**Tools**: 7 tools
- Crypto Price Tracker
- Portfolio Calculator
- Mining Profitability
- Wallet Address Validator
- Transaction Fee Estimator
- Crypto Converter
- Market Cap Ranker

**Tech Stack**: CoinGecko API + cache, crypto libs (client), formulas

---

### Developer C Summary
- **Total Groups**: 7
- **Total Tools**: ~49 tools
- **Difficulty**: ⭐⭐⭐⭐ (High - API Integration, Rate Limiting, Security)
- **Key Strengths Needed**: API integration, Rate limiting, Caching, DevOps, Security
- **External Dependencies**: Heavy API usage (require caching + rate limiting)

---

## 🚀 Suggested Implementation Order

### Sprint 1 (Week 1-2) - MVP Foundation
**All devs work together:**
- P0 Foundation (shell, sidebar, search, shared components)
- Deploy infrastructure (rate limiting, caching, error handling)

### Sprint 2 (Week 3-4) - P1 Tools (High Traffic)
- **Dev A**: Password (Group 1) + Text (Group 2) core tools
- **Dev B**: Random (Group 4) + Image basic (Group 5)
- **Dev C**: Dev Utilities core (Group 7)

### Sprint 3 (Week 5-6) - P1 Completion + P2 Start
- **Dev A**: JSON (Group 3) + Data (Group 8)
- **Dev B**: PDF (Group 6)
- **Dev C**: Unit Converters (Group 14)

### Sprint 4+ (Week 7+) - P3/P4 API-heavy groups
- **Dev A**: Finance (Group 13) + DateTime (Group 15)
- **Dev B**: YouTube (Group 10) + Language (Group 18)
- **Dev C**: SEO (Group 16) + Network (Group 17) + Weather (Group 21) + Crypto (Group 22)

---

## 📊 Workload Balance Analysis

| Metric | Dev A | Dev B | Dev C |
|--------|-------|-------|-------|
| **Total Tools** | ~49 | ~46 | ~49 |
| **Client-only Tools** | ~42 | ~23 | ~26 |
| **Hybrid/Server Tools** | ~7 | ~23 | ~23 |
| **API Integration** | Low | Medium | **High** |
| **UI Complexity** | Medium | **High** | Low |
| **Algorithm Complexity** | **High** | Low | Medium |
| **Security Focus** | **High** | Low | **High** |

---

## ⚠️ Critical Coordination Points

### Files Requiring Coordination
1. `src/config/tool-components.tsx` - Single line per tool (coordinate before editing)
2. `src/config/tools.registry.ts` - Status changes only (minimal conflicts)
3. `src/locales/*.json` - Translation additions (namespace by group)

### Shared Resources
- `src/features/tools/_shared/` - All devs use, coordinate before changing
- Rate limiting middleware (Dev C owns, others use)
- Caching strategy (Dev C owns, others use)

### Branch Strategy
```
feature/dev-a/[group]-[tool]
feature/dev-b/[group]-[tool]
feature/dev-c/[group]-[tool]
```

---

## 📝 Per-Developer Checklist

### Before Starting
- [ ] Read `.github/copilot-instructions.md`
- [ ] Read `.bmad/docs/project-coding-standards.md`
- [ ] Set up tool folder structure: `src/features/tools/[group]/[tool]/`
- [ ] Review assigned group priorities

### During Development
- [ ] Follow component template pattern
- [ ] Use shared components from `_shared/`
- [ ] Add translations to `src/locales/`
- [ ] Register component in `tool-components.tsx`
- [ ] Update status in `tools.registry.ts`
- [ ] Test dark mode
- [ ] Test responsive design

### Before PR
- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn build` succeeds
- [ ] Translations complete for all 5 locales
- [ ] Commit messages follow convention
- [ ] Branch name follows convention

---

## 🎯 Success Metrics

### Sprint Goals
- **Sprint 1**: Foundation complete, 0 tools active → Infrastructure ready
- **Sprint 2**: 15-20 P1 tools active → MVP launchable
- **Sprint 3**: 30-40 tools active → Strong tool library
- **Sprint 4+**: 50+ tools active → Comprehensive platform

### Quality Metrics
- [ ] All tools have client-side first implementation
- [ ] All API routes have rate limiting
- [ ] All tools support dark mode
- [ ] All tools are mobile-responsive
- [ ] All tools support URL sharing
- [ ] 100% TypeScript coverage (no `any`)

---

## 📞 Communication Channels

### Daily Standups
- What did you complete?
- What are you working on today?
- Any blockers?

### Weekly Sync
- Review progress against sprint goals
- Resolve any architectural decisions
- Coordinate shared resource changes

### Code Reviews
- Each PR requires 1 approval from another dev
- Focus on: architecture, security, performance, UX
- Use PR templates for consistency

---

*Last updated: December 13, 2024*
