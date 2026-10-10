import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post, CreatePostInput } from '../interfaces/post';
import { createPost } from '../services/postsService';
import { postKeys } from './usePosts';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePostInput) => await createPost(input),
    onSuccess: (createdPost) => {
      // JSONPlaceholder simula o POST e não persiste a entidade no servidor.
      // Atualizamos o cache para refletir a resposta nesta sessão sem refetch que a removeria.
      queryClient.setQueryData<Post[]>(postKeys.list(), (currentPosts) => {
        if (!currentPosts) return [createdPost];
        return [createdPost, ...currentPosts.filter((post) => post.id !== createdPost.id)];
      });
      queryClient.setQueryData(postKeys.detail(createdPost.id), createdPost);
    },
  });
}