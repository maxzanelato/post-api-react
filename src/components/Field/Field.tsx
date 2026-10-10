import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './Field.module.css';

interface SharedProps {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

type InputFieldProps = SharedProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & { multiline?: false };
type TextareaFieldProps = SharedProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & { multiline: true };
type FieldProps = InputFieldProps | TextareaFieldProps;

export default function Field(props: FieldProps) {
  const { label, name, error, hint, id = name, multiline, ...controlProps } = props;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          {...(controlProps as TextareaFieldProps)}
          id={id}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${styles.control} ${styles.textarea} ${error ? styles.invalid : ''}`}
        />
      ) : (
        <input
          {...(controlProps as InputFieldProps)}
          id={id}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${styles.control} ${error ? styles.invalid : ''}`}
        />
      )}
      {error ? <p id={`${id}-error`} className={styles.error} role="alert">{error}</p> : hint ? <p id={`${id}-hint`} className={styles.hint}>{hint}</p> : null}
    </div>
  );
}