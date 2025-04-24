'use client';

import type { SocialNetwork, SocialShareProps } from '@/types/news';
import Image from 'next/image';

export const SocialShare: React.FC<SocialShareProps> = ({
  shareData,
  className = '',
}) => {
  const networks: SocialNetwork[] = [
    {
      shareUrl: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareData.url)}&media=${encodeURIComponent(shareData.thumbnail)}&description=${encodeURIComponent(shareData.title)}`,
      title: 'Pinterest',
      iconImg: '/images/socials/pinterest.svg',
    },
    {
      shareUrl: `https://twitter.com/share?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}`,
      title: 'Twitter',
      iconImg: '/images/socials/twitter.svg',
    },

    {
      shareUrl: `https://telegram.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}`,
      title: 'Telegram',
      iconImg: '/images/socials/telegram.svg',
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        {networks.map((network, index) => (
          <a
            href={network.shareUrl}
            onClick={() => handleShare(network.shareUrl)}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <Image
              src={network.iconImg}
              alt={network.title}
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
