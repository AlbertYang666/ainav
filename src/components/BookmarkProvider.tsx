'use client';

import { useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import { BookmarkContext, BOOKMARK_STORAGE_KEY } from '@/lib/bookmark-store';

export default function BookmarkProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  // Initialize with empty array to match server-side render
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Load bookmarks from localStorage after mount (client-side only)
  useEffect(() => {
    const stored = localStorage.getItem(BOOKMARK_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setBookmarkedIds(parsed);
        }
      } catch (error) {
        console.error('Failed to parse bookmarks from localStorage:', error);
      }
    }
    setMounted(true);
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarkedIds));
    }
  }, [bookmarkedIds, mounted]);

  const addBookmark = useCallback((id: string) => {
    setBookmarkedIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarkedIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearBookmarks = useCallback(() => {
    setBookmarkedIds([]);
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarkedIds.includes(id),
    [bookmarkedIds]
  );

  const value = useMemo(
    () => ({
      bookmarkedIds,
      addBookmark,
      removeBookmark,
      clearBookmarks,
      isBookmarked,
      mounted,
    }),
    [bookmarkedIds, addBookmark, removeBookmark, clearBookmarks, isBookmarked, mounted]
  );

  return (
    <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
  );
}
