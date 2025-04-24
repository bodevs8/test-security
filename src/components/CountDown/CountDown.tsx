'use client';
import { useCountdown } from '@/hooks/utils';
import { formatTime } from '@/utils/helpers';

type CountDownProps = {
  targetDate: Date;
};

export const CountDown = ({ targetDate }: CountDownProps) => {
  const { hours, minutes, seconds } = useCountdown(new Date(targetDate));

  return (
    <div className="flex items-center gap-[2px]">
      {formatTime(hours).map((digit, index) => (
        <span className="challenge-countdown-item" key={`hours-${index}`}>
          {digit}
        </span>
      ))}
      <span className="text-white">:</span>
      {formatTime(minutes).map((digit, index) => (
        <span className="challenge-countdown-item" key={`minutes-${index}`}>
          {digit}
        </span>
      ))}
      <span className="text-white">:</span>
      {formatTime(seconds).map((digit, index) => (
        <span className="challenge-countdown-item" key={`seconds-${index}`}>
          {digit}
        </span>
      ))}
    </div>
  );
};
