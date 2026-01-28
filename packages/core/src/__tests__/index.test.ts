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

  test("should check isEnabled with default value", () => {
    featureFlags.init({ a: true });
    // Default is false
    expect(featureFlags.isEnabled("b")).toBe(false);
    // Explicit default true
    expect(featureFlags.isEnabled("b", true)).toBe(true);
    // Explicit default false
    expect(featureFlags.isEnabled("b", false)).toBe(false);
    // Existing key should ignore default
    expect(featureFlags.isEnabled("a", false)).toBe(true);
  });

  test("should check isDisabled with default value", () => {
    featureFlags.init({ a: false });
    // Default is disabled false (so enabled) -> isDisabled returns false
    expect(featureFlags.isDisabled("b")).toBe(false);

    // Explicit default true (it is disabled by default) -> returns true
    expect(featureFlags.isDisabled("b", true)).toBe(true);

    // Explicit default false (it is NOT disabled by default) -> returns false
    expect(featureFlags.isDisabled("b", false)).toBe(false);

    // Existing key should ignore default
    expect(featureFlags.isDisabled("a", false)).toBe(true);
  });

  test("should check array with default values", () => {
    featureFlags.init({ a: true, b: false });

    // isEnabled checks
    expect(featureFlags.isEnabled(["missing1", "missing2"], true)).toBe(true);
    expect(featureFlags.isEnabled(["missing1", "missing2"], false)).toBe(false);
    expect(featureFlags.isEnabled(["a", "missing"], true)).toBe(true);
    expect(featureFlags.isEnabled(["a", "missing"], false)).toBe(false);
    expect(featureFlags.isEnabled(["b", "missing"], true)).toBe(false);

    // isDisabled checks
    expect(featureFlags.isDisabled(["missing1", "missing2"], true)).toBe(true);
    expect(featureFlags.isDisabled(["missing1", "missing2"], false)).toBe(
      false,
    );
    expect(featureFlags.isDisabled(["a", "missing"], true)).toBe(true);
  });
});
