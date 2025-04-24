import type { NextRequest } from 'next/server';
import {
  AccountLinkEnum,
  AuthStorageKeyEnum,
  ModalIdEnum,
  RouterPathEnum,
} from '@/enums';

import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PROTECTED_LINKS } from './constant/app';

export async function middleware(request: NextRequest) {
  const result = createMiddleware(routing)(request);
  const cookieStore = await cookies();

  const pathName = request.nextUrl.pathname;
  result.headers.set('current_path', pathName);

  if (pathName === RouterPathEnum.ResetPassword) {
    const token = request.nextUrl.searchParams.get('token');
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('openModal', ModalIdEnum.ForgotPassword);
    redirectUrl.searchParams.set('token', token);
    return NextResponse.redirect(redirectUrl);
  }

  // Handle login success case
  const user = request.cookies.get(AuthStorageKeyEnum.User);
  const hasResetToken = request.nextUrl.searchParams.has('token');
  if (user && hasResetToken) {
    const cleanUrl = new URL(request.url);
    cleanUrl.searchParams.delete('token');
    cleanUrl.searchParams.delete('openModal');
    return NextResponse.redirect(cleanUrl);
  }

  if (
    PROTECTED_LINKS.some((path) => pathName.startsWith(path)) ||
    Object.values(AccountLinkEnum).some((path) => pathName.startsWith(path))
  ) {
    // Get url current
    const lastPath = cookieStore.get(AuthStorageKeyEnum.LastPath);
    const origin = `${request.nextUrl.protocol}//${request.nextUrl.host}${lastPath?.value || ''}`;
    const redirectUrl = new URL(origin);
    redirectUrl.searchParams.set('openModal', ModalIdEnum.Login);
    redirectUrl.searchParams.set('returnUrl', request.nextUrl.pathname);

    return request.cookies.get(AuthStorageKeyEnum.User)
      ? result
      : NextResponse.redirect(String(redirectUrl));
  }

  cookieStore.set(AuthStorageKeyEnum.LastPath, request.nextUrl.pathname);

  return result;
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api).*)', '/(account)/:path*'],
};
