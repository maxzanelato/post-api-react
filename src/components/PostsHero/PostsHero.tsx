import styles from './PostsHero.module.css';

interface PostsHeroProps {
  totalPosts: number;
  isPending: boolean;
}

export default function PostsHero({ totalPosts, isPending }: PostsHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}><span /> SEU ESPAÇO DE IDEIAS</span>
        <h1>Pequenas ideias.<br /><span>Grandes conversas.</span></h1>
        <p>Explore histórias, pensamentos e descobertas compartilhadas pela comunidade.</p>
        <div className={styles.heroStats}>
          <div><strong>{isPending ? '—' : totalPosts}</strong><span>posts disponíveis</span></div>
          <span className={styles.statDivider} />
          <div><strong>100%</strong><span>curiosidade</span></div>
        </div>
      </div>
      <div className={styles.heroArt} aria-hidden="true">
        <div className={`${styles.orbit} ${styles.orbitOne}`} /><div className={`${styles.orbit} ${styles.orbitTwo}`} />
        <div className={`${styles.note} ${styles.noteOne}`}><span>✦</span><div><i /><i /><i /></div></div>
        <div className={`${styles.note} ${styles.noteTwo}`}><span>↗</span><div><i /><i /></div></div>
        <div className={styles.centerShape}><span>p.</span></div>
        <span className={styles.sparkle}>✳</span><span className={styles.tinyDot} />
      </div>
    </section>
  );
}
