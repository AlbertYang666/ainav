// Compare store using React Context
// Manages the list of tools selected for comparison

import { createContext, useContext } from 'react';

export interface CompareState {
  selectedIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isSelected: (id: string) => boolean;
}

export const CompareContext = createContext<CompareState | null>(null);

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}

// Maximum number of tools that can be compared at once
export const MAX_COMPARE_ITEMS = 4;
