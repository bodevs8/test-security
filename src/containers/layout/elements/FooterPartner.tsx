import FirstCagayan from '@/public/images/footer/first-cagayan.webp';
import Mg from '@/public/images/footer/mg.webp';

import Qucten from '@/public/images/footer/qucten.webp';
import clsx from 'clsx';
import Image from 'next/image';

type FooterPartnerProps = {
  className?: string;
};

export const FooterPartner = ({ className }: FooterPartnerProps) => {
  return (
    <div
      className={clsx(
        'py-[5px] min-[1200px]:py-0 mt-[4.5] flex flex-col items-center w-full',
        className,
      )}
    >
      <div className="flex justify-start gap-10 w-full">
        <Image
          src={FirstCagayan}
          width={134}
          height={71}
          alt="first cagayan"
          className="aspect-[134/71] object-contain"
          loading="lazy"
        />
        <Image
          src={Qucten}
          width={85}
          height={73}
          alt="qucten"
          className="!h-auto object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex justify-start items-center w-full mt-8">
        <Image
          src={Mg}
          width={234}
          height={35}
          alt="mg"
          className="aspect-[234/35] object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};
