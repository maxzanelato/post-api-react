import { Link, NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.brand} to="/" aria-label="Postly — página inicial">
            <span className={styles.brandMark} aria-hidden="true">P</span>
            <span>postly<span className={styles.brandDot}>.</span></span>
          </Link>
          <nav className={styles.nav} aria-label="Navegação principal">
            <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              Explorar posts
            </NavLink>
            <NavLink to="/posts/new" className={({ isActive }) => `${styles.createLink} ${isActive ? styles.createActive : ''}`}>
              <span aria-hidden="true">＋</span> Criar post
            </NavLink>
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Feito para explorar ideias. <span>© Postly</span></p>
        <span>Dados de demonstração via JSONPlaceholder</span>
      </footer>
    </div>
  );
}