<div align="center">
  <img src="https://raw.githubusercontent.com/Ashwinvalento/simple-feature-flags/main/assets/logo.svg" width="120" alt="Simple Feature Flags Logo" />
  <h1>@simple-feature-flags/core</h1>
</div>

Core logic for the Simple Feature Flags library. Framework agnostic, type-safe, and zero-dependency.

## Installation

```bash
npm install @simple-feature-flags/core
```

## Usage

### 1. Initialize

```typescript
import { featureFlags } from "@simple-feature-flags/core";

// Initialize with your flags (e.g. from API, env vars, or config)
featureFlags.init({
  newUi: true,
  betaFeature: false,
  userLevel: "premium", // Can store any value
});
```

### 2. Check Flags

```typescript
// Check if a flag is truthy
if (featureFlags.isEnabled("newUi")) {
  // Show new UI
}

// Check if a flag is falsy
if (featureFlags.isDisabled("betaFeature")) {
  // Show standard feature
}

// Check with default value if missing
if (featureFlags.isEnabled("missingFlag", true)) {
  // Returns true because default is true
}
```

### 3. Advanced Usage

```typescript
// Check multiple flags (ALL must be true)
if (featureFlags.isEnabled(["newUi", "isLoggedIn"])) {
  // ...
}

// Get raw flag value
const level = featureFlags.getFlag("userLevel", "free"); // "premium"
```

### 4. Type Safety & Autocomplete

To enable autocomplete for your feature flag keys, you can extend the `AppFlags` interface.

Create a definition file (e.g., `feature-flags.d.ts`) in your project:

```typescript
import "@simple-feature-flags/core";

declare module "@simple-feature-flags/core" {
  export interface AppFlags {
    newUi: boolean;
    betaFeature: boolean;
    userLevel: string;
  }
}
```

Now, `isEnabled` and `getFlag` will provide autocomplete suggestions!

**Note:** Defining `AppFlags` enables autocomplete but does not restrict usage. You can still pass dynamic strings that are not defined in the interface.

## More Information

For more details, contributions, and documentation, visit the [Main Repository](https://github.com/Ashwinvalento/simple-feature-flags#readme).
