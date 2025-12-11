# 🎯 Feature Prioritization Framework

**Document Owner:** Product Manager  
**Last Updated:** December 11, 2025  
**Version:** 1.0.0  
**Status:** ✅ Active

[← Back to PM Hub](./README.md)

---

## 📌 Purpose

This document provides a **data-driven framework** for prioritizing features, tools, and initiatives. Every decision is backed by:
- **RICE scoring** (Reach × Impact × Confidence / Effort)
- **User persona alignment**
- **Business goals alignment**
- **Strategic fit**

**Golden Rule:** *We say NO to good ideas so we can say YES to great ones.*

---

## 🎯 Prioritization Framework

### RICE Scoring Model

**Formula:**  
```
RICE Score = (Reach × Impact × Confidence) / Effort
```

**Scoring Definitions:**

| Factor | Scale | Definition |
|--------|-------|------------|
| **Reach** | 1-10 | How many users will this affect per month? (1 = <100, 10 = 100K+) |
| **Impact** | 1-5 | How much will this improve user experience? (1 = minimal, 5 = transformative) |
| **Confidence** | 0-100% | How certain are we about R/I/E estimates? (High = 100%, Low = 50%) |
| **Effort** | 1-10 | How much work (person-weeks)? (1 = days, 10 = months) |

**Priority Tiers:**
- 🔴 **P0 (RICE > 50):** Must-have for MVP/launch
- 🟡 **P1 (RICE 20-50):** Important, plan for Quarter 1-2
- 🟢 **P2 (RICE 5-20):** Nice-to-have, backlog
- ⚪ **P3 (RICE < 5):** Park for future review

---

## 🚀 MVP Feature Prioritization (Year 1)

### Core Tools (Must-Launch)

#### Tool Category: **PDF Tools** (P0)

| Tool | Reach | Impact | Confidence | Effort | RICE | Priority | Rationale |
|------|-------|--------|------------|--------|------|----------|-----------|
| **PDF to Word** | 10 | 5 | 100% | 3 | **166.7** | 🔴 P0 | #1 most searched tool, high conversion intent |
| **Word to PDF** | 10 | 5 | 100% | 2 | **250.0** | 🔴 P0 | Universal need, easy to build |
| **PDF Merge** | 8 | 4 | 100% | 3 | **106.7** | 🔴 P0 | Common business workflow |
| **PDF Split** | 7 | 4 | 100% | 3 | **93.3** | 🔴 P0 | Pair with merge |
| **PDF Compress** | 9 | 5 | 80% | 4 | **90.0** | 🔴 P0 | High demand, technical complexity |
| **PDF to Image** | 6 | 3 | 100% | 3 | **60.0** | 🟡 P1 | Secondary need |
| **Image to PDF** | 6 | 3 | 100% | 2 | **90.0** | 🔴 P0 | Quick win |

**MVP Scope:** Launch 5 PDF tools (convert, merge, split, compress, image-to-pdf)

---

#### Tool Category: **Image Tools** (P0)

| Tool | Reach | Impact | Confidence | Effort | RICE | Priority | Rationale |
|------|-------|--------|------------|--------|------|----------|-----------|
| **JPG to PNG** | 9 | 4 | 100% | 2 | **180.0** | 🔴 P0 | High volume, simple |
| **PNG to JPG** | 9 | 4 | 100% | 2 | **180.0** | 🔴 P0 | Pair with above |
| **Image Resize** | 10 | 5 | 100% | 3 | **166.7** | 🔴 P0 | Universal need |
| **Image Compress** | 10 | 5 | 100% | 3 | **166.7** | 🔴 P0 | SEO, performance |
| **WebP Converter** | 7 | 4 | 90% | 3 | **84.0** | 🟡 P1 | Emerging format |
| **AVIF Converter** | 5 | 3 | 70% | 4 | **26.3** | 🟢 P2 | Future format |
| **Image Crop** | 8 | 4 | 100% | 2 | **160.0** | 🔴 P0 | Common task |
| **Image Rotate** | 7 | 3 | 100% | 1 | **210.0** | 🔴 P0 | Quick win |

