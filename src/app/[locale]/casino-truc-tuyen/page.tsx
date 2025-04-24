import CasinoWrapper from '@/containers/desktop/casino';
import { CasinoSlugEnum } from '@/enums/app';

type Props = {
  searchParams: Promise<{
    partner: string;
    keyword: string;
  }>;
};
export default async function CasinoCategoryPage({ searchParams }: Props) {
  const [resolveSearchParam] = await Promise.all([await searchParams]);
  return (
    <CasinoWrapper
      category={CasinoSlugEnum.All}
      searchParams={resolveSearchParam}
    />
  );
}
