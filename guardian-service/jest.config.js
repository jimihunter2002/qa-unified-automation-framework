/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // Use the ESM preset
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ESM
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Handle mandatory .js extensions in imports
    '^@jest/globals$': '<rootDir>/node_modules/@jest/globals',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Enable ESM transformation
      },
    ],
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/types.ts'],
  coverageDirectory: '../reports/unit-coverage',
  coverageReporters: ['html', 'text-summary', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
};
