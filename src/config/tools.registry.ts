/**
 * Tool Registry - Single Source of Truth for Multi Tools
 * 
 * This registry controls the ordering of tool groups and tools within each group.
 * Priority: Lower number = Higher priority (shown first)
 * 
 * To implement a new tool:
 * 1. Find the tool entry in this registry
 * 2. Create a component in `src/components/features/[group]/[tool]/`
 * 3. Import and use it in the tool page or ToolInterface switch case
 * 4. Update the status from 'coming-soon' to 'active'
 */

export type ToolStatus = 'coming-soon' | 'active' | 'deprecated';
export type ImplementationType = 'client-side' | 'server-side' | 'hybrid';

export interface ToolItem {
  id: string;
  title: string;
  priority: number;
  description: string;
  status: ToolStatus;
  implementation?: ImplementationType;
  icon?: string;
  keywords?: string[];
  warning?: string; // For tools with special notices
}

export interface ToolGroup {
  id: string;
  title: string;
  priority: number;
  icon: string;
  description: string;
  tools: ToolItem[];
}

/**
 * TOOL GROUPS - Sorted by Priority
 * P1 (1-10): Highest Traffic + Client-only
 * P2/P3 (11-22): Good traffic, may need API/Server
 */
export const TOOL_GROUPS: ToolGroup[] = [
  // ========== P1 - Highest Priority ==========
  {
    id: 'password',
    title: 'Password & Security Tools',
    priority: 1,
    icon: '🔐',
    description: 'Generate secure passwords, check strength, and manage security utilities',
    tools: [
      { id: 'generator', title: 'Password Generator', priority: 1, description: 'Generate secure, random passwords with customizable rules', status: 'coming-soon', implementation: 'client-side', icon: '🔑' },
      { id: 'strength-checker', title: 'Password Strength Checker', priority: 2, description: 'Check password strength with entropy scoring and tips', status: 'coming-soon', implementation: 'client-side', icon: '💪' },
      { id: 'hash-encode', title: 'Hash / Encode Toolkit', priority: 3, description: 'Generate SHA-256, MD5, HMAC hashes and Base64/URL encoding', status: 'coming-soon', implementation: 'client-side', icon: '#️⃣' },
      { id: 'jwt-decoder', title: 'JWT Decoder (Local Only)', priority: 4, description: 'Decode JWT tokens locally - view header, payload and expiration', status: 'coming-soon', implementation: 'client-side', icon: '🎫' },
      { id: 'uuid-nanoid', title: 'UUID / NanoID Generator', priority: 5, description: 'Generate UUIDs and NanoIDs in batch with various formats', status: 'coming-soon', implementation: 'client-side', icon: '🆔' },
      { id: 'qr-generator', title: 'QR Code Generator', priority: 6, description: 'Create QR codes for text, URLs, vCards with PNG/SVG download', status: 'coming-soon', implementation: 'client-side', icon: '📱' },
      { id: 'passphrase-generator', title: 'Passphrase Generator', priority: 7, description: 'Generate memorable word-based passphrases that are still secure', status: 'coming-soon', implementation: 'client-side', icon: '📝' },
      { id: 'password-policy-checker', title: 'Password Policy Checker', priority: 8, description: 'Check passwords against enterprise security policy rules', status: 'coming-soon', implementation: 'client-side', icon: '📋' },
    ],
  },
  {
    id: 'text',
    title: 'Text Tools',
    priority: 2,
    icon: '📝',
    description: 'Text manipulation, comparison, and formatting utilities',
    tools: [
      { id: 'diff', title: 'Text Diff / Compare', priority: 1, description: 'Compare two texts and highlight additions, removals, and changes', status: 'coming-soon', implementation: 'client-side', icon: '🔀' },
      { id: 'case-converter', title: 'Case Converter', priority: 2, description: 'Convert text between camelCase, snake_case, kebab-case, PascalCase + remove diacritics', status: 'coming-soon', implementation: 'client-side', icon: '🔤' },
      { id: 'regex-tester', title: 'Regex Tester + Highlighter', priority: 3, description: 'Test regular expressions with real-time highlighting and group matching', status: 'coming-soon', implementation: 'client-side', icon: '🔍' },
      { id: 'cleaner', title: 'Text Cleaner', priority: 4, description: 'Trim, remove duplicate spaces, empty lines, sort and unique lines', status: 'coming-soon', implementation: 'client-side', icon: '🧹' },
      { id: 'word-counter', title: 'Word Counter', priority: 5, description: 'Count words, characters, sentences with reading time estimation', status: 'coming-soon', implementation: 'client-side', icon: '🔢' },
      { id: 'markdown-preview', title: 'Markdown Preview + Export HTML', priority: 6, description: 'Live markdown editor with preview and HTML export', status: 'coming-soon', implementation: 'client-side', icon: '📄' },
      { id: 'slug-generator', title: 'Slug Generator', priority: 7, description: 'Generate SEO-friendly URL slugs from any text', status: 'coming-soon', implementation: 'client-side', icon: '🔗' },
    ],
  },
  {
    id: 'json',
    title: 'JSON / YAML / XML Tools',
    priority: 3,
    icon: '{ }',
    description: 'Format, validate, compare and convert structured data',
    tools: [
      { id: 'format-validate', title: 'JSON Formatter / Minify / Validator', priority: 1, description: 'Format, minify and validate JSON with syntax highlighting', status: 'coming-soon', implementation: 'client-side', icon: '✨' },
      { id: 'diff', title: 'JSON Diff / Compare', priority: 2, description: 'Compare JSON documents with path-based diff highlighting', status: 'coming-soon', implementation: 'client-side', icon: '🔀' },
      { id: 'schema-generator', title: 'JSON Schema Generator', priority: 3, description: 'Generate JSON Schema from JSON data automatically', status: 'coming-soon', implementation: 'client-side', icon: '📋' },
      { id: 'convert', title: 'JSON ↔ YAML / XML Converter', priority: 4, description: 'Convert between JSON, YAML, and XML formats', status: 'coming-soon', implementation: 'client-side', icon: '🔄' },
      { id: 'jsonpath', title: 'JSONPath / jq Playground', priority: 5, description: 'Query JSON with JSONPath expressions interactively', status: 'coming-soon', implementation: 'client-side', icon: '🎯' },
      { id: 'json-to-csv', title: 'JSON to CSV Converter', priority: 6, description: 'Convert JSON arrays to CSV format for spreadsheets', status: 'coming-soon', implementation: 'client-side', icon: '📊' },
      { id: 'sort-keys', title: 'Sort JSON Keys', priority: 7, description: 'Sort JSON keys alphabetically for stable output', status: 'coming-soon', implementation: 'client-side', icon: '🔤' },
      { id: 'flatten-unflatten', title: 'Flatten / Unflatten JSON', priority: 8, description: 'Convert nested JSON to/from dot-path notation', status: 'coming-soon', implementation: 'client-side', icon: '📐' },
    ],
  },
  {
    id: 'random',
    title: 'Random / Fun Tools',
    priority: 4,
    icon: '🎲',
    description: 'Random generators, pickers, and fun utilities',
    tools: [
      { id: 'wheel', title: 'Wheel Spinner / Random Picker', priority: 1, description: 'Spin a wheel to pick random items with animation and history', status: 'coming-soon', implementation: 'client-side', icon: '🎡' },
      { id: 'team-generator', title: 'Random Team Generator', priority: 2, description: 'Divide people into random teams with size constraints', status: 'coming-soon', implementation: 'client-side', icon: '👥' },
      { id: 'dice-lottery', title: 'Dice / Lottery / Random Name', priority: 3, description: 'Roll dice, generate lottery numbers, pick random names', status: 'coming-soon', implementation: 'client-side', icon: '🎰' },
      { id: 'countdown', title: 'Countdown / Timer Shareable', priority: 4, description: 'Create shareable countdown timers via URL', status: 'coming-soon', implementation: 'client-side', icon: '⏱️' },
      { id: 'random-lorem', title: 'Random Number / Lorem Ipsum Generator', priority: 5, description: 'Generate random numbers or Lorem Ipsum placeholder text', status: 'coming-soon', implementation: 'client-side', icon: '🔢' },
    ],
  },
  {
    id: 'image',
    title: 'Image Tools',
    priority: 5,
    icon: '🖼️',
    description: 'Image compression, conversion, and manipulation',
    tools: [
      { id: 'compress', title: 'Image Compressor', priority: 1, description: 'Compress images while maintaining quality', status: 'coming-soon', implementation: 'client-side', icon: '📦' },
      { id: 'convert', title: 'Convert Format', priority: 2, description: 'Convert images between PNG, JPG, WebP formats', status: 'coming-soon', implementation: 'client-side', icon: '🔄' },
      { id: 'crop-resize-rotate', title: 'Crop / Resize / Rotate', priority: 3, description: 'Crop, resize and rotate images with precision', status: 'coming-soon', implementation: 'client-side', icon: '✂️' },
      { id: 'remove-bg', title: 'Remove Background (Optional)', priority: 4, description: 'Remove image backgrounds using AI service', status: 'coming-soon', implementation: 'hybrid', icon: '🎭' },
      { id: 'qr-gen-scan', title: 'QR Code Generator + Scanner', priority: 5, description: 'Generate and scan QR codes from images', status: 'coming-soon', implementation: 'client-side', icon: '📷' },
    ],
  },
  {
    id: 'pdf',
    title: 'PDF Tools',
    priority: 6,
    icon: '📄',
    description: 'PDF manipulation, merging, splitting, and conversion',
    tools: [
      { id: 'merge-split', title: 'PDF Merge / Split', priority: 1, description: 'Merge multiple PDFs into one or split a PDF into parts', status: 'coming-soon', implementation: 'client-side', icon: '📎' },
      { id: 'extract-rotate', title: 'Extract / Rotate Pages', priority: 2, description: 'Extract specific pages or rotate PDF pages', status: 'coming-soon', implementation: 'client-side', icon: '🔄' },
      { id: 'watermark', title: 'Add Page Numbers / Watermark', priority: 3, description: 'Add page numbers or watermarks to PDF documents', status: 'coming-soon', implementation: 'client-side', icon: '💧' },
      { id: 'compress', title: 'Compress (Basic)', priority: 4, description: 'Reduce PDF file size with basic compression', status: 'coming-soon', implementation: 'client-side', icon: '📦' },
      { id: 'pdf-to-text-images', title: 'PDF to Text / Images', priority: 5, description: 'Extract text or images from PDF documents', status: 'coming-soon', implementation: 'client-side', icon: '📝' },
    ],
  },
  {
    id: 'dev',
    title: 'Dev Utilities',
    priority: 7,
    icon: '💻',
    description: 'Developer tools for code formatting, testing, and conversion',
    tools: [
      { id: 'code-editor-formatter', title: 'Online Code Editor / Formatter', priority: 1, description: 'Edit and format code with syntax highlighting (JS/TS/HTML/CSS/JSON)', status: 'coming-soon', implementation: 'client-side', icon: '✏️' },
      { id: 'lint-typecheck-light', title: 'Lint / Type Check Playground (Light)', priority: 2, description: 'Light linting and type checking in browser sandbox', status: 'coming-soon', implementation: 'client-side', icon: '🔍' },
      { id: 'cron-builder', title: 'Cron Expression Builder', priority: 3, description: 'Build and explain cron expressions visually', status: 'coming-soon', implementation: 'client-side', icon: '⏰' },
      { id: 'timestamp-converter', title: 'Timestamp Converter', priority: 4, description: 'Convert between Unix timestamps and readable dates', status: 'coming-soon', implementation: 'client-side', icon: '🕐' },
      { id: 'curl-converter', title: 'cURL → Fetch / Axios Converter', priority: 5, description: 'Convert cURL commands to JavaScript fetch or Axios code', status: 'coming-soon', implementation: 'client-side', icon: '🔄' },
      { id: 'gitignore-generator', title: 'Git Ignore Generator', priority: 6, description: 'Generate .gitignore files for various project types', status: 'coming-soon', implementation: 'client-side', icon: '📁' },
      { id: 'api-tester', title: 'API Tester', priority: 7, description: 'Test REST APIs directly from browser (with CORS proxy option)', status: 'coming-soon', implementation: 'hybrid', icon: '🌐' },
      { id: 'json-to-ts', title: 'JSON to TypeScript', priority: 8, description: 'Generate TypeScript interfaces from JSON data', status: 'coming-soon', implementation: 'client-side', icon: '📘' },
      { id: 'openapi-to-types', title: 'OpenAPI to Types', priority: 9, description: 'Generate TypeScript types from OpenAPI specifications', status: 'coming-soon', implementation: 'client-side', icon: '📖' },
    ],
  },
  {
    id: 'data',
    title: 'Encode/Decode & Data Utilities',
    priority: 8,
    icon: '🔤',
    description: 'Encoding, decoding, and data transformation tools',
    tools: [
      { id: 'base64', title: 'Base64 Encode/Decode', priority: 1, description: 'Encode or decode Base64 strings with Unicode support', status: 'coming-soon', implementation: 'client-side', icon: '🔣' },
      { id: 'url-parser', title: 'URL Parser', priority: 2, description: 'Parse and analyze URL components', status: 'coming-soon', implementation: 'client-side', icon: '🔗' },
      { id: 'csv-json', title: 'CSV ↔ JSON Converter', priority: 3, description: 'Convert between CSV and JSON formats', status: 'coming-soon', implementation: 'client-side', icon: '📊' },
      { id: 'number-base', title: 'Number Base Converter', priority: 4, description: 'Convert numbers between binary, octal, decimal, hexadecimal', status: 'coming-soon', implementation: 'client-side', icon: '🔢' },
      { id: 'color-tools', title: 'Color Tools', priority: 5, description: 'Convert colors between HEX, RGB, HSL and generate palettes', status: 'coming-soon', implementation: 'client-side', icon: '🎨' },
      { id: 'file-hash', title: 'File Hash Checker', priority: 6, description: 'Calculate SHA-256 hash of files for verification', status: 'coming-soon', implementation: 'client-side', icon: '#️⃣' },
    ],
  },
  {
    id: 'datetime',
    title: 'Date, Time & Calendar Tools',
    priority: 9,
    icon: '📅',
    description: 'Date calculations, timezone conversion, and calendar utilities',
    tools: [
      { id: 'date-diff', title: 'Date Difference Calculator', priority: 1, description: 'Calculate the difference between two dates', status: 'coming-soon', implementation: 'client-side', icon: '📆' },
      { id: 'timezone-converter', title: 'Timezone Converter', priority: 2, description: 'Convert times between different timezones (DST aware)', status: 'coming-soon', implementation: 'client-side', icon: '🌍' },
      { id: 'age-calculator', title: 'Age Calculator', priority: 3, description: 'Calculate exact age from birth date', status: 'coming-soon', implementation: 'client-side', icon: '🎂' },
      { id: 'ics-planner', title: 'Calendar Event Planner / ICS Export', priority: 4, description: 'Create calendar events and export as ICS files', status: 'coming-soon', implementation: 'client-side', icon: '📅' },
      { id: 'lunar-converter', title: 'Lunar Calendar Converter', priority: 5, description: 'Convert between lunar and solar calendar dates', status: 'coming-soon', implementation: 'client-side', icon: '🌙' },
      { id: 'weekday-finder', title: 'Weekday Finder', priority: 6, description: 'Find what day of the week any date falls on', status: 'coming-soon', implementation: 'client-side', icon: '📆' },
    ],
  },
  {
    id: 'youtube',
    title: 'YouTube Tools (Legal)',
    priority: 10,
    icon: '▶️',
    description: 'Legal YouTube utilities for metadata, thumbnails, and embeds',
    tools: [
      { id: 'link-parser', title: 'YouTube Link Parser', priority: 1, description: 'Extract video ID, playlist ID and canonical URLs from YouTube links', status: 'coming-soon', implementation: 'client-side', icon: '🔗' },
      { id: 'metadata', title: 'Metadata Viewer (oEmbed)', priority: 2, description: 'View YouTube video title, channel, date, and thumbnails', status: 'coming-soon', implementation: 'hybrid', icon: '📋' },
      { id: 'thumbnails', title: 'Thumbnail Downloader', priority: 3, description: 'Download YouTube video thumbnails in various resolutions', status: 'coming-soon', implementation: 'client-side', icon: '🖼️' },
      { id: 'chapters', title: 'Timestamp / Chapters Builder', priority: 4, description: 'Build formatted timestamp chapters for video descriptions', status: 'coming-soon', implementation: 'client-side', icon: '📑' },
      { id: 'embed-generator', title: 'Embed Player Generator', priority: 5, description: 'Generate YouTube embed iframe code with customization options', status: 'coming-soon', implementation: 'client-side', icon: '📺' },
      { id: 'transcript-helper', title: 'Transcript Helper (Optional)', priority: 6, description: 'Help format and work with YouTube transcripts', status: 'coming-soon', implementation: 'client-side', icon: '📝' },
    ],
  },

  // ========== P2/P3 - Lower Priority ==========
  {
    id: 'file-convert',
    title: 'File Convert Tools',
    priority: 11,
    icon: '📁',
    description: 'Convert files between different formats',
    tools: [
      { id: 'md-to-pdf-docx', title: 'Markdown → PDF / DOCX', priority: 1, description: 'Convert Markdown documents to PDF or DOCX format', status: 'coming-soon', implementation: 'hybrid', icon: '📄' },
      { id: 'image-to-pdf', title: 'Image → PDF', priority: 2, description: 'Convert images to PDF documents', status: 'coming-soon', implementation: 'client-side', icon: '🖼️' },
      { id: 'pdf-to-text', title: 'PDF → Text', priority: 3, description: 'Extract text from PDF documents (non-OCR)', status: 'coming-soon', implementation: 'client-side', icon: '📝' },
      { id: 'office-lite-export', title: 'Office-Lite Export', priority: 4, description: 'Export simple text/JSON to DOCX/PPTX formats', status: 'coming-soon', implementation: 'hybrid', icon: '📊' },
      { id: 'unit-converter', title: 'Unit Converter (Bonus)', priority: 5, description: 'Convert between various units with currency support', status: 'coming-soon', implementation: 'hybrid', icon: '📐' },
    ],
  },
  {
    id: 'math',
    title: 'Math & Calculator Tools',
    priority: 12,
    icon: '🔢',
    description: 'Mathematical calculations and equation solving',
    tools: [
      { id: 'basic-calculator', title: 'Basic Calculator', priority: 1, description: 'Simple calculator for basic arithmetic operations', status: 'coming-soon', implementation: 'client-side', icon: '🧮' },
      { id: 'scientific-calculator', title: 'Scientific Calculator', priority: 2, description: 'Advanced calculator with scientific functions', status: 'coming-soon', implementation: 'client-side', icon: '📐' },
      { id: 'equation-solver', title: 'Equation Solver', priority: 3, description: 'Solve algebraic equations step by step', status: 'coming-soon', implementation: 'client-side', icon: '✖️' },
      { id: 'graph-plotter', title: 'Graph Plotter', priority: 4, description: 'Plot mathematical functions and equations', status: 'coming-soon', implementation: 'client-side', icon: '📈' },
      { id: 'matrix-calculator', title: 'Matrix Calculator', priority: 5, description: 'Perform matrix operations like multiplication and inverse', status: 'coming-soon', implementation: 'client-side', icon: '🔲' },
      { id: 'prime-tools', title: 'Prime Number Checker/Generator', priority: 6, description: 'Check if numbers are prime or generate prime sequences', status: 'coming-soon', implementation: 'client-side', icon: '🔢' },
      { id: 'fraction-simplifier', title: 'Fraction Simplifier', priority: 7, description: 'Simplify fractions to their lowest terms', status: 'coming-soon', implementation: 'client-side', icon: '➗' },
    ],
  },
  {
    id: 'unit',
    title: 'Unit & Measurement Converters',
    priority: 13,
    icon: '📏',
    description: 'Convert between different units of measurement',
    tools: [
      { id: 'length', title: 'Length Converter', priority: 1, description: 'Convert between meters, feet, inches, kilometers, miles', status: 'coming-soon', implementation: 'client-side', icon: '📏' },
      { id: 'weight', title: 'Weight Converter', priority: 2, description: 'Convert between kilograms, pounds, ounces, grams', status: 'coming-soon', implementation: 'client-side', icon: '⚖️' },
      { id: 'volume', title: 'Volume Converter', priority: 3, description: 'Convert between liters, gallons, cups, milliliters', status: 'coming-soon', implementation: 'client-side', icon: '🧪' },
      { id: 'temperature', title: 'Temperature Converter', priority: 4, description: 'Convert between Celsius, Fahrenheit, Kelvin', status: 'coming-soon', implementation: 'client-side', icon: '🌡️' },
      { id: 'area', title: 'Area Converter', priority: 5, description: 'Convert between square meters, acres, hectares, square feet', status: 'coming-soon', implementation: 'client-side', icon: '📐' },
      { id: 'speed', title: 'Speed Converter', priority: 6, description: 'Convert between km/h, mph, m/s, knots', status: 'coming-soon', implementation: 'client-side', icon: '🚀' },
      { id: 'energy', title: 'Energy Converter', priority: 7, description: 'Convert between joules, calories, BTU, kilowatt-hours', status: 'coming-soon', implementation: 'client-side', icon: '⚡' },
    ],
  },
  {
    id: 'finance',
    title: 'Finance & Budget Tools',
    priority: 14,
    icon: '💰',
    description: 'Financial calculators and budget planning tools',
    tools: [
      { id: 'currency', title: 'Currency Converter', priority: 1, description: 'Convert between currencies with real-time rates', status: 'coming-soon', implementation: 'hybrid', icon: '💱' },
      { id: 'loan-emi', title: 'Loan/EMI Calculator', priority: 2, description: 'Calculate loan EMI, interest, and amortization', status: 'coming-soon', implementation: 'client-side', icon: '🏦' },
      { id: 'budget-planner', title: 'Budget Planner', priority: 3, description: 'Plan and visualize your budget with charts', status: 'coming-soon', implementation: 'client-side', icon: '📊' },
      { id: 'investment', title: 'Investment Calculator', priority: 4, description: 'Calculate compound interest and investment returns', status: 'coming-soon', implementation: 'client-side', icon: '📈' },
      { id: 'tax-estimator', title: 'Tax Estimator', priority: 5, description: 'Estimate taxes (for reference only, not tax advice)', status: 'coming-soon', implementation: 'client-side', icon: '📝', warning: 'This tool is for estimation only. Not legal/financial advice.' },
      { id: 'tip-calculator', title: 'Tip Calculator', priority: 6, description: 'Calculate tips and split bills among groups', status: 'coming-soon', implementation: 'client-side', icon: '🧾' },
      { id: 'savings-goal', title: 'Savings Goal Tracker', priority: 7, description: 'Track progress toward savings goals', status: 'coming-soon', implementation: 'client-side', icon: '🎯' },
    ],
  },
  {
    id: 'health',
    title: 'Health & Fitness Calculators',
    priority: 15,
    icon: '💪',
    description: 'Health and fitness calculation tools',
    tools: [
      { id: 'bmi', title: 'BMI Calculator', priority: 1, description: 'Calculate Body Mass Index from height and weight', status: 'coming-soon', implementation: 'client-side', icon: '⚖️', warning: 'For informational purposes only. Consult a healthcare professional.' },
      { id: 'calories-burn', title: 'Calorie Burn Estimator', priority: 2, description: 'Estimate calories burned based on activity and duration', status: 'coming-soon', implementation: 'client-side', icon: '🔥', warning: 'Estimates only. Results may vary.' },
      { id: 'body-fat', title: 'Body Fat Percentage', priority: 3, description: 'Estimate body fat percentage using Navy method', status: 'coming-soon', implementation: 'client-side', icon: '📊', warning: 'Estimate only. For accurate measurements, consult a professional.' },
      { id: 'water-intake', title: 'Water Intake Calculator', priority: 4, description: 'Calculate recommended daily water intake', status: 'coming-soon', implementation: 'client-side', icon: '💧' },
      { id: 'sleep-cycle', title: 'Sleep Cycle Calculator', priority: 5, description: 'Calculate optimal sleep and wake times based on sleep cycles', status: 'coming-soon', implementation: 'client-side', icon: '😴' },
      { id: 'heart-rate-zone', title: 'Heart Rate Zone', priority: 6, description: 'Calculate target heart rate zones for exercise', status: 'coming-soon', implementation: 'client-side', icon: '❤️' },
      { id: 'pregnancy-due-date', title: 'Pregnancy Due Date', priority: 7, description: 'Estimate pregnancy due date from last period', status: 'coming-soon', implementation: 'client-side', icon: '👶', warning: 'Estimate only. Consult your healthcare provider for accurate dating.' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Website Analysis Tools',
    priority: 16,
    icon: '🔍',
    description: 'SEO analysis and website optimization tools',
    tools: [
      { id: 'keyword-density', title: 'Keyword Density Analyzer', priority: 1, description: 'Analyze keyword density in text or from URL', status: 'coming-soon', implementation: 'client-side', icon: '📊' },
      { id: 'meta-tag-generator', title: 'Meta Tag Generator', priority: 2, description: 'Generate SEO-optimized meta tags for your pages', status: 'coming-soon', implementation: 'client-side', icon: '🏷️' },
      { id: 'site-speed', title: 'Site Speed Tester', priority: 3, description: 'Test website loading speed and performance', status: 'coming-soon', implementation: 'hybrid', icon: '⚡' },
      { id: 'broken-link-checker', title: 'Broken Link Checker', priority: 4, description: 'Check for broken links on a webpage', status: 'coming-soon', implementation: 'server-side', icon: '🔗' },
      { id: 'sitemap-generator', title: 'Sitemap Generator', priority: 5, description: 'Generate XML sitemaps for websites', status: 'coming-soon', implementation: 'client-side', icon: '🗺️' },
      { id: 'robots-tester', title: 'Robots.txt Tester', priority: 6, description: 'Test and validate robots.txt files', status: 'coming-soon', implementation: 'client-side', icon: '🤖' },
      { id: 'mobile-friendly', title: 'Mobile-Friendly Checker', priority: 7, description: 'Check if a webpage is mobile-friendly', status: 'coming-soon', implementation: 'hybrid', icon: '📱' },
    ],
  },
  {
    id: 'network',
    title: 'Network & IP Tools',
    priority: 17,
    icon: '🌐',
    description: 'Network diagnostics and IP utilities',
    tools: [
      { id: 'ip-lookup', title: 'IP Address Lookup', priority: 1, description: 'Look up IP address geolocation and details', status: 'coming-soon', implementation: 'hybrid', icon: '📍' },
      { id: 'ping', title: 'Ping Tool', priority: 2, description: 'Measure latency to a URL or IP address', status: 'coming-soon', implementation: 'hybrid', icon: '📡' },
      { id: 'whois', title: 'WHOIS Lookup', priority: 3, description: 'Look up domain registration information', status: 'coming-soon', implementation: 'server-side', icon: '🔎' },
      { id: 'dns-resolver', title: 'DNS Resolver', priority: 4, description: 'Resolve domain names to IP addresses', status: 'coming-soon', implementation: 'server-side', icon: '🌐' },
      { id: 'port-checker', title: 'Port Scanner (Basic)', priority: 5, description: 'Check if specific ports are open (limited scope)', status: 'coming-soon', implementation: 'server-side', icon: '🚪', warning: 'This tool has strict rate limits and usage restrictions to prevent abuse.' },
      { id: 'subnet-calculator', title: 'Subnet Calculator', priority: 6, description: 'Calculate subnet ranges, CIDR notation, and IP math', status: 'coming-soon', implementation: 'client-side', icon: '🔢' },
    ],
  },
  {
    id: 'language',
    title: 'Language & Translation Tools',
    priority: 18,
    icon: '🌍',
    description: 'Translation, spelling, and language utilities',
    tools: [
      { id: 'translator', title: 'Text Translator', priority: 1, description: 'Translate text between languages', status: 'coming-soon', implementation: 'hybrid', icon: '🌐' },
      { id: 'spell-checker', title: 'Spell Checker', priority: 2, description: 'Check spelling in multiple languages', status: 'coming-soon', implementation: 'hybrid', icon: '✓' },
      { id: 'grammar-checker', title: 'Grammar Checker', priority: 3, description: 'Check grammar and writing style', status: 'coming-soon', implementation: 'hybrid', icon: '📝' },
      { id: 'synonym-finder', title: 'Synonym Finder', priority: 4, description: 'Find synonyms and related words', status: 'coming-soon', implementation: 'hybrid', icon: '📖' },
      { id: 'language-detector', title: 'Language Detector', priority: 5, description: 'Detect the language of text automatically', status: 'coming-soon', implementation: 'client-side', icon: '🔍' },
      { id: 'morse', title: 'Morse Code Converter', priority: 6, description: 'Convert text to/from Morse code', status: 'coming-soon', implementation: 'client-side', icon: '📻' },
      { id: 'braille', title: 'Braille Converter', priority: 7, description: 'Convert text to/from Braille notation', status: 'coming-soon', implementation: 'client-side', icon: '⠃' },
    ],
  },
  {
    id: 'audio',
    title: 'Audio Tools',
    priority: 19,
    icon: '🎵',
    description: 'Audio processing and conversion tools',
    tools: [
      { id: 'audio-converter', title: 'Audio Converter', priority: 1, description: 'Convert audio files between formats', status: 'coming-soon', implementation: 'client-side', icon: '🔄' },
      { id: 'volume-normalizer', title: 'Volume Normalizer', priority: 2, description: 'Normalize audio volume levels', status: 'coming-soon', implementation: 'client-side', icon: '🔊' },
      { id: 'bpm-detector', title: 'BPM Detector', priority: 3, description: 'Detect beats per minute in audio files', status: 'coming-soon', implementation: 'client-side', icon: '🎧' },
      { id: 'audio-cutter', title: 'Audio Cutter', priority: 4, description: 'Cut and trim audio files', status: 'coming-soon', implementation: 'client-side', icon: '✂️' },
      { id: 'tts', title: 'Text to Speech', priority: 5, description: 'Convert text to spoken audio', status: 'coming-soon', implementation: 'client-side', icon: '🗣️' },
      { id: 'sfx-generator', title: 'Sound Effect Generator', priority: 6, description: 'Generate simple sound effects and tones', status: 'coming-soon', implementation: 'client-side', icon: '🔔' },
    ],
  },
  {
    id: 'video',
    title: 'Video Tools',
    priority: 20,
    icon: '🎬',
    description: 'Video processing and conversion tools',
    tools: [
      { id: 'video-compressor', title: 'Video Compressor', priority: 1, description: 'Compress video files to reduce size', status: 'coming-soon', implementation: 'server-side', icon: '📦' },
      { id: 'format-converter', title: 'Format Converter', priority: 2, description: 'Convert videos between different formats', status: 'coming-soon', implementation: 'server-side', icon: '🔄' },
      { id: 'frame-extractor', title: 'Frame Extractor', priority: 3, description: 'Extract frames/screenshots from videos', status: 'coming-soon', implementation: 'client-side', icon: '🖼️' },
      { id: 'subtitle-generator', title: 'Subtitle Generator', priority: 4, description: 'Generate subtitles using speech-to-text', status: 'coming-soon', implementation: 'hybrid', icon: '💬' },
      { id: 'video-merger', title: 'Video Merger', priority: 5, description: 'Merge multiple video files into one', status: 'coming-soon', implementation: 'server-side', icon: '📎' },
      { id: 'gif-maker', title: 'GIF Maker', priority: 6, description: 'Create GIFs from video clips', status: 'coming-soon', implementation: 'client-side', icon: '🎞️' },
      { id: 'resolution-changer', title: 'Resolution Changer', priority: 7, description: 'Change video resolution and aspect ratio', status: 'coming-soon', implementation: 'server-side', icon: '📺' },
    ],
  },
  {
    id: 'weather',
    title: 'Weather & Environment Tools',
    priority: 21,
    icon: '🌤️',
    description: 'Weather forecasts and environmental information',
    tools: [
      { id: 'forecast', title: 'Weather Forecast', priority: 1, description: 'Get weather forecasts for any location', status: 'coming-soon', implementation: 'hybrid', icon: '🌦️' },
      { id: 'aqi', title: 'Air Quality Index', priority: 2, description: 'Check air quality index for locations', status: 'coming-soon', implementation: 'hybrid', icon: '🌬️' },
      { id: 'sunrise-sunset', title: 'Sunrise/Sunset Calculator', priority: 3, description: 'Calculate sunrise and sunset times for any date and location', status: 'coming-soon', implementation: 'client-side', icon: '🌅' },
      { id: 'uv-index', title: 'UV Index Checker', priority: 4, description: 'Check UV index and sun protection recommendations', status: 'coming-soon', implementation: 'hybrid', icon: '☀️' },
      { id: 'carbon-footprint', title: 'Carbon Footprint Estimator', priority: 5, description: 'Estimate carbon footprint from activities', status: 'coming-soon', implementation: 'client-side', icon: '🌱' },
      { id: 'tide', title: 'Tide Predictor', priority: 6, description: 'Check tide times and heights for coastal locations', status: 'coming-soon', implementation: 'hybrid', icon: '🌊' },
    ],
  },
  {
    id: 'crypto',
    title: 'Cryptocurrency Tools',
    priority: 22,
    icon: '₿',
    description: 'Cryptocurrency tracking and calculation tools',
    tools: [
      { id: 'price-tracker', title: 'Crypto Price Tracker', priority: 1, description: 'Track real-time cryptocurrency prices', status: 'coming-soon', implementation: 'hybrid', icon: '📈' },
      { id: 'portfolio', title: 'Portfolio Calculator', priority: 2, description: 'Calculate cryptocurrency portfolio value', status: 'coming-soon', implementation: 'hybrid', icon: '💼' },
      { id: 'mining-profit', title: 'Mining Profitability', priority: 3, description: 'Calculate cryptocurrency mining profitability', status: 'coming-soon', implementation: 'client-side', icon: '⛏️' },
      { id: 'wallet-validator', title: 'Wallet Address Validator', priority: 4, description: 'Validate cryptocurrency wallet addresses', status: 'coming-soon', implementation: 'client-side', icon: '👛' },
      { id: 'fee-estimator', title: 'Transaction Fee Estimator', priority: 5, description: 'Estimate transaction fees for different networks', status: 'coming-soon', implementation: 'hybrid', icon: '💸' },
      { id: 'crypto-converter', title: 'Crypto Converter', priority: 6, description: 'Convert between cryptocurrencies', status: 'coming-soon', implementation: 'hybrid', icon: '🔄' },
      { id: 'market-cap-ranker', title: 'Market Cap Ranker', priority: 7, description: 'View cryptocurrencies ranked by market cap', status: 'coming-soon', implementation: 'hybrid', icon: '🏆' },
    ],
  },
];

// ============== HELPER FUNCTIONS ==============

/**
 * Get all tool groups sorted by priority (lower number = higher priority)
 */
export function getAllGroupsSorted(): ToolGroup[] {
  return [...TOOL_GROUPS].sort((a, b) => a.priority - b.priority);
}

/**
 * Get a specific tool group by ID
 */
export function getGroup(groupId: string): ToolGroup | undefined {
  return TOOL_GROUPS.find((g) => g.id === groupId);
}

/**
 * Get a specific tool by group ID and tool ID
 */
export function getTool(groupId: string, toolId: string): ToolItem | undefined {
  const group = getGroup(groupId);
  if (!group) return undefined;
  return group.tools.find((t) => t.id === toolId);
}

/**
 * Get tools within a group sorted by priority
 */
export function getToolsSorted(groupId: string): ToolItem[] {
  const group = getGroup(groupId);
  if (!group) return [];
  return [...group.tools].sort((a, b) => a.priority - b.priority);
}

/**
 * Search tools across all groups by title or description
 */
export function searchTools(query: string): Array<{ group: ToolGroup; tool: ToolItem }> {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  const results: Array<{ group: ToolGroup; tool: ToolItem }> = [];

  for (const group of TOOL_GROUPS) {
    for (const tool of group.tools) {
      const titleMatch = tool.title.toLowerCase().includes(lowerQuery);
      const descMatch = tool.description.toLowerCase().includes(lowerQuery);
      const keywordMatch = tool.keywords?.some((k) => k.toLowerCase().includes(lowerQuery));

      if (titleMatch || descMatch || keywordMatch) {
        results.push({ group, tool });
      }
    }
  }

  // Sort results: groups by priority, then tools by priority
  return results.sort((a, b) => {
    if (a.group.priority !== b.group.priority) {
      return a.group.priority - b.group.priority;
    }
    return a.tool.priority - b.tool.priority;
  });
}

/**
 * Get all tools flattened with group info
 */
export function getAllToolsFlat(): Array<{ group: ToolGroup; tool: ToolItem }> {
  const results: Array<{ group: ToolGroup; tool: ToolItem }> = [];

  for (const group of getAllGroupsSorted()) {
    for (const tool of getToolsSorted(group.id)) {
      results.push({ group, tool });
    }
  }

  return results;
}

/**
 * Get popular tools (first tools from P1 groups)
 */
export function getPopularTools(limit = 8): Array<{ group: ToolGroup; tool: ToolItem }> {
  const results: Array<{ group: ToolGroup; tool: ToolItem }> = [];
  const p1Groups = TOOL_GROUPS.filter((g) => g.priority <= 10).sort((a, b) => a.priority - b.priority);

  for (const group of p1Groups) {
    if (results.length >= limit) break;
    const firstTool = group.tools.sort((a, b) => a.priority - b.priority)[0];
    if (firstTool) {
      results.push({ group, tool: firstTool });
    }
  }

  return results;
}

/**
 * Get total tool count
 */
export function getTotalToolCount(): number {
  return TOOL_GROUPS.reduce((sum, group) => sum + group.tools.length, 0);
}

/**
 * Check if a group exists
 */
export function groupExists(groupId: string): boolean {
  return TOOL_GROUPS.some((g) => g.id === groupId);
}

/**
 * Check if a tool exists in a group
 */
export function toolExists(groupId: string, toolId: string): boolean {
  const group = getGroup(groupId);
  if (!group) return false;
  return group.tools.some((t) => t.id === toolId);
}
