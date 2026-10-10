import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiErrorAlert } from '../../hooks/useApiErrorAlert';
import { useCreatePost } from '../../hooks/useCreatePost';
import { usePostForm } from '../../hooks/usePostForm';
import type { CreatePostFormValues } from '../../interfaces/post';
import CreatePostIntro from '../../components/CreatePostIntro/CreatePostIntro';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import styles from './CreatePostPage.module.css';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const createMutation = useCreatePost();
  useApiErrorAlert(createMutation.error);

  const create = useCallback(async (values: CreatePostFormValues) => {
    await createMutation.mutateAsync({ ...values, userId: 1 });
    navigate('/', { state: { notice: 'Post criado! O servidor de demonstração não persiste os dados, mas o item foi adicionado ao cache desta sessão.' } });
  }, [createMutation.mutateAsync, navigate]);

  const form = usePostForm(create);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}><span aria-hidden="true">←</span> Voltar para os posts</Link>
      <div className={styles.layout}>
        <CreatePostIntro />
        <CreatePostForm
          form={form as any}
          isError={createMutation.isError}
          errorMessage={createMutation.error?.message}
        />
      </div>
    </div>
  );
}