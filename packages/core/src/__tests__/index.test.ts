import { featureFlags, FeatureFlags } from "../index";

describe("FeatureFlags Core", () => {
  beforeEach(() => {
    // Reset flags - currently init overwrites, so passing empty object clears it.
    // If init merges, we might need a clear method, but implementation says "this.flags = { ...flags }".
    featureFlags.init({});
  });

  test("should initialize with flags", () => {
    featureFlags.init({ test: true });
    expect(featureFlags.getFlags()).toEqual({ test: true });
  });

  test("should check isEnabled", () => {
    featureFlags.init({ featureA: true, featureB: false });
    expect(featureFlags.isEnabled("featureA")).toBe(true);
    expect(featureFlags.isEnabled("featureB")).toBe(false);
    expect(featureFlags.isEnabled("featureC")).toBe(false);
  });

  test("should check isEnabled with array (ALL must be enabled)", () => {
    featureFlags.init({ a: true, b: true, c: false });
    expect(featureFlags.isEnabled(["a", "b"])).toBe(true);
    expect(featureFlags.isEnabled(["a", "c"])).toBe(false);
    expect(featureFlags.isEnabled(["a", "d"])).toBe(false);
  });

  test("should check isDisabled (ANY is disabled)", () => {
    featureFlags.init({ a: true, b: true, c: false });

    // Single
    expect(featureFlags.isDisabled("c")).toBe(true);
    expect(featureFlags.isDisabled("a")).toBe(false);

    // Array
    expect(featureFlags.isDisabled(["a", "b"])).toBe(false);
    expect(featureFlags.isDisabled(["a", "c"])).toBe(true);
  });
});
