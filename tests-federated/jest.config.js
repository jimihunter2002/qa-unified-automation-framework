export default {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'], // Load .env before tests
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    // 3. Configure ts-jest to output ESM
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true,
      },
    ],
  },

  // 4. Handle .js extensions in your TS imports (if you use them)
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
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
