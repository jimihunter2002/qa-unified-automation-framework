export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '../',
  setupFiles: ['dotenv/config'],
  // Force ts-jest to use the correct interop settings
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [151001], // Hides the interop warning
        },
        tsconfig: {
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },
  reporters: [
    'default',
    [
      'jest-ctrf-json-reporter',
      {
        outputDir: 'reports/api',
        outputFile: 'api-results.json',
        collectCoverage: true,
      },
    ],
  ],
  coverageDirectory: 'reports/api-coverage',
  coverageReporters: ['json-summary', 'html', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'guardian-service/src/**/*.ts',
    '!guardian-service/src/**/*.d.ts',
    '!guardian-service/src/types.ts',
  ],
  testMatch: ['<rootDir>/tests-api/**/*.test.ts'],
};
