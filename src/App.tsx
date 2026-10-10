import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import Loading from './components/Loading/Loading';

const PostsPage = lazy(async () => await import('./pages/PostsPage/PostsPage'));
const PostDetailPage = lazy(async () => await import('./pages/PostDetailPage/PostDetailPage'));
const CreatePostPage = lazy(async () => await import('./pages/CreatePostPage/CreatePostPage'));
const NotFoundPage = lazy(async () => await import('./pages/NotFoundPage/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout>
        <Suspense fallback={<Loading label="Carregando página…" />}>
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/posts/new" element={<CreatePostPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}