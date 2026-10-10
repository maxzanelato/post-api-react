import { createContext, useContext, ReactNode } from 'react';
import type { Post } from '../interfaces/post';

interface PostsContextType {
  posts: Post[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  refetch: () => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

interface PostsProviderProps {
  children: ReactNode;
  value: PostsContextType;
}

export function PostsProvider({ children, value }: PostsProviderProps) {
  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within PostsProvider');
  }
  return context;
}
