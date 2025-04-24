import StarBlur from '@/public/images/account/promotion-applied/star-blur.webp';
import Star from '@/public/images/account/promotion-applied/star.webp';
import clsx from 'clsx';

import Image from 'next/image';

type PromotionTitleSectionProps = {
  title: string;
  className?: string;
};

export const PromotionTitleSection = ({
  title,
  className,
}: PromotionTitleSectionProps) => {
  return (
    <div className={clsx('relative w-fit flex items-center', className)}>
      <p>{title}</p>
      <div className="relative -top-2 -right-7 w-fit">
        <Image
          src={Star}
          alt="star"
          className="w-6 h-6"
          width={24}
          height={24}
        />
        <Image
          src={StarBlur}
          alt="star"
          className="w-6 h-6 absolute top-0 left-0"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};
