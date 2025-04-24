import { TrackingEvent } from '@/components/TrackingEvent';
import { ModalIdEnum, RouterPathEnum } from '@/enums';
import { getUser } from '@/utils/user';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const user = await getUser();

  return (
    <div
      id="iframe-lode"
      className="relative min-h-[calc(100dvh-122px-397px)] flex flex-col items-center justify-center"
      key={user?.tp_token}
    >
      <TrackingEvent
        gameId="lo-de-3-mien"
        gameType="lode"
        gameName="lo-de-3-mien"
      />
      <div id="lode-iframe" className="is-hidden w-full">
        {/* eslint-disable-next-line ts/ban-ts-comment */}
        {/* @ts-expect-error */}
        <c2-lode3m
          token={user?.tp_token}
          color="#009349"
          login={`/?openModal=${ModalIdEnum.Login}&returnUrl=${RouterPathEnum.LoDe3Mien}`}
        />
      </div>
      <Script src="https://assets.vgjt.info/js/ld3m.js" type="module" />
    </div>
  );
};

export default Page;
