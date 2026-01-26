class FeatureFlags {
  constructor() {
    this.flags = {};
  }

  init(flags) {
    if (typeof flags !== "object" || flags === null) {
      console.warn("FeatureFlags.init: flags must be an object");
      return;
    }
    this.flags = { ...flags };
  }

  isEnabled(key) {
    return !!this.flags[key];
  }

  getFlags() {
    return this.flags;
  }
}

const featureFlags = new FeatureFlags();

module.exports = {
  featureFlags,
  FeatureFlags,
};
