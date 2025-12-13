
# multi-tools-plan-full.md

Multi Tools Website (Next.js) — Full Feature List + Priority Roadmap (ALL GROUPS INCLUDED)

Goal: Public multi-tools (no login), fast & scalable via **client-side first**, shareable via URL, minimal server usage.
Routing: `app/tools/[group]/[tool]/page.tsx`
UI: Sidebar groups + Search + Recent + Favorites (local) + Share link.

---

## A) Global Principles (MVP Defaults)

- **Client-side first**: Web Crypto, Canvas, WebAssembly, Web Workers → scale tốt, rẻ, nhanh.
- **Server-side (API routes) only when needed**:
  - PDF processing nặng / file lớn
  - External API calls (YouTube oEmbed, currency, weather, crypto…)
  - CORS proxy cho “API Tester” (optional)
- **Public & multi-user**: không cần login; share config qua URL:
  - nhẹ: query params (`?text=...`)
  - nặng: hash state (compress) `#state=...` (không gửi server)
- **Limits**: upload max **10MB/file** (MVP), debounce, abort controller.
- **Caching & rate limit** (cho API routes): cache response + giới hạn theo IP.
- **Legal/Ethical**: Không làm YouTube MP3/MP4 downloader. Chỉ metadata/thumbnail/embed/chapter tools hợp lệ.

Suggested core libs (UI & DX):

- UI: `tailwindcss`, `shadcn/ui`, `lucide-react`, `clsx`
- Forms/validation: `react-hook-form`, `zod`
- State share: `lz-string` (compress), `query-string`
- Fetching (optional): `@tanstack/react-query`
- Rate limit/cache (server): Upstash Redis / Vercel KV + simple IP limiter (tuỳ bạn chọn)

---

## B) Priority Roadmap (tối ưu traffic + dễ ship)

> Mỗi Group vẫn giữ **đầy đủ tools bạn liệt kê** + mình **gợi ý thêm** (không xoá thiếu).

### P0 — Foundation (làm trước khi nhồi tool)

- App shell: sidebar, search, tool card list, SEO
- Shared components: file dropzone, editor panel, result panel, copy/download buttons
- URL share helpers + “Reset”
- Error boundary + toasts + analytics (basic)

---

## P1 — Highest Traffic + Client-only (MVP nên làm đầu)

### 1) Password & Security Tools (Client-only)

**Tools (đủ + thêm):**

- Password Generator — rules + copy; **Web Crypto** `crypto.getRandomValues()`
  - Libs: (optional) `generate-password`
- Password Strength Checker — entropy/score + tips
  - Libs: `zxcvbn`
- Hash / Encode Toolkit — SHA-256/MD5/HMAC + Base64/URL encode/decode
  - Libs: Web Crypto (SHA-256/HMAC), optional `crypto-js` (MD5)
- JWT Decoder (Local-only) — decode header/payload + exp checker
  - Libs: `jwt-decode`
- UUID / NanoID Generator — batch generate
  - Libs: `uuid`, `nanoid`
- QR Code Generator — text/url/vCard → PNG/SVG download
  - Libs: `qrcode`

**Extra suggestions (nice):**

- Passphrase Generator (word-based) — dễ nhớ, vẫn mạnh
- Password Policy Checker (enterprise rules)

**Next.js notes:** `use client`, không gửi dữ liệu lên server.

---

### 2) Text Tools (Client-only)

**Tools:**

- Text Diff / Compare — highlight add/remove/change
  - Libs: `diff` (jsdiff)
- Case Converter — camel/snake/kebab/Pascal + remove diacritics (VN)
  - Libs: `unidecode` (or Unicode normalize)
- Regex Tester + Highlighter — flags/groups + highlight matches
  - Libs: native `RegExp`
- Text Cleaner — trim, remove dup spaces, empty lines, sort/unique
  - Libs: plain JS
- Word Counter — words/chars/sentences + reading time
  - Libs: plain JS
- Markdown Preview + Export HTML — editor + preview
  - Libs: `react-markdown` (preview), optional `marked` (export HTML)

**Extra suggestions:**

- Slug Generator (SEO-friendly)
- Remove Duplicate Paragraphs / Sort by length

**Next.js notes:** editor MVP dùng textarea, nâng cấp sau bằng `@monaco-editor/react`.

---

### 3) JSON / YAML / XML Tools (Client-first)

**Tools:**

- JSON Formatter / Minify / Validator
  - Libs: `JSON.parse/stringify`
- JSON Diff / Compare (path-based)
  - Libs: `deep-diff` hoặc `jsondiffpatch`
