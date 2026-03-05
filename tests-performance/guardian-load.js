import { __ENV, check, sleep } from 'k6';
import http from 'k6/http';

//performance goals
export const options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp up to 10 users over 10 seconds
    { duration: '1m', target: 10 }, // Stay at 10 users for 1 minute
    { duration: '20s', target: 0 }, // Ramp down to 0 users over 20 seconds
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
  },
};

//k6 environment variables
const GUARDIAN_API_URL = __ENV.GUARDIAN_API_URL || 'http://localhost:3001';

//request payload simulating real-world data from a data center zone
const payload = JSON.stringify({
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
});

export default function () {
  const response = http.post(`${GUARDIAN_API_URL}/guardian/validate`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  //measure response time and success rate against performance goals
  check(response, {
    'is status 200': (r) => r.status === 200,
    'latency < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}

export function handleSummary(data) {
  console.log('Test finished. Generating reports...');

  return {
    // This prints the standard summary to your terminal (standard output)
    stdout: JSON.stringify(data.metrics, null, 2),

    // This saves the full report for your generate-summary.js script
    'reports/performance-summary.json': JSON.stringify(data),
  };
}
