import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import * as dotenv from 'dotenv';
import path from 'path';

/**Integration tests for Guardian API */
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

interface GuardianPayload {
  zone_id: string;
  timestamp: string;
  current_state: Record<string, unknown>;
  recommended_setpoints: { supply_air_temp: number };
  constraints: {
    max_supply_air_temp: number;
    max_rack_inlet_temp: number;
    min_supply_air_temp: number;
  };
  digital_twin_prediction: {
    predicted_max_rack_inlet_temp: number;
    predicted_pue: number;
  };
}

let payload: GuardianPayload;
let response: AxiosResponse<{ approved: boolean }>;

const client = axios.create({
  baseURL: process.env.GUARDIAN_API_URL!,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: () => true,
  timeout: 5000, // Best practice: always set a timeout
});

Given('a valid guardian request', function () {
  payload = {
    zone_id: 'DC-01',
    timestamp: new Date().toISOString(),
    current_state: {},
    recommended_setpoints: { supply_air_temp: 23 },
    constraints: {
      max_supply_air_temp: 24,
      max_rack_inlet_temp: 27,
      min_supply_air_temp: 18,
    },
    digital_twin_prediction: {
      predicted_max_rack_inlet_temp: 26,
      predicted_pue: 1.4,
    },
  };
});

Given('a guardian request with violations', function () {
  payload = {
    zone_id: 'DC-01',
    timestamp: new Date().toISOString(),
    current_state: {},
    recommended_setpoints: { supply_air_temp: 30 },
    constraints: {
      max_supply_air_temp: 24,
      max_rack_inlet_temp: 27,
      min_supply_air_temp: 18,
    },
    digital_twin_prediction: {
      predicted_max_rack_inlet_temp: 30,
      predicted_pue: 1.4,
    },
  };
});

When('I send it to the Guardian API', async function () {
  response = await client.post('/guardian/validate', payload);
});

Then('the response should be approved', function () {
  assert.strictEqual(response.data.approved, true);
});

Then('the response should be rejected', function () {
  assert.strictEqual(response.data.approved, false);
});
