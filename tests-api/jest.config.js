export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'], // Load .env before tests
  reporters: [
    'default',
    [
      'jest-ctrf-json-reporter',
      {
        outputDir: '../reports/api',
        outputFile: 'api-results.json',
      },
    ],
  ],
  coverageDirectory: '../reports/api-coverage',
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
};
