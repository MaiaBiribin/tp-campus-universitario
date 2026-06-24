import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,

  //  solo código real del frontend
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/layout.tsx",
    "!app/**/layout.tsx",

    // excluir tipos
    "!app/**/*.d.ts",
    "!app/**/types/**",

    // excluir configs
    "!next.config.ts",
    "!jest.config.ts",
    "!next-env.d.ts",

    // excluir entorno build
    "!**/.next/**",
    "!**/node_modules/**",
    "!**/dist/**",
  ],

  coverageDirectory: "coverage",
  coverageProvider: "v8",

  testEnvironment: "jest-environment-jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/(.*)$": "<rootDir>/app/$1",
    "^.+\\.module\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/cards.module.css.js",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },

  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/dist/",
  ],
};

export default createJestConfig(config);