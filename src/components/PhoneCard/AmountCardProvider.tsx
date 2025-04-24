import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY_UNIT } from '@/constant/app';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

type AmountSelectionProps = {
  amounts: { number: number; display: string }[];
  selectedAmount?: number | null;
  handleAmountSelect: (amount: number) => void;
  className?: string;
  gridClassName?: string;
};

export function AmountSelection({
  amounts,
  selectedAmount,
  handleAmountSelect,
  className,
  gridClassName,
}: AmountSelectionProps) {
  const t = useTranslations();

  return (
    <div className={className}>
      <div className="capitalize pb-2 text-[14px] leading-[140%] text-dark-700 font-medium">
        {t('Pages.Account.deposit.phone_card.select_amount', {
          unit: DEFAULT_CURRENCY_UNIT,
        })}
      </div>

      <input
        type="hidden"
        name="card_amount_unit"
        value={selectedAmount || ''}
      />

      <div
        id="moneyList"
        className={clsx('grid grid-cols-4 gap-[10px]', gridClassName)}
      >
        {amounts.map((amount) => {
          const isSelected = selectedAmount === amount.number;

          return (
            <Button
              key={amount.number}
              id={`${amount.number.toString()}amount-button`}
              name={`${amount.number.toString()}amount-button`}
              type="button"
              className={clsx(
                '!rounded-[4px] !bg-white !text-[14px] min-[390px]:!text-[14px] !font-bold button-amount-select !outline-[1px] !outline-primary-light-400 !text-dark-700',
                'hover:!text-green-500 hover:!outline-green-500',
                {
                  '!text-green-500 !outline-green-500 !bg-green-80': isSelected,
                },
              )}
              onClick={() => handleAmountSelect(amount.number)}
            >
              <span className={isSelected ? 'text-green-400' : ''}>
                {amount.display}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
