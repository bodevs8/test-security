'use client';

import type { CategoryTypeEnum, SizeEnum } from '@/enums';
import type { TypeGameItem } from '@/types/game';
import { AnimateNumber } from '@/components/AnimateNumber';
import LiveStreamVideo from '@/components/LiveStreamVideo';
import { Tag } from '@/components/Tag';
import { ButtonSizeEnum, ButtonVariantsEnum } from '@/enums';
import { useGameContext, useSocketContext } from '@/hooks/contexts';
import { useDevice } from '@/hooks/utils';
import {
  providerIconMapping,
  providerImageMapping,
  providerNameMapping,
} from '@/utils/game';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo, useCallback, useMemo, useState, useTransition } from 'react';
import { Button } from '../ui/button';

type Props = {
  game: TypeGameItem;
  containerClass?: string;
  aspectRatioClass?: string;
  imgClass?: string;
  isLiveCasino?: boolean;
  hideFavorite?: boolean;
  hideJackpot?: boolean;
  hideProvider?: boolean;
  hideGameName?: boolean;
  onUnfavoriteItem?: (item: TypeGameItem) => void;
  tagType?: CategoryTypeEnum;
  rankingNumber?: number | null;
  rankingClass?: string;
  gameHoverClass?: string;
  tagSize?: SizeEnum;
  priority?: boolean;
  providerIconClassName?: string;
  providerNameClassName?: string;
};

const GameProvider = memo(
  ({
    providerIcon,
    providerName,
    providerImage,
    hidden,
    providerIconClassName,
    providerNameClassName,
  }: {
    providerIcon: string;
    providerName?: string;
    providerImage?: string;
    hidden: boolean;
    providerIconClassName?: string;
    providerNameClassName?: string;
  }) => {
    if (hidden) return null;

    return (
      <div
        className="game-provider !w-auto z-40 rounded-b-[6px] flex items-center justify-center gap-[1px] md:gap-[2px] absolute top-1 left-[50%] px-0.5 md:px-3 h-4 2xl:h-5 md:h-7 overflow-hidden group-hover:opacity-0 transition-opacity"
        style={{
          transform: 'translateX(-50%)',
        }}
      >
        {providerImage && (
          <Image
            src={providerImage}
            width={20}
            height={20}
            alt={providerName ?? providerIcon}
            className="w-4 md:w-5"
          />
        )}{' '}
        {!providerImage && (
          <i
            className={clsx(
              `icon-provider-${providerIcon}`,
              'text-white text-xs md:!text-base lg:!text-base 2xl:!text-[18px]',
              providerIconClassName,
            )}
          />
        )}
        <span
          className={clsx(
            'text-white uppercase font-bold text-[7px] leading-[9px] md:text-[8px] md:leading-[10px] lg:text-[10px] 2xl:!text-[10px] whitespace-nowrap',
            providerNameClassName,
          )}
        >
          {providerName}
        </span>
      </div>
    );
  },
);

