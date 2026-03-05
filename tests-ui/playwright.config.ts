import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  reporter: [['json', { outputFile: '../reports/ui-results.json' }]],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
  webServer: {
    command: 'echo "UI Server expected to be running on port 3000"',
    port: 3000,
    reuseExistingServer: true,
  },
});
