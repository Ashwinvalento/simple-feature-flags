module.exports = {
  projects: [
    {
      displayName: "core",
      preset: "ts-jest",
      testEnvironment: "node",
      testMatch: ["<rootDir>/packages/core/src/**/__tests__/**/*.test.ts"],
    },
    {
      displayName: "react",
      preset: "ts-jest",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/packages/react/src/**/__tests__/**/*.test.tsx"],
      moduleNameMapper: {
        "^@simple-feature-flags/core$": "<rootDir>/packages/core/src/index.ts",
      },
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            tsconfig: "<rootDir>/packages/react/tsconfig.json",
          },
        ],
      },
    },
  ],
};
