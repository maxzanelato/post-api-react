import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Post } from '../interfaces/post';
import { fetchPost } from '../services/postsService';
import { postKeys } from './usePosts';

export function usePost(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: async ({ signal }) => await fetchPost(id, signal),
    enabled: Number.isInteger(id) && id > 0,
    placeholderData: () => queryClient.getQueryData<Post[]>(postKeys.list())?.find((post) => post.id === id),
  });
}