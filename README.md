# 🚩 Simple Feature Flags

> **Note:** This is a completely Vibe coded project.

A **lightweight**, **type-safe**, and **zero-dependency** feature flags library for JavaScript and React applications. Manage your feature toggles with ease using a simple API and full TypeScript support. 🚀

This monorepo contains:

- `@simple-feature-flags/core`: Core logic (Framework agnostic).
- `@simple-feature-flags/react`: React bindings and hooks.

---

## 💡 Motivation

Managing feature flags often leads to messy code or reliance on expensive SaaS tools. We needed a solution that combines the simplicity of local variables with the power of a structured library. `simple-feature-flags` was born to provide a standard, type-safe way to toggle features without the overhead.

---

## ✨ Why Simple Feature Flags?

- **⚡ Zero Dependencies (Core):** The core logic is extremely lightweight with **no external dependencies**, keeping your bundle size tiny.
- **🛡️ Type-Safe:** Built with **TypeScript** from the ground up, providing excellent developer experience with full autocompletion and type safety.
- **🌐 Framework Agnostic:** Use the core logic in Node.js, Vue, Angular, or vanilla JS.
- **⚛️ First-Class React Support:** Includes intuitive hooks and a Context Provider for seamless React integration.
- **🎛️ Flexible:** Supports checking single flags or arrays of flags with built-in logic.

## 🆚 Comparison

| Feature         | 🚩 Simple Feature Flags         | 🏢 LaunchDarkly / SaaS SDKs    | 🛠️ Custom Context         |
| :-------------- | :------------------------------ | :----------------------------- | :------------------------ |
| **Setup**       | ⚡ **Instant** (Zero config)    | 🐢 Complex (Requires API keys) | 🐇 Moderate (Boilerplate) |
| **Data Source** | 💾 Local / Custom (You init it) | ☁️ Remote / Streaming          | 💾 Local                  |
| **Size**        | 🪶 **Tiny**                     | 🐘 Large (Network logic)       | 🪶 Tiny                   |
| **Focus**       | 🎯 Feature Flagging logic       | 📊 Full Management Platform    | 📦 Generic State          |

Unlike complex SaaS SDKs that manage remote configurations and user targeting, `simple-feature-flags` focuses on the **consumption** and **checking** of flags within your application code. It pairs perfectly with any backend or configuration provider you choose!

---

## 📦 Installation

You can install the main package the packages independently:

```bash
# Core logic only
npm install @simple-feature-flags/core

# React bindings (includes core as dependency)
npm install @simple-feature-flags/react
```

## 🚀 Usage

### Core

```typescript
import { featureFlags } from "simple-feature-flags/core";

// 1. Initialize flags
featureFlags.init({
  newFeature: true,
  deprecatedFeature: false,
});

// 2. Check flags
if (featureFlags.isEnabled("newFeature")) {
  console.log("Feature is enabled! 🎉");
}
```

### React

```tsx
import { FeatureFlagProvider, useFeatures } from "@simple-feature-flags/react";

// 1. Wrap your app with the Provider
function App() {
  const flags = { newFeature: true };

  return (
    <FeatureFlagProvider flags={flags}>
      <MyComponent />
    </FeatureFlagProvider>
  );
}

// 2. Use the hook in components
function MyComponent() {
  const { isEnabled, isDisabled } = useFeatures();

  if (isEnabled("newFeature")) {
    return <div>New Feature is active! 🌟</div>;
  }
  return <div>Old Feature 👴</div>;
}
```

---

## 🛠️ Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Run tests:
   ```bash
   npm test
   ```

## 📦 Publishing

To publish the packages to npm:

1. Login to npm:

   ```bash
   npm login
   ```

2. Run the publish script:
   ```bash
   npm run publish:packages
   ```
