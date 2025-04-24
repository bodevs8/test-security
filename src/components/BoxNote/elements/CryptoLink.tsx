import { CRYPTO_TUTORIAL_DATA } from '@/constant/deposit';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/pages/deposit/crypto-note.scss';

export const CryptoLink = () => {
  const t = useTranslations();

  return (
    <>
      <div className="font-bold text-[16px] leading-[140%] tracking-[0%] text-dark-700 uppercase mt-2 md:mt-0">
        {t('Pages.Account.deposit.crypto.tutorial_provider')}
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 mt-3 md:max-w-[340px]">
        {CRYPTO_TUTORIAL_DATA.map((item, key) => (
          <Link
            key={key}
            target="_blank"
            href={item.href}
            className={clsx(
              'crypto-note relative flex justify-center items-center flex-col gap-3 flex-1 py-3 rounded-[5.4px]',
              item.key,
            )}
            prefetch={false}
          >
            <i className="absolute top-0.5 right-0.5 icon-arrow-square-in text-black-900 text-[10px]"></i>
            <Image
              src={item.image}
              alt={`${item.key}-image`}
              width={32}
              height={32}
              className=""
            />
            <p className="capitalize text-sm leading-5 text-dark-700 font-medium">
              {item.key}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};
