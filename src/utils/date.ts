import {
  DATE_FORMAT,
  DATE_FORMAT_YMD,
  HOUR_FORMAT,
} from '@/constant/constants';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/vi';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export function formatDate(
  date: Date | string | number,
  formatDay = DATE_FORMAT,
  customFormat?: string,
) {
  if (customFormat) {
    return dayjs(date, customFormat).format(formatDay);
  }
  return dayjs(date).format(formatDay);
}

export function dateFormatWithUTC(date: Date | string, formatDay: string) {
  return dayjs(date).utc().format(formatDay);
}

export function createTimeHistory(date: Date | string) {
  return `${dayjs(date).format(DATE_FORMAT)} - ${new Date(date).toTimeString().substring(0, 5)}`;
}

export function diffSecondsUTC(date: Date | string) {
  return dayjs(date).utc().diff(dayjs().utc(), 'second');
}

export function secondsUTC(date: Date | string) {
  return dayjs().utc().diff(dayjs(date).utc(), 'second');
}

export function formatTime(time: number) {
  return String(time).padStart(2, '0').split('');
}

export const formatSportEventTime = (time: string) => ({
  day: formatDate(time),
  hour: formatDate(time, HOUR_FORMAT),
});

export function getToday(formatDay = DATE_FORMAT_YMD) {
  return dayjs().format(formatDay);
}

export function getTomorrow(formatDay = DATE_FORMAT_YMD) {
  return dayjs().add(1, 'day').format(formatDay);
}

export function formatTimeToUTC(time: number) {
  return dayjs(time).utc().format();
}

export function getTimeUTC() {
  return dayjs().utc().format();
}

export const getUnixTimestamp = (date: string) => dayjs(date).unix();

export const getCurrentUnixTimestamp = () => dayjs().unix();
