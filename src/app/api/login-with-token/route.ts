import type { ApiResponseError } from '@/types/service';
import type { NextRequest } from 'next/server';
import { AuthStorageKeyEnum } from '@/enums';
import { loginWithTokenRequest } from '@/services';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = request.nextUrl.searchParams.get('token');
    const userData = await loginWithTokenRequest({ token: token! });

    if (userData) {
      cookieStore.set({
        name: AuthStorageKeyEnum.User,
        value: JSON.stringify({
          ...userData,
        }),
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours in seconds
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict', // Protects against CSRF
      });
      return NextResponse.json(userData);
    }
    return NextResponse.json(
      {
        message: 'User not found',
      },
      {
        status: 500,
      },
    );
  } catch (error) {
    const errorResponse = error as ApiResponseError;

    return NextResponse.json(
      {
        message: errorResponse.message || 'An error occurred',
      },
      {
        status: errorResponse.code || 500,
      },
    );
  }
}
