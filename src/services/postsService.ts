import type { CreatePostInput, Post } from '../interfaces/post';
import { createPostResponseSchema, postSchema, postsSchema } from '../schemas/postSchema';
import { apiFetch } from './api';

export async function fetchPosts(signal?: AbortSignal): Promise<Post[]> {
  const payload: unknown = await apiFetch<unknown>('/posts', { signal });
  const result = postsSchema.safeParse(payload);
  if (!result.success) {
    throw new Error('A API retornou uma lista de posts em formato inválido.');
  }
  return result.data;
}

export async function fetchPost(id: number, signal?: AbortSignal): Promise<Post> {
  const payload: unknown = await apiFetch<unknown>(`/posts/${id}`, { signal });
  const result = postSchema.safeParse(payload);
  if (!result.success) {
    throw new Error(`A API retornou dados inválidos para o post #${id}.`);
  }
  return result.data;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const payload: unknown = await apiFetch<unknown>('/posts', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  const result = createPostResponseSchema.safeParse(payload);
  if (!result.success) {
    throw new Error('A API retornou dados inválidos ao criar o post.');
  }
  return result.data;
}