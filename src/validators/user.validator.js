import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
    tenantId: z.string().uuid().optional(),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
