import { TrackingEvent } from '@/components/TrackingEvent';
import { ModalIdEnum } from '@/enums';
import { getDeviceInfo } from '@/utils/device';
import { getUser } from '@/utils/user';
import clsx from 'clsx';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const user = await getUser();
  const { isMobile, isIpad } = await getDeviceInfo();

  return (
    <div
      id="iframe-lode"
      className={clsx(
        'lg:z-0 lg:mt-[86px] relative min-h-[calc(100dvh-122px-397px)] flex flex-col items-center justify-center',
        {
          'mobile-ui': isMobile || isIpad,
        },
      )}
      key={user?.tp_token}
    >
      <div id="lode-iframe" className="is-hidden w-full">
        <TrackingEvent
          gameId="lo-de-md5"
          gameType="lode"
          gameName="lo-de-md5"
        />
        {/* eslint-disable-next-line ts/ban-ts-comment */}
        {/* @ts-expect-error */}
        <c2-ldmd5
          token={user?.tp_token}
          color="#009349"
          login={`/?openModal=${ModalIdEnum.Login}&returnUrl=/lo-de-md5`}
        />
      </div>
      <Script src="https://assets.vgjt.info/js/ldmd5.js" type="module" />
    </div>
  );
};

export default Page;
