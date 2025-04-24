import type { PropsWithChildren } from 'react';
import LobbyBanner from '@/containers/desktop/lobby/elements/LobbyBanner';
import { getBigWins } from '@/services';

export const revalidate = 60;
export const dynamic = 'auto';

const CasinoLayout = async ({ children }: PropsWithChildren) => {
  const bigWins = await getBigWins();
  return (
    <main className="w-full min-h-[calc(100vh-100px)] lobby-page lobby-casino  bg-white lg:pb-10">
      <LobbyBanner bigWins={bigWins} isCasino />
      {children}
    </main>
  );
};

export default CasinoLayout;
