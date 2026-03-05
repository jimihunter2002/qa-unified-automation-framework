import { z } from 'zod';

// 1. Define the CurrentState Schema
export const CurrentStateSchema = z.object({
  supply_air_temp: z.number(),
  return_air_temp: z.number(),
  max_rack_inlet_temp: z.number(),
  pue: z.number(),
});

// 2. Define the Main GuardianRequest Schema
export const GuardianRequestSchema = z.object({
  zone_id: z.string(),
  timestamp: z.iso.datetime(), // Validates ISO 8601 date time string format
  current_state: CurrentStateSchema,
  recommended_setpoints: z.object({
    supply_air_temp: z.number(),
  }),
  constraints: z.object({
    max_supply_air_temp: z.number(),
    max_rack_inlet_temp: z.number(),
    min_supply_air_temp: z.number(),
  }),
  digital_twin_prediction: z.object({
    predicted_max_rack_inlet_temp: z.number(),
    predicted_pue: z.number(),
  }),
});

// 3. Infer the TypeScript Interfaces from the Schemas
export type CurrentState = z.infer<typeof CurrentStateSchema>;
export type GuardianRequest = z.infer<typeof GuardianRequestSchema>;
