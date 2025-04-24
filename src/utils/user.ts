import type { UserData } from '@/types/auth';
import { AuthStorageKeyEnum } from '@/enums';
import { cookies } from 'next/headers';

export const getUser = async (): Promise<UserData | undefined> => {
  const cookieStore = await cookies();
  const user = cookieStore.get(AuthStorageKeyEnum.User);
  return user ? JSON.parse(user.value) : undefined;
};
