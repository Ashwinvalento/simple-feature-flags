<div align="center">
  <img src="https://raw.githubusercontent.com/Ashwinvalento/simple-feature-flags/main/assets/logo.svg" width="120" alt="Simple Feature Flags Logo" />
  <h1>@simple-feature-flags/react</h1>
</div>

React bindings and hooks for Simple Feature Flags.

## Installation

```bash
npm install @simple-feature-flags/react
# Note: @simple-feature-flags/core is a dependency
```

## Usage

### 1. Setup Provider

Wrap your application with the `FeatureFlagProvider`.

```tsx
import { FeatureFlagProvider } from "@simple-feature-flags/react";

const flags = {
  newDashboard: true,
  experimentalFeature: false,
};

function App() {
  return (
    <FeatureFlagProvider flags={flags}>
      <MainApp />
    </FeatureFlagProvider>
  );
}
```

### 2. Use Hooks

Use the `useFeatures` hook in your components.

```tsx
import { useFeatures } from "@simple-feature-flags/react";

function Dashboard() {
  const { isEnabled, isDisabled, getFlag } = useFeatures();

  if (isEnabled("newDashboard")) {
    return <NewDashboard />;
  }

  return <OldDashboard />;
}
```

### 3. Check Multiple Flags

```tsx
const { isEnabled } = useFeatures();

// Returns true only if BOTH are enabled
if (isEnabled(["newDashboard", "hasAccess"])) {
  // ...
}
```

### 4. Type Safety & Autocomplete (Global)

To get autocomplete for keys in `useFeatures` globally, extend the `AppFlags` interface from the core package.

Create a definition file (e.g., `feature-flags.d.ts`):

```typescript
import "@simple-feature-flags/core";

declare module "@simple-feature-flags/core" {
  export interface AppFlags {
    newDashboard: boolean;
    experimentalFeature: boolean;
  }
}
```

**Note:** Defining `AppFlags` enables autocomplete but does not restrict usage. You can still pass dynamic strings that are not defined in the interface.

### 5. Type Safety (Local/Inferred)

If you prefer to infer types from your flags object without global augmentation, you can pass the type to the hook:

```tsx
const flags = {
  dynamicFeature: true,
  theme: "dark",
};

function App() {
  return (
    <FeatureFlagProvider flags={flags}>
      <Component />
    </FeatureFlagProvider>
  );
}

function Component() {
  // Pass the type of your flags object
  const { isEnabled } = useFeatures<typeof flags>();

  // Autocompletes "dynamicFeature" and "theme"!
  if (isEnabled("dynamicFeature")) {
    // ...
  }
}
```

## More Information

For more details, contributions, and documentation, visit the [Main Repository](https://github.com/Ashwinvalento/simple-feature-flags#readme).
