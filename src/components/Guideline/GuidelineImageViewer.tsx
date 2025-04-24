import Image from 'next/image';
import React from 'react';

type GuidelineImageViewerProps = {
  show: boolean;
  imageUrl: string;
  imageCaption?: string;
  onClose: () => void;
};

export const GuidelineImageViewer = ({
  show,
  imageUrl,
  imageCaption,
  onClose,
}: GuidelineImageViewerProps) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageUrl}
          alt={imageCaption || 'Image'}
          width={1200}
          height={800}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl"
          priority
        />
        {imageCaption && (
          <p className="text-sm text-white text-center mt-2">{imageCaption}</p>
        )}
      </div>
    </div>
  );
};
