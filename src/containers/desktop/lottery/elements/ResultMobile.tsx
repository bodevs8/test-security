'use client';

import type { LotteryResult } from '@/types/app';
import type { LotteryCity } from '@/types/lottery';
import { BaseCalendar } from '@/components/BaseCalendar';
import { NumberInput } from '@/components/BaseInput';
import { BaseModal } from '@/components/BaseModal';
import { BaseSelect } from '@/components/BaseSelect/BaseSelect';
import { Button } from '@/components/ui/button';
import { LOTTERY_TYPE_OPTIONS } from '@/constant/lottery';
import { ButtonSizeEnum, ModalIdEnum } from '@/enums';
import { useLotteryResult } from '@/hooks/game';
import { useModalStore } from '@/hooks/stores';
import { useDevice } from '@/hooks/utils';
import lotteryEmptyImage from '@/public/images/lottery/lottery-empty.webp';
import specialTriggerBg from '@/public/images/lottery/special-trigger-bg-mb.svg';
import { formatDate } from '@/utils/date';
import { TIME_NEW_RESULT } from '@/utils/lottery';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

type ResultProps = {
  city: LotteryCity[];
  initResult: LotteryResult;
};

const highlightNumber = (
  result: string,
  search: string,
  isSpecial = false,
  filterNumberByType?: (text: string) => string,
) => {
  const text = filterNumberByType ? filterNumberByType(result) : result;

  if (!search) {
    if (isSpecial) {
      return (
        <div className="flex items-center justify-center text-center gap-2">
          {text.split('').map((digit, i) => (
            <div
              className={clsx(
                'lottery-special',
                search && digit === search ? 'match' : '',
              )}
              key={`special-not-match-${digit}-${i}`}
            >
              <span className="text-dark-700">{digit}</span>
            </div>
          ))}
        </div>
      );
    }
    return text;
  }

  const regex = `(${search})(?!\\d)`;
  const parts = text.split(new RegExp(regex, 'g'));

  if (isSpecial) {
    return (
      <div className="flex items-center justify-center text-center gap-2">
        {parts[0]?.split('').map((digit, i) => (
          <div className="lottery-special" key={`special-not-match-${i}`}>
            <span className="text-dark-700">{digit}</span>
          </div>
        ))}
        {parts[1]?.split('').map((digit, i) => (
          <div className="lottery-special match" key={`special-match-${i}`}>
            <span className="text-white">{digit}</span>
          </div>
        ))}
      </div>
    );
  }

  return parts.map((part, i) => {
    if (part.toLowerCase() === search.toLowerCase()) {
      return (
        <span key={i} className="bg-green-500 text-white">
          {part}
        </span>
      );
    }
    return part;
  });
};

const ResultHeader = ({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) => (
  <div className="lottery-result__top uppercase flex items-center justify-between h-[50px] px-4 text-dark-700 border-b border-b-primary-light-200">
    <button type="button" onClick={onClose} className="outline-none">
      <i className="icon-arrow-down block text-xl select-icon transform rotate-90" />
    </button>
    <p className="text-base font-bold mt-1">{title}</p>
    <div className="size-6"></div>
  </div>
);

const SearchInput = ({
  control,
  onSearch,
  onClear,
  placeholder,
  inputRef,
}: {
  control: any;
  onSearch: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 100);
  };

  const searchValue = useWatch({
    control,
    name: 'search',
    defaultValue: '',
  });

  return (
    <div
      className="py-4 px-3 border-t border-t-primary-light-400"
      ref={inputRef}
    >
      <NumberInput
        name="search"
        placeholder={placeholder}
        control={control}
        leftIcon={<i className="icon-search text-[20px] text-green-500" />}
        onChange={(value) => onSearch(value.target.value)}
        inputClassName="text-base search pr-[52px] truncate overflow-hidden whitespace-nowrap mb-search"
        isClearable={Boolean(searchValue)}
        onClearAction={onClear}
        maxLength={255}
        isPhoneInput
        onFocus={handleFocus}
      />
    </div>
  );
};

const EmptyResult = ({ message }: { message: string }) => (
  <div className="text-white text-center flex items-center flex-col justify-center gap-4 mt-[56px]">
    <Image
      src={lotteryEmptyImage}
      alt="Result"
      width={140}
      height={140}
      className="inline-block"
    />

    <p className="text-light-300-70 text-sm font-normal">{message}</p>
  </div>
);

const LoadingSpinner = () => (
  <div className="text-center h-full flex items-center flex-col justify-center gap-4 border-t border-t-neutral-500">
    <div className="spinner !border-t-green-500 !size-10" />
  </div>
);

