import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
});
