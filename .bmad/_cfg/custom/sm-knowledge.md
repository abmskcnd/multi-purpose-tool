# 🏃 Scrum Master Agent Knowledge Base: Multi-Purpose Tool Platform

**Agent:** Bob (Scrum Master)  
**Last Updated:** December 11, 2025  
**Domain:** Story Preparation, Sprint Planning, Agile Delivery

---

## 🎯 Project Quick Context

**Multi-Purpose Tool Platform** = Free online toolbox with 20 MVP tools launching first.

### Delivery Framework
- **Sprint Length:** 2 weeks
- **MVP Timeline:** 5 weeks (20 tools)
- **Team Size:** 1-2 developers (solo/pair)
- **Methodology:** Agile/Scrum adapted for small team

---

## 📋 MVP Sprint Plan

### Sprint 1 (Week 1-2)
**Goal:** Core infrastructure + 5 tools

| Story | Tool | RICE | Points |
|-------|------|------|--------|
| S1-01 | Password Generator | 500 | 2 |
| S1-02 | Word to PDF | 250 | 3 |
| S1-03 | Base64 Encode/Decode | 240 | 2 |
| S1-04 | Image Rotate | 210 | 2 |
| S1-05 | Word Counter | 210 | 2 |

**Total Points:** 11

### Sprint 2 (Week 3-4)
**Goal:** Core tools + SEO pages

| Story | Tool | RICE | Points |
|-------|------|------|--------|
| S2-01 | JPG to PNG | 180 | 3 |
| S2-02 | PNG to JPG | 180 | 2 |
| S2-03 | QR Code Generator | 180 | 3 |
| S2-04 | URL Encode/Decode | 180 | 2 |
| S2-05 | JSON Formatter | 175 | 3 |

**Total Points:** 13

### Sprint 3 (Week 5-6)
**Goal:** Image tools + PDF conversion

| Story | Tool | RICE | Points |
|-------|------|------|--------|
| S3-01 | PDF to Word | 167 | 5 |
| S3-02 | Image Resize | 167 | 3 |
| S3-03 | Image Compress | 167 | 3 |
| S3-04 | Image Crop | 160 | 3 |

**Total Points:** 14

### Sprint 4 (Week 7-8)
**Goal:** PDF suite + dev tools

| Story | Tool | RICE | Points |
|-------|------|------|--------|
| S4-01 | UUID Generator | 150 | 2 |
| S4-02 | PDF Merge | 107 | 3 |
| S4-03 | PDF Split | 93 | 3 |
| S4-04 | Image to PDF | 90 | 3 |

**Total Points:** 11

### Sprint 5 (Week 9-10)
**Goal:** Final tools + polish

| Story | Tool | RICE | Points |
|-------|------|------|--------|
| S5-01 | PDF Compress | 90 | 5 |
| S5-02 | Hash Generator | 90 | 2 |
| S5-03 | Bug fixes & polish | - | 5 |
| S5-04 | Performance optimization | - | 3 |

**Total Points:** 15

---

## 📝 User Story Template

```markdown
## Story: [Tool Name]

**As a** [persona]
**I want to** [action]
**So that** [benefit]

### Acceptance Criteria

#### AC-1: Basic Functionality
- [ ] User can [primary action]
- [ ] Result is [expected outcome]

#### AC-2: File Handling
- [ ] Accepts [file types]
- [ ] Max size [X MB]
- [ ] Validates file type (magic bytes)

#### AC-3: UX
- [ ] Works on mobile (iOS Safari, Android Chrome)
- [ ] Processing indicator shows progress
- [ ] Error messages are user-friendly

#### AC-4: i18n
- [ ] All text strings are translatable
- [ ] Works in EN and VI locales

#### AC-5: Analytics
- [ ] Tracks tool_used event
- [ ] Tracks conversion_completed event

### Technical Notes
- Processing library: [library]
- Lazy loading required: [yes/no]
- Bundle size impact: [estimated KB]

### Definition of Done
- [ ] All AC verified
- [ ] Unit tests written
- [ ] E2E test passes
- [ ] Mobile tested
- [ ] Code reviewed
- [ ] Deployed to preview
```

---

## ✅ Definition of Done (DoD)

### Code Quality
- [ ] TypeScript strict mode passes
- [ ] ESLint/Prettier clean
- [ ] No console.logs in production code

### Testing
- [ ] Unit tests written (>80% coverage)
- [ ] E2E test for happy path
- [ ] Mobile device tested

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast verified

### Documentation
- [ ] Code comments where needed
- [ ] README updated if needed
- [ ] Translation strings added

### Review
- [ ] Code reviewed (or self-reviewed for solo)
- [ ] Deployed to preview environment
- [ ] Stakeholder demo completed

---

## 📊 Estimation Guide

### Story Points Scale

| Points | Effort | Example |
|--------|--------|---------|
| 1 | Hours | Config change, copy update |
| 2 | 1 day | Simple tool (text-only) |
| 3 | 2 days | Image tool (existing library) |
| 5 | 3-4 days | Complex tool (PDF, video) |
| 8 | 1 week | New processing engine |
| 13 | 2 weeks | Major feature/refactor |

### Velocity Baseline
- **Solo dev:** 10-15 points/sprint
- **Pair:** 18-25 points/sprint

---

## 🚨 Risk Tracking

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| WASM bundle size | Performance | Lazy loading |
| PDF processing complexity | Timeline | Use existing libraries |
| Mobile browser limits | Features | Progressive enhancement |
| Memory constraints | Crashes | File size limits |

### Schedule Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Underestimation | Delayed launch | Buffer sprint |
| Scope creep | Quality | Strict MVP scope |
| Technical debt | Velocity | Refactor in buffer |

---

## 🎯 Tool Categories by Sprint

### Sprint Focus

| Sprint | Focus Area | Key Challenge |
|--------|------------|---------------|
| 1 | Text tools | Infrastructure setup |
| 2 | Image basics | WASM integration |
| 3 | Image advanced | Compression quality |
| 4 | PDF tools | pdf-lib complexity |
| 5 | Polish | Edge cases, bugs |

---

## 🔄 Sprint Ceremonies

### For Solo/Small Team

| Ceremony | Frequency | Duration |
|----------|-----------|----------|
| Sprint Planning | Start of sprint | 1 hour |
| Daily Standup | Daily (async OK) | 5 min |
| Sprint Review | End of sprint | 30 min |
| Retrospective | End of sprint | 30 min |

### Async Standup Format
```
📊 Yesterday: [what completed]
🎯 Today: [what working on]
🚨 Blockers: [any issues]
```

---

## 📋 Backlog Prioritization

### Priority Formula
```
Priority = RICE Score × Persona Alignment × Technical Feasibility
```

### Priority Tiers
- 🔴 **P0:** Must be in MVP (RICE > 100)
- 🟡 **P1:** Should be in MVP (RICE 50-100)
- 🟢 **P2:** Nice to have (RICE 20-50)
- ⚪ **P3:** Future consideration (RICE < 20)

---

## 🎛️ Scrum Master Workflow Commands

```
*create-epics-and-stories → Create stories from PRD
*implementation-readiness → Validate before development
*correct-course           → When off track
```

---

## 📚 Reference Documents

- [Feature Prioritization](./pm/21-feature-prioritization.md)
- [Success Metrics](./pm/30-success-metrics.md)
- [Project Structure](./architecture/02-project-structure.md)

---

**Version:** 1.0.0  
**Agent:** Scrum Master (Bob)
