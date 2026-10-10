import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApiErrorAlert } from '../../hooks/useApiErrorAlert';
import { usePosts } from '../../hooks/usePosts';
import { useDebounce } from '../../hooks/useDebounce';
import { PostsProvider } from '../../context/PostsContext';
import PostsHero from '../../components/PostsHero/PostsHero';
import PostsNotice from '../../components/PostsNotice/PostsNotice';
import PostsListSection from '../../components/PostsListSection/PostsListSection';
import styles from './PostsPage.module.css';

export default function PostsPage() {
  const { data: posts = [], error, isPending, isError, refetch, isFetching } = usePosts();
  const location = useLocation();
  const routeState = location.state as { notice?: unknown } | null;
  const notice = typeof routeState?.notice === 'string' ? routeState.notice : null;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  useApiErrorAlert(error);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLocaleLowerCase('pt-BR');
    if (!normalizedSearch) return posts;
    return posts.filter((post) => `${post.title} ${post.body} ${post.id}`.toLocaleLowerCase('pt-BR').includes(normalizedSearch));
  }, [debouncedSearch, posts]);

  const postsContextValue = { posts, isPending, isError, error, isFetching, refetch };

  return (
    <PostsProvider value={postsContextValue}>
      <div className={styles.page}>
        <PostsHero totalPosts={posts.length} isPending={isPending} />
        {notice && <PostsNotice message={notice} />}
        <PostsListSection
          filteredPosts={filteredPosts}
          search={search}
          onSearchChange={setSearch}
        />
      </div>
    </PostsProvider>
  );
}