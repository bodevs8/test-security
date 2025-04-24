import type { EwalletBankingType } from '@/types/deposit';
import type { StaticImageData } from 'next/image';
import { LinkCrytoEnum } from '@/enums';
import Binance from '@/public/images/crypto/binance.webp';
import Bitcoin from '@/public/images/crypto/bitcoin.webp';
import Ethereum from '@/public/images/crypto/ethereum.webp';
import KDG from '@/public/images/crypto/kdg.webp';
import USDT from '@/public/images/crypto/usdt.webp';

export const getCryptoLogo = (currency: string) => {
  console.error(currency)
  const logoMap: Record<string, StaticImageData> = {
    BTC: Bitcoin,
    BNB: Binance,
    ETH: Ethereum,
    USDT,
    KDG,
  };

  return logoMap[currency] || KDG;
};

export const addOrderPhoneCard = (provider: string) => {
  const ProvidersMap: Record<string, number> = {
    VIETTEL: 1,
    MOBIFONE: 2,
    VINAPHONE: 3,
    VIETNAMOBILE: 4,
  };

  return ProvidersMap[provider] || 10;
};

export const getDepositLimits = (
  banks: EwalletBankingType[] | undefined,
  defaultMin: number,
  defaultMax: number,
) => {
  if (!banks?.length) {
    return {
      min: defaultMin,
      max: defaultMax,
    };
  }

  const minValues = banks.map((bank) => bank.min);
  const maxValues = banks.map((bank) => bank.max);

  return {
    min: Math.min(...minValues, defaultMin),
    max: Math.max(...maxValues, defaultMax),
  };
};

export const downloadQRCode = (qrCode: string) => {
  if (!qrCode) return;
  const link = document.createElement('a');
  link.href = qrCode;
  link.download = 'qr-code.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getCryptoLink = (network: string, address: string) => {
  const linkMap: Record<string, string> = {
    KCHAIN: LinkCrytoEnum.KDG,
    TRC20: LinkCrytoEnum.USDT,
    ERC20: LinkCrytoEnum.ETH,
  };

  return `${linkMap[network] || LinkCrytoEnum.BNB}/${address}`;
};

export const getProviderCardLogo = (provider: string, isInactive: boolean) => {
  const ImageMap: Record<string, StaticImageData | string> = {
    VIETTEL: isInactive
      ? '/images/phonecard/disable/viettel.svg'
      : '/images/phonecard/viettel.svg',
    MOBIFONE: isInactive
      ? '/images/phonecard/disable/mobifone.svg'
      : '/images/phonecard/mobifone.svg',
    VINAPHONE: isInactive
      ? '/images/phonecard/disable/vinaphone.svg'
      : '/images/phonecard/vinaphone.svg',
    VIETNAMOBILE: isInactive
      ? '/images/phonecard/disable/vietnamobile.svg'
      : '/images/phonecard/vietnamobile.svg',
  };

  const logoProvider = ImageMap[provider];

  return logoProvider || ImageMap.VIETTEL;
};
