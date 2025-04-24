'use client';
import type { SearchFormValues } from '@/containers/layout/elements/Search/types';
import type { GamesType, RequestParams } from '@/types/game';
import type { z } from 'zod';
import { SearchInput } from '@/components/BaseInput';
import { DEFAULT_PAGINATE } from '@/constant/app';
import { DEFAULT_GAME_RESPONSE } from '@/constant/game';
import { ModalIdEnum, ScreenBreakpointEnum } from '@/enums';
import { useModalStore } from '@/hooks/stores';
import { useDevice } from '@/hooks/utils';
import { searchSchema } from '@/schemas/search-schema';
import { getGames } from '@/services/client';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { useForm } from 'react-hook-form';
import GameList from './GameList';
import RecommendedGamesSwiper from './RecommendedGamesSwiper';

type Props = {
  onClose: () => void;
  isMobile?: boolean;
};

type SearchSchemaType = z.infer<typeof searchSchema>;

const MIN_SEARCH_LENGTH = 2;

const SearchContainer = ({ onClose, isMobile }: Props) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const modalStore = useModalStore((state) => state);
  const { isTablet } = useDevice();
  const [itemLimit, setItemLimit] = useState(4);

  const [games, setGames] = useState<GamesType>({
    ...DEFAULT_GAME_RESPONSE,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATE.currentPage);
  const { control, handleSubmit, setValue, watch } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  });
  const isMobileDevice = isMobile || isTablet;
  // Watch the search field value
  const _searchFieldValue = watch('search');

  const isShowLargeHeight = games.total > 0;
  const isMatchSearchCondition = useMemo(
    () => _searchFieldValue?.trim().length >= MIN_SEARCH_LENGTH,
    [_searchFieldValue],
  );

  const fetchGames = useCallback(
    async (params: RequestParams) => {
      startTransition(async () => {
        const games = await getGames({
          ...params,
          limit: itemLimit,
        });
        setGames(games);
      });
    },
    [itemLimit],
  );

  const handleSearch = useCallback(
    (value: string) => {
      if (value && value.trim().length >= MIN_SEARCH_LENGTH) {
        setCurrentPage(DEFAULT_PAGINATE.currentPage);
        fetchGames({
          keyword: value.trim(),
          page: 1,
        });
      }
    },
    [fetchGames],
  );

  const onClearSearch = useCallback(() => {
    setGames({
      ...DEFAULT_GAME_RESPONSE,
    });
    setValue('search', '');
    setCurrentPage(DEFAULT_PAGINATE.currentPage);
  }, [setValue]);

  const handleClose = useCallback(() => {
    onClose?.();
    onClearSearch();
    modalStore.closeModal(ModalIdEnum.Search);
  }, [onClose, modalStore, onClearSearch]);

  // Add debounced search effect
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      if (isMatchSearchCondition) {
        handleSearch(_searchFieldValue);
      } else if (_searchFieldValue.length === 0) {
        onClearSearch();
      }
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isMatchSearchCondition, _searchFieldValue, handleSearch, onClearSearch]);

  const onSubmit = useCallback(
    (data: SearchSchemaType) => {
      handleSearch(data.search);
    },
    [handleSearch],
  );

  useEffect(() => {
    const calculateLimit = () => {
      const width = window.innerWidth;
      if (width >= ScreenBreakpointEnum.DesktopLarge) {
        setItemLimit(14);
      } else if (width >= ScreenBreakpointEnum.Desktop) {
        setItemLimit(12);
      } else if (width >= ScreenBreakpointEnum.Tablet) {
        setItemLimit(12);
      } else if (width >= ScreenBreakpointEnum.Mobile) {
        setItemLimit(10);
      } else {
        setItemLimit(8);
      }
    };

    calculateLimit();
    window.addEventListener('resize', calculateLimit);
    return () => window.removeEventListener('resize', calculateLimit);
  }, []);

  const onCancelSearch = useCallback(() => {
    onClearSearch();
    handleClose();
  }, [onClearSearch, handleClose]);

  const renderSearchResult = useCallback(() => {
    if (!isMatchSearchCondition) {
      return (
        <div className="text-sub-title text-xs leading-tight font-medium text-dark-200">
          {t('Modals.SearchModal.search_condition')}
        </div>
      );
    }

    if (games.total > 0 && isMatchSearchCondition) {
      return (
        <div className="mb-4 text-sm mt-5 font-normal">
          <span className="text-h2 font-medium leading-normal text-cta-primary text-sm">
            Kết quả tìm kiếm:
          </span>
          <span className="text-h2 leading-normal"> Hiển thị </span>
          <span className="text-highlight font-bold leading-normal">
            {games.total}
          </span>
          <span className="text-h2 leading-normal"> kết quả</span>
        </div>
      );
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMatchSearchCondition, games.total]);

  return (
    <div className="flex flex-col overflow-hidden h-full mt-[18px] !px-0 md:!px-3 lg:mt-0 x-container">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-[1px] pb-1">
        <SearchInput
          name="search"
          control={control}
          placeholder={t('Modals.SearchModal.placeholder')}
          className="h-10"
          inputClassName="focus:ring-primary-200"
          onClear={onClearSearch}
          onCancel={onCancelSearch}
          enableSpace
          autoFocus
        />
      </form>
      <div
        className={clsx('overflow-x-hidden overflow-y-auto hide-scrollbar', {
          'h-[680px]': isShowLargeHeight,
          'h-[320px]': !isShowLargeHeight,
          'h-full': isMobileDevice,
          'max-h-[calc(100vh-240px)]': !isMobileDevice,
        })}
      >
        <div className="w-full">
          {renderSearchResult()}
          <div className="flex-grow">
            <GameList
              isTyping={isTyping}
              itemLimit={itemLimit}
              gameList={games.items}
              totalPages={games.totalPage}
              currentPage={currentPage}
              isLoading={isPending}
              isMatchSearchCondition={isMatchSearchCondition}
              onChangePage={(page) => {
                setCurrentPage(page);
                fetchGames({
                  keyword: _searchFieldValue,
                  page,
                });
              }}
            />
            <RecommendedGamesSwiper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
