export interface Flags {
  [key: string]: boolean | any;
}

export class FeatureFlags {
  private flags: Flags;

  constructor() {
    this.flags = {};
  }

  /**
   * Initializes the feature flags with the provided flags object.
   *
   * @param flags - An object containing key-value pairs of feature flags.
   */
  init(flags: Flags): void {
    if (typeof flags !== "object" || flags === null) {
      console.warn("FeatureFlags.init: flags must be an object");
      return;
    }
    this.flags = { ...flags };
  }

  /**
   * Checks if a feature flag is enabled.
   *
   * @param key - The key or array of keys of the feature flag(s) to check.
   * @param defaultValue - The default value to return if the flag is missing (default: false).
   * @returns `true` if the flag is truthy (or if missing and defaultValue is true), `false` otherwise.
   *          If an array of keys is provided, returns `true` only if ALL flags are enabled.
   */
  isEnabled(key: string | string[], defaultValue: boolean = false): boolean {
    if (Array.isArray(key)) {
      return key.every((k) => {
        const val = this.flags[k];
        return val === undefined ? defaultValue : !!val;
      });
    }
    const val = this.flags[key];
    return val === undefined ? defaultValue : !!val;
  }

  /**
   * Checks if a feature flag is disabled.
   *
   * @param key - The key or array of keys of the feature flag(s) to check.
   * @param defaultValue - The default value to return if the flag is missing.
   *                       If true, it treats missing flags as disabled (returns true).
   *                       If false, it treats missing flags as enabled (returns false).
   *                       (default: false).
   * @returns `true` if the flag is falsy (or if missing and defaultValue is true), `false` otherwise.
   *          If an array of keys is provided, returns `true` if ANY flag is disabled.
   */
  isDisabled(key: string | string[], defaultValue: boolean = false): boolean {
    return !this.isEnabled(key, !defaultValue);
  }

  /**
   * Retrieves the value of a specific feature flag.
   *
   * @param key - The key of the feature flag.
   * @param defaultValue - The value to return if the flag is missing.
   * @returns The value of the flag, or the defaultValue if the flag is undefined.
   */
  getFlag(key: string, defaultValue?: any): any {
    return this.flags[key] || defaultValue;
  }

  /**
   * Retrieves all currently set feature flags.
   *
   * @returns An object containing all feature flags.
   */
  getFlags(): Flags {
    return this.flags;
  }
}

export const featureFlags = new FeatureFlags();
