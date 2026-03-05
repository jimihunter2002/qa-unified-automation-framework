// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   reporters: [
//     'default',
//     [
//       'jest-ctrf-json-reporter',
//       {
//         outputDir: '../reports/pact',
//         outputFile: 'pact-results.json',
//       },
//     ],
//   ],
// };

export default {
  // 1. Switch to the ESM-specific preset
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  // 2. Tell Jest to treat .ts files as ES Modules
  extensionsToTreatAsEsm: ['.ts'],
  reporters: [
    'default',
    [
      'jest-ctrf-json-reporter',
      {
        outputDir: '../reports/pact',
        outputFile: 'pact-results.json',
      },
    ],
  ],
  transform: {
    // 3. Configure ts-jest to handle ESM and silence the warning
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true, // Fixes the TS151002 warning
      },
    ],
  },
  // 4. Map internal imports to work with ESM
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
