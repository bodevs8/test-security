import { TIMEOUT_FOCUS_INPUT_SEARCH } from '@/constant/app';
import { useEffect } from 'react';

type Props = {
  el: HTMLInputElement;
  isActive?: boolean;
  callback?: () => void;
  timeOut?: number;
};

export const useFocusInPutSearch = (props: Props) => {
  const {
    el,
    isActive = true,
    callback,
    timeOut = TIMEOUT_FOCUS_INPUT_SEARCH,
  } = props;

  useEffect(() => {
    const handleForcusInputSearch = setTimeout(() => {
      if (isActive) {
        callback?.();
      }
    }, timeOut);
    return () => clearTimeout(handleForcusInputSearch);
  }, [isActive, el, timeOut, callback]);
};
