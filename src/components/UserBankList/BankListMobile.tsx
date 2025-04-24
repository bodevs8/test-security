import type { UserBankType } from '@/types/userbank';
import { CardBank } from '@/components/CardBank';
import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum } from '@/enums';
import { useTranslations } from 'next-intl';

type Props = {
  isHiddenAddBank: boolean;
  showAddBankModal: () => void;
  data: UserBankType[];
  isMobile?: boolean;
};

export const BankListMobile = ({
  isHiddenAddBank,
  showAddBankModal,
  data,
}: Props) => {
  const t = useTranslations('Pages.Account.bank_information');

  return (
    <div className="py-4 pb-20">
      <div className="flex flex-col items-center mb-8">
        <div className="text-dark-700 text-sm font-normal leading-[140%]">
          {t('security_title_prefix')}{' '}
          <span className="text-green-500 font-bold">
            {t('security_title_highlight')}
          </span>
        </div>

        <span className="text-black-700 text-sm md:text-base font-normal leading-[140%] normal-case md:capitalize text-center">
          {t('security_description')}
        </span>
      </div>
      <div className="flex flex-col gap-8 h-full overflow-y-auto no-scrollbar">
        {data.map((item) => (
          <CardBank key={item.bank_code} userBank={item} />
        ))}
      </div>
      {!isHiddenAddBank && (
        <div className="fixed bottom-0 left-0 w-full h-[72px] bg-white  flex items-center justify-center px-4 z-10 shadow-account-button">
          <Button
            id="show-add-bank-button"
            name="show-add-bank-button"
            onClick={showAddBankModal}
            variant={ButtonVariantsEnum.Default}
            className="!w-full"
          >
            <span className="icon icon-plus text-lg text-white" />
            {t('add_bank_button')}
          </Button>
        </div>
      )}
    </div>
  );
};
