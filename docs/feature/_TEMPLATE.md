# 🛠️ [Tool Name]

> **Tool ID:** `[group]/[tool-id]`  
> **Group:** [Group Name]  
> **Status:** `coming-soon` | `active` | `deprecated`  
> **Implementation:** `client-side` | `server-side` | `hybrid`  
> **Last Updated:** [Date]

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technical Specifications](#technical-specifications)
4. [File Structure](#file-structure)
5. [Dependencies](#dependencies)
6. [Component API](#component-api)
7. [Core Logic](#core-logic)
8. [UI/UX Specifications](#uiux-specifications)
9. [Accessibility](#accessibility)
10. [i18n Keys](#i18n-keys)
11. [Testing Checklist](#testing-checklist)
12. [Future Enhancements](#future-enhancements)
13. [Changelog](#changelog)

---

## Overview

### Description

[Mô tả ngắn gọn công cụ làm gì, 2-3 câu]

### User Stories

| As a... | I want to... | So that... |
|---------|--------------|------------|
| User | [Action] | [Benefit] |
| User | [Action] | [Benefit] |

### Security Considerations

- [ ] Client-side only / Server processing required
- [ ] Data handling policy
- [ ] Any sensitive data considerations

---

## Features

### Core Features

| Feature | Status | Description |
|---------|--------|-------------|
| [Feature 1] | ⬜ Todo | [Description] |
| [Feature 2] | ⬜ Todo | [Description] |

### Feature Details

[Chi tiết về logic, algorithm, character sets, scoring, etc.]

---

## Technical Specifications

### Performance

| Metric | Target | Actual |
|--------|--------|--------|
| Initial Load | < [X]ms | TBD |
| Processing Time | < [X]ms | TBD |
| Bundle Size | < [X]KB | TBD |

### Browser Support

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | [Version]+ | [Notes] |
| Firefox | [Version]+ | [Notes] |
| Safari | [Version]+ | [Notes] |
| Edge | [Version]+ | [Notes] |

### API Dependencies

| API | Usage | Fallback |
|-----|-------|----------|
| [API Name] | [Purpose] | [Fallback strategy] |

---

## File Structure

```
src/features/tools/[group]/[tool]/
├── index.ts                    # Re-export entry point
├── [ToolName].tsx              # Main component
├── hooks/                      # Custom hooks
│   └── use[ToolName].ts
└── utils/                      # Utility functions
    └── [utilityName].ts
```

---

## Dependencies

### External Dependencies

| Package | Version | Purpose | Required |
|---------|---------|---------|----------|
| `[package]` | ^[version] | [Purpose] | ✅/⬜ |

### Internal Dependencies

| Module | Path | Purpose |
|--------|------|---------|
| `[Component]` | `@/features/tools/_shared/components` | [Purpose] |

### Web APIs

| API | Purpose | Documentation |
|-----|---------|---------------|
| [API] | [Purpose] | [MDN Link] |

---

## Component API

### Props

```typescript
interface [ToolName]Props {
  // Define props
}
```

### State

```typescript
interface [ToolName]State {
  // Define state shape
}

const DEFAULT_STATE: [ToolName]State = {
  // Default values
};
```

### Callbacks

| Function | Purpose | Dependencies |
|----------|---------|--------------|
| `handle[Action]` | [Purpose] | `[deps]` |

### Computed Values

| Value | Computation | Dependencies |
|-------|-------------|--------------|
| [value] | [computation] | `[deps]` |

---

## Core Logic

### Main Algorithm

```typescript
// Pseudocode or actual implementation
function mainFunction(input: InputType): OutputType {
  // Step 1: ...
  // Step 2: ...
  // Step 3: ...
}
```

### Edge Cases

| Case | Handling |
|------|----------|
| [Edge case 1] | [How it's handled] |
| [Edge case 2] | [How it's handled] |

---

## UI/UX Specifications

### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Section Title]                        │
│  ─────────────────────────────────────  │
│  [Layout description using ASCII art]   │
│                                         │
└─────────────────────────────────────────┘
```

### Interactive States

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| [Element] | [Style] | [Style] | [Style] | [Style] |

### Feedback States

| Action | Feedback | Duration |
|--------|----------|----------|
| [Action] | [Visual/Audio feedback] | [ms] |

---

## Accessibility

### ARIA Labels

| Element | Attribute | Value |
|---------|-----------|-------|
| [Element] | `aria-[attr]` | "[value]" |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | [Action] |
| `Enter` | [Action] |
| `Space` | [Action] |

### Screen Reader Announcements

- [Event]: [Announcement]
- [Event]: [Announcement]

---

## i18n Keys

### Translation Namespace: `tools.[tool_id]`

```json
{
  "tools": {
    "[tool_id]": {
      "title": "[Tool Title]",
      "description": "[Description]",
      "options": {
        // Option labels
      },
      "actions": {
        // Action button labels
      },
      "messages": {
        // Success/error messages
      }
    }
  }
}
```

---

## Testing Checklist

### Unit Tests

- [ ] [Test case 1]
- [ ] [Test case 2]
- [ ] [Test case 3]

### Component Tests

- [ ] Renders with default state
- [ ] [Component test 2]
- [ ] [Component test 3]

### E2E Tests

```typescript
// e2e/tools/[tool-id].spec.ts
test('[test description]', async ({ page }) => {
  // Test implementation
});
```

### Manual Testing

- [ ] Test on major browsers
- [ ] Test on mobile devices
- [ ] Test dark mode
- [ ] Test with screen reader
- [ ] Test keyboard navigation

---

## Future Enhancements

### Phase 2 - Planned

| Feature | Priority | Complexity | Notes |
|---------|----------|------------|-------|
| [Feature] | High/Medium/Low | High/Medium/Low | [Notes] |

### Phase 3 - Considered

| Feature | Priority | Complexity | Notes |
|---------|----------|------------|-------|
| [Feature] | High/Medium/Low | High/Medium/Low | [Notes] |

---

## Changelog

### v1.0.0 ([Date])

**Initial Release**
- ✅ [Feature 1]
- ✅ [Feature 2]

---

## Related Tools

| Tool | Relationship |
|------|--------------|
| [Tool Name](./path/to/doc.md) | [How they relate] |

---

## Owner & Contact

| Role | Name | Responsibility |
|------|------|----------------|
| Owner | [Name] | Feature development |
| Reviewer | [Name] | Code review |

---

*Document generated for Multi-Purpose Tool project*  
*Template version: 1.0.0*
