import type { FormattedDataItem, PhoneCardType } from '@/types/deposit';
import { IGNORE_CARD_LIST } from '@/constant/deposit';
import {
  MAPPING_PHONE_CARD_ICON,
  MAPPING_PHONE_CARD_ICON_MAINTENANCE,
} from '@/constant/images/phone-card';
import { addOrderPhoneCard } from './deposit';
import { formatNumberWithCommas } from './format-currency';

// Memoize the filtered data to avoid recalculation
const getFilteredData = (data: PhoneCardType) =>
  Object.fromEntries(
    Object.entries(data).filter(([key]) => !IGNORE_CARD_LIST.includes(key)),
  );

// Memoize the value formatting function
const formatValue = (value: number) => ({
  number: value,
  display: formatNumberWithCommas(value),
});

export const formatPhoneCardList = (
  data: PhoneCardType,
): FormattedDataItem[] => {
  const filteredData = getFilteredData(data);

  // Format card list with additional properties
  const formattedCardList = Object.entries(filteredData).map(([key, item]) => {
    const keyTransform = key.toLowerCase();

    return {
      key,
      order: addOrderPhoneCard(key),
      status: item?.status ?? 0,
      rate: item?.rate ?? 0,
      value: (item?.value ?? []).map((val) => formatValue(Number(val))),
      icon: MAPPING_PHONE_CARD_ICON[keyTransform]!,
      iconActive: MAPPING_PHONE_CARD_ICON[keyTransform]!,
      iconInactive: MAPPING_PHONE_CARD_ICON_MAINTENANCE[keyTransform]!,
    };
  });

  // Sort cards by status and order
  return formattedCardList.sort((first, second) => {
    if (first.status === 0 && second.status !== 0) return 1;
    if (first.status !== 0 && second.status === 0) return -1;
    return first.order - second.order;
  });
};
