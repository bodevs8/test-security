import type { PropsWithChildren } from 'react';
import LobbyBanner from '@/containers/desktop/lobby/elements/LobbyBanner';
import { getBigWins } from '@/services';

const LobbyLayout = async ({ children }: PropsWithChildren) => {
  const bigWins = await getBigWins();

  return (
    <main className="w-full min-h-[calc(100vh-114px)] lg:min-h-[calc(100vh-120px)] lobby-page bg-white lg:pb-10">
      <LobbyBanner bigWins={bigWins} />
      {children}
    </main>
  );
};

export default LobbyLayout;
