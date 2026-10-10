import styles from './PostsNotice.module.css';

interface PostsNoticeProps {
  message: string;
}

export default function PostsNotice({ message }: PostsNoticeProps) {
  return (
    <div className={styles.notice} role="status">
      <span aria-hidden="true">✓</span>
      {message}
    </div>
  );
}
