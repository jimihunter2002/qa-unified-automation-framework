import path from 'path';
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
        outputDir: path.resolve(process.cwd(), '../reports/api'),
        outputFile: 'api-results.json',
        collectCoverage: true,
      },
    ],
  ],
  coverageDirectory: 'reports/api-coverage',
  coverageReporters: ['json-summary', 'html', 'text'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
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
