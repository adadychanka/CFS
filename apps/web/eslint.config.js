import { nextJsConfig } from "@repo/eslint-config/next-js";
import vitest from "eslint-plugin-vitest";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...nextJsConfig,
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    files: [
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    plugins: {
      "testing-library": testingLibrary,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
    },
  },
  {
    files: [
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    plugins: {
      "jest-dom": jestDom,
    },
    rules: {
      ...jestDom.configs.recommended.rules,
    },
  },
];