- JSON Schema Generator
  - Libs: `json-schema-generator` (hoặc lib tương đương)
- JSON ↔ YAML / XML Converter
  - Libs: `js-yaml`, `xml2js`
- JSONPath / jq Playground
  - Libs: `jsonpath-plus`
- JSON to CSV Converter
  - Libs: `papaparse`

**Extra suggestions:**

- “Sort JSON keys” (stable output)
- “Flatten / Unflatten JSON” (dot-path)

**Next.js notes:** JSON lớn → chạy diff/format trong Web Worker để không đơ UI.

---

### 8) Random / Fun Tools (Client-only, share tốt)

**Tools:**

- Wheel Spinner / Random Picker — list items + animation + history + share
  - Libs: tự code canvas/SVG hoặc lib wheel
- Random Team Generator — chia nhóm theo size/constraints
  - Libs: plain JS (shuffle)
- Dice / Lottery / Random Name — seed “công bằng”
  - Libs: `chance` hoặc `seedrandom`
- Countdown / Timer Shareable — share start time qua URL
  - Libs: plain React timer
- Random Number / Lorem Ipsum Generator
  - Libs: `lorem-ipsum` (optional)

**Extra suggestions:**

- “Random decision tree” / “Yes-No picker”
- “Bracket generator” (tournament)

---

## P2 — High Value nhưng có thể cần Worker/Server nhẹ

### 5) Image Tools (Client-first)

**Tools:**

- Image Compressor — quality/resize
  - Libs: `browser-image-compression`
- Convert Format — PNG↔JPG↔WebP + keep EXIF (tuỳ)
  - Libs: Canvas; EXIF đọc bằng `exifr` (optional)
- Crop / Resize / Rotate
  - Libs: `react-easy-crop` (hoặc cropper lib)
- Remove Background (Optional) — AI service (tốn phí)
  - Libs: gọi API (remove.bg hoặc service khác), server proxy để giấu key
- QR Code Generator + Scanner
  - Libs: `qrcode` (gen), `jsqr` (scan)

**Extra suggestions:**

- EXIF remover (privacy) — xoá metadata trước khi tải xuống
- Image watermark (text/logo) — Canvas

---

### 4) PDF Tools (Hybrid)

**Tools:**

- PDF Merge / Split
- Extract / Rotate Pages
- Add Page Numbers / Watermark
- Compress (Basic)
- PDF to Text / Images

**Implementation hướng Next.js:**

- MVP (10MB): client-side `pdf-lib` cho merge/split/rotate/watermark.
  - Libs: `pdf-lib`, `pdfjs-dist` (extract text)
- PDF → images bulk / file lớn: server route (API) + giới hạn + rate limit.
  - Libs server: `pdfjs-dist` (render) hoặc pipeline phù hợp; cache + queue nếu cần

**Extra suggestions:**

- PDF metadata viewer (title/author/pages)
- “Remove password” (chỉ khi user cung cấp password; cân nhắc kỹ UX)

---

### 6) Dev Utilities (Client-first; một số optional server)

**Tools:**

- Online Code Editor / Formatter — JS/TS/HTML/CSS/JSON + Prettier
  - Libs: `@monaco-editor/react`, `prettier/standalone`
- Lint / Type Check Playground (Light)
  - Libs: (nếu làm) sandbox; lưu ý nặng, có thể postpone
- Cron Expression Builder
  - Libs: `cronstrue`
- Timestamp Converter
  - Libs: `date-fns` (nhẹ) hoặc `luxon` (timezone mạnh)
- cURL → Fetch / Axios Converter
  - Libs: `curlconverter`
- Git Ignore Generator
  - Libs: template local JSON (khuyến nghị) hoặc fetch (cache)
- API Tester
  - Libs: Fetch API (client). Nếu CORS, thêm **server proxy** (rate limit).

**Extra suggestions:**

- “OpenAPI → TypeScript types” (nâng cao)
- “JSON → TypeScript interface” (dev rất hay dùng)

---

### 7) Encode/Decode & Data Utilities (Client-only)

**Tools:**

- Base64 Encode/Decode
  - Libs: `TextEncoder/TextDecoder` (tránh lỗi Unicode), fallback `atob/btoa`
- URL Parser
  - Libs: native `URL`
- CSV ↔ JSON Converter
  - Libs: `papaparse`
- Number Base Converter
  - Libs: plain JS
- Color Tools (HEX↔RGB↔HSL, palette)
  - Libs: `chroma-js`
- File Hash Checker (SHA-256)
  - Libs: Web Crypto API

**Extra suggestions:**

