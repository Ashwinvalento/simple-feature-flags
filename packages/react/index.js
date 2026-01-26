const React = require("react");
const { featureFlags } = require("../core/index.js");

const FeatureFlagsContext = React.createContext(featureFlags);

function FeatureFlagProvider({ children, flags }) {
  if (flags) {
    featureFlags.init(flags);
  }

  return React.createElement(
    FeatureFlagsContext.Provider,
    { value: featureFlags },
    children,
  );
}

function useFeatureFlag(key) {
  const instance = React.useContext(FeatureFlagsContext);
  return instance.isEnabled(key);
}

module.exports = {
  FeatureFlagProvider,
  useFeatureFlag,
};
