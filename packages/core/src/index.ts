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

  isDisabled(key: string | string[], defaultValue: boolean = false): boolean {
    return !this.isEnabled(key, !defaultValue);
  }

  getFlag(key: string, defaultValue?: any): any {
    return this.flags[key] || defaultValue;
  }

  getFlags(): Flags {
    return this.flags;
  }
}

export const featureFlags = new FeatureFlags();
