import { useCallback, useState, useActionState } from 'react';
import { createPostSchema } from '../schemas/postSchema';
import type { CreatePostFormValues, PostField } from '../interfaces/post';

type FieldErrors = Partial<Record<PostField, string>>;
type SubmitHandler = (values: CreatePostFormValues) => Promise<void>;

const initialValues: CreatePostFormValues = { title: '', body: '' };

export function usePostForm(onValid: SubmitHandler) {
  const [values, setValues] = useState<CreatePostFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<PostField, boolean>>>({});

  const validateField = useCallback((field: PostField, value: string) => {
    const fieldSchema = createPostSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    setErrors((current) => ({
      ...current,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
    return result.success;
  }, []);

  const handleFocus = useCallback((field: PostField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    validateField(field, values[field]);
  }, [validateField, values]);

  const handleChange = useCallback((field: PostField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (touched[field]) validateField(field, value);
  }, [touched, validateField]);

  const handleBlur = useCallback((field: PostField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    validateField(field, values[field]);
  }, [validateField, values]);

  const formAction = useCallback(async (prevState: unknown, formData: FormData) => {
    const valuesFromForm: CreatePostFormValues = {
      title: formData.get('title') as string,
      body: formData.get('body') as string,
    };

    const result = createPostSchema.safeParse(valuesFromForm);
    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if ((field === 'title' || field === 'body') && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      setTouched({ title: true, body: true });
      return { success: false };
    }

    try {
      await onValid(result.data);
      setValues(initialValues);
      setErrors({});
      setTouched({});
      return { success: true };
    } catch {
      return { success: false };
    }
  }, [onValid]);

  const [state, handleSubmit, isPending] = useActionState(formAction, null);

  return {
    values,
    errors,
    touched,
    isPending,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  };
}
