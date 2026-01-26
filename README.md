# Simple Feature Flags

A simple feature flags library for JavaScript and React applications, written in TypeScript.

This is a monorepo containing:

- `@simple-feature-flags/core`: Core logic.
- `@simple-feature-flags/react`: React bindings.

## Installation

You can install the main package:

```bash
npm install simple-feature-flags
```

Or install packages independently:

```bash
npm install @simple-feature-flags/core
npm install @simple-feature-flags/react
```

## Usage

### Core

```typescript
// If using main package
import { featureFlags } from "simple-feature-flags/core";
// If using independent package
// import { featureFlags } from '@simple-feature-flags/core';

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
// import { FeatureFlagProvider, useFeatures } from '@simple-feature-flags/react';

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

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build:
   ```bash
   npm run build
   ```
