import { Link, useParams } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import Loading from '../../components/Loading/Loading';
import { useApiErrorAlert } from '../../hooks/useApiErrorAlert';
import { usePost } from '../../hooks/usePost';
import { formatPostId } from '../../utils/formatters';
import styles from './PostDetailPage.module.css';

export default function PostDetailPage() {
  const { postId } = useParams();
  const id = Number(postId);
  const validId = Number.isInteger(id) && id > 0;
  const query = usePost(validId ? id : 0);
  useApiErrorAlert(query.error);

  if (!validId) {
    return <Alert title="Post inválido" message="O identificador informado não é válido." />;
  }
  if (query.isPending) return <Loading label="Carregando detalhes do post…" />;
  if (query.isError) {
    return <Alert title="Não foi possível carregar este post" message={query.error.message} onRetry={() => { void query.refetch(); }} />;
  }
  const post = query.data;

  return (
    <article className={styles.page}>
      <Link to="/" className={styles.back}><span aria-hidden="true">←</span> Voltar para os posts</Link>
      <div className={styles.detailCard}>
        <div className={styles.topline}><span className={styles.postId}>{formatPostId(post.id)}</span><span className={styles.author}>Publicado pelo autor {post.userId}</span></div>
        <span className={styles.eyebrow}>POST DA COMUNIDADE</span>
        <h1>{post.title}</h1>
        <div className={styles.divider} />
        <p className={styles.body}>{post.body}</p>
        <div className={styles.bottomline}><span className={styles.avatar}>{String(post.userId).padStart(2, '0')}</span><div><strong>Autor {post.userId}</strong><span>Comunidade Postly</span></div></div>
      </div>
      <aside className={styles.nextStep}><span aria-hidden="true">✦</span><div><strong>Tem algo para compartilhar?</strong><p>Transforme uma ideia em um novo post.</p></div><Link to="/posts/new">Criar post <span aria-hidden="true">↗</span></Link></aside>
    </article>
  );
}