**MVP Scope:** Launch 6 image tools (JPG↔PNG, resize, compress, crop, rotate)

---

#### Tool Category: **Text Utilities** (P0)

| Tool | Reach | Impact | Confidence | Effort | RICE | Priority | Rationale |
|------|-------|--------|------------|--------|------|----------|-----------|
| **Password Generator** | 10 | 5 | 100% | 1 | **500.0** | 🔴 P0 | Viral, high search volume |
| **QR Code Generator** | 9 | 4 | 100% | 2 | **180.0** | 🔴 P0 | Universal use case |
| **Hash Generator (MD5, SHA)** | 6 | 3 | 100% | 2 | **90.0** | 🟡 P1 | Developer audience |
| **UUID Generator** | 5 | 3 | 100% | 1 | **150.0** | 🟡 P1 | Developer audience |
| **Lorem Ipsum Generator** | 4 | 2 | 100% | 1 | **80.0** | 🟢 P2 | Nice-to-have |
| **Word Counter** | 7 | 3 | 100% | 1 | **210.0** | 🔴 P0 | Writers, students |
| **Case Converter** | 5 | 2 | 100% | 1 | **100.0** | 🟡 P1 | Quick utility |

**MVP Scope:** Launch 3 text tools (password gen, QR code, word counter)

---

#### Tool Category: **Developer Tools** (P1)

| Tool | Reach | Impact | Confidence | Effort | RICE | Priority | Rationale |
|------|-------|--------|------------|--------|------|----------|-----------|
| **JSON Formatter** | 7 | 5 | 100% | 2 | **175.0** | 🔴 P0 | High dev usage |
| **Base64 Encode/Decode** | 6 | 4 | 100% | 1 | **240.0** | 🔴 P0 | Quick win |
| **URL Encode/Decode** | 6 | 3 | 100% | 1 | **180.0** | 🔴 P0 | Common task |
| **JWT Decoder** | 5 | 4 | 90% | 2 | **90.0** | 🟡 P1 | Growing need |
| **Regex Tester** | 4 | 3 | 80% | 3 | **32.0** | 🟢 P2 | Power users |
| **HTML Encoder** | 4 | 2 | 100% | 1 | **80.0** | 🟢 P2 | Niche |
| **Color Picker** | 5 | 3 | 100% | 2 | **75.0** | 🟡 P1 | Designer audience |

**MVP Scope:** Launch 3 dev tools (JSON formatter, Base64, URL encode)

---

#### Tool Category: **Video Tools** (P2)

| Tool | Reach | Impact | Confidence | Effort | RICE | Priority | Rationale |
|------|-------|--------|------------|--------|------|----------|-----------|
| **Video Compress** | 8 | 5 | 70% | 8 | **35.0** | 🟢 P2 | High impact but complex |
| **Video to GIF** | 6 | 4 | 80% | 6 | **32.0** | 🟢 P2 | Creator audience |
| **GIF to Video** | 4 | 3 | 80% | 5 | **19.2** | 🟢 P2 | Low priority |
| **Video Trim** | 7 | 4 | 70% | 7 | **28.0** | 🟢 P2 | Post-MVP |
| **Video Format Convert** | 6 | 4 | 60% | 9 | **16.0** | ⚪ P3 | Very complex |

**MVP Scope:** Park for Month 3-6 (focus on images first)

---

## 🎯 MVP Tool Selection (Launch Week)

### Final MVP Scope: **20 Tools**

**Criteria:**
- ✅ High RICE score (>50)
- ✅ Quick to build (Effort ≤ 3)
- ✅ Proven demand (competitor validation)
- ✅ Technical feasibility (client-side WASM)

