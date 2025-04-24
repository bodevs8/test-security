import type { TransactionDataType } from '@/types/transaction';
import { BaseModal } from '@/components/BaseModal';
import { ClipboardCopy } from '@/components/ClipboardCopy';
import { Pagination } from '@/components/Pagination';
import { ModalIdEnum } from '@/enums';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  data: TransactionDataType | undefined;
};

export default function PhoneCardModal({ data }: Props) {
  const t = useTranslations('Pages.Account.transaction_history.modal');
  const [currentPage, setCurrentPage] = useState(1);
  const cardSerials = useMemo(() => {
    if (!data?.card_serial) {
      return '';
    }
    if (
      typeof data.card_serial === 'string' &&
      data.card_serial?.trim() !== ''
    ) {
      try {
        return JSON.parse(data.card_serial);
      } catch (error) {
        console.error('Error parsing cardSerial:', error);
        return null;
      }
    }
    return data.card_serial;
  }, [data?.card_serial]);

  const cardProvider = useMemo(
    () => data?.card_provider ?? data?.to_bank_code,
    [data?.card_provider, data?.to_bank_code],
  );

  const currentCardSerial = useMemo(() => {
    if (!cardSerials) {
      return {};
    }
    return cardSerials[currentPage - 1] || {};
  }, [cardSerials, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Array.isArray(cardSerials) ? cardSerials.length : 1;

  return (
    <BaseModal
      modalId={ModalIdEnum.PhoneCard}
      modalClassName="!max-w-[344px] !bg-primary-light-0 !p-6"
      hideTitle
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-dark-700 text-[20px] font-bold text-left uppercase">
          {cardProvider}
        </h3>
        {Array.isArray(cardSerials) && (
          <>
            <ClipboardCopy
              label={t('card_serial')}
              value={currentCardSerial.serial ?? ''}
            />
            <ClipboardCopy
              label={t('pin_code')}
              value={currentCardSerial.pincode ?? ''}
            />
            {totalPages > 1 && (
              <Pagination
                onPageChange={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            )}
          </>
        )}
        {!Array.isArray(cardSerials) && (
          <>
            <ClipboardCopy
              label={t('card_serial')}
              value={cardSerials.serial ?? ''}
            />
            <ClipboardCopy
              label={t('pin_code')}
              value={cardSerials.pincode ?? ''}
            />
          </>
        )}
      </div>
    </BaseModal>
  );
}
