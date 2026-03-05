import type { GuardianRequest } from './types.js';

export function validateGuardian(request: GuardianRequest) {
  const violations: string[] = [];

  if (!request) {
    return { approved: false, violations: ['Invalid payload'] };
  }

  const { recommended_setpoints, constraints, digital_twin_prediction } =
    request;

  if (recommended_setpoints.supply_air_temp > constraints.max_supply_air_temp) {
    violations.push(
      'Recommended supply air temperature exceeds maximum limit constraint',
    );
  }

  if (recommended_setpoints.supply_air_temp < constraints.min_supply_air_temp) {
    violations.push(
      'Recommended supply air temperature is below minimum limit constraint',
    );
  }

  if (
    digital_twin_prediction.predicted_max_rack_inlet_temp >
    constraints.max_rack_inlet_temp
  ) {
    violations.push(
      'Predicted maximum rack inlet temperature exceeds maximum limit constraint',
    );
  }

  return { approved: violations.length === 0, violations };
}
