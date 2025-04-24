import type { OptionType } from '@/types/app';
import type { RequestParams } from '@/types/game';
import { SearchInput } from '@/components/BaseInput';
import { BaseMultiSelect } from '@/components/BaseMultiSelect';
import { MIN_SEARCH_LENGTH } from '@/constant/lobby';
import { GameSortEnum } from '@/enums';
import { useDevice } from '@/hooks/utils';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import LobbyFilterTag from './LobbyFilterTag';
import '@/styles/pages/lobby/filter.scss';

type LobbyCasinoFilterProps = {
  onFilterTypeCasino?: (type: string) => void;
  onFilterChange: (newQueryParams: RequestParams) => void;
  gameProviders: OptionType[];
  isLoading: boolean;
  params: RequestParams;
  hideSearch?: boolean;
  isCasino?: boolean;
  isFavorite?: boolean;
  className?: string;
};

export default function LobbyCasinoFilter({
  onFilterChange,
  gameProviders,
  isLoading,
  hideSearch,
  params,
  isCasino,
  isFavorite,
  className,
}: LobbyCasinoFilterProps) {
  const t = useTranslations();
  const { control, watch } = useForm({ mode: 'onChange' });
  const { isMobile, isTablet, isDesktop } = useDevice();
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const refInputSearch = useRef<HTMLInputElement>(null);

  const activeTab = useMemo(() => {
    if (
      params.filter === GameSortEnum.Hot &&
      params.sort === GameSortEnum.Top
    ) {
      return GameSortEnum.Hot;
    }
    if (params.sort === GameSortEnum.Recent) {
      return GameSortEnum.Recent;
    }
    if (params.filter === GameSortEnum.Favorite) {
      return GameSortEnum.Favorite;
    }
    return GameSortEnum.All;
  }, [params.filter, params.sort]);
  const handleFilterChange = (
    key: string | RequestParams,
    searchValue: string = '',
  ) => {
    if (typeof key === 'string') {
      onFilterChange({
        [key]: searchValue,
      });
    } else {
      onFilterChange(key);
    }
  };
  const showDrawer = useMemo(() => isMobile || isTablet, [isMobile, isTablet]);
  const handleFilterTag = (key: string) => {
    const newQueryParams: RequestParams = {
      ...params,
      page: 1,
      sort: '',
      filter: '',
    };
    switch (key) {
      case GameSortEnum.Hot:
        newQueryParams.filter = GameSortEnum.Hot;
        newQueryParams.sort = GameSortEnum.Top;
        break;
      case GameSortEnum.Recent:
        newQueryParams.sort = GameSortEnum.Recent;
        break;
      case GameSortEnum.Favorite:
        newQueryParams.filter = GameSortEnum.Favorite;
        break;
    }
    handleFilterChange(newQueryParams);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnFilterChange = useCallback(
    debounce((key: string, searchValue: string) => {
      handleFilterChange(key, searchValue);
    }, 500),
    [onFilterChange],
  );

  const searchFieldValue = watch('keyword');
  const [prevKey, setPrevKey] = useState('');

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const timer = setTimeout(() => {
      const value = searchFieldValue?.trim() || '';
      if (value === '' && prevKey.length < MIN_SEARCH_LENGTH) {
        return;
      }
      if (value.length > 0 && value.length < MIN_SEARCH_LENGTH) {
        return;
      }
      handleFilterChange('keyword', searchFieldValue.trim());
      setPrevKey(value);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFieldValue]);

  const handleChangePartner = useCallback(
    (value: (string | number)[]) => {
      debouncedOnFilterChange('partner', value.join(','));
    },
    [debouncedOnFilterChange],
  );

  const handleOpenSearchBar = () => {
    if (!isSearchBarActive) {
      refInputSearch.current?.focus();
    }
    setIsSearchBarActive((prev) => !prev);
  };

  return (
    <section className={clsx('x-container p-0 md:px-3', className)}>
      <div
        className={clsx(
          'lobby-filter flex lg:items-center lg:justify-between flex-col-reverse lg:flex-row gap-4',
        )}
      >
        {isFavorite && (
          <div className="hidden lg:flex items-center gap-2 text-green-500 text-2xl uppercase font-bold">
            <i className="icon-favorite text-[26px]"></i>
            <span>{t('Pages.Lobby.game_category.favorite.title')}</span>
          </div>
        )}
        {!isFavorite && (
          <LobbyFilterTag
            activeTab={activeTab}
            setActiveTab={handleFilterTag}
            isLoading={isLoading}
          />
        )}
        <div
          className={clsx(
            'flex items-center gap-2.5 lg:gap-4 lg:w-[520px] xl:w-[522px] lobby-filter__search-bar !h-10',
            {
              active: isSearchBarActive || gameProviders.length < 2,
              'disable-toggle-bar': gameProviders.length < 2,
              hidden: hideSearch,
            },
          )}
        >
          <div className="multi-select__wrapper !w-full flex-1 h-full max-h-10 flex items-center gap-2.5">
            {gameProviders.length > 1 && (
              <div className="flex-1">
                <BaseMultiSelect
                  options={gameProviders}
                  onChange={handleChangePartner}
                  initialValues={params.partner
                    ?.split(',')
                    .filter(
                      (p) =>
                        gameProviders.some((el) => el.value === p.trim()) &&
                        p.trim(),
                    )}
                  className="flex-1"
                  showMobile={showDrawer}
                  isDisabled={isLoading}
                  optionWrapperClassName="disable-hover"
                  isIconCheck
                  optionItemClassName="capitalize"
                  title={t('Pages.Lobby.filter.provider_title')}
                  placeholder={
                    isDesktop || !isCasino
                      ? t('Pages.Lobby.filter.provider_placeholder')
                      : t('Pages.Lobby.filter.provider_placeholder_mobile')
                  }
                  defaultOption={{
                    label:
                      isDesktop || !isCasino
                        ? t('Pages.Lobby.filter.provider_placeholder')
                        : t('Pages.Lobby.filter.provider_placeholder_mobile'),
                    value: 'all',
                    icon: 'icon-provider-all',
                  }}
                />
              </div>
            )}
          </div>
          <SearchInput
            name="keyword"
            ref={refInputSearch}
            watchValue
            placeholder={t('Pages.Lobby.filter.search_placeholder')}
            control={control}
            value={params.keyword}
            showCancelButton
            onCancel={() => setIsSearchBarActive(false)}
            enableSpace
            disabled={isLoading}
            inputClassName={clsx(
              gameProviders.length > 1 ? 'pr-24 md:pr-14' : 'pr-12',
              'placeholder:!font-medium placeholder:!text-dark-200',
            )}
            className="flex-1 lg:max-w-[303px] ml-auto lobby-filter__input"
          >
            <i className="icon-search text-neutral" />
          </SearchInput>
          {!isSearchBarActive && (
            <button
              type="button"
              onClick={handleOpenSearchBar}
              className="size-10 ml-auto bg-primary-light-100 border border-neutral-400 rounded-sm md:hidden toggle-search-bar"
            >
              <i className="icon-search text-dark-100 text-xl" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
