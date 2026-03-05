import { expect } from '@jest/globals';
import { validateGuardian } from '../src/guardianEngine.js';

/**Unit tests for Guardian service */
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

describe('Guradian', () => {
  test('valid resquest', () => {
    expect(validateGuardian(payload).approved).toBe(true);
    expect(validateGuardian(payload).violations).toHaveLength(0);
  });

  test('max supplier air temp constraint breached', () => {
    const recommendedPayload = {
      ...payload,
      recommended_setpoints: { supply_air_temp: 30 },
    };
    expect(validateGuardian(recommendedPayload).approved).toBe(false);
    expect(validateGuardian(recommendedPayload).violations).toContain(
      'Recommended supply air temperature exceeds maximum limit constraint',
    );
  });

  test('min supplier air temp constraint breached', () => {
    const recommendedPayload = {
      ...payload,
      recommended_setpoints: { supply_air_temp: 15 },
    };
    expect(validateGuardian(recommendedPayload).approved).toBe(false);
    expect(validateGuardian(recommendedPayload).violations).toContain(
      'Recommended supply air temperature is below minimum limit constraint',
    );
  });

  test('max rack inlet temp constraint breached', () => {
    const digitalTwinPayload = {
      ...payload,
      digital_twin_prediction: {
        predicted_max_rack_inlet_temp: 27.1,
        predicted_pue: 1.5,
      },
    };
    expect(validateGuardian(digitalTwinPayload).approved).toBe(false);
    expect(validateGuardian(digitalTwinPayload).violations).toContain(
      'Predicted maximum rack inlet temperature exceeds maximum limit constraint',
    );
  });
});
