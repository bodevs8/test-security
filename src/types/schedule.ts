export type ScheduleMatches = {
  competition_info: CompetitionInfo;
  season_info: SeasonInfo;
  events: Event[];
};

export type CompetitionInfo = {
  id: string;
  name: string;
  logo: string;
};

export type SeasonInfo = {
  id: string;
  name: string;
  logo: string;
  start_date: string;
  end_date: string;
  year: string;
  competition_id: string;
  has_player_stats: number;
  has_table: number;
  has_team_stats: number;
};

export type Event = {
  sport_event: SportEvent;
  sport_event_status: SportEventStatus;
  statistics: Statistics;
  order: number;
  odds?: Odds;
};

export type SportEvent = {
  id: string;
  start_time: string;
  start_time_confirmed: boolean;
  coverage: Coverage;
  competitors: Competitor[];
};

export type Coverage = {
  type: string;
  sport_event_properties: SportEventProperties;
};

export type SportEventProperties = {
  lineups: boolean;
  scores: string;
};

export type Competitor = {
  id: string;
  name: string;
  logo: string;
  country: string;
  country_logo: string;
  qualifier: string;
};

export type SportEventStatus = {
  status: string;
  match_status: string;
  home_score: number;
  away_score: number;
  period_scores: any[];
};

export type Statistics = {
  totals: Totals;
};

export type Totals = {
  competitors: Competitor2[];
};

export type Competitor2 = {
  id: string;
  name: string;
  logo: string;
  qualifier: string;
  statistics: Statistics2;
};

export type Statistics2 = {
  corner_kicks: number;
  red_cards: number;
  yellow_cards: number;
};

export type Odds = {
  m?: M[];
  ei: number;
  hi: number;
  hn: string;
  ai: number;
  an: string;
  hf: string;
  af: string;
  mc: number;
  et: string;
  tp: number;
  pt: number;
  ip: boolean;
  li: number;
  ln: string;
};

export type M = {
  o?: O[];
  ip?: boolean;
  mi?: number;
  prt?: number;
};

export type O = {
  shi: string;
  sai: string;
  soi: string;
  p: string;
  oh: Oh;
  oa: Oa;
  ml: boolean;
  sdi?: string;
  od?: Od;
};

export type Oh = {
  ma?: string;
  in?: string;
  de: string;
  hk?: string;
};

export type Oa = {
  ma?: string;
  in?: string;
  de: string;
  hk?: string;
};

export type Od = {
  de: string;
};

// competitions types

export type ScheduleCompetition = {
  competition_id: string;
  id: string;
  logo: string;
  name: string;
  order: number;
  year: string;
};
