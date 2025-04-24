import { GUIDELINE_LINKS } from '@/constant/guidelines/guideline';
import { MEO_EGAMES } from './meo-choi-e-games';
import { MEO_CUOC_CASINO } from './meo-cuoc-casino';
import { MEO_CUOC_THE_THAO } from './meo-cuoc-the-thao';
import { MEO_XO_SO } from './meo-xo-so';

export const MEO_HAY_GUIDELINES = {
  [GUIDELINE_LINKS.SPORTS_TIPS]: MEO_CUOC_THE_THAO,
  [GUIDELINE_LINKS.CASINO_TIPS]: MEO_CUOC_CASINO,
  [GUIDELINE_LINKS.LOTTERY_TIPS]: MEO_XO_SO,
  [GUIDELINE_LINKS.EGAMES_TIPS]: MEO_EGAMES,
};

export default MEO_HAY_GUIDELINES;
