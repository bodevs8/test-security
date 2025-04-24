import type { searchSchema } from '@/schemas/search-schema';
import type { z } from 'zod';

export type SearchFormValues = z.infer<typeof searchSchema>;
