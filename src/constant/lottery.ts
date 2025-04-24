import { ApiEndpointEnum } from '@/enums';
import { RouterPathEnum } from '@/enums/app';

export const BIG_WIN_DATA = [
  {
    username: 'hoanglong***',
    winlost: 4702272,
    winlost_txt: '4,702,272',
    region: 'south',
  },
  {
    username: 'trandinh***',
    winlost: 4645295,
    winlost_txt: '4,645,295',
    region: 'north',
  },
  {
    username: 'phanthanh***',
    winlost: 4246051,
    winlost_txt: '4,246,051',
    region: 'south',
  },
  {
    username: 'nguyenvan***',
    winlost: 3633982,
    winlost_txt: '3,633,982',
    region: 'central',
  },
  {
    username: 'dangtruong***',
    winlost: 2540896,
    winlost_txt: '2,540,896',
    region: 'south',
  },
  {
    username: 'phamvan***',
    winlost: 2249744,
    winlost_txt: '2,249,744',
    region: 'north',
  },
  {
    username: 'hoangminh***',
    winlost: 1946122,
    winlost_txt: '1,946,122',
    region: 'central',
  },
  {
    username: 'phamanh***',
    winlost: 1571186,
    winlost_txt: '1,571,186',
    region: 'central',
  },
  {
    username: 'tranduc***',
    winlost: 1509756,
    winlost_txt: '1,509,756',
    region: 'central',
  },
  {
    username: 'nguyenhung***',
    winlost: 1352133,
    winlost_txt: '1,352,133',
    region: 'north',
  },
];

export const TOP_WIN_DATA = [
  {
    name: 'Xổ Số Đồng Nai',
    username: 'hoanglong***',
    image: '/images/lottery/vn.webp',
    prize: 11952483,
    next_draw: '23:59:59',
    drawing: false,
    release_hour: '16:15',
    class: 'south',
    region: 'nam',
  },
  {
    name: 'Xổ Số Bắc Ninh',
    username: 'trandinh***',
    image: '/images/lottery/vn.webp',
    prize: 11742934,
    next_draw: '23:59:59',
    drawing: false,
    release_hour: '18:15',
    class: 'north',
    region: 'bac',
  },
  {
    name: 'Xổ Số Hà Nội',
    username: 'phanthanh***',
    image: '/images/lottery/vn.webp',
    prize: 11531286,
    next_draw: '23:59:59',
    drawing: false,
    release_hour: '18:15',
    class: 'north',
    region: 'bac',
  },
  {
    name: 'Xổ Số Hà Nam',
    username: 'nguyenvan***',
    image: '/images/lottery/vn.webp',
    prize: 10987623,
    next_draw: '23:59:59',
    drawing: false,
    release_hour: '18:15',
    class: 'north',
    region: 'bac',
  },
  {
    name: 'Xổ Số Hải Phòng',
    username: 'dangtruong***',
    image: '/images/lottery/vn.webp',
    prize: 10853491,
    next_draw: '23:59:59',
    drawing: false,
    release_hour: '18:15',
    class: 'north',
    region: 'bac',
  },
  {
    name: 'Xổ Số Hà Nội',
    username: 'phamvan***',
    image: '/images/lottery/vn.webp',
    prize: 10742138,
    next_draw: '23:59:59',
    drawing: true,
    release_hour: '18:15',
    class: 'north',
    region: 'bac',
  },
  {
    name: 'Xổ Số Hà Nội',
    username: 'hoangminh***',
    image: '/images/lottery/vn.webp',
    prize: 10523981,
    next_draw: '23:59:59',
    drawing: true,
    release_hour: '18:15',
    class: 'north',
    region: 'bac',
  },
  {
    name: 'Xổ Số Đà Nẵng',
    username: 'phamanh***',
    image: '/images/lottery/vn.webp',
    prize: 12568450,
    next_draw: '23:59:59',
    drawing: false,
    release_hour: '17:45',
    class: 'center',
    region: 'trung',
  },
];

export const LODE_REGION_DATA = [
  {
    id: 1,
    name: 'next_round.north',
    class: 'north',
    release_hour: '18:15',
    type: 1,
    subtract: 23,
  },
  {
    id: 2,
    name: 'next_round.central',
    class: 'central',
    release_hour: '17:15',
    type: 1,
    subtract: 43,
  },
  {
    id: 3,
    name: 'next_round.south',
    class: 'south',
    release_hour: '16:15',
    type: 1,
    subtract: 12,
  },
  {
    id: 4,
    name: 'next_round.super_fast',
    class: 'north',
    release_hour: '16:15',
    type: 2,
    subtract: 60,
  },
];

export const LOTTERY_BANNER = [
  {
    title: 'lo_de_ba_mien.title',
    description: 'lo_de_ba_mien.description',
    image: '/images/lottery/banner/lo-de-3-mien.webp',
    imageMb: '/images/lottery/banner/lo-de-3-mien-mb.webp',
    link: RouterPathEnum.LoDe3Mien,
    apiUrl: ApiEndpointEnum.IframeLoDe3Mien,
  },
  {
    title: 'lo_de_sieu_toc.title',
    description: 'lo_de_sieu_toc.description',
    image: '/images/lottery/banner/lo-de-sieu-toc.webp',
    imageMb: '/images/lottery/banner/lo-de-sieu-toc-mb.webp',
    link: RouterPathEnum.LoDeSieuToc,
    apiUrl: ApiEndpointEnum.IframeLoDeSieuToc,
  },
  {
    title: 'lo_de_md5.title',
    description: 'lo_de_md5.description',
    image: '/images/lottery/banner/lo-de-md5.webp',
    imageMb: '/images/lottery/banner/lo-de-md5-mb.webp',
    link: RouterPathEnum.LoDeMd5,
  },
];

export const LOTTERY_TYPE_OPTIONS = [
  {
    label: 'result.filter.full_number',
    value: 'all',
  },
  {
    label: 'result.filter.last_2_number',
    value: 2,
  },
  {
    label: 'result.filter.last_3_number',
    value: 3,
  },
];
export const LOTTERY_DATE_FORMAT_API = 'DD-MM-YYYY';
