'use client';

import type { UseEmblaCarouselType } from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import {
  ButtonSizeEnum,
  ButtonVariantsEnum,
  EmblaCarouselOrientationEnum,
} from '@/enums';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';

import * as React from 'react';
import { useMemo } from 'react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.use(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  const contextValue = useMemo(
    () => ({
      carouselRef,
      api,
      opts,
      orientation:
        orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
      scrollPrev,
      scrollNext,
      scrollTo,
      canScrollPrev,
      canScrollNext,
      selectedIndex,
    }),
    [
      carouselRef,
      api,
      opts,
      orientation,
      scrollPrev,
      scrollNext,
      scrollTo,
      canScrollPrev,
      canScrollNext,
      selectedIndex,
    ],
  );

  return (
    <CarouselContext value={contextValue}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext>
  );
}

function CarouselContent({
  containerClassName,
  className,
  ...props
}: React.ComponentProps<'div'> & { containerClassName?: string }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn('overflow-hidden', containerClassName)}
      data-slot="carousel-content"
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({
  className,
  index,
  ...props
}: React.ComponentProps<'div'> & { index: number }) {
  const { orientation, selectedIndex } = useCarousel();
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn('min-w-0 shrink-0 grow-0', className, {
        'pt-4': orientation !== EmblaCarouselOrientationEnum.Horizontal,
        'embla-slide-active': index === selectedIndex,
      })}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = ButtonVariantsEnum.Outline,
  size = ButtonSizeEnum.Icon,
  iconClassName,
  ...props
}: React.ComponentProps<typeof Button> & { iconClassName?: string }) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <i
        className={cn(
          'icon-arrow-left text-[16px] before:!text-icon-quinary',
          !canScrollPrev && 'before:!text-icon-quaternary',
          iconClassName,
        )}
      />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = ButtonVariantsEnum.Outline,
  size = ButtonSizeEnum.Icon,
  iconClassName,
  ...props
}: React.ComponentProps<typeof Button> & { iconClassName?: string }) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'relative size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <i
        className={cn(
          'icon-arrow-right text-[16px] before:!text-icon-quinary',
          !canScrollNext && 'before:!text-icon-quaternary',
          iconClassName,
        )}
      />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function CarouselPagination({
  className,
  variant,
  size,
  dotClassName,
  selectedDotClassName,
  dynamicBullets = false,
  ...props
}: React.ComponentProps<typeof Button> & {
  dotClassName?: string;
  selectedDotClassName?: string;
  dynamicBullets?: boolean;
}) {
  const { scrollTo, api, selectedIndex } = useCarousel();

  const renderDots = () => {
    const totalSlides = api?.scrollSnapList()?.length || 0;

    if (!dynamicBullets) {
      return api
        ?.scrollSnapList()
        ?.map((_, index) => (
          <PaginationDot
            key={index}
            index={index}
            isActive={index === selectedIndex}
            onDotClick={() => scrollTo(index)}
            variant={variant || ButtonVariantsEnum.Outline}
            size={size || ButtonSizeEnum.Icon}
            dotClassName={dotClassName}
            selectedDotClassName={selectedDotClassName}
            {...props}
          />
        ));
    }

    if (totalSlides <= 4) {
      return Array.from({ length: totalSlides }).map((_, index) => {
        return (
          <PaginationDot
            key={index}
            index={index}
            isActive={index === selectedIndex}
            onDotClick={() => scrollTo(index)}
            variant={variant || ButtonVariantsEnum.Outline}
            size={size || ButtonSizeEnum.Icon}
            dotClassName={dotClassName}
            selectedDotClassName={selectedDotClassName}
            {...props}
          />
        );
      });
    }

    // Show only 4 fixed dots
    const calculateStartIndex = () => {
      if (selectedIndex > totalSlides - 3) {
        return totalSlides - 4;
      }
      if (selectedIndex === 0) {
        return 0;
      }
      return selectedIndex - 1;
    };

    const startIndex = calculateStartIndex();

    return Array.from({ length: 4 }).map((_, index) => {
      const dotIndex = startIndex + index;
      return (
        <PaginationDot
          key={dotIndex}
          index={dotIndex}
          isActive={selectedIndex === dotIndex}
          onDotClick={() => scrollTo(dotIndex)}
          variant={variant || ButtonVariantsEnum.Outline}
          size={size || ButtonSizeEnum.Icon}
          dotClassName={dotClassName}
          selectedDotClassName={selectedDotClassName}
          {...props}
        />
      );
    });
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {renderDots()}
    </div>
  );
}

function PaginationDot({
  index,
  isActive,
  onDotClick,
  variant,
  size,
  dotClassName,
  selectedDotClassName,
  ...props
}: {
  index: number;
  isActive: boolean;
  onDotClick: () => void;
  variant: ButtonVariantsEnum;
  size: ButtonSizeEnum;
  dotClassName?: string;
  selectedDotClassName?: string;
} & React.ComponentProps<typeof Button>) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onDotClick();
  };

  return (
    <button
      type="button"
      data-slot="carousel-pagination"
      aria-label={`Slide ${index + 1}`}
      disabled
      className={cn(
        'relative size-8 rounded-full !p-0 bg-neutral-300 border-none',
        dotClassName,
        isActive
          ? `!w-[14px] sm:!w-[24px] bg-white ${selectedDotClassName}`
          : '',
      )}
      onClick={handleClick}
      {...props}
    />
  );
}

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
};
