import type { LotteryResult, OptionType } from '@/types/app';
import type { LotteryCity } from '@/types/lottery';
import type { Dayjs } from 'dayjs';
import { VN_TIMEZONE } from '@/constant/constants';
import { LOTTERY_DATE_FORMAT_API } from '@/constant/lottery';
import { getCity, getResult } from '@/services/client';
import { formatDate } from '@/utils/date';
import { getTimeRelease } from '@/utils/lottery';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef, useState, useTransition } from 'react';

export const useLotteryResult = (initialCity: LotteryCity[], initResult: LotteryResult) => {
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const [date, setDate] = useState<Dayjs>(
    dayjs(getTimeRelease()).tz(VN_TIMEZONE),
  );
  const [city, setCity] = useState<string | number>(
    `${initialCity[0]?.id}` || '',
  );

  const cityOption = useMemo<OptionType[]>(() =>
    initialCity?.map((el) => ({
      label: el.name,
      value: `${el.id}`,
    })) || [],
    [initialCity]);

  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<LotteryResult>(initResult);
  const [typeSearchNumber, setTypeSearchNumber] = useState<number | string>('all');
  const [cityOptions, setCityOptions] = useState<OptionType[]>(cityOption);

  const getLotteryResult = useCallback(async (newCity?: number | string, newDate?: Dayjs) => {
    if (isPending) {
      return;
    }
    startTransition(async () => {
      const response = await getResult({
        city: +(newCity ?? city),
        date: formatDate((newDate ?? date).toDate(), LOTTERY_DATE_FORMAT_API),
      });
      setData(response);
    });
  }, [city, date, isPending]);

  const result = useMemo(() => {
    const resultArray: string[] = [];
    for (let i = 1; i < 9; i++) {
      resultArray.push(data.result[`prize${i}`] ?? '');
    }
    return {
      prize: resultArray,
      special: data.result.special ?? '',
    };
  }, [data]);

  const handleDateChange = useCallback(async (newDate: Date) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      const newDateValue = dayjs(newDate);
      const _city = await getCity(
        formatDate(newDateValue.toDate(), LOTTERY_DATE_FORMAT_API),
      );
      const currentCity = _city.find((el) => +el.id === +city);
      const newCityOptions = _city.map((el) => ({
        label: el.name,
        value: `${el.id}`,
      }));

      if (!currentCity && _city[0]) {
        setDate(newDateValue);
        setCity(`${_city[0].id}`);
        getLotteryResult(_city[0].id, newDateValue);
      } else {
        setDate(newDateValue);
        getLotteryResult(city, newDateValue);
      }
      setCityOptions(newCityOptions);
    }, 300);
  }, [city, getLotteryResult]);

  const handleCityChange = useCallback((value: number | string) => {
    setCity(value);
    getLotteryResult(value, date);
  }, [getLotteryResult, date]);

  const filterNumberByType = useCallback((number: string) => {
    return typeSearchNumber === 'all'
      ? number
      : number.slice(-typeSearchNumber);
  }, [typeSearchNumber]);

  return useMemo(() => ({
    isPending,
    date,
    city,
    cityOption: cityOptions,
    search,
    result,
    typeSearchNumber,
    setSearch,
    getLotteryResult,
    setTypeSearchNumber,
    handleDateChange,
    handleCityChange,
    filterNumberByType,
  }), [
    isPending, date, city, cityOptions, search,
    result, typeSearchNumber, handleDateChange, getLotteryResult,
    handleCityChange, filterNumberByType
  ]);
};
