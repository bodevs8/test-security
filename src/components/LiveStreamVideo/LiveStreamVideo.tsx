/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import type { LiveCasinoGame } from '@/types/game';
import type { StaticImageData } from 'next/image';
import { Tag } from '@/components/Tag';
import { Button } from '@/components/ui/button';
import { DATA_CASINO_KEY_MAP } from '@/constant/game';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  CategoryTypeEnum,
  LiveCasinoGameEnum,
} from '@/enums';
import { useGameContext, useSocketContext } from '@/hooks/contexts';
import { useLiveStream } from '@/hooks/livestream';
import IconsoundOff from '@/public/icons/sound-off.svg';
import IconsoundOn from '@/public/icons/sound-on.svg';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { randomNumber } from '@/utils/helpers';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type LiveStreamVideoProps = {
  autoPlay?: boolean;
  prefix?: string;
  bgUrl: string | StaticImageData;
  hideInfo?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export type LiveStreamVideoRef = {
  handlePlayPause: () => void;
  handleOnOffSpeaker: () => void;
  videoElement: HTMLVideoElement | null;
};

const LiveStreamVideo = (props: LiveCasinoGame & LiveStreamVideoProps) => {
  const { verifyToken, obPlayers, handleMute, handlePlay } = useLiveStream();
  const socketContext = useSocketContext();
  const mounted = useRef(false);
  const INIT_VIEWS = 0;
  const MIN_ACTIVE_USERS = 1291;
  const MAX_ACTIVE_USERS = 3232;
  const DEFAUL_JACKPOT_NUMBER = 1729271281;

  const [randomJackpot, setRandomJackpot] = useState<{
    [key: string]: {
      activeUsers: number;
    };
  }>({});

  const jackpotNumber = useMemo(() => {
    return (
      socketContext.jackpots[props.partner_game_id!] ||
      socketContext.jackpots[
        `${props.partner_provider}_${props.partner_game_id}`
      ] ||
      0
    );
  }, [socketContext.jackpots, props.partner_game_id, props.partner_provider]);

  const b52Views = useMemo(
    () => socketContext.b52Jackpot,
    [socketContext.b52Jackpot],
  );

  const goViews = useMemo(
    () => socketContext.goJackpot,
    [socketContext.goJackpot],
  );

  const gameContext = useGameContext();
  const t = useTranslations();
  const tokenMap = new Map<string, { id: string; key: string }>(
    DATA_CASINO_KEY_MAP,
  );
  const liveCasinoKey = useMemo(
    () => `${props.partner_provider}_${props.partner_game_id}`,
    [props.partner_provider, props.partner_game_id],
  );

  const getActiveUsers = () => {
    if (liveCasinoKey.startsWith(LiveCasinoGameEnum.B52)) {
      const activeUsers = b52Views?.[props.partner_game_id]?.activeUsers;
      if (activeUsers) return activeUsers;
    }
    if (liveCasinoKey.startsWith(LiveCasinoGameEnum.Go)) {
      const activeUsers = goViews?.[props.partner_game_id]?.activeUsers;
      if (activeUsers) return activeUsers;
    }
    if (randomJackpot?.[liveCasinoKey]) {
      return (
        (randomJackpot?.[liveCasinoKey]?.activeUsers ?? 0) +
        randomNumber(MIN_ACTIVE_USERS, MAX_ACTIVE_USERS)
      );
    }
    return undefined;
  };

  const generateRandomActiveUsers = () => {
    if (!b52Views) return randomNumber(MIN_ACTIVE_USERS, MAX_ACTIVE_USERS);

    const randomGameId =
      Object.keys(b52Views)[
        Math.floor(Math.random() * Object.keys(b52Views).length)
      ];
    const baseActiveUsers =
      b52Views[randomGameId as keyof typeof b52Views]?.activeUsers || 0;
    return randomNumber(MIN_ACTIVE_USERS, MAX_ACTIVE_USERS) + baseActiveUsers;
  };

  const views = useMemo(() => {
    const activeUsers = getActiveUsers();
    if (activeUsers !== undefined) {
      return activeUsers;
    }
    return mounted.current ? generateRandomActiveUsers() : INIT_VIEWS;
  }, [liveCasinoKey, mounted.current]);

  useEffect(() => {
    const activeUsers = getActiveUsers();
    if (activeUsers === undefined) {
      setRandomJackpot((prevState) => {
        if (!prevState) return { [liveCasinoKey]: { activeUsers: views } };
        return { ...prevState, [liveCasinoKey]: { activeUsers: views } };
      });
    }
  }, [views, liveCasinoKey]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  // set up player
  async function RunLivestream() {
    const tokenInfo = tokenMap.get(liveCasinoKey);
    if (tokenInfo) {
      setTimeout(() => {
        const payload = {
          tokenInfo,
          divId: liveCasinoKey,
          groupId: tokenInfo.id,
          streamName: tokenInfo.key,
          site: window.location.hostname,
          options: {
            playback: {
              autoplay: props.autoPlay,
              automute: true,
              muted: true,
              faststart: true,
            },
            style: {
              controls: false,
              fullScreenControl: false,
              interactive: true,
              poster:
                typeof props.bgUrl === 'string'
                  ? props.bgUrl
                  : (props.bgUrl as StaticImageData).src,
              buttonCursor: 'pointer',
              scaling: 'crop',
              view: false,
              width: 'auto',
              height: 'auto',
            },
          },
        };
        verifyToken(payload);
      }, 2000);
    }
  }

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SHOW_LIVE_STREAM_VIDEO === 'true') {
      RunLivestream();
    }
    return () => {
      if (obPlayers) {
        obPlayers.player?.destroy();
      }
    };
  }, [liveCasinoKey]);

  return (
    <div
      className={clsx('absolute inset-0', props.className)}
      onClick={props.onClick}
    >
      {!props.hideInfo && (
        <>
          <div
            className={clsx(
              'absolute top-3 left-6 flex items-center gap-1 z-49 py-1 px-2 rounded-[12px]',
              obPlayers && 'bg-black/30',
            )}
          >
            <div
              className={clsx(
                'py-[2px] rounded-[16px] flex items-center gap-[5px]',
              )}
            >
              {obPlayers && (
                <div
                  className={clsx(
                    'w-[5px] h-[5px] rounded-full',
                    obPlayers?.isPlaying ? 'bg-white' : 'bg-primary-light-400',
                  )}
                />
              )}
              <span
                className={clsx(
                  'text-white text-xs leading-[14px] font-normal',
                )}
              >
                {views > 0 ? views : ''}
              </span>
            </div>
          </div>

          <div className="absolute top-3 right-6 z-49">
            <Tag
              type={CategoryTypeEnum.Live}
              className="w-[47px] h-[18px] !rounded-[12px] text-[10px] leading-[140%] text-white"
            />
          </div>
        </>
      )}
      {/* Vertically centered title */}
      {!props.hideInfo && !obPlayers && (
        <div
          className="absolute left-6 top-1/2 bottom-10 md:bottom-2 flex flex-col z-48"
          style={{
            transform: 'translateY(-50%)',
          }}
        >
          <span className="font-bold text-navy-blue-300 text-[24px] md:text-[20px] leading-[140%] uppercase whitespace-pre">
            {props.title}
          </span>
        </div>
      )}

      {!props.hideInfo && (
        <>
          <div className="absolute bottom-4 right-6 cursor-pointer z-49">
            <Button
              id="play-now-button"
              name="play-now-button"
              className="w-[104px] h-10 font-medium text-base leading-[140%] capitalize"
              size={ButtonSizeEnum.SM}
              onClick={() =>
                gameContext.openGame({ ...props, img: props.img as string })
              }
              variant={ButtonVariantsEnum.Secondary}
            >
              {t('Common.button.play_now')}
            </Button>
          </div>
          <div className="absolute bottom-4 left-6 z-48">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-white text-base font-bold leading-[140%] uppercase">
                {props.title}
              </span>
              {!obPlayers ? (
                <></>
              ) : (
                <Image
                  src={obPlayers?.isMuted ? IconsoundOn : IconsoundOff}
                  alt="sound icon"
                  width={20}
                  height={20}
                  className="cursor-pointer size-5"
                  onClick={() => handleMute()}
                />
              )}
            </div>
            <div className="bg-dark-400-50 rounded-[100px] px-3 py-1 flex items-center justify-center text-yellow-400 font-medium text-base md:text-xs leading-[140%]">
              {formatNumberWithCommas(
                jackpotNumber > 0 ? jackpotNumber : DEFAUL_JACKPOT_NUMBER,
              )}
            </div>
          </div>
        </>
      )}

      {/* loader */}
      {obPlayers?.isLoading && <div className="live-stream-loader" />}
      <div
        id={liveCasinoKey}
        className="absolute w-auto cursor-pointer h-[103%] top-1/2 left-1/2 object-fill render-nano-player aspect-[16/9]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
        onClick={(e) => {
          props.onClick?.(e);
          handlePlay();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handlePlay();
            props.onClick?.(e as unknown as React.MouseEvent);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Play video"
      />
    </div>
  );
};

LiveStreamVideo.displayName = 'LiveStreamVideo';

export default LiveStreamVideo;