- “URLEncode bulk lines”
- “Checksum verify” (compare hash)

---

## P3 — Good traffic, nhưng “nice-to-have” / phụ thuộc dữ liệu/API

### 9) YouTube Tools (Hợp lệ)

**Tools:**

- YouTube Link Parser — extract videoId/playlistId + canonical URL
  - Libs: regex + URL parser
- Metadata Viewer — title/channel/date/thumbnail (oEmbed)
  - Implementation: API route fetch oEmbed + cache + rate limit
- Thumbnail Downloader — generate thumbnail URLs by videoId
  - Libs: string templates
- Timestamp / Chapters Builder — format chuẩn cho description
  - Libs: plain JS
- Embed Player Generator — iframe code + options
  - Libs: plain JS
- Transcript Helper — **chỉ nếu có nguồn hợp lệ**
  - Note: nếu không chắc nguồn, để “Optional / Later”

**Extra suggestions:**

- “Playlist cleaner” (dedupe URLs)
- “Shorts ↔ watch URL converter”

---

### 10) File Convert Tools (Hybrid)

**Tools:**

- Markdown → PDF / DOCX
  - Libs: server-side `docx` (DOCX), PDF export tuỳ pipeline
- Image → PDF
  - Libs: `pdf-lib` (server hoặc client)
- PDF → Text (non-OCR)
  - Libs: `pdfjs-dist` (client)
- Office-Lite Export (Text/JSON → DOCX/PPTX đơn giản)
  - Libs: `docx` (DOCX), PPTX tuỳ chọn (nâng cao)
- Unit Converter (Bonus)
  - Libs: plain JS; currency nếu có thì API + cache

**Extra suggestions:**

- HTML → PDF (server) (rất hay dùng)

---

### 11) Math & Calculator Tools (Client-only)

**Tools:**

- Basic Calculator
  - Libs: `mathjs` (eval an toàn hơn tự eval)
- Scientific Calculator
  - Libs: `mathjs`
- Equation Solver
  - Libs: `nerdamer` hoặc `mathjs` (tuỳ mức)
- Graph Plotter
  - Libs: `function-plot`
- Matrix Calculator
  - Libs: `mathjs`
- Prime Checker/Generator
  - Libs: plain JS (sieve)
- Fraction Simplifier
  - Libs: `fraction.js`

**Extra suggestions:**

- Percentage calculator (sale/discount)
- Statistics quick calc (mean/median)

---

### 12) Unit & Measurement Converters (Client-only)

**Tools:**

- Length, Weight, Volume, Temperature, Area, Speed, Energy converters
  - Libs: plain JS ratios (data static)

**Extra suggestions:**

- Cooking converter (cups↔ml) preset
- “Batch convert table” mode

---

### 15) Date, Time & Calendar Tools (Client-only)

**Tools:**

- Date Difference Calculator
  - Libs: `date-fns`
- Timezone Converter (DST aware)
  - Libs: `luxon`
- Age Calculator
  - Libs: `date-fns`
- Calendar Event Planner → export ICS
  - Libs: `ics`, optional `rrule`
- Lunar Calendar Converter (VN/Asia)
  - Libs: lunar lib (tuỳ bạn chọn)
- Weekday Finder
  - Libs: native Date

**Extra suggestions:**

- “Business days calculator” (exclude weekends/holidays)

---

## P4 — API-heavy / quota / risk abuse (làm sau, cần guardrails)

### 13) Finance & Budget Tools (Hybrid)

**Tools:**

- Currency Converter (real-time) — API + cache
- Loan/EMI Calculator — client formula
- Budget Planner — charts + localStorage
  - Libs: `chart.js` hoặc chart lib khác
- Investment Calculator — client formula
- Tax Estimator — **disclaimer** (không tư vấn pháp lý)
- Tip Calculator — client
- Savings Goal Tracker — client

**Extra suggestions:**

- Inflation calculator (static)
- Expense split calculator

---

### 14) Health & Fitness Calculators (Client-only + disclaimers)

**Tools:**

- BMI Calculator
- Calorie Burn Estimator (MET tables)
- Body Fat Percentage (Navy method)
- Water Intake Calculator
- Sleep Cycle Calculator
- Heart Rate Zone
- Pregnancy Due Date (disclaimer)

**Extra suggestions:**

- Macro calculator (protein/carb/fat) (disclaimer)

---

### 16) SEO & Website Analysis Tools (Hybrid)

**Tools:**

- Keyword Density Analyzer (text/URL)
- Meta Tag Generator
- Site Speed Tester (thường cần 3rd-party)
- Broken Link Checker (crawl) — server + rate limit (dễ bị abuse)
- Sitemap Generator
- Robots.txt Tester
- Mobile-Friendly Checker (thường cần external service)

