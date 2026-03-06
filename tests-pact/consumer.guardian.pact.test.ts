import { describe, expect, test } from '@jest/globals';
import { Matchers, PactV4 } from '@pact-foundation/pact';
import axios from 'axios';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface MockServer {
  url: string;
}

const provider = new PactV4({
  consumer: 'ACE-Optimiser',
  provider: 'Guardian-Service',
  port: 0,
  dir: path.resolve(__dirname, '../../reports/pacts'),
});

describe('Guardian Service Pact Test', () => {
  test('valid request returns approved: true', async () => {
    await provider
      .addInteraction()
      .given('the system is within normal operating constraints')
      .uponReceiving('a valid guardian validation request')
      // Added types to fix the 'any' error
      .withRequest('POST', '/guardian/validate', (builder) => {
        builder.jsonBody({
          zone_id: Matchers.like('DC-01'),
          timestamp: Matchers.timestamp(
            "yyyy-MM-dd'T'HH:mm:ss.SSSX",
            '2026-02-20T10:15:00Z',
          ),
          current_state: {
            supply_air_temp: Matchers.number(21.5),
            return_air_temp: Matchers.number(29.8),
            max_rack_inlet_temp: Matchers.number(26.0),
            pue: Matchers.number(1.48),
          },
          recommended_setpoints: { supply_air_temp: Matchers.number(22.0) },
          constraints: {
            max_supply_air_temp: Matchers.number(24.0),
            max_rack_inlet_temp: Matchers.number(27.0),
            min_supply_air_temp: Matchers.number(18.0),
          },
          digital_twin_prediction: {
            predicted_max_rack_inlet_temp: Matchers.number(26.0),
            predicted_pue: Matchers.number(1.42),
          },
        });
      })
      // Added types to fix the 'any' error
      .willRespondWith(200, (builder) => {
        builder.jsonBody({
          approved: Matchers.boolean(true),
          violations: [],
        });
      })
      .executeTest(async (mockServer: MockServer) => {
        // DATA FOR THE ACTUAL CALL: Use a real string, not a Matcher
        const payload = {
          zone_id: 'DC-01',
          timestamp: new Date().toISOString(),
          current_state: {
            supply_air_temp: 21.5,
            return_air_temp: 29.8,
            max_rack_inlet_temp: 26.0,
            pue: 1.48,
          },
          recommended_setpoints: { supply_air_temp: 22.0 },
          constraints: {
            max_supply_air_temp: 24.0,
            max_rack_inlet_temp: 27.0,
            min_supply_air_temp: 18.0,
          },
          digital_twin_prediction: {
            predicted_max_rack_inlet_temp: 26.0,
            predicted_pue: 1.42,
          },
        };
        console.log('Mock Server URL:', mockServer.url);
        const res = await axios.post(
          `${mockServer.url}/guardian/validate`,
          payload,
        );

        expect(res.status).toBe(200);
        expect(res.data.approved).toBe(true);
        expect(res.data.violations).toHaveLength(0);
      });
  });

  test('data mismatch request returns 500 status', async () => {
    await provider
      .addInteraction()
      .given('the system is within normal operating constraints')
      .uponReceiving('a valid guardian validation request')
      // Added types to fix the 'any' error
      .withRequest('POST', '/guardian/validate', (builder) => {
        builder.jsonBody({
          zone_id: Matchers.like('DC-01'),
          timestamp: Matchers.timestamp(
            "yyyy-MM-dd'T'HH:mm:ss.SSSX",
            '2026-02-20T10:15:00Z',
          ),
          current_state: {
            supply_air_temp: Matchers.number(21.5),
            return_air_temp: Matchers.number(29.8),
            max_rack_inlet_temp: Matchers.number(26.0),
            pue: Matchers.number(1.48),
          },
          recommended_setpoints: { supply_air_temp: Matchers.number(22.0) },
          constraints: {
            max_supply_air_temp: Matchers.number(24.0),
            max_rack_inlet_temp: Matchers.number(27.0),
            min_supply_air_temp: Matchers.number(18.0),
          },
          digital_twin_prediction: {
            predicted_max_rack_inlet_temp: Matchers.number(26.0),
            predicted_pue: Matchers.number(1.42),
          },
        });
      })
      // Added types to fix the 'any' error
      .willRespondWith(200, (builder) => {
        builder.jsonBody({
          approved: Matchers.boolean(true),
          violations: [],
        });
      })
      .executeTest(async (mockServer: MockServer) => {
        // DATA FOR THE ACTUAL CALL: Use a real string, not a Matcher
        const payload = {
          zone_id: 123,
          timestamp: new Date().toISOString(),
          current_state: {
            supply_air_temp: 21.5,
            return_air_temp: 29.8,
            max_rack_inlet_temp: 26.0,
            pue: 1.48,
          },
          recommended_setpoints: { supply_air_temp: 22.0 },
          constraints: {
            max_supply_air_temp: 24.0,
            max_rack_inlet_temp: 27.0,
            min_supply_air_temp: 18.0,
          },
          digital_twin_prediction: {
            predicted_max_rack_inlet_temp: 26.0,
            predicted_pue: 1.42,
          },
        };
        console.log('Mock Server URL:', mockServer.url);
        const res = await axios.post(
          `${mockServer.url}/guardian/validate`,
          payload,
        );

        expect(res.status).toBe(500);
      });
  });
});
