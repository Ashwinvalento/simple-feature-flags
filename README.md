# Simple Feature Flags

> **Note:** This is a completely Vibe coded repository.

A simple feature flags library for JavaScript and React applications, written in TypeScript.

This is a monorepo containing:

- `simple-feature-flags-core`: Core logic.
- `simple-feature-flags-react`: React bindings.

## Installation

You can install the main package:

```bash
npm install simple-feature-flags
```

Or install packages independently:

```bash
npm install simple-feature-flags-core
npm install simple-feature-flags-react
```

## Usage

### Core

```typescript
// If using main package
import { featureFlags } from "simple-feature-flags/core";
// If using independent package
// import { featureFlags } from 'simple-feature-flags-core';

featureFlags.init({
  newFeature: true,
  deprecatedFeature: false,
});

if (featureFlags.isEnabled("newFeature")) {
  // ...
}
```

### React

```tsx
// If using main package
import { FeatureFlagProvider, useFeatures } from "simple-feature-flags/react";
// If using independent package
// import { FeatureFlagProvider, useFeatures } from 'simple-feature-flags-react';

// In your root component
function App() {
  const flags = { newFeature: true };

  return (
    <FeatureFlagProvider flags={flags}>
      <MyComponent />
    </FeatureFlagProvider>
  );
}

// In a child component
function MyComponent() {
  const { isEnabled, isDisabled } = useFeatures();

  if (isEnabled("newFeature")) {
    return <div>New Feature!</div>;
  }
  return <div>Old Feature</div>;
}
```

## Advantages

- **Zero Dependencies (Core):** The core logic is extremely lightweight with no external dependencies.
- **Type-Safe:** Built with TypeScript from the ground up, providing excellent DX with autocompletion.
- **Framework Agnostic Core:** Use the core logic in Node.js, Vue, Angular, or vanilla JS.
- **React Hooks:** First-class React support with intuitive hooks.
- **Flexible:** Supports checking single flags or arrays of flags.

## Comparison with Other Libraries

| Feature         | Simple Feature Flags         | LaunchDarkly / SaaS SDKs    | Custom Context         |
| :-------------- | :--------------------------- | :-------------------------- | :--------------------- |
| **Setup**       | Instant (Zero config)        | Complex (Requires API keys) | Moderate (Boilerplate) |
| **Data Source** | Local / Custom (You init it) | Remote / Streaming          | Local                  |
| **Size**        | Tiny                         | Large (Network logic)       | Tiny                   |
| **Focus**       | Feature Flagging logic       | Full Management Platform    | Generic State          |

Unlike complex SaaS SDKs that manage remote configurations and user targeting, `simple-feature-flags` focuses on the _consumption_ and _checking_ of flags within your application code. It pairs perfectly with any backend or configuration provider you choose.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build:
   ```bash
   npm run build
   ```

## Publishing

To publish the packages to npm:

1. Login to npm:

   ```bash
   npm login
   ```

2. Run the publish script:
   ```bash
   npm run publish:packages
   ```
