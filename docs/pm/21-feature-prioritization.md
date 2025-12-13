# 🎯 Feature Prioritization Framework

> **Source of Truth**: `src/config/tools.registry.ts`  
> **Total**: 22 groups, 144 tools  
> **Last Updated**: December 2025

---

## 📌 Priority Tiers

Based on `tools.registry.ts` priority field:

| Tier | Priority Range | Description | Groups |
|------|---------------|-------------|--------|
| **P1** | 1-10 | Highest Traffic + Client-only | 10 groups, 65 tools |
| **P2** | 11-15 | Good traffic, may need API | 5 groups, 33 tools |
| **P3** | 16-18 | Lower traffic, complex deps | 3 groups, 20 tools |
| **P4** | 19-22 | Heavy processing, lower priority | 4 groups, 26 tools |

---

## 🔴 P1 - Highest Priority (Groups 1-10)

### MVP Launch Tools

| Priority | Group | Tools | Focus |
|----------|-------|-------|-------|
| 1 | `password` - Password & Security | 8 | Security, high search volume |
| 2 | `text` - Text Tools | 7 | Universal text manipulation |
| 3 | `json` - JSON / YAML / XML | 8 | Developer essential |
| 4 | `random` - Random / Fun | 5 | Viral potential, shareable |
| 5 | `image` - Image Tools | 5 | High demand, visual |
| 6 | `pdf` - PDF Tools | 5 | Business workflow |
| 7 | `dev` - Dev Utilities | 9 | Developer audience |
| 8 | `data` - Encode/Decode | 6 | Developer essential |
| 9 | `datetime` - Date & Time | 6 | Universal utility |
| 10 | `youtube` - YouTube Tools | 6 | Content creators |

**Total P1**: 65 tools (45% of total)

---

## 🟡 P2 - Important (Groups 11-15)

### Quarter 1-2 Tools

| Priority | Group | Tools | Notes |
|----------|-------|-------|-------|
| 11 | `file-convert` - File Convert | 5 | Hybrid, needs server |
| 12 | `math` - Math & Calculator | 7 | Client-only, algorithms |
| 13 | `unit` - Unit Converters | 7 | Simple, quick wins |
| 14 | `finance` - Finance & Budget | 7 | Needs currency API |
| 15 | `health` - Health & Fitness | 7 | Disclaimers required |

**Total P2**: 33 tools (23% of total)

---

## 🟢 P3 - Nice-to-Have (Groups 16-18)

### Quarter 2-3 Tools

| Priority | Group | Tools | Notes |
|----------|-------|-------|-------|
| 16 | `seo` - SEO & Analysis | 7 | Some need crawling |
| 17 | `network` - Network & IP | 6 | Strict rate limits |
| 18 | `language` - Language & Translation | 7 | API-heavy |

**Total P3**: 20 tools (14% of total)

---

## ⚪ P4 - Future (Groups 19-22)

### Quarter 3+ Tools

| Priority | Group | Tools | Notes |
|----------|-------|-------|-------|
| 19 | `audio` - Audio Tools | 6 | Heavy WASM processing |
| 20 | `video` - Video Tools | 7 | Server-side required |
| 21 | `weather` - Weather & Environment | 6 | External APIs |
| 22 | `crypto` - Cryptocurrency | 7 | External APIs |

**Total P4**: 26 tools (18% of total)

---

## 📊 Implementation Breakdown

### By Implementation Type

| Type | Count | Percentage |
|------|-------|------------|
| **client-side** | ~100 | 69% |
| **hybrid** | ~30 | 21% |
| **server-side** | ~14 | 10% |

### By Complexity

| Complexity | Description | Count |
|------------|-------------|-------|
| **Low** | Plain JS, no deps | ~50 |
| **Medium** | Single lib dependency | ~60 |
| **High** | Multiple deps, API calls | ~34 |

---

## 🚀 MVP Tool Selection

### Week 1-2: Foundation + First Tools (10 tools)

| # | Tool | Group | RICE* | Rationale |
|---|------|-------|-------|-----------|
| 1 | Password Generator | password | 500 | Highest search volume |
| 2 | Base64 Encode/Decode | data | 240 | Developer essential |
| 3 | JSON Formatter | json | 175 | Developer essential |
| 4 | Word Counter | text | 210 | Writers, students |
| 5 | QR Code Generator | password | 180 | Universal use |
| 6 | Text Diff | text | 150 | High demand |
| 7 | Case Converter | text | 100 | Quick utility |
| 8 | UUID Generator | password | 150 | Developer audience |
| 9 | Hash Generator | password | 90 | Security tools |
| 10 | URL Parser | data | 80 | Developer utility |

*RICE = (Reach × Impact × Confidence) / Effort

### Week 3-4: Core Tools (15 more tools)

| # | Tool | Group | Focus |
|---|------|-------|-------|
| 11-18 | Remaining password tools | password | Complete security suite |
| 19-25 | Remaining text tools | text | Complete text suite |

### Week 5-6: Developer Tools (20 more tools)

| # | Tool | Group | Focus |
|---|------|-------|-------|
| 26-33 | JSON tools | json | Complete JSON suite |
| 34-42 | Dev utilities | dev | Complete dev suite |
| 43-48 | Data utilities | data | Complete data suite |

---

## 🎯 Decision Framework

### When to Say YES

✅ **High Impact**
- RICE score > 50
- Serves primary persona
- Aligns with "client-first" philosophy

✅ **Technical Fit**
- Can be client-side or light hybrid
- Doesn't require heavy server processing
- Has clear library solution

✅ **Strategic Fit**
- Fills gap in tool suite
- High search volume
- Shareable/viral potential

### When to Say NO

❌ **Low Value**
- RICE score < 5
- Already saturated market
- Doesn't serve any persona

❌ **Technical Risk**
- Requires heavy server
- High abuse potential
- Complex external dependencies

❌ **Legal/Ethical Risk**
- Copyright concerns
- Privacy violations
- Potential for misuse

---

## 📅 Roadmap

### Month 1: MVP Launch
- Complete P1 Groups 1-4 (28 tools)
- Deploy to production
- Basic analytics

### Month 2: Expansion
- Complete P1 Groups 5-10 (37 tools)
- Performance optimization
- SEO improvements

### Month 3: Enhancement
- Complete P2 Groups 11-15 (33 tools)
- API integrations
- Advanced features

### Month 4+: Full Suite
- Complete P3-P4 Groups 16-22 (46 tools)
- Premium features
- Mobile optimization

---

## 📊 Success Metrics

| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| **Active Tools** | 30 | 65 | 144 |
| **Tool Usage Rate** | 60% | 70% | 80% |
| **Return User Rate** | 20% | 35% | 50% |
| **Avg Tools/Session** | 1.5 | 2.0 | 2.5 |

---

## 🔄 Review Cadence

| Frequency | Action |
|-----------|--------|
| **Weekly** | Sprint planning, adjust tool priorities |
| **Monthly** | Analyze usage data, re-prioritize backlog |
| **Quarterly** | Strategic review, roadmap adjustment |

---

## Related Documents

- [Feature List](../feature/feature.md)
- [Team Assignment](./team-assignment.md)
- [Developer A Tasks](./dev-a-tasks.md)
