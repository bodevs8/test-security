export type LotteryCity = {
  id: number;
  name: string;
  status: number;
  time_release: string;
};

export type LotteryBannerType = {
  title: string;
  description: string;
  image: string;
  imageMb: string;
  link: string;
  apiUrl?: string;
};
