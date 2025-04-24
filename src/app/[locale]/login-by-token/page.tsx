import { Loading } from '@/components/Loading';
import LoginByTokenContainer from '@/containers/login-by-token/LoginByTokenContainer';
import { RouterPathEnum } from '@/enums';
import { getUser } from '@/utils/user';
import { redirect } from 'next/navigation';

export default async function LoginByTokenPage() {
  const user = await getUser();

  if (user) {
    redirect(RouterPathEnum.Home);
  }

  return (
    <div className="h-screen relative md:-mt-7 md:bg-auto px-3 bg-[auto_600px]">
      <Loading />
      <LoginByTokenContainer />
    </div>
  );
}
