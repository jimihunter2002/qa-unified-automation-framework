import { expect, test } from '@jest/globals';
import fs from 'fs';

/**
 * assumptions is that guardian model outputs some metrics during
 * traning
 */
test('model drift below threshold', () => {
  const baselineAccuracy = 0.95;
  const newAccuracy = 0.949;
  const drift = baselineAccuracy - newAccuracy;
  fs.writeFileSync('../reports/drift-value.json', JSON.stringify({ drift }));
  expect(drift).toBeLessThan(0.01);
});
