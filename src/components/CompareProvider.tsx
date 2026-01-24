'use client';

import { useState, useCallback, useMemo, ReactNode } from 'react';
import { CompareContext, MAX_COMPARE_ITEMS } from '@/lib/compare-store';

export default function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const addToCompare = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds]
  );

  const value = useMemo(
    () => ({
      selectedIds,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isSelected,
    }),
    [selectedIds, addToCompare, removeFromCompare, clearCompare, isSelected]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