**Extra suggestions:**

- UTM builder (traffic tool dễ viral)
- Open Graph preview generator

---

### 17) Network & IP Tools (Server + VERY strict rate limit)

**Tools (giữ đủ như bạn viết, nhưng triển khai phải an toàn):**

- IP Address Lookup — external API + cache
- Ping Tool — **khuyến nghị không làm “real ping”**; chỉ đo latency bằng fetch/head tới URL do user nhập, rate limit
- WHOIS Lookup — WHOIS API (thường paid), cache
- DNS Resolver — server-side DNS query (rate limit)
- Port Scanner (Basic) — **rủi ro abuse cao**
  - Recommendation: chỉ làm “Port availability checker” cho **own domain** hoặc allowlist + hard rate limit; hoặc bỏ khỏi public MVP
- Subnet Calculator — client IP math

**Extra suggestions:**

- CIDR expand/collapse tool (client)
- User-agent / headers viewer (server)

---

### 18) Language & Translation Tools (Hybrid)

**Tools:**

- Text Translator — LibreTranslate/API
- Spell Checker — Hunspell/API
- Grammar Checker — LanguageTool API
- Synonym Finder — API
- Language Detector — `franc`
- Morse Code Converter — mapping
- Braille Converter — mapping/lib

**Extra suggestions:**

- Vietnamese tone/diacritics fixer (client)
- “Rewrite tone” (nếu sau này add AI)

---

### 19) Audio Tools (Heavy)

**Tools:**

- Audio Converter — `ffmpeg.wasm` (client) (nặng, load chậm)
- Volume Normalizer — Web Audio API
- BPM Detector — `music-metadata` (metadata) / advanced detection (hard)
- Audio Cutter — `wavesurfer.js`
- Text to Speech — Web Speech API (browser)
- Sound Effect Generator — `tone`

**Extra suggestions:**

- Audio trim (basic) (client) — easier than full convert

---

### 20) Video Tools (Very heavy)

**Tools:**

- Video Compressor — server ffmpeg (tốn tài nguyên)
- Format Converter — ffmpeg
- Frame Extractor — video + canvas (client)
- Subtitle Generator — speech-to-text API (quota)
- Video Merger — ffmpeg server
- GIF Maker — `gif.js`
- Resolution Changer — ffmpeg

**Extra suggestions:**

- “Video metadata viewer” (duration/codec) (light)

---

### 21) Weather & Environment Tools (Hybrid)

**Tools:**

- Weather Forecast — weather API + cache
- Air Quality Index — AQI API + cache
- Sunrise/Sunset Calculator — `suncalc`
- UV Index Checker — usually from weather API
- Carbon Footprint Estimator — client formulas + dataset
- Tide Predictor — tide API (nếu có)

**Extra suggestions:**

- “Typhoon tracker” (API) (optional)

---

### 22) Cryptocurrency Tools (Hybrid)

**Tools:**

- Crypto Price Tracker — CoinGecko API + cache
- Portfolio Calculator — local + API prices
- Mining Profitability — client formulas
- Wallet Address Validator — crypto libs (client)
- Transaction Fee Estimator — API (gas/fees)
- Crypto Converter — API
- Market Cap Ranker — API

**Extra suggestions:**

- DCA calculator (client)
- Alert price (không login thì local only)

---

## C) Suggested Build Order (Concrete)

**Sprint 1 (Ship MVP shell + 8–12 tools):**

- P0 foundation
- Group 1 (Password) + Group 2 (Text) + Group 3 (JSON) core tools

**Sprint 2 (Grow traffic + share virality):**

- Group 8 (Random) + Group 7 (Data utilities) + Group 5 (Image basic)

**Sprint 3 (PDF “wow factor”):**

- Group 4 (PDF) nhẹ: merge/split/rotate/watermark/text extract

**Sprint 4+ (API-based groups, add caching/rate limit first):**

- Group 9 (YouTube hợp lệ), Group 15 (Date/Time), rồi các nhóm API-heavy

---

## D) Notes on Shareable URL State (recommended)

- Small state → query params (readable)
- Big state → compress JSON with `lz-string` → store in `#hash`
- Always include “Copy share link” button
- For privacy: do not store user data server-side by default

---

## E) MVP Guardrails

- File size max: 10MB (MVP), show warning for large files
- Rate limit API routes (YouTube/currency/weather/crypto/network)
- Avoid high-abuse tools in public MVP (notably “Port Scanner”), or restrict/allowlist

Done.
