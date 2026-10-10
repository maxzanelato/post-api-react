import { useLayoutEffect, useRef, useState } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import type { Post } from '../../interfaces/post';
import PostCard from '../../components/PostCard/PostCard';
import styles from './VirtualPostList.module.css';

interface VirtualPostListProps {
  posts: Post[];
}

export default function VirtualPostList({ posts }: VirtualPostListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  const virtualizer = useWindowVirtualizer({
    count: posts.length,
    estimateSize: () => 230,
    overscan: 6,
    gap: 16,
    scrollMargin,
  });

  useLayoutEffect(() => {
    const updateOffset = () => {
      if (listRef.current) setScrollMargin(Math.round(listRef.current.getBoundingClientRect().top + window.scrollY));
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={listRef} className={styles.list} style={{ height: virtualizer.getTotalSize() }}>
      {virtualizer.getVirtualItems().map((row) => (
        <div
          key={row.key}
          data-index={row.index}
          ref={virtualizer.measureElement}
          className={styles.row}
          style={{ transform: `translateY(${row.start - scrollMargin}px)` }}
        >
          <PostCard post={posts[row.index]} index={row.index} />
        </div>
      ))}
    </div>
  );
}
