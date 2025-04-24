'use client';
import { formatNumberWithCommas } from '@/utils/format-currency';
import { animate } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

type BaseNumberProps = {
  className?: string;
  unit?: string;
};

type AnimateNumberProps = BaseNumberProps & {
  to: number;
};

type CounterProps = BaseNumberProps & {
  from: number;
  to: number;
};

const Counter = memo(
  ({ from, to, className = '', unit = '' }: CounterProps) => {
    const nodeRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
      const node = nodeRef.current;

      if (node) {
        const controls = animate(from, to, {
          duration: 2,
          onUpdate(value) {
            let formattedValue = formatNumberWithCommas(Math.round(value));
            if (unit) {
              formattedValue += ` ${unit}`;
            }

            node.textContent = formattedValue;
            node.setAttribute('data-content', formattedValue);
          },
        });

        return () => controls.stop();
      }
      return () => {};
    }, [from, to, unit]);

    return <p ref={nodeRef} className={className} />;
  },
);

Counter.displayName = 'Counter';

export const AnimateNumber = memo(
  ({ to, className = '', unit = '' }: AnimateNumberProps) => {
    const [from, setFrom] = useState(0);
    const prevTo = useRef(0);

    useEffect(() => {
      if (prevTo.current !== to) {
        setFrom(prevTo.current);
        prevTo.current = to;
      }
    }, [to]);

    return <Counter from={from} to={to} className={className} unit={unit} />;
  },
);
AnimateNumber.displayName = 'AnimateNumber';
