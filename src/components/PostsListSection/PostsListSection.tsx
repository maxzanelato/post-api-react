import { Link } from 'react-router-dom';
import Alert from '../Alert/Alert';
import Loading from '../Loading/Loading';
import type { Post } from '../../interfaces/post';
import VirtualPostList from '../../pages/PostsPage/VirtualPostList';
import PostsSearchBox from '../PostsSearchBox/PostsSearchBox';
import { usePosts } from '../../context/PostsContext';
import styles from './PostsListSection.module.css';

interface PostsListSectionProps {
  filteredPosts: Post[];
  search: string;
  onSearchChange: (value: string) => void;
}

export default function PostsListSection({
  filteredPosts,
  search,
  onSearchChange,
}: PostsListSectionProps) {
  const { posts, isPending, isError, error, isFetching, refetch } = usePosts();
  return (
    <section className={styles.listSection} aria-labelledby="posts-heading">
      <div className={styles.listHeading}>
        <div>
          <span className={styles.sectionEyebrow}>DESCUBRA ALGO NOVO</span>
          <h2 id="posts-heading">Posts da comunidade <span className={styles.count}>{posts.length}</span></h2>
        </div>
        <Link to="/posts/new" className={styles.newPostLink}><span aria-hidden="true">＋</span> Novo post</Link>
      </div>

      <PostsSearchBox value={search} onChange={onSearchChange} />

      {isPending ? (
        <Loading label="Buscando posts…" />
      ) : isError ? (
        <Alert title="Não foi possível carregar os posts" message={error?.message || ''} onRetry={() => { void refetch(); }} />
      ) : filteredPosts.length === 0 ? (
        <div className={styles.empty}><span>⌕</span><h3>Nenhum post encontrado</h3><p>Tente outro termo de busca.</p></div>
      ) : (
        <>
          <div className={styles.resultLine}>
            <span>{filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'}</span>
            {isFetching && <span className={styles.refreshing}>Atualizando…</span>}
          </div>
          <VirtualPostList posts={filteredPosts} />
        </>
      )}
    </section>
  );
}
