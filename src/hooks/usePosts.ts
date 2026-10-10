import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/postsService';

export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: postKeys.list(),
    queryFn: async ({ signal }) => await fetchPosts(signal),
  });
}