const ResultMobile = ({ city: initialCity, initResult }: ResultProps) => {
  const t = useTranslations('Pages.Lottery');
  const { control } = useForm({ mode: 'onChange' });
  const { isIOS } = useDevice();
  // const { isIOS, isMobile, isTablet } = useDevice();
  const modalStore = useModalStore((state) => state);
  const {
    isPending,
    date,
    city,
    cityOption,
    search,
    result,
    typeSearchNumber,
    setSearch,
    setTypeSearchNumber,
    handleDateChange,
    filterNumberByType,
    handleCityChange,
  } = useLotteryResult(initialCity, initResult);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openResultModal = () => {
    modalStore.openModal(ModalIdEnum.LotteryResult);
  };

  const onClearAction = () => {
    setSearch('');
  };

  return (
    <div className="lg:hidden min-h-[92px]">
      <div
        className="w-full relative overflow-hidden rounded-sm border border-yellow-500 bg-gradient-green-yellow"
        onClick={openResultModal}
      >
        <Image
          src={specialTriggerBg}
          alt="Result"
          width={154}
          height={92}
          className="w-[39.49vw] h-[23.59vw]"
        />

        <div className="absolute flex flex-col gap-1 top-3 left-3 right-0 ">
          <p className="text-primary-light-0 text-[4.1vw] font-bold leading-[7.18vw]">
            {t('result.title')}
          </p>
          <p className="text-primary-light-0 font-normal text-[3.59vw] leading-[1.4]">
            {formatDate(date.toDate())}
          </p>
        </div>
        <div className="absolute top-3 right-3">
          {highlightNumber(
            result.special.toString().trim(),
            search,
            true,
            filterNumberByType,
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <Button
            size={ButtonSizeEnum.SM}
            id="open-result"
            name="open-result"
            className="!rounded-sm text-[3.08vw] h-[6.15vw]"
          >
            {t('result.see_detail')}
          </Button>
        </div>
      </div>

      <BaseModal
        modalId={ModalIdEnum.LotteryResult}
        hideTitle
        showCloseBtn={false}
        modalClassName={clsx(
          'gap-0 !p-0 max-w-full !w-[768px] z-[101] rounded-none',
          isIOS ? 'h-[100dvh]' : 'h-screen',
        )}
      >
        <div className="flex flex-col">
          <ResultHeader
            onClose={() => modalStore.closeModal(ModalIdEnum.LotteryResult)}
            title={t('result.title')}
          />
          <div
            className={clsx(
              'pt-6 flex-1 overflow-y-auto px-3 pb-6',
              isIOS
                ? 'max-h-[calc(100dvh-124px)]'
                : 'max-h-[calc(100vh-124px)]',
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <BaseCalendar
                date={date.toDate()}
                disableFeatureFrom={
                  dayjs().get('hour') < TIME_NEW_RESULT
                    ? dayjs().subtract(1, 'day').toDate()
                    : undefined
                }
                side="bottom"
                align="center"
                setDate={handleDateChange}
                buttonClassName="!w-1/2"
              />
              <BaseSelect
                initialValues={city}
                onChange={(value) => handleCityChange(value as number | string)}
                optionItemClassName="text-sm"
                className="!w-1/2 base-select-deposit !h-10"
                contentClassName="z-[103] max-h-[70dvh] overflow-y-auto"
                drawerTitle={t('select_city')}
                options={cityOption}
              />
            </div>
            <div className="flex items-center justify-between xsm:justify-start xsm:gap-6 my-3">
              {LOTTERY_TYPE_OPTIONS.map((option) => (
                <div key={option.value} className="lottery-radio">
                  <input
                    type="radio"
                    name="type"
                    id={`${option.value}`}
                    checked={typeSearchNumber === option.value}
                    onChange={() => setTypeSearchNumber(option.value)}
                  />
                  {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                  <label
                    htmlFor={`${option.value}`}
                    onClick={() => setTypeSearchNumber(option.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ')
                        setTypeSearchNumber(option.value);
                    }}
                  >
                    <span className="lottery-radio__checkmark"></span>
                    {t(option.label)}
                  </label>
                </div>
              ))}
            </div>

            {isPending && <LoadingSpinner />}

            {!isPending && result.prize?.length > 0 && (
              <div className="text-center">
                <div className="w-full relative bg-gradient-green-yellow h-[54px] rounded-[6px] mb-2">
                  <div
                    className="absolute bottom-1/2 text-left px-[3.077vw] flex justify-between items-center w-full"
                    style={{ transform: 'translateY(50%)' }}
                  >
                    <p className="text-dark-700 italic skew-x-[5deg] text-[4.1vw] md:text-2xl font-extrabold leading-7 uppercase">
                      {t('result.prize.special')}
                    </p>
                    <div className="modal-special-number">
                      {highlightNumber(
                        result.special.toString().trim(),
                        search,
                        true,
                        filterNumberByType,
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-primary-light-400 rounded-[6px] overflow-hidden">
                  {result.prize.map((item, index) => (
                    <div
                      key={`row-${index}`}
                      className={clsx(
                        'flex items-center bg-primary-light-50 justify-stretch',
                        {
                          'odd-row bg-white': index % 2 !== 0,
                          'border-b border-b-neutral-400':
                            index !== result.prize.length - 1,
                        },
                      )}
                    >
                      <div
                        className={clsx(
                          'text-sm text-dark-700 font-normal leading-6 w-[78px] text-left ml-2 max-w-[207px] capitalize relative',
                          'after:content-[""] after:absolute after:right-0 after:top-1/2 after:custom-translate-y-1/2 after:h-10 after:border-r after:border-r-primary-light-200',
                        )}
                      >
                        {t(`result.prize.${index + 1}`)}
                      </div>
                      <div
                        className={clsx(
                          'flex items-center flex-wrap justify-center flex-1 gap-x-5',
                        )}
                      >
                        {item.split('-').map((el, idx) => (
                          <div
                            key={`${el}-${idx}`}
                            className="lottery-number h-[52px] leading-[52px] text-sm font-medium w-[62px] text-dark-700"
                          >
                            {highlightNumber(
                              el.toString().trim(),
                              search,
                              false,
                              filterNumberByType,
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isPending && result.prize?.length === 0 && (
              <EmptyResult message={t('result.empty_result')} />
            )}
          </div>

          <SearchInput
            control={control}
            onSearch={setSearch}
            onClear={onClearAction}
            placeholder={t('result.search_placeholder')}
            inputRef={searchInputRef}
          />
        </div>
      </BaseModal>
    </div>
  );
};

export default ResultMobile;
