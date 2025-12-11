# 📋 Project Context: Multi-Purpose Tool Platform

**Document Owner:** BMAD Agent System  
**Last Updated:** December 11, 2025  
**Version:** 1.0.0  
**Status:** ✅ Active - Single Source of Truth for All Agents

---

> **⚠️ CRITICAL FOR AGENTS:** This document is the authoritative reference for project knowledge. All agents MUST consult this document for project-specific context, business rules, and technical decisions.

---

## 🎯 Project Overview

### Executive Summary

**Multi-Purpose Tool Platform** là một nền tảng công cụ đa năng đẳng cấp quốc tế, cung cấp 100+ tools miễn phí với privacy-first architecture. Platform xử lý 100% client-side, không lưu data trên server.

### Vision Statement

> **"Empower everyone to solve daily digital tasks instantly, securely, and without compromise."**

### Core Value Propositions

| Pillar | Description | Implementation |
|--------|-------------|----------------|
| **Privacy** | 100% client-side processing | WASM engines, no server uploads |
| **Speed** | <3s từ landing đến result | Edge caching, lazy loading |
| **Free** | Unlimited usage, no paywalls | Ad-supported model |
| **Global** | 10+ languages support | i18n-first architecture |
| **Mobile** | Mobile-first responsive | Perfect UX all devices |

---

## 📊 Business Context

### Target Metrics

| Category | Month 6 Target | Year 1 Target |
|----------|----------------|---------------|
| **MAU (North Star)** | 100,000 | 500,000 |
| **Revenue (MRR)** | $1,000 | $5,000 |
| **Tools Live** | 50+ | 100+ |
| **Languages** | 5 | 10+ |
| **Domain Authority** | DA 30 | DA 50 |

### Revenue Model

1. **Google AdSense** (80%) - Display ads, 3 units/page
2. **Affiliate Links** (15%) - Amazon, software partnerships
3. **Premium Features** (5%) - Batch processing, no ads

### Market Positioning

**Competitive Differentiation:**
- vs. Smallpdf/iLovePDF: **100% Free** (no paywall)
- vs. All competitors: **Privacy-first** (no uploads)
- vs. Server-based tools: **Instant** (WASM local processing)

---

## 👥 Target Personas

### Primary Personas (Year 1 Focus)

#### 1. Sarah the Student 📚
- **Age:** 19, University student
- **Location:** Vietnam, SEA region
- **Needs:** Free tools, mobile-friendly, no registration
- **Pain Points:** Paid tools expensive, upload limits, slow processing
- **Jobs:** Convert assignments (PDF↔Word), compress images

#### 2. Mike the Marketer 💼
- **Age:** 32, Digital Marketing Manager
- **Location:** Philippines, SEA region
- **Needs:** Batch processing, privacy for client data, on-the-go editing
- **Pain Points:** Subscription fatigue, privacy concerns, slow workflows
- **Jobs:** Optimize ad images, create PDFs, compress videos

#### 3. Alex the Developer 💻
- **Age:** 27, Full-stack Developer
- **Location:** Global (English-speaking)
- **Needs:** JSON formatter, Base64, developer utilities
- **Pain Points:** Tool context-switching, privacy for sensitive data
- **Jobs:** Format JSON, encode/decode data, generate UUIDs

### Success Criteria per Persona

- **Sarah:** 1-click conversion, mobile works perfectly, no registration
- **Mike:** Batch processing, professional quality, reliable
- **Alex:** Fast, clean UI, keyboard shortcuts

---

## 🛠️ Technical Architecture

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 14+ App Router | SSR + SSG, best SEO |
| **Language** | TypeScript (strict) | Type safety |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid development |
| **Database** | Supabase (PostgreSQL) | Auth, analytics storage |
| **Processing** | WASM (ffmpeg, pdf-lib) | Client-side, privacy |
| **Analytics** | GA4 + Supabase | Tracking + custom events |
| **Ads** | Google AdSense | Primary revenue |
| **Hosting** | Vercel | Edge network, free tier |

### Architecture Principles

1. **Client-Side First** - All processing in browser via WASM
2. **Server Components Default** - Use `'use client'` only when needed
3. **Lazy Loading** - Heavy libraries (ffmpeg 31MB) load on first use
4. **Mobile-First** - Design for mobile, enhance for desktop
5. **i18n-Native** - Built-in internationalization from day 1

