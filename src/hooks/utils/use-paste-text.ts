'use client';

import { useCallback, useState } from 'react';

type PasteHandler = {
  onChange: (value: string) => void;
};

export const usePasteHandler = (
  onPasteText: ((text: string) => void) | undefined,
  field: PasteHandler,
) => {
  const [isPaste, setIsPaste] = useState(false);

  const handlePaste = useCallback(() => {
    if (onPasteText) {
      navigator.clipboard.readText().then((text) => {
        const value = text.replace(/\D/g, '');
        onPasteText(value);
        field.onChange(value);
        setIsPaste(true);
        setTimeout(() => setIsPaste(false), 3000);
      });
    }
  }, [onPasteText, field]);

  return { handlePaste, isPaste };
};
