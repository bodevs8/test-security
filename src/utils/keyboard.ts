import type { KeyboardEventHandler } from 'react';

export const handleKeyDown =
  (callback: () => void): KeyboardEventHandler =>
  (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };
