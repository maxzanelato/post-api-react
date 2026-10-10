import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <span className={styles.code}>404</span>
      <h1>Este caminho não existe.</h1>
      <p>Talvez a página tenha mudado de lugar. Vamos voltar para a lista de posts.</p>
      <Link to="/">Voltar para o início <span aria-hidden="true">↗</span></Link>
    </section>
  );
}