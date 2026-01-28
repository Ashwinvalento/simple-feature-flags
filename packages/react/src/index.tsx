import * as React from "react";
import { featureFlags, FeatureFlags, Flags } from "@simple-feature-flags/core";

const FeatureFlagsContext = React.createContext<FeatureFlags>(featureFlags);

/**
 * Props for the FeatureFlagProvider component.
 */
export interface FeatureFlagProviderProps {
  /**
   * The children components to render within the provider.
   */
  children: React.ReactNode;
  /**
   * The initial set of feature flags to initialize the provider with.
   */
  flags?: Flags;
}

/**
 * A provider component that initializes the feature flags and makes them available to the application.
 *
 * @param props - The props for the provider.
 * @returns The provider component with children.
 */
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

/**
 * A hook to access feature flags functionality within a React component.
 *
 * @returns An object containing methods to check feature flags
 */
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
