import type { ApiResponseError } from '@/types/service';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Get all cookies
    const allCookies = cookieStore.getAll();

    // Delete each cookie one by one
    for (const cookie of allCookies) {
      cookieStore.delete(cookie.name);
    }

    return NextResponse.json({ message: 'All cookies cleared successfully' });
  } catch (error) {
    const errorResponse = error as ApiResponseError;
    return NextResponse.json(errorResponse, {
      status: errorResponse.code || 500,
    });
  }
}
