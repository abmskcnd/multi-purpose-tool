# 📊 Success Metrics & KPI Dashboard

**Document Owner:** Product Manager  
**Last Updated:** December 11, 2025  
**Version:** 1.0.0  
**Status:** ✅ Active

[← Back to PM Hub](./README.md)

---

## 📌 Purpose

This document defines **how we measure success** through a hierarchy of metrics:
- **North Star Metric:** The one metric that matters most
- **Input Metrics:** Leading indicators we can influence
- **Output Metrics:** Lagging indicators of business health
- **Guard Metrics:** Ensure we don't sacrifice quality for growth

**Philosophy:** *"If you can't measure it, you can't improve it."* - Peter Drucker

---

## 🌟 North Star Metric

### Monthly Active Users (MAU)

**Definition:** Unique users who interact with ≥1 tool in a 30-day window

**Why This Metric?**
- ✅ Captures product value (users only return if tool is useful)
- ✅ Correlates with all business goals (revenue, brand, market share)
- ✅ Simple to track and communicate
- ✅ Aligns team around growth

**Targets:**

| Milestone | MAU Target | Timeline | Key Driver |
|-----------|------------|----------|------------|
| **MVP Launch** | 1,000 | Month 1 | Initial traffic, directories |
| **Product-Market Fit** | 10,000 | Month 3 | Word-of-mouth, SEO traction |
| **Scale Phase** | 100,000 | Month 6 | Programmatic SEO, backlinks |
| **Market Leader** | 500,000 | Month 12 | Brand recognition, global reach |

