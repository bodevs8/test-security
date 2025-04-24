import { DEFAULT_CURRENCY_SEPARATOR } from '@/constant/app';
import { CurrencyUnit } from '@/enums';

function cleanInput(value: number | string | null): string {
  return value !== null ? value.toString().replace(/[^\d.-]/g, '') : '';
}

function formatIntegerPart(value: string, delimiter: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}

export function formatNumberWithDot(
  x: number | string | null,
  currencyName?: string,
): string {
  const cleanedInput = cleanInput(x);
  const [integerPart, decimalPart] = cleanedInput.split('.');

  const formattedInteger = formatIntegerPart(integerPart ?? '', '.');
  const result = decimalPart
    ? `${formattedInteger}.${decimalPart.substring(0, 2)}`
    : formattedInteger;

  return currencyName ? `${result} ${currencyName}` : result;
}

export function formatNumberWithCommas(
  x: number | string | null,
  currencyName?: string,
  isCurrencyPrefix = false,
): string {
  const cleanedInput = cleanInput(x);
  const [integerPart, decimalPart] = cleanedInput.split('.');

  const formattedInteger = formatIntegerPart(integerPart ?? '', ',');
  const result =
    decimalPart && Number(decimalPart.substring(0, 2)) !== 0
      ? `${formattedInteger}.${decimalPart.substring(0, 2)}`
      : formattedInteger;

  return currencyName
    ? isCurrencyPrefix
      ? `${currencyName} ${result}`
      : `${result} ${currencyName}`
    : result;
}

export function formatMoney(
  value: string | number,
  currencyName: string = 'K',
): string {
  const amount =
    typeof value === 'string' ? Number(value.replace(/[^\d.-]/g, '')) : value;

  if (amount >= 1000) {
    const formattedAmount = (amount / 1000).toFixed(2);
    const [integerPart, decimalPart] = formattedAmount.split('.');
    const formattedDecimalPart = decimalPart ? `,${decimalPart}` : '';
    const result =
      formatIntegerPart(integerPart ?? '', ',') +
      (formattedDecimalPart.length ? `,${formattedDecimalPart}` : '');
    return result + currencyName;
  }

  return `${amount}`;
}

export function formatAmount(x: number | string, suffix: string = 'D'): string {
  return `${formatNumberWithCommas(x)} ${suffix}`;
}

export function currencyDecimal(
  value: number | string,
  suffix: string = 'D',
): string {
  const numberValue =
    typeof value === 'number'
      ? value
      : Number.parseFloat(value.split('.').join('').replace(',', '.'));

  const absoluteValue = Math.abs(numberValue);
  const formattedValue = absoluteValue.toFixed(3).replace(/\.?0+$/, '');

  return `${numberValue < 0 ? '-' : ''}${formatNumberWithCommas(formattedValue)} ${suffix}`;
}

export function convertDtoVND(
  value: number | string,
  suffix: string = CurrencyUnit.DEFAULT_CURRENCY_VND,
) {
  if (!value) {
    return `0 ${suffix}`;
  }

  const amount =
    typeof value === 'string' ? Number(value.replaceAll(',', '')) : value;

  return formatNumberWithCommas(amount * 1000, suffix);
}

export function limitDecimal(num: number) {
  if (typeof num !== 'number' || Number.isNaN(num)) {
    return num;
  }

  const rounded = num.toFixed(2);
  return rounded.endsWith('.00')
    ? Number.parseInt(rounded)
    : Number.parseFloat(rounded);
}

export function convertCurrencyToNumber(
  value: string,
  separator: string = DEFAULT_CURRENCY_SEPARATOR,
) {
  return Number(value.replaceAll(separator, ''));
}
