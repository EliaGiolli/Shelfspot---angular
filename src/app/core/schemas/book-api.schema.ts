import { z } from 'zod';

// Base schema with common fields for both
const BaseBookSchema = z.object({
  key: z.string(),
  title: z.string(),
  author_name: z.array(z.string()).optional(),
  cover_i: z.number().optional(),
  first_publish_year: z.number().optional(),
});

// 1. Schema for the search results (Light)
export const BookSearchResultSchema = BaseBookSchema;
export type BookSearchResult = z.infer<typeof BookSearchResultSchema>;

// 2. Schema for the book detail (Full)
export const BookDetailSchema = BaseBookSchema.extend({
  subject: z.array(z.string()).optional().default([]),
  description: z.string().optional().or(z.object({ value: z.string() }).transform(d => d.value)),
  numberOfPages: z.number().optional(),
});
export type BookDetail = z.infer<typeof BookDetailSchema>;

// Schema for the search response
export const SearchResponseSchema = z.object({
  docs: z.array(BookSearchResultSchema)
});