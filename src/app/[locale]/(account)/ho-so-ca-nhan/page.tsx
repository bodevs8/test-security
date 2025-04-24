import { ResponsiveView } from '@/components/ResponsiveView';
import MyProfileContainer from '@/containers/desktop/account/my-profile/MyProfileContainer';
import { getUser } from '@/utils/user';

const MyProfilePage = async () => {
  const user = await getUser();

  return (
    <ResponsiveView
      mobile={<MyProfileContainer user={user} />}
      desktop={<MyProfileContainer user={user} />}
    />
  );
};

export default MyProfilePage;
