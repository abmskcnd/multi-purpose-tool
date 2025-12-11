# 📚 Tech Writer Agent Knowledge Base: Multi-Purpose Tool Platform

**Agent:** Paige (Technical Writer)  
**Last Updated:** December 11, 2025  
**Domain:** Documentation, User Guides, API Docs

---

## 🎯 Project Quick Context

**Multi-Purpose Tool Platform** = Free online toolbox với 100+ tools.

### Documentation Priorities
- ✅ User-facing tool guides
- ✅ API documentation
- ✅ Developer onboarding
- ✅ Multi-language support (EN/VI)
- ✅ Accessibility-friendly writing

---

## 📋 Documentation Types

### 1. User Documentation

| Type | Purpose | Audience |
|------|---------|----------|
| Tool Help Text | In-app guidance | All users |
| How-to Guides | Step-by-step tutorials | All users |
| FAQ | Common questions | All users |
| Troubleshooting | Problem solving | Support |

### 2. Technical Documentation

| Type | Purpose | Audience |
|------|---------|----------|
| Architecture Docs | System design | Developers |
| API Reference | Endpoint specs | Developers |
| Code Comments | Implementation notes | Developers |
| README | Project overview | Contributors |

### 3. SEO Content

| Type | Purpose | Audience |
|------|---------|----------|
| Tool Descriptions | SEO + User info | Search engines, users |
| Blog Posts | Content marketing | Searchers |
| Conversion Pages | Programmatic SEO | Search engines |

---

## ✍️ Writing Guidelines

### Voice & Tone

| Attribute | Guideline |
|-----------|-----------|
| **Voice** | Helpful, approachable, confident |
| **Tone** | Friendly but professional |
| **Person** | Second person ("you") |
| **Tense** | Present tense |

### Language Rules

- ✅ Short sentences (max 25 words)
- ✅ Active voice preferred
- ✅ Avoid jargon unless necessary
- ✅ Explain technical terms
- ✅ Use bullet points for lists
- ✅ Include examples

### Example Transformation

**Before (Bad):**
> The conversion of your file from the PDF format to the Word document format will be completed by the system in a few seconds.

**After (Good):**
> Your PDF converts to Word in seconds.

---

## 🌍 i18n Writing Guidelines

### For Translation

1. **Keep sentences simple** - Easier to translate
2. **Avoid idioms** - "Piece of cake" doesn't translate well
3. **Use consistent terminology** - Same term for same concept
4. **Provide context** - Translators need context
5. **Allow text expansion** - 30% longer in other languages

### Bilingual Requirements

| Language | Code | Primary Market |
|----------|------|----------------|
| English | en | Global |
| Vietnamese | vi | Vietnam |
| Spanish | es | LATAM (future) |

### Translation Keys Format

```json
{
  "tools.password_generator.title": "Password Generator",
  "tools.password_generator.description": "Create strong, secure passwords instantly.",
  "tools.password_generator.cta": "Generate Password"
}
```

---

## 📄 Tool Documentation Template

### In-App Help Text

```markdown
## [Tool Name]

[One sentence description of what the tool does.]

### How to Use
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Supported Formats
- [Format 1]
- [Format 2]

### Limits
- Maximum file size: [X MB]
- Supported types: [types]

### Tips
- [Helpful tip 1]
- [Helpful tip 2]
```

### SEO Description (150-160 chars)

```
Free online [tool name]. [Key benefit]. [Differentiator]. No registration required.
```

**Example:**
> Free online JPG to PNG converter. Convert images instantly in your browser. 100% private - no upload to server. No registration required.

---

## 📖 Document Structure Standards

### Architecture Docs

```markdown
# [Title]

**Document:** [Type]
**Version:** X.X.X
**Last Updated:** [Date]
**Status:** [Status]

---

## Overview
[Summary of document purpose]

## [Section 1]
[Content]

## [Section 2]
[Content]

---

## Related Documents
- [Link 1]
- [Link 2]
```

### API Documentation

```markdown
## [Endpoint Name]

`[METHOD] /api/[path]`

### Description
[What this endpoint does]

### Request
```json
{
  "field": "type"
}
```

### Response
```json
{
  "success": true,
  "data": {}
}
```

### Errors
| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | [When this happens] |
| 500 | Server Error | [When this happens] |
```

---

## 📊 Content Checklist

### Before Publishing

- [ ] Spell-checked (US English)
- [ ] Grammar checked
- [ ] Links verified
- [ ] Code examples tested
- [ ] Screenshots current
- [ ] Mobile-friendly formatting
- [ ] Accessibility verified
- [ ] Translation strings extracted

### For SEO Content

- [ ] Title tag optimized (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] H1 includes primary keyword
- [ ] Natural keyword usage
- [ ] Internal links included
- [ ] Alt text for images

---

## 🔧 Documentation Tools

| Tool | Purpose |
|------|---------|
| Markdown | Primary format |
| VSCode | Editor |
| Grammarly | Grammar check |
| Hemingway | Readability |
| Crowdin | Translation management |

---

## 📁 Documentation Locations

```
docs/
├── project-context.md      # Master context (agents)
├── pm/                      # Product management
│   ├── 01-product-strategy.md
│   ├── 02-market-analysis.md
│   └── ...
├── architecture/            # Technical docs
│   ├── 00-executive-summary.md
│   ├── 01-system-architecture.md
│   └── ...
└── raw_documents/           # Original specs

messages/
├── en.json                  # English translations
└── vi.json                  # Vietnamese translations
```

---

## 📝 Common Documentation Tasks

### Adding a New Tool

1. Add tool config to `config/tools.config.ts`
2. Add translation strings to `messages/en.json`
3. Add Vietnamese translations to `messages/vi.json`
4. Write in-app help text
5. Create SEO description
6. Update tool index/sitemap

### Updating Architecture Docs

1. Check document version
2. Update Last Updated date
3. Mark changes with version
4. Update related documents if needed
5. Verify all links work

---

## 📚 Reference Documents

- [Product Strategy](./pm/01-product-strategy.md)
- [Architecture Overview](./architecture/00-executive-summary.md)
- [Project Structure](./architecture/02-project-structure.md)
- [Implementation Guide](./architecture/IMPLEMENTATION_GUIDE.md)

---

**Version:** 1.0.0  
**Agent:** Tech Writer (Paige)
