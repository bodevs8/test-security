import CasinoWrapper from '@/containers/desktop/casino';

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    partner: string;
    keyword: string;
  }>;
};
export default async function CasinoCategoryPage({
  params,
  searchParams,
}: Props) {
  const [resolvedParams, resolveSearchParam] = await Promise.all([
    await params,
    await searchParams,
  ]);
  return (
    <CasinoWrapper
      category={resolvedParams.category}
      searchParams={resolveSearchParam}
    />
  );
}
