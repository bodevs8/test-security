'use client';

import type { MiniGameProps } from '@/types/app';
import { ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import bgImage from '@/public/images/minigames/bg.webp';
import closeImage from '@/public/images/minigames/close.webp';
import gameImage from '@/public/images/minigames/game.webp';
import miniImage from '@/public/images/minigames/mini.webp';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import '@/styles/components/minigame.scss';

const isTouchEvent = (
  e: React.MouseEvent | React.TouchEvent,
): e is React.TouchEvent => 'touches' in e;

const getClientCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
  if (isTouchEvent(e) && e.touches[0]) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  const mouseEvent = e as React.MouseEvent;
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };
};

export const MiniGameDraggable: React.FC<MiniGameProps> = ({
  isMobile,
  user,
}) => {
  const modalStore = useModalStore((state) => state);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const initializePosition = useCallback(() => {
    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      const buttonHeight = buttonRef.current.offsetHeight;
      const spaceY = isMobile ? 100 : 80;
      const spaceX = isMobile ? 10 : 20;
      setPosition({
        x:
          ((window.innerWidth - buttonWidth - spaceX) / window.innerWidth) *
          100,
        y:
          ((window.innerHeight - buttonHeight - spaceY) / window.innerHeight) *
          100,
      });
    }
  }, [isMobile]);

  useEffect(() => {
    initializePosition();
  }, [initializePosition]);

  const handleClickMiniGames = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if ((e.target as HTMLElement).classList.contains('minigame-btn-close')) {
        if (e.type === 'mousedown') {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }
      e.stopPropagation();

      if (user?.package_id === 2) {
        modalStore.openModal(ModalIdEnum.UsePromotion);
        return;
      }

      if (!wasDragged) {
        modalStore.openModal(ModalIdEnum.Login);
      }
    },
    [user, wasDragged, modalStore],
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setTouchStartTime(Date.now());
      setIsDragging(true);
      setWasDragged(false);

      const { x: clientX, y: clientY } = getClientCoordinates(e);

      if (buttonRef.current) {
        setOffset({
          x: clientX - buttonRef.current.offsetLeft,
          y: clientY - buttonRef.current.offsetTop,
        });
      }
    },
    [],
  );

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !buttonRef.current) return;

      const { x: clientX, y: clientY } = getClientCoordinates(
        e as unknown as React.MouseEvent | React.TouchEvent,
      );

      const deltaX = Math.abs(
        clientX - (buttonRef.current.offsetLeft + offset.x),
      );
      const deltaY = Math.abs(
        clientY - (buttonRef.current.offsetTop + offset.y),
      );

      if (deltaX > 3 || deltaY > 3) {
        setWasDragged(true);
        e.preventDefault();

        const margin = 10;
        const topMargin = isMobile ? 100 : 120;
        const newX = Math.max(
          margin,
          Math.min(
            clientX - offset.x,
            window.innerWidth - buttonRef.current.offsetWidth - margin,
          ),
        );
        const newY = Math.max(
          topMargin,
          Math.min(
            clientY - offset.y,
            window.innerHeight - buttonRef.current.offsetHeight - margin,
          ),
        );

        setPosition({
          x: (newX / window.innerWidth) * 100,
          y: (newY / window.innerHeight) * 100,
        });
      }
    },
    [isDragging, offset, isMobile],
  );

  const handleDragEnd = useCallback(
    (e: MouseEvent | TouchEvent) => {
      setIsDragging(false);
      const touchDuration = Date.now() - touchStartTime;
      if (!wasDragged && touchDuration < 200) {
        handleClickMiniGames(e as unknown as React.MouseEvent);
      }
    },
    [wasDragged, touchStartTime, handleClickMiniGames],
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={buttonRef}
      id="draggableButton"
      className="fixed w-[80px] h-[100px] md:w-[100px] md:h-[125px] bg-transparent cursor-grab z-[49]"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onClick={handleClickMiniGames}
    >
      <div className="h-full w-full relative cursor-pointer">
        <Image
          src={bgImage}
          alt="Background"
          width={90}
          height={112}
          className="pointer-events-none w-full h-auto"
        />
        <Image
          src={miniImage}
          alt="Mini"
          width={90}
          height={33.7}
          className="pointer-events-none mini ping w-full h-auto"
        />
        <Image
          src={gameImage}
          alt="Game"
          width={89}
          height={28}
          className="pointer-events-none game-text ping"
          style={{ animationDelay: '800ms' }}
        />
        <Image
          src={closeImage}
          alt="Close"
          width={22.47}
          height={22.47}
          className="minigame-btn-close"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};
