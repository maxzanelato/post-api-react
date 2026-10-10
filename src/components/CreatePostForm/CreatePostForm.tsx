import Alert from '../Alert/Alert';
import Field from '../Field/Field';
import type { CreatePostFormValues, PostField } from '../../interfaces/post';
import styles from './CreatePostForm.module.css';

interface CreatePostFormProps {
  form: {
    values: CreatePostFormValues;
    errors: Partial<Record<PostField, string>>;
    isPending: boolean;
    handleChange: (field: PostField, value: string) => void;
    handleFocus: (field: PostField) => void;
    handleBlur: (field: PostField) => void;
    handleSubmit: (formData: FormData) => void;
  };
  isError: boolean;
  errorMessage?: string;
}

export default function CreatePostForm({ form, isError, errorMessage }: CreatePostFormProps) {
  return (
    <section className={styles.formCard} aria-labelledby="form-title">
      <div className={styles.formHeader}>
        <span className={styles.formIcon} aria-hidden="true">✎</span>
        <div>
          <h2 id="form-title">Criar novo post</h2>
          <p>Os campos marcados são obrigatórios.</p>
        </div>
      </div>
      {isError && <Alert title="Falha ao criar post" message={errorMessage || ''} />}
      <form action={form.handleSubmit} noValidate>
        <Field
          label="Título do post"
          name="title"
          placeholder="Ex.: O que aprendi construindo um app…"
          value={form.values.title}
          maxLength={120}
          error={form.errors.title}
          hint={`${form.values.title.length}/120 caracteres`}
          onChange={(event) => form.handleChange('title', event.target.value)}
          onFocus={() => form.handleFocus('title')}
          onBlur={() => form.handleBlur('title')}
          autoComplete="off"
          required
        />
        <Field
          label="Conteúdo"
          name="body"
          multiline
          placeholder="Comece a escrever sua ideia aqui…"
          value={form.values.body}
          maxLength={2000}
          error={form.errors.body}
          hint={`${form.values.body.length}/2.000 caracteres`}
          onChange={(event) => form.handleChange('body', event.target.value)}
          onFocus={() => form.handleFocus('body')}
          onBlur={() => form.handleBlur('body')}
          required
        />
        <div className={styles.formFooter}>
          <p><span aria-hidden="true">ⓘ</span> Post de demonstração: o endpoint não salva permanentemente.</p>
          <button className={styles.submit} type="submit" disabled={form.isPending}>
            {form.isPending ? (
              <><span className={styles.buttonSpinner} /> Publicando…</>
            ) : (
              <>Publicar post <span aria-hidden="true">↗</span></>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
