import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import { ButtonSizeEnum, ButtonVariantsEnum, Coin12LinkEnum } from '@/enums';
import { useWithdrawContext } from '@/hooks/contexts';
import NOTE_IMG from '@/public/images/account/deposit/note.webp';
import BgCoin12 from '@/public/images/box-note/coin12/bg_coin12.webp';
import Coin12Icon from '@/public/images/box-note/coin12/icon_coin12.webp';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

const Coin12Withdraw = () => {
  const t = useTranslations();
  const { selectedCrypto } = useWithdrawContext();
  const coin12Url = process.env.NEXT_PUBLIC_COIN12_URL || '';

  const minAmount = useMemo(() => {
    return formatNumberWithCommas(
      selectedCrypto?.min || 0,
      DEFAULT_CURRENCY_UNIT || '',
    );
  }, [selectedCrypto]);

  return (
    <div>
      <div className="w-full">
        <div className="relative">
          <Image
            src={BgCoin12}
            alt="bg-coin12"
            width={392}
            height={76}
            className="w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full flex gap-2 px-[14px] items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={Coin12Icon} alt="bg-coin12" width={35} height={35} />
              <span className="text-[12px] md:text-[12px] text-dark-700 font-normal ">
                {t('Pages.Account.withdraw.coin12.description')}
              </span>
            </div>
            <Link
              href={`${coin12Url}${Coin12LinkEnum.CreateWallet}`}
              target="_blank"
              prefetch={false}
            >
              <Button
                id="create-wallet"
                name="create-wallet"
                size={ButtonSizeEnum.SM}
                variant={ButtonVariantsEnum.Secondary}
                className="w-[93px] h-[24px] text-[12px] md:text-[12px] text-dark-700 font-medium "
              >
                {t('Pages.Account.withdraw.coin12.create_wallet')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-primary-light-0 p-3">
          <Link
            className="flex items-center gap-2"
            href={`${coin12Url}${Coin12LinkEnum.Deposit}`}
            target="_blank"
            prefetch={false}
          >
            <span className="text-[12px] md:text-[14px] text-dark-700 font-normal hover:underline">
              {t('Pages.Account.withdraw.coin12.step_1')}
            </span>
            <i className="icon-arrow-square-in text-[16px] text-dark-700 before:!text-dark-700" />
          </Link>
          <Link
            className="flex items-center gap-2 mt-2"
            href={`${coin12Url}${Coin12LinkEnum.Withdraw}`}
            target="_blank"
            prefetch={false}
          >
            <span className="text-[12px] md:text-[14px] text-dark-700 font-normal hover:underline">
              {t('Pages.Account.withdraw.coin12.step_2', {
                unit: DEFAULT_CURRENCY_UNIT,
              })}
            </span>
            <i className="icon-arrow-square-in text-[16px] text-dark-700 before:!text-dark-700" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 tutorial-deposit p-4 rounded-[8px] transaction-note mt-4">
        <div className="tutorial-deposit-title flex gap-2">
          <Image src={NOTE_IMG} alt="" width={20} height={20.5} />
          <span className="font-bold text-base text-orange-50">
            {t('Pages.Account.deposit.crypto.note_text')}
          </span>
        </div>
        <ul className="list-decimal list-outside pl-4 text-dark-700 font-normal text-xs leading-[150%]">
          <li>
            {t('Pages.Account.withdraw.crypto.note.text_1', {
              brandName: process.env.NEXT_PUBLIC_BRAND_NAME || '',
            })}
          </li>
          <li>{t('Pages.Account.withdraw.crypto.note.text_2')}</li>
          <li>
            {t('Pages.Account.withdraw.crypto.note.text_3', {
              amount: minAmount,
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin12Withdraw;
