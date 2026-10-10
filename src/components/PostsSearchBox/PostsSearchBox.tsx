import styles from './PostsSearchBox.module.css';

interface PostsSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PostsSearchBox({ value, onChange }: PostsSearchBoxProps) {
  return (
    <label className={styles.searchBox}>
      <span aria-hidden="true">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por título ou conteúdo…"
        aria-label="Buscar posts por título ou conteúdo"
      />
      {value && <button type="button" onClick={() => onChange('')} aria-label="Limpar busca">×</button>}
    </label>
  );
}
