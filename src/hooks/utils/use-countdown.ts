'use client';
import { DATE_FORMAT_LOTTERY, VN_TIMEZONE } from '@/constant/constants';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};
export const useCountdown = (targetDate: Date, timezone?: string) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const target = timezone
        ? dayjs(targetDate).tz(timezone)
        : dayjs(targetDate);
      const distance = target.valueOf() - now.valueOf();

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, timezone]);

  return formatTime(timeLeft);
};

export const useCountdownOtpEmail = () => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const storedExpiration = localStorage.getItem('otpEmailTimeout');

    if (storedExpiration) {
      const expirationTime = new Date(storedExpiration).getTime();
      const now = Date.now();
      const timeLeft = Math.max(0, Math.floor((expirationTime - now) / 1000));
      setRemainingTime(timeLeft);
    }
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(timer);
            localStorage.removeItem('otpEmailTimeout');
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
    return undefined;
  }, [remainingTime]);

  const startCountdown = (duration: number) => {
    const expirationTime = new Date(Date.now() + duration * 1000);
    localStorage.setItem('otpEmailTimeout', expirationTime.toISOString());
    setRemainingTime(duration);
  };
  const clearCountdown = () => {
    localStorage.removeItem('otpEmailTimeout');
    setRemainingTime(0);
  };

  return { remainingTime, startCountdown, clearCountdown };
};
export const useCountDownLottery = (target: Date | string) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [targetDate, setTargetDate] = useState<Date>(target as Date);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs().tz(VN_TIMEZONE).format(DATE_FORMAT_LOTTERY);
      const distance = dayjs(targetDate).diff(dayjs(now));
      if (distance <= 0) {
        setTimeLeft(0);
        setTargetDate(dayjs(targetDate).add(1, 'day').toDate());
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return formatTime(timeLeft);
};
