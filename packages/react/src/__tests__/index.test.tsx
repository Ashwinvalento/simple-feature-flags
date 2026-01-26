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
});
