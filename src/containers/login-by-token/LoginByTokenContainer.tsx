'use client';

import type { ApiResponseError } from '@/types/service';
import { RouterPathEnum } from '@/enums';
import { useToast } from '@/hooks/utils';
import { loginWithTokenRequest } from '@/services/client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const LoginByTokenContainer = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const pathname = usePathname();
  const { error } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const loginWithToken = async (token: string) => {
      try {
        await loginWithTokenRequest({ token });
      } catch (ex) {
        error((ex as ApiResponseError).message as string);
      }

      timer = setTimeout(() => {
        window.location.href = RouterPathEnum.Home;
      }, 1000);
    };

    if (token) {
      loginWithToken(token);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [token, pathname, error]);

  return <></>;
};

export default LoginByTokenContainer;
