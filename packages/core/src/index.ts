export interface Flags {
  [key: string]: boolean | any;
}

export class FeatureFlags {
  private flags: Flags;

  constructor() {
    this.flags = {};
  }

  init(flags: Flags): void {
    if (typeof flags !== "object" || flags === null) {
      console.warn("FeatureFlags.init: flags must be an object");
      return;
    }
    this.flags = { ...flags };
  }

  isEnabled(key: string | string[]): boolean {
    if (Array.isArray(key)) {
      return key.every((k) => !!this.flags[k]);
    }
    return !!this.flags[key];
  }

  isDisabled(key: string | string[]): boolean {
    return !this.isEnabled(key);
  }

  getFlags(): Flags {
    return this.flags;
  }
}

export const featureFlags = new FeatureFlags();
