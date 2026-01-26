# Simple Feature Flags

A simple feature flags library for JavaScript and React applications.

## Installation

```bash
npm install simple-feature-flags
```

## Usage

### Core

```javascript
const { featureFlags } = require("simple-feature-flags/core");

featureFlags.init({
  newFeature: true,
  deprecatedFeature: false,
});

if (featureFlags.isEnabled("newFeature")) {
  // ...
}
```

### React

```javascript
import {
  FeatureFlagProvider,
  useFeatureFlag,
} from "simple-feature-flags/react";

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
  const isNewFeatureEnabled = useFeatureFlag("newFeature");

  if (isNewFeatureEnabled) {
    return <div>New Feature!</div>;
  }
  return <div>Old Feature</div>;
}
```