### URL Structure

```
/{locale}/                          # Homepage
/{locale}/tools/{slug}              # Individual tools
/{locale}/convert/{source}-to-{target}  # Programmatic SEO pages
/{locale}/blog/{slug}               # Content marketing
```

### Processing Flow

```
User → File Upload (local) → WASM Processing → Result Download
         ↓
       Track Event → GA4 + Supabase
```

---

## 📋 Feature Prioritization

### MVP Scope: 20 Tools (Launch)

**P0 - Must Launch (RICE > 100):**

| Tool | Category | RICE Score |
|------|----------|------------|
| Password Generator | Text | 500 |
| Word to PDF | PDF | 250 |
| Base64 Encode/Decode | Dev | 240 |
| Image Rotate | Image | 210 |
| Word Counter | Text | 210 |
| JPG ↔ PNG | Image | 180 |
| QR Code Generator | Text | 180 |
| JSON Formatter | Dev | 175 |
| PDF to Word | PDF | 167 |
| Image Resize/Compress | Image | 167 |

### RICE Scoring Framework

```
RICE = (Reach × Impact × Confidence) / Effort
```

- **Reach:** 1-10 (users affected/month)
- **Impact:** 1-5 (improvement level)
- **Confidence:** 0-100% (certainty)
- **Effort:** 1-10 (person-weeks)

### Priority Tiers

- 🔴 **P0 (RICE > 50):** MVP must-have
- 🟡 **P1 (RICE 20-50):** Q1-Q2 planned
- 🟢 **P2 (RICE 5-20):** Backlog
- ⚪ **P3 (RICE < 5):** Future consideration

---

## 📈 Success Metrics

### North Star: MAU (Monthly Active Users)

**Why MAU?**
- Captures product value (users return if useful)
- Correlates with revenue (more users = more ad impressions)
- Simple to track and communicate

### Input Metrics (Leading Indicators)

| Metric | Month 3 Target | Month 6 Target |
|--------|----------------|----------------|
| Organic Search Traffic | 20K visits | 200K visits |
| Tool Usage Rate | 60% | 75% |
| Time to First Tool Use | <15s | <10s |
| Average Session Duration | 3 min | 5 min |
| Tools per Session | 1.5 | 2.0 |

### Output Metrics (Lagging Indicators)

| Metric | Month 6 Target | Year 1 Target |
|--------|----------------|---------------|
| Return User Rate (30-day) | 20% | 30% |
| Ad Revenue (MRR) | $800 | $3,500 |
| Affiliate Revenue | $150 | $1,000 |
| Domain Authority | DA 30 | DA 50 |

### Guard Metrics (Don't Sacrifice)

- Core Web Vitals: ALL GREEN
- Error Rate: <0.1%
- Uptime: 99.9%+
- NPS Score: 50+

---

## 🗓️ Roadmap & Milestones

### Phase 1: Launch & Learn (Q4 2025 - Q1 2026)
- ✅ MVP với 20 core tools
- ✅ 2 languages (EN, VI)
- ✅ AdSense integration
- 🎯 Target: 10K MAU

### Phase 2: Scale & Optimize (Q2-Q3 2026)
- 🚀 50+ tools
- 🚀 5+ languages
- 🚀 Programmatic SEO (500+ pages)
- 🎯 Target: 100K MAU, $1K MRR

### Phase 3: Monetize & Expand (Q4 2026+)
- 💰 Premium tier launch
- 💰 API access for developers
- 💰 B2B partnerships
- 🎯 Target: 500K MAU, $5K MRR

---

## 🔒 Constraints & Non-Negotiables

### Technical Constraints

1. **No Server-Side File Processing** - Privacy commitment
2. **No User Registration Required** - Friction-free experience
3. **No Data Collection Beyond Analytics** - Trust building
4. **Mobile-First Design** - 60%+ traffic from mobile

### Business Constraints

1. **Free Forever Core Features** - No paywall for basic tools
2. **Ethical Monetization** - No intrusive ads, clear affiliate disclosure
3. **Privacy Compliance** - GDPR, CCPA ready from day 1

### Quality Gates

