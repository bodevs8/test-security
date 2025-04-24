import dayjs from '@/utils/dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
export const TIME_NEW_RESULT = 19;

export function getTimeRelease(releaseHour?: string, isNext = false) {
  const now = dayjs();
  let diff = 0;
  if (isNext && releaseHour) {
    const [hour = '0', minute = '0', second = '0'] = releaseHour.split(':');
    const todayTarget = dayjs()
      .set('hour', Number.parseInt(hour))
      .set('minute', Number.parseInt(minute))
      .set('second', Number.parseInt(second));

    diff = now.diff(todayTarget);
    return (isNext ? diff > 0 : diff < 0)
      ? todayTarget.add(1, 'day').toDate()
      : todayTarget.toDate();
  }
  diff = now.get('hour') - TIME_NEW_RESULT;
  return diff < 0 ? now.subtract(1, 'day').toDate() : now.toDate();
}

export const getTimezone = () => {
  const now = dayjs();
  return now.utcOffset() / 60;
};

export function randomBetNumber(subtractDefault: number = 0) {
  const now = dayjs().tz('UTC');
  const currentHour = now.get('hour');
  const currentMinute = now.get('minute');
  const currentSecond = now.get('second');
  const hourInDay = 23;
  let hourCount = 0;
  if (currentHour > TIME_NEW_RESULT) {
    hourCount = currentHour - TIME_NEW_RESULT;
  } else {
    hourCount = hourInDay - TIME_NEW_RESULT + currentHour;
  }

  const formattedHour = hourCount.toString().padStart(2, '0');
  const formattedMinute = currentMinute.toString().padStart(2, '0');
  const formattedSecond = currentSecond.toString().padStart(2, '0');
  let randomBet = formattedHour + formattedMinute + formattedSecond[0];

  if (Number.parseInt(randomBet) > subtractDefault) {
    randomBet = (Number.parseInt(randomBet) - subtractDefault).toString();
  }

  return randomBet;
}
