'use client';

import { useState } from 'react';
import OffcanvasMenu from './OffcanvasMenu';

export const Sidebar = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <>
      <OffcanvasMenu
        isOpen={isOffcanvasOpen}
        toggleOffcanvas={toggleOffcanvas}
      />
    </>
  );
};
