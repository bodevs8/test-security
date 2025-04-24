import type { UserBankType } from '@/types/userbank';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum } from '@/enums';
import { useTranslations } from 'next-intl';
import { CardBank } from '../CardBank';

type Props = {
  isHiddenAddBank: boolean;
  showAddBankModal: () => void;
  data: UserBankType[];
  isMobile?: boolean;
};

export const BankListDesktop = ({
  isHiddenAddBank,
  showAddBankModal,
  data,
}: Props) => {
  const t = useTranslations('Pages.Account.bank_information');

  return (
    <div className="w-full">
      <div className="flex items-center justify-between bg-bank-list-desktop p-4 mb-2.5">
        <div className="flex flex-col ">
          <span className="text-sm font-normal leading-[140%] text-dark-700">
            {t('security_title_prefix')}{' '}
            <span className="font-bold text-green-500">
              {t('security_title_highlight')}
            </span>
          </span>
          <span className="text-sm font-normal leading-[140%] text-dark-700">
            {t('security_description')}
          </span>
        </div>
        {!isHiddenAddBank && (
          <Button
            id="show-add-bank-button"
            name="show-add-bank-button"
            onClick={showAddBankModal}
            variant={ButtonVariantsEnum.Default}
            className="w-[200px]"
          >
            {t('add_bank_button')}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {data.map((userBank: UserBankType) => (
          <CardBank key={userBank.bank_code} userBank={userBank} />
        ))}
      </div>
    </div>
  );
};
