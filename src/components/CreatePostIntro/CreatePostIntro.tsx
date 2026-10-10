import styles from './CreatePostIntro.module.css';

export default function CreatePostIntro() {
  return (
    <section className={styles.intro}>
      <span className={styles.eyebrow}><span /> COMPARTILHE COM O MUNDO</span>
      <h1>Toda ideia merece <span>um espaço.</span></h1>
      <p>Escreva sobre algo que aprendeu, uma descoberta recente ou uma ideia que não sai da sua cabeça.</p>
      <div className={styles.tips}>
        <div><span>01</span><p><strong>Um bom título</strong><br />Ajude as pessoas a entenderem seu assunto.</p></div>
        <div><span>02</span><p><strong>Seja você</strong><br />Explique sua ideia com clareza e contexto.</p></div>
        <div><span>03</span><p><strong>Compartilhe</strong><br />Revise e publique quando estiver pronto.</p></div>
      </div>
    </section>
  );
}