**Why MAU > Other Metrics?**
- **Revenue** is lagging (comes after usage)
- **Traffic** includes bounces (doesn't capture value)
- **Signups** conflicts with "no registration" vision
- **MAU** = True product engagement

---

## 📈 Input Metrics (Leading Indicators)

These are metrics we can **directly influence** through product/marketing efforts.

### 1. Acquisition Metrics

#### 1.1 Organic Search Traffic

**Definition:** Monthly unique visitors from search engines

**Target Progression:**

| Timeline | Target | Key Actions |
|----------|--------|-------------|
| Month 1 | 2K visits | Launch 100+ SEO pages |
| Month 3 | 20K visits | Rank top 3 for 10+ keywords |
| Month 6 | 200K visits | Programmatic SEO, 500+ keywords |
| Month 12 | 1M visits | Authority build, backlinks |

**How to Track:** GA4 → Acquisition → Traffic Acquisition → Organic Search

**Success Criteria:**
- ✅ 80%+ traffic from organic (vs. 20% paid/social)
- ✅ 50+ keywords ranking page 1
- ✅ 10+ keywords in top 3 positions

---

#### 1.2 Domain Authority (DA)

**Definition:** Moz's 1-100 score predicting ranking ability

**Target Progression:**

| Timeline | DA Target | Key Actions |
|----------|-----------|-------------|
| Launch | DA 10-15 | Initial domain indexing |
| Month 3 | DA 20 | Guest posts, directory listings |
| Month 6 | DA 30 | Quality backlinks, PR |
| Month 12 | DA 50+ | Authority site, brand mentions |

**How to Track:** Moz Link Explorer, Ahrefs

**Success Criteria:**
- ✅ DA growth +5 points per quarter
- ✅ 5K+ quality backlinks by Month 12
- ✅ 100+ referring domains

---

#### 1.3 Top-of-Funnel Traffic Sources

**Definition:** How users discover us

**Target Mix (Month 6):**

| Source | % of Traffic | Volume (at 200K visits) |
|--------|--------------|-------------------------|
| **Organic Search** | 80% | 160K |
| **Direct** | 10% | 20K |
| **Social** | 5% | 10K |
| **Referral** | 3% | 6K |
| **Paid** | 2% | 4K |

**How to Track:** GA4 → Acquisition → Traffic Acquisition

---

### 2. Activation Metrics

#### 2.1 Tool Usage Rate

**Definition:** % of visitors who use ≥1 tool

**Target Progression:**

| Timeline | Conversion Rate | What It Means |
|----------|----------------|---------------|
| Month 1 | 40% | Early adopters only |
| Month 3 | 60% | Product-market fit |
| Month 6 | 75% | Strong value prop |
| Month 12 | 80%+ | Best-in-class |

**How to Track:** GA4 → Events → `tool_used` / `page_view`

**Benchmarks:**
- **Competitors:** 30-50% (paywall friction)
- **Our Target:** 75%+ (no friction)

**Levers to Pull:**
- Improve CTAs on landing pages
- Reduce steps to first tool use
- Add "Recommended Tools" widget

---

#### 2.2 Time to First Tool Use (TTFTU)

**Definition:** Seconds from landing to first tool interaction

**Target:** <10 seconds

**How to Track:** GA4 → Custom metric (event timestamp delta)

**Why It Matters:** 
- Every second of delay = 10% drop in conversion
- Users abandon if not instant value

**Optimization Tactics:**
- Hero CTA above fold
- Lazy-load non-critical assets
- Inline tool on homepage

---

#### 2.3 Conversion Funnel

**Step 1:** Land on site (100%)  
**Step 2:** View tool page (80%)  
**Step 3:** Interact with tool (60%)  
**Step 4:** Complete conversion (55%)  
**Step 5:** Download result (50%)

**Target Completion Rate:** 50%+ (landing → download)

**How to Track:** GA4 → Exploration → Funnel Analysis

**Drop-off Points to Watch:**
- Landing → Tool page (improve navigation)
- Tool page → Interaction (better CTAs)
- Complete → Download (reduce friction)

---

### 3. Engagement Metrics

#### 3.1 Average Session Duration

**Target Progression:**

| Timeline | Avg Session | What It Means |
|----------|-------------|---------------|
| Month 1 | 1 min | Quick in-and-out (OK for MVP) |
| Month 3 | 3 min | Using multiple tools |
| Month 6 | 5 min | Deep engagement |
| Month 12 | 7 min+ | Power users, discovery |

**How to Track:** GA4 → Engagement → Average Engagement Time

**Benchmarks:**
- **Utility tools:** 2-5 min avg
- **Our target:** 5+ min (multi-tool usage)

---

#### 3.2 Tools per Session

**Target Progression:**

| Timeline | Avg Tools Used | What It Means |
|----------|----------------|---------------|
| Month 1 | 1.2 | Single-use cases |
| Month 3 | 1.5 | Some exploration |
| Month 6 | 2.0 | Workflows forming |
| Month 12 | 2.5+ | Platform stickiness |

**How to Track:** GA4 → Custom metric (`tool_used` events per session)

**Why It Matters:**
- More tools = higher perceived value
- Users with 2+ tool sessions = 3x more likely to return

---

#### 3.3 Pages per Session

**Target:** 3.5+ pages/session

**How to Track:** GA4 → Engagement → Pages per Session

**Ideal User Journey:**
1. Landing page (tool page)
2. Use tool
3. Browse related tools
4. Use second tool
5. Visit homepage/about

---

### 4. Retention Metrics

#### 4.1 Return User Rate

**Definition:** % of users who return within 30 days

**Target Progression:**

| Timeline | Return Rate | What It Means |
|----------|-------------|---------------|
| Month 1 | 10% | Low (expected for MVP) |
| Month 3 | 20% | Product-market fit signal |
| Month 6 | 35% | Strong retention |
| Month 12 | 50%+ | Sticky product |

**How to Track:** GA4 → Retention → User Retention

**Benchmarks:**
- **Utility tools:** 15-25% (transactional)
- **Our target:** 35%+ (habitual use)

**Tactics to Improve:**
- Browser bookmarks prompt
- Email newsletter (weekly tool tips)
- PWA (add to home screen)

---

#### 4.2 Daily Active Users (DAU)

**Target:** DAU/MAU ratio > 20% (by Month 6)

**How to Track:** GA4 → Realtime → Users (daily) / Monthly Users

**Why DAU/MAU Matters:**
- **10%** = Transactional (users come once/month)
- **20%** = Habitual (users come weekly)
- **40%+** = Daily habit (rare for utility tools)

**Our Target:** 20-25% (habitual weekly usage)

---

#### 4.3 Cohort Retention

**Definition:** % of users active in Week N after first visit

**Target Retention Curve:**

| Week | Retention % | Benchmark |
|------|-------------|-----------|
| Week 0 | 100% | (First visit) |
| Week 1 | 30% | 20-30% industry |
| Week 4 | 20% | 10-15% industry |
| Week 12 | 15% | 5-10% industry |
| Week 26 | 10% | 3-5% industry |

**How to Track:** GA4 → Retention → Cohort Exploration

**Why It Matters:** Flat retention curve = product stickiness

---

## 💰 Output Metrics (Lagging Indicators)

These measure **business outcomes** (revenue, growth, market position).

### 1. Revenue Metrics

#### 1.1 Monthly Recurring Revenue (MRR)

**Target Progression:**

| Timeline | MRR Target | Primary Source |
|----------|------------|----------------|
| Month 1 | $0 | (Building traffic) |
| Month 3 | $500 | AdSense (10K MAU) |
| Month 6 | $1,000 | AdSense (100K MAU) |
| Month 12 | $5,000 | Ads + Affiliate + Premium |

**How to Track:** Google AdSense dashboard + Stripe (future)

---

#### 1.2 Revenue per User (ARPU)

**Target:** $10/user/year (Month 12)

**Revenue Model Breakdown:**

| Source | % of Revenue | $ per User/Year |
|--------|--------------|-----------------|
| **AdSense** | 70% | $7.00 |
| **Affiliate** | 20% | $2.00 |
| **Premium** | 10% | $1.00 |
| **Total** | 100% | $10.00 |

**How to Calculate:** Total Revenue / MAU

**Benchmarks:**
- **Free tools (ads only):** $1-2 per user/year
- **Freemium tools:** $50-100 per paying user
- **Our Hybrid:** $10 per user (better than ads-only)

---

#### 1.3 Cost per Acquisition (CPA)

**Target:** <$0.50 per user (organic-heavy model)

**Breakdown:**

| Channel | CPA | Volume (Month 6) | Total Cost |
|---------|-----|------------------|------------|
| **Organic SEO** | $0.10 | 80K users | $8K |
| **Social** | $1.00 | 5K users | $5K |
| **Paid Ads** | $2.00 | 2K users | $4K |
| **Referral** | $0.05 | 3K users | $150 |
| **Blended CPA** | **$0.17** | **100K users** | **$17K** |

**How to Track:** Total Marketing Spend / New Users Acquired

**Why Low CPA?**
- 80%+ organic (free traffic)
- Viral word-of-mouth (free)
- No paid customer acquisition (initially)

---

#### 1.4 Lifetime Value (LTV)

**Target:** LTV/CAC ratio > 10:1

**LTV Calculation:**

```
LTV = ARPU × Avg Lifespan (years) × Retention Rate

LTV = $10/year × 5 years × 50% retention
LTV = $25 per user
```

**LTV/CAC Ratio:**

```
LTV/CAC = $25 / $0.50 = 50:1 ✅ (Excellent)
```

**Benchmarks:**
- **Good:** LTV/CAC > 3:1
- **Great:** LTV/CAC > 10:1
- **Ours:** 50:1 (organic-driven model)

---

### 2. Growth Metrics

#### 2.1 Month-over-Month Growth Rate

**Target:** 30%+ MoM growth (first 6 months)

**Growth Trajectory:**

| Month | MAU Target | MoM Growth % |
|-------|------------|--------------|
| Month 1 | 1K | - (Launch) |
| Month 2 | 3K | +200% |
| Month 3 | 10K | +233% |
| Month 4 | 30K | +200% |
| Month 5 | 60K | +100% |
| Month 6 | 100K | +67% |

**How to Track:** (Current Month MAU - Last Month MAU) / Last Month MAU

**Why 30%+ MoM?**
- Early-stage product = exponential growth expected
- Slowing to 20-30% after Month 6 is healthy

---

#### 2.2 Viral Coefficient (K-Factor)

**Definition:** Avg # of new users each user brings

**Target:** K > 0.5 (by Month 6)

**Formula:**

```
K = (# of invites sent per user) × (conversion rate of invites)

Example:
- Each user shares with 3 friends (social, bookmarks)
- 20% of those friends convert
- K = 3 × 0.2 = 0.6 ✅
```

**How to Track:** GA4 → Referral traffic + UTM tracking

**Why It Matters:**
- **K < 1:** Growth requires paid acquisition
- **K > 1:** Self-sustaining viral growth
- **Our Target:** 0.5-0.8 (strong organic)

---

### 3. Market Position Metrics

#### 3.1 SEO Rankings

**Target:** Top 3 rankings for 50+ keywords (Month 6)

**Tracking:**

| Keyword Category | # of Keywords | Avg Position (M6) |
|------------------|---------------|-------------------|
| **Brand** ("multi-purpose tool") | 5 | #1 |
| **Category** ("pdf converter") | 20 | #3-5 |
| **Long-tail** ("convert jpg to png free") | 100+ | #5-10 |
| **Total Tracked** | 150+ | #6 avg |

**How to Track:** Google Search Console, Ahrefs, SEMrush

---

#### 3.2 Brand Awareness

**Metrics to Track:**

| Metric | Target (M6) | Target (M12) |
|--------|-------------|--------------|
| **Direct Traffic %** | 10% | 20% |
| **Branded Search Volume** | 500/month | 5K/month |
| **Social Mentions** | 50/month | 500/month |
| **Press Coverage** | 5 articles | 20 articles |

**How to Track:** Google Trends, Social listening tools, Google Alerts

---

## 🛡️ Guard Metrics (Quality Safeguards)

These ensure we don't sacrifice **quality for growth**.

### 1. Performance Metrics

**Core Web Vitals (All Green):**

| Metric | Target | Current | Benchmark |
|--------|--------|---------|-----------|
| **LCP** (Largest Contentful Paint) | <2.5s | TBD | <2.5s = Good |
| **FID** (First Input Delay) | <100ms | TBD | <100ms = Good |
| **CLS** (Cumulative Layout Shift) | <0.1 | TBD | <0.1 = Good |

**How to Track:** Google PageSpeed Insights, Lighthouse CI

**Why It Matters:** SEO ranking factor + user experience

---

### 2. Reliability Metrics

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| **Uptime** | 99.9% | User trust, SEO |
| **Error Rate** | <0.1% | Quality signal |
| **Tool Success Rate** | >98% | Core value prop |

**How to Track:** Uptime monitors (UptimeRobot), Sentry error tracking

---

### 3. User Satisfaction Metrics

#### 3.1 Net Promoter Score (NPS)

**Target:** NPS > 50 (by Month 6)

**Survey Question:** "How likely are you to recommend our tool to a friend?" (0-10)

**Calculation:**
```
NPS = % Promoters (9-10) - % Detractors (0-6)

Example:
- 60% rate 9-10 (Promoters)
- 10% rate 0-6 (Detractors)
- NPS = 60 - 10 = 50 ✅
```

**How to Track:** In-app survey (post-tool-use) or email survey

**Benchmarks:**
- **Good:** NPS > 30
- **Excellent:** NPS > 50
- **World-class:** NPS > 70

---

#### 3.2 Customer Satisfaction (CSAT)

**Target:** CSAT > 4.5/5.0

**Survey Question:** "How satisfied are you with this tool?" (1-5 stars)

**How to Track:** Post-tool-use survey (optional popup)

---

#### 3.3 User Feedback Volume

**Target:** 10+ qualitative feedback submissions per week (Month 6)

**Channels:**
- In-app feedback form
- Email replies
- Social media mentions
- User interviews

**How to Track:** Notion database, feedback aggregation tool

---

## 📊 Metrics Dashboard (Monitoring)

### Weekly Dashboard (Operations)

**Focus:** Short-term health checks

| Metric | This Week | Last Week | % Change |
|--------|-----------|-----------|----------|
| **DAU** | TBD | TBD | TBD |
| **New Users** | TBD | TBD | TBD |
| **Tool Usage Rate** | TBD | TBD | TBD |
| **Avg Session Duration** | TBD | TBD | TBD |
| **Error Rate** | TBD | TBD | TBD |

**How to Access:** GA4 custom dashboard + Slack alerts

---

### Monthly Dashboard (Tactical)

**Focus:** Goal progress tracking

| Metric | This Month | Target | On Track? |
|--------|------------|--------|-----------|
| **MAU** | TBD | TBD | TBD |
| **MRR** | TBD | TBD | TBD |
| **Organic Traffic** | TBD | TBD | TBD |
| **Return Rate** | TBD | TBD | TBD |
| **NPS** | TBD | TBD | TBD |

**Review Cadence:** First Monday of each month

---

### Quarterly Dashboard (Strategic)

**Focus:** OKR progress + strategic pivots

| OKR | Progress | Status | Actions |
|-----|----------|--------|---------|
| **100K MAU by Q2** | TBD | TBD | TBD |
| **$1K MRR by Q2** | TBD | TBD | TBD |
| **DA 30 by Q3** | TBD | TBD | TBD |
| **NPS 50+ by Q3** | TBD | TBD | TBD |

**Review Cadence:** Last Friday of each quarter

---

## 📞 Related Documents

**For Strategy Context:**  
→ [Product Strategy](./01-product-strategy.md)  
→ [Market Analysis](./02-market-analysis.md)

**For User Context:**  
→ [User Personas](./10-user-personas.md)  
→ [Analytics Plan](./31-analytics-plan.md)

**For Execution:**  
→ [Feature Prioritization](./21-feature-prioritization.md)  
→ [Product Roadmap](./20-roadmap.md)

---

**Document Status:** ✅ Active  
**Next Review:** Monthly (first Monday of each month)  
**Owner:** Product Manager
