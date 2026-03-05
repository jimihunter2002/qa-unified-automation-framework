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
  collectCoverage: true,
};
