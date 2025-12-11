# 📚 Custom Agent Knowledge Files

**Last Updated:** December 11, 2025  
**Project:** Multi-Purpose Tool Platform

---

## 🎯 Purpose

This folder contains **project-specific knowledge files** for each BMAD agent. These files supplement the core agent personas with detailed context about the Multi-Purpose Tool Platform project.

---

## 📁 Knowledge Files

| File | Agent | Domain |
|------|-------|--------|
| [pm-knowledge.md](./pm-knowledge.md) | John (PM) | Product Strategy, Metrics, Prioritization |
| [architect-knowledge.md](./architect-knowledge.md) | Winston (Architect) | System Design, Tech Stack, Patterns |
| [analyst-knowledge.md](./analyst-knowledge.md) | Mary (Analyst) | Market Research, Competitive Analysis |
| [dev-knowledge.md](./dev-knowledge.md) | Amelia (Developer) | Implementation, Testing, Code Patterns |
| [ux-knowledge.md](./ux-knowledge.md) | Sally (UX Designer) | User Experience, Mobile-First, Accessibility |
| [sm-knowledge.md](./sm-knowledge.md) | Bob (Scrum Master) | Sprint Planning, Stories, Delivery |
| [tea-knowledge.md](./tea-knowledge.md) | Murat (Test Architect) | Test Strategy, Quality Gates, Automation |
| [tech-writer-knowledge.md](./tech-writer-knowledge.md) | Paige (Tech Writer) | Documentation, i18n Writing |
| [quick-flow-knowledge.md](./quick-flow-knowledge.md) | Barry (Quick Flow) | Rapid Execution, MVP Delivery |

---

## 🔗 Master Context

All agents should also reference the master project context:

**📋 [docs/project-context.md](../../../docs/project-context.md)**

This is the single source of truth containing:
- Project overview and vision
- Business metrics and OKRs
- Technical architecture summary
- Personas and user needs
- Prioritization framework
- Agent-specific quick reference

---

## 📖 How to Use

### For Agents

Agents should:
1. Load the master `project-context.md` first
2. Reference their specific knowledge file for detailed domain context
3. Cross-reference other agent knowledge when needed for collaboration

### For Updates

When project context changes:
1. Update `docs/project-context.md` (master)
2. Update relevant agent knowledge files
3. Ensure consistency across files

---

## 🔄 Knowledge Hierarchy

```
docs/project-context.md           ← Master context (all agents)
    ↓
.bmad/_cfg/custom/{agent}-knowledge.md  ← Domain-specific (per agent)
    ↓
docs/pm/ + docs/architecture/     ← Detailed documentation (reference)
```

---

**Version:** 1.0.0  
**Last Updated:** December 11, 2025
