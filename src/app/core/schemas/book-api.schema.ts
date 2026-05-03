import { z } from 'zod';

// Schema base con i campi comuni a entrambi
const BaseBookSchema = z.object({
  key: z.string(),
  title: z.string(),
  author_name: z.array(z.string()).optional(),
  cover_i: z.number().optional(),
  first_publish_year: z.number().optional(),
});

// 1. Schema per i risultati della ricerca (Light)
export const BookSearchResultSchema = BaseBookSchema;
export type BookSearchResult = z.infer<typeof BookSearchResultSchema>;

// 2. Schema per il dettaglio del libro (Full)
export const BookDetailSchema = BaseBookSchema.extend({
  subject: z.array(z.string()).optional().default([]),
  description: z.string().optional().or(z.object({ value: z.string() }).transform(d => d.value)),
  numberOfPages: z.number().optional(),
});
export type BookDetail = z.infer<typeof BookDetailSchema>;

// Schema per la risposta della ricerca
export const SearchResponseSchema = z.object({
  docs: z.array(BookSearchResultSchema)
});