| # | Tool | Category | RICE | Effort | Sprint |
|---|------|----------|------|--------|--------|
| 1 | Password Generator | Text | 500.0 | 1 | Week 1 |
| 2 | Word to PDF | PDF | 250.0 | 2 | Week 1 |
| 3 | Base64 Encode/Decode | Dev | 240.0 | 1 | Week 1 |
| 4 | Image Rotate | Image | 210.0 | 1 | Week 1 |
| 5 | Word Counter | Text | 210.0 | 1 | Week 1 |
| 6 | JPG to PNG | Image | 180.0 | 2 | Week 2 |
| 7 | PNG to JPG | Image | 180.0 | 2 | Week 2 |
| 8 | QR Code Generator | Text | 180.0 | 2 | Week 2 |
| 9 | URL Encode/Decode | Dev | 180.0 | 1 | Week 2 |
| 10 | JSON Formatter | Dev | 175.0 | 2 | Week 2 |
| 11 | PDF to Word | PDF | 166.7 | 3 | Week 3 |
| 12 | Image Resize | Image | 166.7 | 3 | Week 3 |
| 13 | Image Compress | Image | 166.7 | 3 | Week 3 |
| 14 | Image Crop | Image | 160.0 | 2 | Week 3 |
| 15 | UUID Generator | Dev | 150.0 | 1 | Week 4 |
| 16 | PDF Merge | PDF | 106.7 | 3 | Week 4 |
| 17 | PDF Split | PDF | 93.3 | 3 | Week 4 |
| 18 | Image to PDF | PDF | 90.0 | 2 | Week 4 |
| 19 | PDF Compress | PDF | 90.0 | 4 | Week 5 |
| 20 | Hash Generator | Dev | 90.0 | 2 | Week 5 |

**Total Effort:** ~40 person-weeks (2 devs × 4 weeks = feasible)

---

## 🚀 Post-MVP Roadmap (Month 2-6)

### Quarter 1 (Month 2-3)

**Focus:** Expand core categories + add 15 tools

| Tool | RICE | Effort | Why Now? |
|------|------|--------|----------|
| WebP Converter | 84.0 | 3 | SEO demand increasing |
| JWT Decoder | 90.0 | 2 | Developer feedback |
| Color Picker | 75.0 | 2 | Designer audience |
| PDF to Image | 60.0 | 3 | Round out PDF suite |
| Case Converter | 100.0 | 1 | Quick win |
| Lorem Ipsum | 80.0 | 1 | Writer audience |
| HTML Encoder | 80.0 | 1 | Dev utility |
| Markdown to HTML | 70.0 | 2 | Content creators |
| CSV to JSON | 65.0 | 2 | Data analysts |
| JSON to CSV | 65.0 | 2 | Pair with above |

**Target:** 35 tools total by end of Q1

---

### Quarter 2 (Month 4-6)

**Focus:** Video tools + advanced features

| Tool | RICE | Effort | Why Now? |
|------|------|--------|----------|
| Video Compress | 35.0 | 8 | Creator demand validated |
| Video to GIF | 32.0 | 6 | Viral potential |
| Video Trim | 28.0 | 7 | Complete video suite |
| Batch Image Processing | 45.0 | 5 | Power user request |
| Image Background Remover (AI) | 60.0 | 10 | High impact, competitive |
| Advanced PDF Edit | 40.0 | 8 | Business user need |

**Target:** 50+ tools total by end of Q2

---

## 🎪 Platform Features Prioritization

### Core Platform (P0 - MVP)

| Feature | RICE | Effort | Priority | Rationale |
|---------|------|--------|----------|-----------|
| **Mobile-responsive UI** | 200.0 | 4 | 🔴 P0 | 60%+ traffic mobile |
| **i18n (EN, VI)** | 150.0 | 3 | 🔴 P0 | Core differentiation |
| **GA4 tracking** | 120.0 | 2 | 🔴 P0 | Data-driven decisions |
| **SEO metadata** | 180.0 | 2 | 🔴 P0 | Organic traffic critical |
| **Error handling** | 100.0 | 3 | 🔴 P0 | User trust |
| **AdSense integration** | 90.0 | 2 | 🔴 P0 | Revenue stream |

---

### Enhancement Features (P1 - Quarter 1-2)

