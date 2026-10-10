import styles from './Loading.module.css';

interface LoadingProps {
  label?: string;
}

export default function Loading({ label = 'Carregando…' }: LoadingProps) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}