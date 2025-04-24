'use client';

import type { EmblaCarouselOrientationEnum } from '@/enums';
import type {
  NavigationProps,
  PaginationProps,
  SectionTitleProps,
} from '@/types/component';
import type { EmblaOptionsType } from 'embla-carousel';
import { EmblaCarouselTitle } from '@/components/EmblaCarousel/EmblaCarouselTitle';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { CarouselNavigationPositionEnum } from '@/enums';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';

type EmblaCarouselProps = {
  children: React.ReactNode[];
  slideClassName?: string;
  slideGridClassName?: string;
  slideStyle?: React.CSSProperties;
  containerClassName?: string;
  contentClassName?: string;
  loop?: boolean;
  plugins?: any[];
  id: string;
  navigation?: NavigationProps;
  pagination?: PaginationProps;
  grid?: {
    rows?: number;
  };
  onSelect?: (index: number) => void;
  extraContent?: React.ReactNode;
  className?: string;
  sectionTitle?: SectionTitleProps & {
    titleSectionClassName?: string;
  };
  dragFree?: boolean;
  opts?: EmblaOptionsType;
  orientation?: EmblaCarouselOrientationEnum;
};

export const EmblaCarousel = ({
  children,
  slideClassName,
  slideGridClassName,
  slideStyle,
  grid,
  containerClassName,
  loop,
  navigation,
  pagination,
  extraContent,
  plugins,
  className,
  id,
  sectionTitle,
  contentClassName,
  dragFree = false,
  opts,
  orientation,
}: EmblaCarouselProps) => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  const chunkArray = useCallback(<T,>(array: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }, []);

  const handleGrabStart = useCallback(() => {
    setIsGrabbing(true);
  }, []);

  const handleGrabEnd = useCallback(() => {
    setIsGrabbing(false);
  }, []);

  const renderNavigationButtons = useCallback(
    (
      position?: CarouselNavigationPositionEnum,
      childrenContent?: React.ReactNode,
    ) => {
      if (!navigation) return null;

      const isTopPosition = position === CarouselNavigationPositionEnum.TOP;
      const baseNavClasses = isTopPosition
        ? '!translate-0 !top-0 flex items-center justify-center !bg-neutral-400 !border-none rounded-md size-8 !relative !top-unset '
        : '!translate-0 !top-0 flex items-center justify-center !bg-transparent disabled:!bg-transparent !border-none !w-4 !h-4 !relative !top-unset';

      return (
        <>
          <CarouselPrevious
            id={`${id}-prev`}
            name={`${id}-prev`}
            className={clsx(
              baseNavClasses,
              isTopPosition ? '!left-0 group' : '!left-0',
              navigation.classNamePrev,
            )}
            iconClassName={clsx(
              isTopPosition && '!text-xs',
              navigation.iconClassName,
            )}
          />
          {childrenContent}
          <CarouselNext
            id={`${id}-next`}
            name={`${id}-next`}
            className={clsx(
              baseNavClasses,
              isTopPosition ? '!right-0 group' : '!right-0',
              navigation.classNameNext,
            )}
            iconClassName={clsx(
              isTopPosition && '!text-xs',
              navigation.iconClassName,
            )}
          />
        </>
      );
    },
    [id, navigation],
  );

  const carouselItems = useMemo(() => {
    if (!grid?.rows || grid.rows <= 1) {
      return children.map((node, index) => (
        <CarouselItem
          key={index}
          className={clsx('w-fit', slideClassName)}
          style={slideStyle}
          index={index}
        >
          {node}
        </CarouselItem>
      ));
    }

    return chunkArray(children, grid.rows).map((chunk, slideIndex) => (
      <CarouselItem
        key={`slide-${slideIndex}`}
        className={clsx('flex flex-col w-fit gap-4', slideGridClassName)}
        index={slideIndex}
      >
        {chunk.map((child, childIndex) => (
          <div
            key={`child-${slideIndex}-${childIndex}`}
            className={clsx('embla__slide__inner', slideClassName)}
          >
            {child}
          </div>
        ))}
      </CarouselItem>
    ));
  }, [
    children,
    grid?.rows,
    chunkArray,
    slideClassName,
    slideStyle,
    slideGridClassName,
  ]);

  const bottomControls = useMemo(() => {
    if (
      !(navigation?.position === CarouselNavigationPositionEnum.BOTTOM) ||
      !pagination
    ) {
      return null;
    }

    return (
      <div
        className={clsx(
          'flex items-center gap-2',
          navigation?.className,
          pagination?.className,
        )}
      >
        {!pagination &&
          renderNavigationButtons(CarouselNavigationPositionEnum.BOTTOM)}
        {pagination &&
          renderNavigationButtons(
            CarouselNavigationPositionEnum.BOTTOM,
            <CarouselPagination
              id={`${id}-pagination`}
              name={`${id}-pagination`}
              dotClassName={clsx(
                '!w-[6px] !h-[4px] md:!h-[6px] !rounded-full',
                pagination?.dotClassName,
              )}
              selectedDotClassName={pagination?.selectedDotClassName}
              dynamicBullets={pagination.dynamicBullets}
            />,
          )}
      </div>
    );
  }, [id, navigation, pagination, renderNavigationButtons]);

  const paginationElement = useMemo(() => {
    if (!pagination) return null;

    return (
      <div
        className={clsx(
          'flex items-center mx-auto w-fit mt-4',
          pagination?.className,
        )}
      >
        <CarouselPagination
          id={`${id}-pagination`}
          name={`${id}-pagination`}
          dotClassName={clsx(
            '!w-[6px] !h-[4px] md:!h-[6px] !rounded-full',
            pagination?.dotClassName,
          )}
          selectedDotClassName={pagination?.selectedDotClassName}
        />
      </div>
    );
  }, [id, pagination]);

  return (
    <div className={clsx('relative w-full', className)}>
      <Carousel
        className="w-full"
        opts={{
          loop,
          dragFree,
          align: 'start',
          ...opts,
        }}
        plugins={plugins}
        onMouseDown={handleGrabStart}
        onMouseUp={handleGrabEnd}
        orientation={orientation}
      >
        {sectionTitle && (
          <EmblaCarouselTitle
            {...sectionTitle}
            titleSectionClassName={sectionTitle.titleSectionClassName}
          >
            {renderNavigationButtons(CarouselNavigationPositionEnum.TOP)}
          </EmblaCarouselTitle>
        )}

        <CarouselContent
          containerClassName={clsx(containerClassName, {
            'cursor-grabbing': isGrabbing,
            'hover:cursor-grab': !isGrabbing,
          })}
          className={clsx(
            'flex w-full',
            sectionTitle && 'mt-2 lg:mt-4',
            contentClassName,
          )}
        >
          {carouselItems}
        </CarouselContent>

        {navigation?.position === CarouselNavigationPositionEnum.BOTTOM &&
          pagination &&
          bottomControls}
        {!navigation && pagination && paginationElement}
      </Carousel>

      {extraContent}
    </div>
  );
};
