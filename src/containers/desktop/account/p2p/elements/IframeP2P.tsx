'use client';

import { BaseEmpty } from '@/components/BaseEmpty';
import { useDepositContext } from '@/hooks/contexts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

function IframeP2P() {
  const t = useTranslations('Pages.Account.p2p');
  const { indexDeposit } = useDepositContext();

  const DARK_TYPE = '&style=1';
  const LIGHT_TYPE = '&style=0';

  const url = useMemo(() => {
    const p2pLinkTemp = indexDeposit?.p2pLink;

    if (!p2pLinkTemp) return '';

    if (p2pLinkTemp?.includes(DARK_TYPE)) {
      return p2pLinkTemp?.replace(DARK_TYPE, LIGHT_TYPE);
    }

    return p2pLinkTemp;
  }, [indexDeposit]);

  return (
    <>
      <div
        className={clsx(
          'md:bg-white rounded-[8px] w-full md:py-6 h-full grid grid-rows-[auto_1fr] gap-4 md:gap-6 ml-0 md:ml-2 px-3 md:!px-6',
          !url && 'bg-primary-light-0',
        )}
      >
        <div className="xl:flex-row xl:items-center justify-between gap-2">
          <span className="text-green-350 text-xs md:text-base leading-[18px] lg:leading-6 font-medium -mt-2">
            {t('content')}
          </span>
        </div>
        {url && (
          <div className="w-full h-full">
            <iframe title="P2P" src={url} className="w-full h-full" />
          </div>
        )}
        {!url && (
          <BaseEmpty
            iconEmpty="transaction"
            emptyClassName=" h-fit mt-4 lg:mt-0 lg:h-full"
            imageSize={120}
            titleEmptyClassName="!mt-2 !text-base !text-light-300-70"
          />
        )}
      </div>
    </>
  );
}

export default IframeP2P;
