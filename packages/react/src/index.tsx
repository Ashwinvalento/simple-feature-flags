import * as React from "react";
import { featureFlags, FeatureFlags, Flags } from "@simple-feature-flags/core";

const FeatureFlagsContext = React.createContext<FeatureFlags>(featureFlags);

export interface FeatureFlagProviderProps {
  children: React.ReactNode;
  flags?: Flags;
}

export function FeatureFlagProvider({
  children,
  flags,
}: FeatureFlagProviderProps) {
  if (flags) {
    featureFlags.init(flags);
  }

  return (
    <FeatureFlagsContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatures() {
  const instance = React.useContext(FeatureFlagsContext);
  return {
    isEnabled: (key: string | string[], defaultValue?: boolean) =>
      instance.isEnabled(key, defaultValue),
    isDisabled: (key: string | string[], defaultValue?: boolean) =>
      instance.isDisabled(key, defaultValue),
    getFlag: (key: string, defaultValue?: any) =>
      instance.getFlag(key, defaultValue),
    getFlags: () => instance.getFlags(),
  };
}
