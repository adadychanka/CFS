import { nextJsConfig } from "@repo/eslint-config/next-js";
import { unitTestsConfig } from "@repo/eslint-config/unit-tests";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  ...unitTestsConfig,
];