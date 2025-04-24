import type { StaticImageData } from 'next/image';

import { GameProviderEnum } from '@/enums';
import Game789 from '@/public/images/providers/789club.webp';
import ApPlay from '@/public/images/providers/ap-play.webp';
import AskMe from '@/public/images/providers/askme.webp';
import B52 from '@/public/images/providers/b52.webp';
import Betradar from '@/public/images/providers/betradar.webp';
import BTI from '@/public/images/providers/bti.webp';
import CCGames from '@/public/images/providers/cc-games.webp';
import CQ9 from '@/public/images/providers/cq9.webp';
import DigMaan from '@/public/images/providers/digmaan.webp';
import DreamGaming from '@/public/images/providers/dreamgaming.webp';
import Ebet from '@/public/images/providers/ebet.webp';
import Esport from '@/public/images/providers/esport.webp';
import Evolution from '@/public/images/providers/evo.webp';
import Evoplay from '@/public/images/providers/evoplay.webp';
import Ezugi from '@/public/images/providers/ezugi.webp';
import FCChai from '@/public/images/providers/fc-chai.webp';
import GMW from '@/public/images/providers/gmw.webp';
import Go88 from '@/public/images/providers/go88.webp';
import Hacksaw from '@/public/images/providers/hacksaw.webp';
import Hananero from '@/public/images/providers/hananero.webp';
import HoGaming from '@/public/images/providers/hogaming.webp';
import IBC from '@/public/images/providers/ibc.webp';
import IMPlay from '@/public/images/providers/implay.webp';
import JDB from '@/public/images/providers/jdb.webp';
import Jili from '@/public/images/providers/jili.webp';
import KSport from '@/public/images/providers/k-sport.webp';
import KingMakerFull from '@/public/images/providers/kingmaker.webp';
import Livespin from '@/public/images/providers/livespin.webp';
import MSport from '@/public/images/providers/m-sport.webp';
import Microgaming from '@/public/images/providers/micro-gaming.webp';
import Netent from '@/public/images/providers/netent.webp';
import NoLimit from '@/public/images/providers/nolimit.webp';
import OGame from '@/public/images/providers/ogame.webp';
import PGSoft from '@/public/images/providers/pg-soft.webp';
import PlayNGo from '@/public/images/providers/play-ngo.webp';
import Pragmatic from '@/public/images/providers/pragmatic.webp';
import QTech from '@/public/images/providers/qtech.webp';
import RedTiger from '@/public/images/providers/red-tiger.webp';
import Relax from '@/public/images/providers/relax.webp';
import Rik from '@/public/images/providers/rik.webp';
import Saba from '@/public/images/providers/saba.webp';
import Sagaming from '@/public/images/providers/sagaming.webp';
import Spribe from '@/public/images/providers/spribe.webp';
import Sungame from '@/public/images/providers/sungame.webp';
import TechPlay from '@/public/images/providers/techplay.webp';
import Vivo from '@/public/images/providers/vivo.webp';

export const PROVIDERS_FILL_IMAGE: Record<
  GameProviderEnum,
  StaticImageData | undefined
> = {
  [GameProviderEnum.PGSoft]: PGSoft,
  [GameProviderEnum.Microgaming]: Microgaming,
  [GameProviderEnum.ApPlay]: ApPlay,
  [GameProviderEnum.FCChai]: FCChai,
  [GameProviderEnum.PlayNGo]: PlayNGo,
  [GameProviderEnum.Spribe]: Spribe,
  [GameProviderEnum.Hananero]: Hananero,
  [GameProviderEnum.Saba]: Saba,
  [GameProviderEnum.AskMe]: AskMe,
  [GameProviderEnum.BTI]: BTI,
  [GameProviderEnum.Esport]: Esport,
  [GameProviderEnum.Betradar]: Betradar,
  [GameProviderEnum.CCGames]: CCGames,
  [GameProviderEnum.CQ9]: CQ9,
  [GameProviderEnum.DigMaan]: DigMaan,
  [GameProviderEnum.DreamGaming]: DreamGaming,
  [GameProviderEnum.Ebet]: Ebet,
  [GameProviderEnum.Evoplay]: Evoplay,
  [GameProviderEnum.Ezugi]: Ezugi,
  [GameProviderEnum.GMW]: GMW,
  [GameProviderEnum.Hacksaw]: Hacksaw,
  [GameProviderEnum.HoGaming]: HoGaming,
  [GameProviderEnum.IBC]: IBC,
  [GameProviderEnum.Jili]: Jili,
  [GameProviderEnum.Livespin]: Livespin,
  [GameProviderEnum.MSport]: MSport,
  [GameProviderEnum.NoLimit]: NoLimit,
  [GameProviderEnum.OGame]: OGame,
  [GameProviderEnum.Playtech]: TechPlay,
  [GameProviderEnum.Pragmatic]: Pragmatic,
  [GameProviderEnum.Relax]: Relax,
  [GameProviderEnum.Sagaming]: Sagaming,
  [GameProviderEnum.Vivo]: Vivo,
  [GameProviderEnum.TechPlay]: TechPlay,
  [GameProviderEnum.IM]: IMPlay,
  [GameProviderEnum.JDB]: JDB,
  [GameProviderEnum.JDBGaming]: JDB,
  [GameProviderEnum.Netent]: Netent,
  [GameProviderEnum.AskMeLotto]: AskMe,
  [GameProviderEnum.AskMeBet]: AskMe,
  [GameProviderEnum.Go88]: Go88,
  [GameProviderEnum.Go]: Go88,
  [GameProviderEnum.Evolution]: Evolution,
  [GameProviderEnum.RedTiger]: RedTiger,
  [GameProviderEnum.QTech]: QTech,
  [GameProviderEnum.Mg]: Microgaming,
  [GameProviderEnum.Vingame]: TechPlay,
  [GameProviderEnum.InPlay]: IMPlay,
  [GameProviderEnum.Sungame]: Sungame,
  [GameProviderEnum.Game789]: Game789,
  [GameProviderEnum.Rik]: Rik,
  [GameProviderEnum.KingMakerFull]: KingMakerFull,
  [GameProviderEnum.KSport]: KSport,
  [GameProviderEnum.B52]: B52,
};
