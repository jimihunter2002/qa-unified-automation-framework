export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'], // Load .env before tests
  reporters: [
    'default',
    [
      'jest-ctrf-json-reporter',
      {
        outputDir: '../reports/federated',
        outputFile: 'federated-results.json',
      },
    ],
  ],
  coverageDirectory: '../reports/federated-coverage',
  coverageReporters: ['json-summary', 'html', 'text'],
  collectCoverage: true,
};
