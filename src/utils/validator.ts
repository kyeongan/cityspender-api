// src/utils/validators.ts
import { z } from "zod";

export const dateRangeSchema = z.object({
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional(),
});

export const userReportParamsSchema = z.object({
  user_id: z.string().min(1),
});

export const cityReportQuerySchema = dateRangeSchema;
