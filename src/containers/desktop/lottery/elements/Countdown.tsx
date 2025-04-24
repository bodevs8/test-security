'use client';
import { useCountDownLottery } from '@/hooks/utils';
import { formatTime } from '@/utils/helpers';

type CountdownProps = {
  endTime: Date | string;
  isNextRound?: boolean;
};

export const Countdown = ({ endTime, isNextRound }: CountdownProps) => {
  const { hours, minutes, seconds } = useCountDownLottery(endTime);
  return (
    <span>
      {isNextRound && (
        <div className="flex items-center justify-center bg-gradient-neutral-1 w-[41.03vw] h-[7.69vw] md:w-[15.83vw] md:h-[3.13vw] xl:w-[160px] xl:h-[30px] rounded-[4px]">
          {[hours, minutes, seconds].map((el, index) => (
            <div
              className="flex items-center text-dark-700 text-[4.1vw] md:text-[1.56vw] xl:text-base font-medium"
              key={index}
            >
              {index > 0 && <div className="mx-1 pb-0.5">:</div>}
              <p className="flex items-center justify-center leading-[10.26vw] md:leading-[3.13vw] xl:leading-10 w-[10.26vw] md:w-[3.13vw] xl:w-10">
                {formatTime(el)}
                {index === 0 ? 'h' : index === 1 ? 'm' : 's'}
              </p>
            </div>
          ))}
        </div>
      )}
      {!isNextRound && (
        <span className="">
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </span>
      )}
    </span>
  );
};
