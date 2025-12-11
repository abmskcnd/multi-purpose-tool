# 🎨 UX Designer Agent Knowledge Base: Multi-Purpose Tool Platform

**Agent:** Sally (UX Designer)  
**Last Updated:** December 11, 2025  
**Domain:** User Experience, Mobile-First Design, Accessibility

---

## 🎯 Project Quick Context

**Multi-Purpose Tool Platform** = Free online toolbox with focus on instant, frictionless experience.

### UX Principles
- ✅ Zero friction (no registration)
- ✅ Instant gratification (<3s to result)
- ✅ Mobile-first design
- ✅ WCAG 2.1 AA accessibility
- ✅ Touch-optimized interfaces

---

## 👥 Persona UX Needs

### Sarah (Student) 📚
- **Device:** iPhone 12, MacBook Air
- **Context:** Commuting, coffee shops, classroom
- **Needs:** 
  - One-tap conversion
  - Works on mobile data
  - No registration required
  - Clean, distraction-free UI

### Mike (Marketer) 💼
- **Device:** iPhone 14 Pro, MacBook Pro
- **Context:** Client meetings, on-the-go, remote work
- **Needs:**
  - Batch processing capability
  - Professional quality output
  - Privacy assurance visible
  - Share/export options

### Alex (Developer) 💻
- **Device:** Multiple monitors, high-res displays
- **Context:** Coding workflow, quick utility access
- **Needs:**
  - Keyboard shortcuts
  - Dark mode support
  - Minimal, clean UI
  - Copy-to-clipboard functionality

---

## 🎪 UX Design Guidelines

### Layout Principles

```
┌─────────────────────────────────────┐
│ Header (minimal, language selector) │
├─────────────────────────────────────┤
│                                     │
│     Tool Interface (hero area)      │
│     - File upload / input           │
│     - Settings                      │
│     - Process button                │
│                                     │
├─────────────────────────────────────┤
│     Result / Download area          │
├─────────────────────────────────────┤
│     Tool description (SEO)          │
├─────────────────────────────────────┤
│     Related tools                   │
├─────────────────────────────────────┤
│ Footer (links, legal)               │
└─────────────────────────────────────┘
```

### Mobile-First Breakpoints

| Breakpoint | Width | Primary Layout |
|------------|-------|----------------|
| Mobile S | 320px | Single column |
| Mobile M | 375px | Single column |
| Mobile L | 425px | Single column |
| Tablet | 768px | Single column with wider margins |
| Laptop | 1024px | Two columns possible |
| Desktop | 1440px | Max-width container |

---

## 🎯 Key UX Metrics

### Time-Based

| Metric | Target |
|--------|--------|
| Time to First Tool Use | <10 seconds |
| Processing Perception | <3 seconds (fake progress OK) |
| Page Load (LCP) | <2.5 seconds |

### Interaction-Based

| Metric | Target |
|--------|--------|
| Tool Usage Rate | 75% of visitors |
| Task Completion Rate | 90% (start → download) |
| Error Rate | <5% |
| Mobile Usability Score | 100/100 |

---

## 📱 Touch Target Guidelines

| Element | Minimum Size | Spacing |
|---------|-------------|---------|
| Primary buttons | 48px × 48px | 8px |
| Secondary buttons | 44px × 44px | 8px |
| Icon buttons | 44px × 44px | 4px |
| Form inputs | 44px height | - |
| Links | 24px height | 8px |

---

## ♿ Accessibility Requirements

### WCAG 2.1 AA Checklist

- [ ] Color contrast 4.5:1 (text) / 3:1 (large text)
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Alt text for images
- [ ] Form labels associated
- [ ] Error messages clear
- [ ] Skip-to-content link

### Color Palette (Accessible)

```
Primary:    #2563EB (Blue 600) - 7.1:1 on white
Secondary:  #16A34A (Green 600) - 4.5:1 on white
Error:      #DC2626 (Red 600) - 4.5:1 on white
Text:       #1F2937 (Gray 800) - 12.6:1 on white
Muted:      #6B7280 (Gray 500) - 4.6:1 on white
Background: #FFFFFF
```

---

## 🔧 Component Patterns

### File Upload Zone

```
┌─────────────────────────────────────┐
│                                     │
│    📁 Drag files here or browse     │
│                                     │
│    Supports: JPG, PNG (max 10MB)    │
│                                     │
└─────────────────────────────────────┘

States:
- Default: Dashed border, muted text
- Hover: Solid border, primary color
- Drag over: Primary background, white text
- Loading: Progress bar overlay
- Error: Red border, error message
```

### Progress Indicator

```
Processing... 45%
[████████░░░░░░░░░░░░]

States:
- Indeterminate: Animated bar (unknown duration)
- Determinate: Percentage fill (known duration)
- Complete: Checkmark icon, success color
```

### Result Card

```
┌─────────────────────────────────────┐
│ ✅ Conversion Complete              │
│                                     │
│ output.png (2.4 MB)                 │
│                                     │
│ [Download]  [Copy Link]  [New]      │
└─────────────────────────────────────┘
```

---

## 🎨 UI Components (shadcn/ui)

### Required Components

| Component | Usage |
|-----------|-------|
| Button | Primary actions, submit |
| Input | Text fields, file names |
| Select | Format selection, options |
| Slider | Quality, size settings |
| Progress | Processing indicator |
| Card | Tool containers, results |
| Alert | Errors, success messages |
| Tooltip | Help text, info |

---

## 📱 Mobile Testing Checklist

- [ ] Test on iPhone SE (smallest common)
- [ ] Test on iPhone 14 Pro (standard)
- [ ] Test on Android (Samsung Galaxy)
- [ ] Test on tablet (iPad)
- [ ] Test touch targets (48px+)
- [ ] Test landscape orientation
- [ ] Test with slow network (3G)
- [ ] Test offline state

---

## 🌍 i18n UX Considerations

### RTL Support
- [ ] Mirror layouts for RTL languages
- [ ] Icons that imply direction
- [ ] Text alignment adjustments

### Text Expansion
- Allow 30% expansion for translations
- Flexible layouts (no fixed widths)
- Test with longest language (German)

### Locale-Specific
- Date formats
- Number formats
- Currency display

---

## 🎛️ UX Designer Workflow

### Design Process

1. **Understand** - Review persona needs
2. **Sketch** - Low-fi wireframes
3. **Prototype** - Interactive mockups
4. **Test** - Usability testing
5. **Refine** - Iterate based on feedback
6. **Handoff** - Specs for development

### Deliverables

- Wireframes (low-fi)
- High-fi mockups
- Component specifications
- Interaction patterns
- Usability test reports

---

## 📚 Reference Documents

- [User Personas](./pm/10-user-personas.md)
- [Success Metrics](./pm/30-success-metrics.md)
- [System Architecture](./architecture/01-system-architecture.md)

---

**Version:** 1.0.0  
**Agent:** UX Designer (Sally)