| Feature | RICE | Effort | Priority | Rationale |
|---------|------|--------|----------|-----------|
| **Batch processing** | 80.0 | 5 | 🟡 P1 | Power user request |
| **Drag-and-drop upload** | 70.0 | 3 | 🟡 P1 | UX improvement |
| **History/Recent files** | 60.0 | 4 | 🟡 P1 | Convenience |
| **PWA (offline mode)** | 50.0 | 6 | 🟡 P1 | Developer audience |
| **Dark mode** | 45.0 | 2 | 🟡 P1 | User preference |
| **Keyboard shortcuts** | 40.0 | 3 | 🟡 P1 | Power users |
| **Multilingual (5 languages)** | 100.0 | 5 | 🟡 P1 | Global expansion |

---

### Advanced Features (P2 - Quarter 3+)

| Feature | RICE | Effort | Priority | Rationale |
|---------|------|--------|----------|-----------|
| **API access** | 35.0 | 8 | 🟢 P2 | Developer monetization |
| **Premium tier (no ads)** | 30.0 | 4 | 🟢 P2 | Alternative revenue |
| **User accounts** | 25.0 | 10 | 🟢 P2 | Not aligned with vision |
| **Cloud storage integration** | 20.0 | 8 | 🟢 P2 | Privacy concerns |
| **AI features (auto-enhance)** | 60.0 | 15 | 🟢 P2 | High impact but costly |
| **Collaboration (share links)** | 15.0 | 6 | ⚪ P3 | Low demand |

---

## 🎯 Decision Framework: When to Say NO

### Red Flags (Auto-Reject)

❌ **Violates Core Principles**
- Requires user registration (conflicts with "zero friction")
- Uploads to server (conflicts with "privacy-first")
- Slow processing (conflicts with "instant results")

❌ **Low RICE Score (<5)**
- Even if "easy to build", opportunity cost too high
- Focus on high-impact features

❌ **Feature Bloat**
- Tool has <1% search volume
- Already 10+ competitors doing it better
- Doesn't serve any primary persona

---

### Decision Tree

```
Is it aligned with vision? 
├─ NO → ❌ Reject
└─ YES → Is it technically feasible (client-side)?
    ├─ NO → ❌ Reject or defer
    └─ YES → RICE score > 20?
        ├─ NO → 🟢 P2 (backlog)
        └─ YES → RICE score > 50?
            ├─ NO → 🟡 P1 (plan)
            └─ YES → 🔴 P0 (build now)
```

---

## 📊 Prioritization Metrics

### How We'll Measure Success

| Metric | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|
| **Tool Usage Rate** | 60% of visitors use ≥1 tool | 75% |
| **Top 10 Tools = X% Traffic** | Top 10 = 80% of usage | Top 10 = 70% (more distributed) |
| **Avg Tools per Session** | 1.5 | 2.0 |
| **Return User Rate** | 20% | 35% |
| **Feature Request Volume** | 10/week | 50/week (good signal) |

---

## 🔄 Review Cadence

### Weekly (Sprint Planning)
- Review top feature requests
- Adjust sprint priorities
- Quick RICE re-scoring

### Monthly (Roadmap Review)
- Analyze tool usage data
- Re-prioritize based on learnings
- Add/remove backlog items

### Quarterly (Strategic Review)
- Validate against personas
- Check OKR alignment
- Major roadmap adjustments

---

## 📞 Related Documents

**For Strategy Context:**  
→ [Product Strategy](./01-product-strategy.md)  
→ [Market Analysis](./02-market-analysis.md)

**For User Context:**  
→ [User Personas](./10-user-personas.md)  
→ [User Journeys](./11-user-journeys.md)

**For Execution:**  
→ [Product Roadmap](./20-roadmap.md)  
→ [MVP Definition](./22-mvp-definition.md)

**For Metrics:**  
→ [Success Metrics](./30-success-metrics.md)

---

**Document Status:** ✅ Active  
**Next Review:** January 2026 (post-MVP launch)  
**Owner:** Product Manager
