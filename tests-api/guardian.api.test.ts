import { expect } from '@jest/globals';
import type { AxiosError } from 'axios';
import axios from 'axios';
import * as dotenv from 'dotenv';
import path from 'path';

/**Integration tests for Guardian API */
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const GUARDIAN_API_URL = process.env.GUARDIAN_API_URL!;
console.log(`Running tests against Guardian API at: ${GUARDIAN_API_URL}`);
describe('Guardian API', () => {
  // Happy path test
  test('should approve valid request to /guardian/validate', async () => {
    const payload = {
      zone_id: 'DC-01',
      timestamp: new Date().toISOString(),
      current_state: {
        supply_air_temp: 21.5,
        return_air_temp: 29.8,
        max_rack_inlet_temp: 26.0,
        pue: 1.48,
      },
      recommended_setpoints: { supply_air_temp: 23.0 },
      constraints: {
        max_supply_air_temp: 24.0,
        max_rack_inlet_temp: 27.0,
        min_supply_air_temp: 18.0,
      },
      digital_twin_prediction: {
        predicted_max_rack_inlet_temp: 26.8,
        predicted_pue: 1.42,
      },
    };

    const response = await axios.post(
      `${GUARDIAN_API_URL}/guardian/validate`,
      payload,
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('approved');
    expect(response.data).toHaveProperty('violations');
    expect(Array.isArray(response.data.violations)).toBe(true);
    expect(response.data.violations).toHaveLength(0);
  });

  // Validation tests for missing required fields
  test('should return 400 when required fields are missing', async () => {
    const incompletePayload = { zone_id: 'DC-01' }; // Missing everything else

    try {
      await axios.post(
        `${GUARDIAN_API_URL}/guardian/validate`,
        incompletePayload,
      );
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      expect(axiosError.response?.status).toBe(400);
    }
  });

  // Business logic tests for constraint violations
  test('should approve when recommended max supply air temp is exactly at the constraint limit', async () => {
    const payload = {
      zone_id: 'DC-01',
      timestamp: new Date().toISOString(),
      current_state: {
        supply_air_temp: 21.5,
        return_air_temp: 29.8,
        max_rack_inlet_temp: 26.0,
        pue: 1.48,
      },
      recommended_setpoints: { supply_air_temp: 24.0 },
      constraints: {
        max_supply_air_temp: 24.0,
        max_rack_inlet_temp: 27.0,
        min_supply_air_temp: 18.0,
      },
      digital_twin_prediction: {
        predicted_max_rack_inlet_temp: 27.0,
        predicted_pue: 1.42,
      },
    };

    const response = await axios.post(
      `${GUARDIAN_API_URL}/guardian/validate`,
      payload,
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('approved');
    expect(response.data).toHaveProperty('violations');
    expect(Array.isArray(response.data.violations)).toBe(true);
    expect(response.data.violations).toHaveLength(0);
  });

  //boundary case
  test('should disapprove when recommended min supply air temp is marginally lower than constraint limit', async () => {
    const payload = {
      zone_id: 'DC-01',
      timestamp: new Date().toISOString(),
      current_state: {
        supply_air_temp: 21.5,
        return_air_temp: 29.8,
        max_rack_inlet_temp: 26.0,
        pue: 1.48,
      },
      recommended_setpoints: { supply_air_temp: 17.9 },
      constraints: {
        max_supply_air_temp: 24.0,
        max_rack_inlet_temp: 27.0,
        min_supply_air_temp: 18.0,
      },
      digital_twin_prediction: {
        predicted_max_rack_inlet_temp: 27.0,
        predicted_pue: 1.42,
      },
    };

    const response = await axios.post(
      `${GUARDIAN_API_URL}/guardian/validate`,
      payload,
    );
    expect(response.status).toBe(400);
    expect(response.data.approved).toBe(false);
    expect(response.data.violations).toContain(
      'Recommended supply air temperature is below minimum limit constraint',
    );
  });
});
