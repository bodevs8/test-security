'use client';

import type { RequestParams } from '@/types/game';
import LobbyType from '../../lobby/elements/LobbyType';

type LobbyTypeClientProps = {
  requestParams: RequestParams;
  loading: boolean;
};

export default function LobbyTypeClient({
  requestParams,
  loading,
}: LobbyTypeClientProps) {
  return <LobbyType requestParams={requestParams} loading={loading} />;
}
