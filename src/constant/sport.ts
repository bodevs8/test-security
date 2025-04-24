import {
  SPORT_ITEM_IMG,
  SPORT_MODEL_IMG,
  SPORT_SHAPE_IMG,
} from '@/constant/images/sport';
import { IframeLinkEnum } from '@/enums';
import { VirtualSportId } from '@/enums/sport';

export const SPORT_GAMES = [
  {
    id: 1,
    href: IframeLinkEnum.KSport,
    img: SPORT_ITEM_IMG.Sport1,
    imgMb: SPORT_ITEM_IMG.Sport1Mb,
    title: 'k-Sports',
    content: 'Thể thao Châu Á',
    shape: SPORT_SHAPE_IMG.Sport1,
  },
  {
    id: 2,
    href: IframeLinkEnum.BTI,
    img: SPORT_ITEM_IMG.Sport2,
    imgMb: SPORT_ITEM_IMG.Sport2Mb,
    title: 'bti-Sports',
    content: 'Thể thao Latinh',
    shape: SPORT_SHAPE_IMG.Sport2,
  },
  {
    id: 3,
    href: IframeLinkEnum.IBC,
    img: SPORT_ITEM_IMG.Sport3,
    imgMb: SPORT_ITEM_IMG.Sport3Mb,
    title: 'im-Sports',
    content: 'Thể thao Châu Mỹ',
    shape: SPORT_SHAPE_IMG.Sport3,
  },
  {
    id: 4,
    href: IframeLinkEnum.OSPORT,
    img: SPORT_ITEM_IMG.Sport4,
    imgMb: SPORT_ITEM_IMG.Sport4Mb,
    title: 'Saba-Sports',
    content: 'Thể thao Châu Âu',
    shape: SPORT_SHAPE_IMG.Sport4,
  },
];

export const SPORT_GAMES_HOME = [
  {
    id: 1,
    href: IframeLinkEnum.KSport,
    img: SPORT_ITEM_IMG.HomeKSport,
    logo: SPORT_ITEM_IMG.KsportLogo,
    title: 'K - Sports',
    content: 'Những trận đấu đỉnh cao',
  },
  {
    id: 2,
    href: IframeLinkEnum.OSPORT,
    img: SPORT_ITEM_IMG.HomeKSabaSport,
    logo: SPORT_ITEM_IMG.SabaLogo,
    title: 'SABA - Sports',
    content: 'Kèo cược hấp dẫn, lôi cuốn',
  },
];

export const ESPORTS_GAMES = [
  {
    id: 1,
    href: IframeLinkEnum.SABA_E,
    img: SPORT_ITEM_IMG.Esport1,
    imgMb: SPORT_ITEM_IMG.Esport1Mb,
    title: 'Saba',
    content: 'Thể loại đa dạng',
    requireLogin: true,
  },
  {
    id: 2,
    href: IframeLinkEnum.IM_E,
    img: SPORT_ITEM_IMG.Esport2,
    imgMb: SPORT_ITEM_IMG.Esport2Mb,
    title: 'IM',
    content: 'Tỷ lệ cược hấp dẫn',
    requireLogin: true,
  },
];

export const VIRTUAL_SPORTS = [
  {
    id: VirtualSportId.Saba,
    href: IframeLinkEnum.SABA_VIRTUAL,
    img: SPORT_ITEM_IMG.Virtual1,
    imgMb: SPORT_ITEM_IMG.Virtual1Mb,
    title: 'SABA',
    content: 'Đa dạng thể loại',
    shape: SPORT_SHAPE_IMG.VirtualShapeLeft,
    model: SPORT_MODEL_IMG.Virtual1,
    requireLogin: true,
  },
  {
    id: VirtualSportId.Inplay,
    href: IframeLinkEnum.INPLAY,
    img: SPORT_ITEM_IMG.Virtual2,
    imgMb: SPORT_ITEM_IMG.Virtual2Mb,
    title: 'IM',
    content: 'Trận đấu đỉnh cao',
    shape: SPORT_SHAPE_IMG.VirtualShapeRight,
    model: SPORT_MODEL_IMG.Virtual2,
    requireLogin: true,
  },
  {
    id: VirtualSportId.Ksport,
    href: IframeLinkEnum.KSPORT_VIRTUAL,
    img: SPORT_ITEM_IMG.Virtual3,
    imgMb: SPORT_ITEM_IMG.Virtual3Mb,
    title: 'k-Sports',
    content: 'Hấp dẫn hàng đầu',
    shape: SPORT_SHAPE_IMG.VirtualShapeLeft,
    model: SPORT_MODEL_IMG.Virtual3,
    requireLogin: true,
  },
  {
    id: VirtualSportId.Pragmatic,
    href: IframeLinkEnum.PRAGMATIC_VIRTUAL,
    img: SPORT_ITEM_IMG.Virtual4,
    imgMb: SPORT_ITEM_IMG.Virtual4Mb,
    title: 'Pragmatic',
    content: 'Trải nghiệm công nghệ',
    shape: SPORT_SHAPE_IMG.VirtualShapeRight,
    model: SPORT_MODEL_IMG.Virtual4,
    requireLogin: true,
  },
];
