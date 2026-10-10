import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../../interfaces/post';
import { formatPostId, truncateText } from '../../utils/formatters';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
  index: number;
}

function PostCard({ post, index }: PostCardProps) {
  return (
    <article className={styles.card} aria-labelledby={`post-title-${post.id}`}>
      <div className={styles.meta}>
        <span className={styles.number}>{formatPostId(post.id)}</span>
        <span className={styles.author}>Autor {post.userId}</span>
      </div>
      <h2 id={`post-title-${post.id}`} className={styles.title}>{post.title}</h2>
      <p className={styles.body}>{truncateText(post.body, 150)}</p>
      <div className={styles.cardFooter}>
        <span className={styles.readTime}>Post {index + 1} da lista</span>
        <Link className={styles.readMore} to={`/posts/${post.id}`} aria-label={`Ler post: ${post.title}`}>
          Ler post <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export default memo(PostCard);