1. **All Core Web Vitals GREEN** before launch
2. **100% TypeScript strict mode**
3. **All tools tested on mobile devices**
4. **Accessibility WCAG 2.1 AA compliant**

---

## 📚 Documentation References

### PM Documentation (docs/pm/)
- [Product Strategy](./pm/01-product-strategy.md) - Vision, positioning
- [Market Analysis](./pm/02-market-analysis.md) - Competitors, sizing
- [User Personas](./pm/10-user-personas.md) - Target users
- [Feature Prioritization](./pm/21-feature-prioritization.md) - RICE scores
- [Success Metrics](./pm/30-success-metrics.md) - KPIs, tracking

### Architecture Documentation (docs/architecture/)
- [Executive Summary](./architecture/00-executive-summary.md) - Business overview
- [System Architecture](./architecture/01-system-architecture.md) - Technical design
- [Project Structure](./architecture/02-project-structure.md) - File organization
- [Routing & SEO](./architecture/03-routing-seo.md) - URL strategy

---

## 🎪 Agent-Specific Context

### For Product Manager (John 📋)
- **Primary Focus:** User needs, feature prioritization, market fit
- **Key Documents:** pm/01-product-strategy.md, pm/21-feature-prioritization.md
- **Decision Framework:** RICE scoring, persona alignment
- **Current Priority:** MVP scope validation, metrics tracking setup

### For Architect (Winston 🏗️)
- **Primary Focus:** System design, tech stack, scalability
- **Key Documents:** architecture/01-system-architecture.md, architecture/02-project-structure.md
- **Patterns:** Server Components first, WASM for processing, lazy loading
- **Current Priority:** Implementation of client-side processing pipeline

### For Business Analyst (Mary 📊)
- **Primary Focus:** Requirements, competitive analysis, user research
- **Key Documents:** pm/02-market-analysis.md, pm/10-user-personas.md
- **Methods:** User interviews, competitor analysis, market sizing
- **Current Priority:** Validate persona assumptions with user research

### For Developer (Amelia 💻)
- **Primary Focus:** Code implementation, testing, performance
- **Key Documents:** architecture/02-project-structure.md, architecture/01-system-architecture.md
- **Standards:** TypeScript strict, Server Components default, test coverage
- **Current Priority:** Tool implementation following ToolConfig pattern

### For UX Designer (Sally 🎨)
- **Primary Focus:** User experience, mobile-first, accessibility
- **Key Documents:** pm/10-user-personas.md, pm/30-success-metrics.md
- **Principles:** Zero friction, instant gratification, touch-optimized
- **Current Priority:** Tool interfaces for MVP, mobile testing

### For Scrum Master (Bob 🏃)
- **Primary Focus:** Story creation, sprint planning, delivery
- **Key Documents:** pm/21-feature-prioritization.md, architecture/02-project-structure.md
- **Framework:** RICE-based prioritization, 2-week sprints
- **Current Priority:** MVP tool stories, acceptance criteria

### For Test Architect (Murat 🧪)
- **Primary Focus:** Test strategy, quality gates, automation
- **Key Documents:** architecture/01-system-architecture.md
- **Coverage:** Unit tests, integration tests, E2E with Playwright
- **Current Priority:** Test framework setup, tool testing patterns

### For Tech Writer (Paige 📚)
- **Primary Focus:** Documentation, user guides, API docs
- **Key Documents:** All architecture/, pm/ documents
- **Standards:** CommonMark, bilingual (EN/VI), structured
- **Current Priority:** User-facing tool documentation

---

## ✅ Quick Reference Checklist

### Before Building Any Feature
- [ ] Check persona alignment (Sarah, Mike, or Alex?)
- [ ] Verify RICE score > 50 for MVP
- [ ] Confirm client-side processing feasible
- [ ] Plan mobile-first implementation

### Before Writing Code
- [ ] Review ToolConfig pattern in architecture docs
- [ ] Check TypeScript types exist
- [ ] Plan lazy loading for heavy libraries
- [ ] Consider i18n strings needed

### Before Release
- [ ] Core Web Vitals all green
- [ ] Mobile testing completed
- [ ] Analytics events configured
- [ ] Accessibility check passed

---

**Document Version:** 1.0.0  
**Last Updated:** December 11, 2025  
**Next Review:** Post-Launch (Q1 2026)