export const GameItem = memo(
  ({
    game,
    containerClass = '',
    imgClass = '',
    aspectRatioClass = '',
    hideFavorite = false,
    hideJackpot = false,
    hideProvider = false,
    hideGameName = false,
    tagSize,
    tagType,
    rankingNumber,
    rankingClass,
    gameHoverClass,
    priority,
    providerIconClassName,
    providerNameClassName,
    onUnfavoriteItem,
  }: Props) => {
    const t = useTranslations();
    const gameContext = useGameContext();
    const socketContext = useSocketContext();
    const { isMobile } = useDevice();
    const [isFavorite, setIsFavorite] = useState(game.is_favorite);
    const [isPending, startTransition] = useTransition();
    const IMAGE_CONFIG = {
      default: '/images/games/default.webp',
      dimensions: { width: 215, height: 320 },
      alt: `background game ${game?.name} ${game?.partner_provider}`,
    } as const;
    const providerIcon = useMemo(
      () => providerIconMapping(game.partner_provider),
      [game.partner_provider],
    );
    const providerImage = useMemo(() => {
      const image = providerImageMapping(game.partner_provider);
      return typeof image === 'object' ? image.default : '';
    }, [game.partner_provider]);
    const providerName = useMemo(
      () =>
        game?.partner_provider
          ? providerNameMapping(game?.partner_provider || '')
          : game?.partner_txt || '',
      [game?.partner_txt, game?.partner_provider],
    );
    const favouriteId = useMemo(
      () => `favorite-${game?.partner_provider}${game?.partner_game_id}`,
      [game.partner_provider, game.partner_game_id],
    );

    const gameTag = useMemo(
      () => tagType || game.tags || '',
      [tagType, game?.tags],
    );

    const jackpotNumber = useMemo(() => {
      if (hideJackpot) {
        return undefined;
      }

      return socketContext.jackpots[game.partner_game_id!];
    }, [socketContext.jackpots, game.partner_game_id, hideJackpot]);

    const showTag = !rankingNumber && gameTag;
    const isLive = useMemo(() => {
      return game.tags?.includes('live');
    }, [game.tags]);

    const handleImageError = useCallback(() => {
      if (isMobile) {
        game.image_mobile = IMAGE_CONFIG.default;
      } else {
        game.image = IMAGE_CONFIG.default;
      }
    }, [isMobile, game, IMAGE_CONFIG.default]);

    const handleGameClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        gameContext.openGame(game);
      },
      [game, gameContext],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          gameContext.openGame(game);
        }
      },
      [game, gameContext],
    );

    const handleFavorite = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        startTransition(async () => {
          try {
            const action = isFavorite
              ? gameContext.unfavoriteGame
              : gameContext.favoriteGame;
            await action(game);
            if (isFavorite) {
              onUnfavoriteItem?.(game);
            }

            setIsFavorite(!isFavorite);
          } catch (error) {
            console.error(error);
          }
        });
      },
      [game, gameContext, isFavorite, onUnfavoriteItem],
    );

    return (
      <div
        className={clsx(
          'game-item group cursor-pointer relative rounded-[6px] md:rounded-[6px] overflow-hidden group',
          containerClass,
        )}
      >
        <div
          className={clsx(
            'relative aspect-[114/149] md:aspect-[168/221]',
            aspectRatioClass,
          )}
          onClick={handleGameClick}
        >
          <picture>
            <source
              media="(max-width: 767.5px)"
              srcSet={game.image_mobile! as string}
            />
            <source media="(min-width: 768px)" srcSet={game.image! as string} />
            <img
              src={game.image! as string}
              className={clsx(
                'object-cover aspect-[114/149] md:aspect-[168/221] w-full',
                imgClass,
              )}
              alt={IMAGE_CONFIG.alt}
              onError={handleImageError}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'low'}
            />
          </picture>
          {isLive && (
            <LiveStreamVideo
              id={game.partner_game_id as number}
              title={game.name!}
              icon={providerIcon}
              img={game.image!}
              imgMobile={game.image_mobile!}
              partner_provider={game.partner_provider!}
              partner_game_id={game.partner_game_id as string}
              isPlaying={false}
              isDisabled={false}
              bgUrl={game.image!}
              hideInfo
              className="group-hover:hidden"
              autoPlay
              onClick={handleGameClick}
            />
          )}
          <GameProvider
            providerIcon={providerIcon}
            providerName={providerName}
            providerImage={providerImage}
            hidden={hideProvider}
            providerIconClassName={providerIconClassName}
            providerNameClassName={providerNameClassName}
          />
        </div>
        <div
          className={clsx(
            'absolute z-10 top-0 left-0 w-full h-full rounded-[6px] game-hover transition-all opacity-0 group-hover:opacity-100 group-hover:bg-black/50 group-hover:backdrop-blur-[15px]',
            gameHoverClass,
            {
              hidden: isMobile,
            },
          )}
          onClick={handleGameClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={`Play ${game?.name}`}
        >
          {!hideGameName && (
            <div className="mt-[27%] w-[calc(100%-16px)] -translate-x-1/2 left-[50%] text-center px-2 font-bold text-[16px] leading-6 text-white line-clamp-2 capitalize text-ellipsis overflow-hidden relative z-[3]">
              {game?.name?.toLocaleLowerCase()}
            </div>
          )}
          <div
            className="absolute top-1/2 left-1/2 flex items-center justify-center aspect-[52/52] w-[24.26%] max-w-[52px] rounded-full play-icon"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <Button
              id={`play-game-${game.partner_game_id}`}
              name={`play-game-${game.partner_game_id}`}
              variant={ButtonVariantsEnum.Secondary}
              className="capitalize"
              size={ButtonSizeEnum.SM}
            >
              {t('Common.button.play_now')}
            </Button>
          </div>
        </div>
        {rankingNumber && (
          <div
            className={clsx(
              'absolute z-[0] left-0 top-0 rounded-tl-[12px] rounded-br-[16px] w-[22%] h-[11.9%] md:w-[18.6%] md:h-[10%] flex items-center justify-center game-ranking',
              `game-ranking-${rankingNumber}`,
              rankingClass,
            )}
          >
            <Image
              src={`/images/games/ranking/${rankingNumber}.webp`}
              alt="ranking number"
              width={24}
              height={24}
              loading="lazy"
              className="z-[1] !w-full !h-full aspect-[24/24]"
            />
          </div>
        )}
        {showTag && (
          <div className="absolute z-[0] left-[2px] top-0 md:left-[6px] md:top-0">
            {isLive && (
              <div className="p-[1px] md:p-[3px] bg-[#47567080] rounded-[6px]">
                <Image
                  src="/icons/live-icon.svg"
                  alt="live icon"
                  width={14}
                  height={14}
                  loading="lazy"
                  className="animate-live-icon size-3 md:size-[14px]"
                />
              </div>
            )}
            {!isLive && gameTag && (
              <Tag type={gameTag as CategoryTypeEnum} size={tagSize} />
            )}
          </div>
        )}

        {!hideFavorite && (
          <div
            id={favouriteId}
            className="absolute z-[42] right-1 md:right-[6px] top-1.5"
          >
            <button
              type="button"
              className={isPending ? 'pointer-events-none ' : 'cursor-pointer'}
              onClick={handleFavorite}
            >
              {isFavorite && (
                <Image
                  src="/images/games/favorite.webp"
                  alt="unfavorite"
                  width={20}
                  height={20}
                  className="w-4 md:w-5 object-cover aspect-square"
                />
              )}{' '}
              {!isFavorite && (
                <Image
                  src="/images/games/unfavorite.webp"
                  alt="unfavorite"
                  width={20}
                  height={20}
                  className="w-4 md:w-5 object-cover aspect-square"
                />
              )}
            </button>
          </div>
        )}
        {!hideJackpot && jackpotNumber && (
          <div
            className={clsx(
              'recommended__suggest-game-jackbot absolute z-[2] bottom-0 right-1/2 transform translate-x-1/2',
              'px-3 py-0.5 md:py-1 rounded-t-md md:rounded-t-md game-jackpot bg-dark-400-50 backdrop-blur-[20px]',
              'text-yellow-400 text-[10px] leading-[14px] md:text-[12px] md:leading-[17px] font-bold  whitespace-nowrap',
            )}
          >
            <AnimateNumber to={jackpotNumber!} className="" unit="D" />
          </div>
        )}
      </div>
    );
  },
);

GameItem.displayName = 'GameItem';
