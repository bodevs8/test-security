import type { ImageMapping } from '@/types/app';

import Binance from '@/public/images/crypto/binance.webp';
import Bitcoin from '@/public/images/crypto/bitcoin.webp';
import Ethereum from '@/public/images/crypto/ethereum.webp';
import Kdg from '@/public/images/crypto/kdg.webp';
import Trc20 from '@/public/images/crypto/trc20.webp';
import Usdt from '@/public/images/crypto/usdt.webp';

export const MAPPING_CRYPTO_IMAGE: ImageMapping = {
  binance: Binance,
  btc: Bitcoin,
  bitcoin: Bitcoin,
  eth: Ethereum,
  ethereum: Ethereum,
  kdg: Kdg,
  trc20: Trc20,
  usdt: Usdt,
};
