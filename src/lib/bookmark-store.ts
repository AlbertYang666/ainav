// Bookmark store using React Context and localStorage
// Manages the list of bookmarked AI tools for the user

import { createContext, useContext } from 'react';

export interface BookmarkState {
  bookmarkedIds: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  clearBookmarks: () => void;
  isBookmarked: (id: string) => boolean;
  mounted: boolean;
}

export const BookmarkContext = createContext<BookmarkState | null>(null);

export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
}

// LocalStorage key for persisting bookmarks
export const BOOKMARK_STORAGE_KEY = 'ainav_bookmarks';
