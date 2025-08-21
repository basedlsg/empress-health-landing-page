import { z } from 'zod';

export const askEmpressSchema = z.object({
  question: z.string().min(1),
  context: z.object({
    stage: z.enum(["peri", "post"]).optional(),
    focus: z.enum(["sleep", "hot-flashes", "mood"]).optional(),
  }).optional(),
});

export const affirmationScheduleSchema = z.object({
  times: z.array(z.string()),
  tone: z.enum(["calm", "confident"]),
  categories: z.array(z.string()).optional(),
});

export const checkinSchema = z.object({
  hotFlashes: z.object({
    count: z.number().min(0),
    severity: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  }),
  sleep: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  mood: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  adherence: z.boolean(),
  note: z.string().optional(),
});