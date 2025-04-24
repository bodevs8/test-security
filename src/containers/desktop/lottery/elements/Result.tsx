'use client';
import type { LotteryResult } from '@/types/app';
import type { LotteryCity } from '@/types/lottery';
import { BaseCalendar } from '@/components/BaseCalendar';
import { NumberInput } from '@/components/BaseInput';
import { BaseSelect } from '@/components/BaseSelect/BaseSelect';
import { LOTTERY_TYPE_OPTIONS } from '@/constant/lottery';
import { useLotteryResult } from '@/hooks/game';
import lotteryEmpty from '@/public/images/lottery/lottery-empty.webp';
import lotteryTopIcon from '@/public/images/lottery/lottery-top-icon.svg';
import SpecialTriggerBg from '@/public/images/lottery/special-trigger-bg.svg';
import { formatDate } from '@/utils/date';
import dayjs from '@/utils/dayjs_vn';
import { TIME_NEW_RESULT } from '@/utils/lottery';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useForm, useWatch } from 'react-hook-form';

type ResultProps = {
  city: LotteryCity[];
  initResult: LotteryResult;
};

const Result = ({ city: initialCity, initResult }: ResultProps) => {
  const t = useTranslations('Pages.Lottery');
  const { control } = useForm({ mode: 'onChange' });
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
    handleCityChange,
    filterNumberByType,
  } = useLotteryResult(initialCity, initResult);

  const highlight = (text: string, isSpecial = false) => {
    const number = filterNumberByType(text);

    if (!search) {
      if (isSpecial) {
        return (
          <div className="flex items-center justify-center text-center gap-2">
            {number.split('').map((digit, i) => (
              <div
                className="lottery-special"
                key={`special-not-match-${digit}-${i}`}
              >
                <span className="text-dark-700">{digit}</span>
              </div>
            ))}
          </div>
        );
      }
      return number;
    }

    const regex = `(${search})(?!\\d)`;
    const parts = number.split(new RegExp(regex, 'g'));

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

  const searchValue = useWatch({
    control,
    name: 'search',
    defaultValue: '',
  });

  const renderControls = () => (
    <div className="flex items-center gap-4">
      <NumberInput
        name="search"
        placeholder={t('result.search_placeholder')}
        control={control}
        isClearable={Boolean(searchValue)}
        leftIcon={<i className="icon-search text-[20px] text-green-500" />}
        className="!w-[160px]"
        onChange={(value) => {
          setSearch(value.target.value);
        }}
        inputClassName="placeholder:!font-medium placeholder:!text-dark-200 w-[80px] pr-10 hover:border hover:border-primary-light-500 hover:!text-dark-700"
        isPhoneInput
      />
      <BaseCalendar
        date={date.toDate()}
        disableFeatureFrom={
          dayjs().get('hour') < TIME_NEW_RESULT
            ? dayjs().subtract(1, 'day').toDate()
            : undefined
        }
        buttonClassName="!w-[160px]"
        side="bottom"
        align="center"
        setDate={handleDateChange}
      />
      <BaseSelect
        initialValues={city}
        onChange={(value) => handleCityChange(value as number | string)}
        optionItemClassName="text-sm"
        options={cityOption}
        className="!w-[160px]"
      />
    </div>
  );

  const renderLotteryTypeOptions = () => (
    <div className="flex gap-[30px]">
      {LOTTERY_TYPE_OPTIONS.map((option) => (
        <div key={option.value} className="lottery-radio">
          <input
            type="radio"
            name="type"
            id={`${option.value}`}
            checked={typeSearchNumber === option.value}
            onChange={() => setTypeSearchNumber(option.value)}
          />
          <label htmlFor={`${option.value}`}>
            <span className="lottery-radio__checkmark"></span>
            {t(option.label)}
          </label>
        </div>
      ))}
    </div>
  );

  const renderResultsTable = () => {
    if (isPending) {
      return (
        <div className="text-center flex items-center flex-col justify-center gap-4 h-[185px]">
          <div className="spinner !border-t-green-500 !size-10" />
        </div>
      );
    }

    if (result.prize?.length === 0) {
      return (
        <div className="text-white text-center flex items-center flex-col justify-center gap-4">
          <Image
            src={lotteryEmpty}
            alt="Result"
            width={140}
            height={140}
            className="inline-block"
          />
          <p className="text-dark-200 text-sm leading-5">
            {t('result.empty_result')}
          </p>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="rounded-md overflow-hidden">
          <div className="flex flex-col-reverse">
            {result.prize.map((item, index) => (
              <div
                key={`row-${index}`}
                className={clsx(
                  'flex items-center gap-2 justify-stretch bg-primary-light-50 h-12 ',
                  {
                    'odd-row bg-white': index % 2 !== 0,
                    'border-b border-b-neutral-400':
                      index !== result.prize.length - 1,
                  },
                )}
              >
                <div className="lottery-result-row text-sm font-normal capitalize text-dark-700 leading-5 w-[127px] text-right flex items-center pl-10 ml-4">
                  {t(`result.prize.${index + 1}`)}
                </div>
                <div className="flex items-center flex-wrap justify-center flex-1 gap-2 w-[73%] self-stretch">
                  {item.split('-').map((el, idx, array) => (
                    <div
                      key={`${el}-${idx}`}
                      className="flex items-center gap-2"
                    >
                      <div className="lottery-number mx-2 text-sm font-medium text-dark-700">
                        {highlight(el.toString().trim())}
                      </div>
                      {idx < array.length - 1 && (
                        <span className="text-dark-700">-</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex h-[59px] relative bg-gradient-green-yellow">
            <div className="flex items-center justify-start w-[27%]">
              <Image
                src={SpecialTriggerBg}
                alt="Special Trigger Background"
                width={222}
                height={63}
                className="-mt-1"
              />
              <span className="absolute ml-5 text-primary-light-0 font-extrabold text-2xl italic skew-x-[5deg] uppercase">
                {t('result.prize.special')}
              </span>
            </div>
            <div className="w-[73%] -ml-18 flex items-center justify-center flex-1 gap-2">
              {highlight(result.special.toString().trim() || '     ', true)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 bg-gradient-neutral-2 rounded-md flex-1 hidden lg:block">
      <div className="lottery-result__top flex items-center justify-between flex-wrap gap-4">
        <div className="text-2xl leading-[36px] font-bold flex items-center gap-2 text-green-500 uppercase">
          <Image
            src={lotteryTopIcon}
            alt="Result"
            width={32}
            height={32}
            className="inline-block size-[18px] md:size-[26px] mb-0.5"
          />
          {t('result.title')}
        </div>
        {renderControls()}
      </div>
      <div className="flex gap-4 mt-4">
        <div className="flex-1">
          <div className="flex flex-row-reverse items-center justify-between gap-[30px] mb-4">
            <div className="font-medium text-sm text-dark-200 flex items-center">
              <span>
                {`${t('table.big_win.lottery')} ${cityOption.find((el) => el.value === city)?.label}`}
              </span>
              <span className="inline-block mx-2 text-primary-light-400 leading-[15px]">
                |
              </span>
              <div>{formatDate(date.toDate())}</div>
            </div>
            {renderLotteryTypeOptions()}
          </div>
          <div
            className={clsx(
              'bg-transparent',
              (isPending || !result.prize?.length) &&
                'flex items-center justify-center py-[128px]',
            )}
          >
            {renderResultsTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
