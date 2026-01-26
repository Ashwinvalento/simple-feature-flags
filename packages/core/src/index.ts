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

  isEnabled(key: string): boolean {
    return !!this.flags[key];
  }

  getFlags(): Flags {
    return this.flags;
  }
}

export const featureFlags = new FeatureFlags();
