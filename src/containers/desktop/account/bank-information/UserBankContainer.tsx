'use client';

import type { UserBankType } from '@/types/userbank';
import { Button } from '@/components/ui/button';
import { UserBankList } from '@/components/UserBankList';

import { MAX_BANK_ACCOUNT } from '@/constant/app';
import { ButtonVariantsEnum, ModalIdEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import BgBankContainerMobile from '@/public/images/bank/bg-bank-container-mb.webp';
import BgBankContainer from '@/public/images/bank/bg-bank-container.webp';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo } from 'react';

import '@/styles/pages/account/user-bank.scss';

type Props = {
  userBanks: UserBankType[];
  isMobile: boolean;
};

const UserBankContainer = ({ userBanks, isMobile }: Props) => {
  const t = useTranslations('Pages.Account.bank_information');

  const modalStore = useModalStore((state) => state);

  const handleShowModalAddBank = () => {
    modalStore.openModal(ModalIdEnum.AddBank);
  };

  const isHiddenAddBank = useMemo(() => {
    return userBanks.length === MAX_BANK_ACCOUNT;
  }, [userBanks]);

  return (
    <div className="w-full min-h-[calc(100vh-50px-40px)] md:min-h-auto md:h-full px-2.5 md:p-6 bg-white rounded-lg">
      {userBanks.length > 0 && (
        <UserBankList
          data={userBanks}
          isHiddenAddBank={isHiddenAddBank}
          showAddBankModal={handleShowModalAddBank}
          isMobile={isMobile}
        />
      )}
      {userBanks.length === 0 && (
        <div className="h-[calc(100vh-50px-40px-32px)] w-full flex items-center justify-center">
          <div className="flex flex-col gap-0 md:gap-6 items-center">
            <Image
              src={isMobile ? BgBankContainerMobile : BgBankContainer}
              alt="Bank Information"
              width={346}
              height={248}
              className="max-w-[300px] md:max-w-[346px] md:max-h-[248px] w-full h-full"
            />
            <div className="flex flex-col gap-1 md:gap-2 mt-5 items-center">
              <div className="text-black-700 text-sm md:text-[18px] font-bold leading-[140%]">
                {t('add_bank_title_prefix')}{' '}
                <span className="text-green-500">
                  {t('add_bank_title_highlight')}
                </span>
              </div>

              <span className="text-black-700 text-sm md:text-base font-normal leading-[140%] normal-case md:capitalize text-center">
                {t('add_bank_description')}
              </span>
            </div>
            <Button
              id="show-add-bank-button-2"
              name="show-add-bank-button-2"
              onClick={handleShowModalAddBank}
              variant={ButtonVariantsEnum.Default}
              className="w-[180px] md:w-50 h-8 md:h-10 capitalize mt-8 md:mt-0 text-sm md:text-base"
            >
              <i className="icon-plus text-xl" />
              {t('add_bank_button')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { UserBankContainer };
