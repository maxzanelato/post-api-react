import styles from './Alert.module.css';

interface AlertProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export default function Alert({ title, message, onRetry }: AlertProps) {
  return (
    <section className={styles.alert} role="alert">
      <div className={styles.icon} aria-hidden="true">!</div>
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{message}</p>
        {onRetry && <button className={styles.retry} type="button" onClick={onRetry}>Tentar novamente</button>}
      </div>
    </section>
  );
}