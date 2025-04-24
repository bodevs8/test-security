'use client';

import { TrackingEvent } from '@/components/TrackingEvent';
import { Button } from '@/components/ui/button';
import {
  ButtonVariantsEnum,
  IframeLinkEnum,
  ModalIdEnum,
  RouterPathEnum,
} from '@/enums';
import { useModalStore, useUserStore } from '@/hooks/stores';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  iframeUrl?: string;
  slug?: string;
};

export const IframeSports = ({ className, iframeUrl, slug }: Props) => {
  const isSabaSports = slug === IframeLinkEnum.OSPORT.slice(1);
  const isLoDe = `/${slug}` === RouterPathEnum.LoDeSieuToc;
  const { isLoggedIn } = useUserStore((state) => state);
  const modalStore = useModalStore((state) => state);

  const handleClickIframe = () => {
    if (!isLoggedIn) {
      modalStore.openModal(ModalIdEnum.Login);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-142px)]">
      {isSabaSports && !isLoggedIn && (
        <Button
          className="absolute top-0 left-0 w-full h-full z-10"
          onClick={handleClickIframe}
          id="iframe-sports"
          name="iframe-sports"
          variant={ButtonVariantsEnum.Transparent}
        />
      )}
      <TrackingEvent
        gameId={slug!}
        gameType={isLoDe ? 'lode' : 'sport'}
        gameName={slug!}
      />
      <iframe
        src={iframeUrl}
        title={slug}
        className={cn('w-full h-full', className)}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};
