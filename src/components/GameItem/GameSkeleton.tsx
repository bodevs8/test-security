import Image from 'next/image';
import React from 'react';

type GameSkeletonProps = {
  count?: number;
};

export const GameSkeleton: React.FC<GameSkeletonProps> = ({ count = 16 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`game-skeleton-${index}`}
          className="relative aspect-[114/149] md:aspect-[168/221] bg-primary-light-300 rounded-[6px]"
        >
          <Image
            width={24}
            height={24}
            src="/icons/game-item.svg"
            alt="game item"
            className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 z-10"
          />
          <div className="loading-thumb"></div>
        </div>
      ))}
    </>
  );
};

export default GameSkeleton;
