import { BaseBreadcrumb } from '@/components/BaseBreadcrumb';
import { DATE_FORMAT_YMD, VN_TIMEZONE } from '@/constant/constants';
import { GameCategoryEnum } from '@/enums';
import { RouterPathEnum } from '@/enums/app';
import { getCity, getResult } from '@/services';
import { formatDate } from '@/utils/date';
import Banner from './elements/Banner';
import BigWin from './elements/BigWin';

import LobbyTypeClient from './elements/LobbyTypeClient';
import NextRound from './elements/NextRound';
import Result from './elements/Result';
import ResultMobile from './elements/ResultMobile';
import TopWin from './elements/TopWin';
import '@/styles/pages/lottery/index.scss';

const LotteryContainer = async () => {
  const city = await getCity();
  const now = new Date();
  const VNTimezone = new Date(
    now.toLocaleString('en-US', { timeZone: VN_TIMEZONE }),
  );
  const currentHour = VNTimezone.getHours();
  // Todo
  const date = new Date();
  if (currentHour < 19) {
    date.setDate(date.getDate() - 1);
  }
  const result =
    city && city[0]?.id
      ? await getResult({
          city: city[0].id,
          date: formatDate(date, DATE_FORMAT_YMD),
        })
      : { result: {} };
  return (
    <div className="x-container">
      <div className="py-6">
        <BaseBreadcrumb
          className="mb-6"
          items={[
            {
              labelKey: 'Common.menu.home',
              href: RouterPathEnum.Home,
            },
            {
              labelKey: 'Pages.Lottery.title',
              href: RouterPathEnum.Lottery,
            },
          ]}
        />
        <div className="lobby-lottery">
          <LobbyTypeClient
            requestParams={{ type: GameCategoryEnum.Lottery }}
            loading={false}
          />
        </div>

        <Banner />
        <div className="flex gap-4 md:gap-6 mt-4 md:mt-6 flex-col lg:flex-row mb-6">
          <BigWin />
          <TopWin />
        </div>
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
          <div className="w-full xl:w-[846px]">
            <ResultMobile city={city} initResult={result} />
            <Result city={city} initResult={result} />
          </div>
          <div className="w-full xl:w-[426px]">
            <NextRound />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryContainer;
