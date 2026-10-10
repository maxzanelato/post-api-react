import { z } from 'zod';

export const postSchema = z.object({
  userId: z.number().int().positive(),
  id: z.number().int().positive(),
  title: z.string(),
  body: z.string(),
});

export const postsSchema = z.array(postSchema);

export const createPostSchema = z.object({
  title: z.string().trim().min(3, 'O título deve ter pelo menos 3 caracteres.').max(120, 'O título pode ter no máximo 120 caracteres.'),
  body: z.string().trim().min(10, 'O conteúdo deve ter pelo menos 10 caracteres.').max(2000, 'O conteúdo pode ter no máximo 2.000 caracteres.'),
});

export const createPostResponseSchema = postSchema;
