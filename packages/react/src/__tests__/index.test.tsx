import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FeatureFlagProvider, useFeatures } from "../index";

const TestComponent = ({ flag }: { flag: string | string[] }) => {
  const { isEnabled } = useFeatures();
  return <div>{isEnabled(flag) ? "Enabled" : "Disabled"}</div>;
};

const DisabledComponent = ({ flag }: { flag: string | string[] }) => {
  const { isDisabled } = useFeatures();
  return <div>{isDisabled(flag) ? "Disabled" : "Enabled"}</div>;
};

describe("FeatureFlags React", () => {
  test("should provide features", () => {
    render(
      <FeatureFlagProvider flags={{ test: true }}>
        <TestComponent flag="test" />
      </FeatureFlagProvider>,
    );
    expect(screen.getByText("Enabled")).toBeInTheDocument();
  });

  test("should handle disabled features", () => {
    render(
      <FeatureFlagProvider flags={{ test: false }}>
        <TestComponent flag="test" />
      </FeatureFlagProvider>,
    );
    expect(screen.getByText("Disabled")).toBeInTheDocument();
  });

  test("should handle array checks", () => {
    render(
      <FeatureFlagProvider flags={{ a: true, b: true }}>
        <TestComponent flag={["a", "b"]} />
      </FeatureFlagProvider>,
    );
    expect(screen.getByText("Enabled")).toBeInTheDocument();
  });

  test("should handle isDisabled", () => {
    render(
      <FeatureFlagProvider flags={{ a: true, b: false }}>
        <DisabledComponent flag="b" />
      </FeatureFlagProvider>,
    );
    expect(screen.getByText("Disabled")).toBeInTheDocument();
  });

  test("should handle default value", () => {
    const TestDefault = () => {
      const { isEnabled, isDisabled } = useFeatures();
      // "missing" is not in flags, so default false. We pass true as default.
      const enabled = isEnabled("missing", true);
      const disabled = isDisabled("missing", true); // default true (disabled)

      return (
        <div>
          <div data-testid="enabled">{enabled ? "True" : "False"}</div>
          <div data-testid="disabled">{disabled ? "True" : "False"}</div>
        </div>
      );
    };

    render(
      <FeatureFlagProvider flags={{}}>
        <TestDefault />
      </FeatureFlagProvider>,
    );
    expect(screen.getByTestId("enabled")).toHaveTextContent("True");
    expect(screen.getByTestId("disabled")).toHaveTextContent("True");
  });

  test("should handle array with default values", () => {
    const TestArrayDefault = () => {
      const { isEnabled, isDisabled } = useFeatures();

      // isEnabled(["missing1", "missing2"], true) -> true
      const enabledTrue = isEnabled(["missing1", "missing2"], true);

      // isEnabled(["missing1", "missing2"], false) -> false
      const enabledFalse = isEnabled(["missing1", "missing2"], false);

      // isDisabled(["missing1", "missing2"], true) -> default disabled=true. All are disabled. Any disabled? Yes. -> True
      const disabledTrue = isDisabled(["missing1", "missing2"], true);

      // isDisabled(["missing1", "missing2"], false) -> default disabled=false (enabled). All are enabled. Any disabled? No. -> False
      const disabledFalse = isDisabled(["missing1", "missing2"], false);

      return (
        <div>
          <div data-testid="enabledTrue">{enabledTrue ? "True" : "False"}</div>
          <div data-testid="enabledFalse">
            {enabledFalse ? "True" : "False"}
          </div>
          <div data-testid="disabledTrue">
            {disabledTrue ? "True" : "False"}
          </div>
          <div data-testid="disabledFalse">
            {disabledFalse ? "True" : "False"}
          </div>
        </div>
      );
    };

    render(
      <FeatureFlagProvider flags={{}}>
        <TestArrayDefault />
      </FeatureFlagProvider>,
    );

    expect(screen.getByTestId("enabledTrue")).toHaveTextContent("True");
    expect(screen.getByTestId("enabledFalse")).toHaveTextContent("False");
    expect(screen.getByTestId("disabledTrue")).toHaveTextContent("True");
    expect(screen.getByTestId("disabledFalse")).toHaveTextContent("False");
  });
});
