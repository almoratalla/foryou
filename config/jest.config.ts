import type { Config } from "@jest/types";
import { defaults } from "jest-config";

const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    rootDir: "../",
    roots: ['<rootDir>/src', '<rootDir>/tests/unit'],
    testEnvironment: "node",
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    modulePathIgnorePatterns: ["./dist", "./src/resources", "<rootDir>/tests/exclude"],
    moduleNameMapper: {
        "@utils": "<rootDir>/src/utils/"
    },
};
export default config;