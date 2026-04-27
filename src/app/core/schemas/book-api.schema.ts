import { z } from 'zod';

export const BookApiSchema = z.object({
  key: z.string(),
  title: z.string(),
  author: z.array(z.string()).optional(),
  cover_i: z.number().optional(),
  first_publish_year: z.number().optional(),
});

// The inferred reusable type
export type BookApiData = z.infer<typeof BookApiSchema>;

// Schema for the API response
export const OpenLibraryResponseSchema = z.object({
  docs: z.array(BookApiSchema)
});