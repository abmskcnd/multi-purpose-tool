# Tool Implementation Guide

## Folder Structure

```
src/features/tools/
├── _shared/                    # Shared utilities across tools
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Shared hooks
│   └── utils/                 # Shared utilities
├── password/                   # Password & Security group
│   ├── generator/             # Password Generator tool
│   │   ├── index.ts           # Export entry point
│   │   ├── PasswordGenerator.tsx
│   │   ├── hooks/
│   │   │   └── usePasswordGenerator.ts
│   │   └── utils/
│   │       └── generatePassword.ts
│   ├── strength-checker/
│   └── ...
├── text/                       # Text Tools group
│   ├── diff/
│   ├── case-converter/
│   └── ...
└── [group-id]/
    └── [tool-id]/
```

## Quick Start: Implementing a Tool

### Step 1: Create Tool Folder
```bash
mkdir -p src/features/tools/[group]/[tool]
```

### Step 2: Create Main Component
```tsx
// src/features/tools/password/generator/PasswordGenerator.tsx
'use client';

import { useState } from 'react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Password Generator</h2>
      {/* Your implementation */}
    </div>
  );
}
```

### Step 3: Create Index Export
```ts
// src/features/tools/password/generator/index.ts
export { default } from './PasswordGenerator';
```

### Step 4: Register Component
Add to `src/config/tool-components.ts`:
```ts
'password/generator': dynamic(
  () => import('@/features/tools/password/generator'),
  { loading: ToolLoading, ssr: false }
),
```

### Step 5: Update Status
In `src/config/tools.registry.ts`, change status to 'active':
```ts
{ id: 'generator', ..., status: 'active' }
```

## Team Assignment Strategy

### Option 1: By Group (Recommended)
```
Person A: password/, data/, dev/
Person B: text/, json/, image/
Person C: pdf/, random/, datetime/
```

### Option 2: By Priority
```
Sprint 1:
  - Person A: password/generator
  - Person B: text/diff
  - Person C: json/format-validate
  
Sprint 2:
  - Person A: password/strength-checker
  - Person B: text/case-converter
  - Person C: json/diff
```

## Avoiding Conflicts

### Files You CAN Modify Safely
- Everything inside your assigned `src/features/tools/[group]/[tool]/` folder
- Your tool's specific tests
- Your tool's specific documentation

### Files That Need Coordination
- `src/config/tool-components.ts` - Add your import (single line change)
- `src/config/tools.registry.ts` - Change status (minimal change)
- `src/locales/*.json` - Add tool-specific translations

### Best Practices
1. **Create feature branch**: `feature/tool-password-generator`
2. **Small PRs**: One tool per PR
3. **Lock files**: Use `.lock` files for shared config if needed
4. **Communication**: Use Slack/Discord to coordinate registry updates

## Component Template

```tsx
'use client';

import { useState, useCallback } from 'react';
// import { useTranslations } from 'next-intl';

interface ToolState {
  // Define your state
}

export default function ToolName() {
  // const t = useTranslations('tools.tool_name');
  const [state, setState] = useState<ToolState>({});

  const handleAction = useCallback(() => {
    // Implementation
  }, []);

  return (
    <div className="p-6">
      {/* Tool Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Tool Name</h2>
        <p className="text-sm text-muted-foreground">Tool description</p>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        {/* Input controls */}
      </div>

      {/* Action Button */}
      <button
        onClick={handleAction}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Execute
      </button>

      {/* Output Section */}
      <div className="mt-6">
        {/* Results */}
      </div>
    </div>
  );
}
```

## Testing

Each tool should have its own test file:
```
src/features/tools/password/generator/
├── PasswordGenerator.tsx
├── PasswordGenerator.test.tsx    # Component tests
├── index.ts
└── utils/
    ├── generatePassword.ts
    └── generatePassword.test.ts  # Unit tests
```

## Translations

Add tool-specific translations to the main locale files:
```json
{
  "tools": {
    "password_generator": {
      "title": "Password Generator",
      "generate": "Generate",
      "length": "Length"
    }
  }
}
```

Or use a tool-specific i18n file that gets merged during build.
