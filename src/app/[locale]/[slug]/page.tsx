import { GuidelineContent } from '@/components/Guideline';
import { IframeSports } from '@/components/IframeSports';
import { IFRAME_SPORTS_GAMES } from '@/constant/iframe';
import { RouterPathEnum } from '@/enums';
import { getIframeBySlug } from '@/services';
import { isMobileDevice } from '@/utils/device';
import { getGuidelineBySlug, isGuidelineSlug } from '@/utils/guideline';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const SlugPage = async ({ params, searchParams }: Props) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isMobile = await isMobileDevice();
  const isGuideline = isGuidelineSlug(resolvedParams.slug);

  if (isGuideline) {
    const guidelineContent = getGuidelineBySlug(resolvedParams.slug);

    if (!guidelineContent) {
      return redirect(RouterPathEnum.NotFound);
    }

    return <GuidelineContent isMobile={isMobile} />;
  }

  let apiEndpoint = IFRAME_SPORTS_GAMES[resolvedParams.slug] as string;

  if (!apiEndpoint) {
    return redirect(RouterPathEnum.NotFound);
  }

  const buildParams = new URLSearchParams();

  // Add all params to searchParams
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    buildParams.append(key, value as string);
  });

  // Convert searchParams to string
  const queryString = buildParams.toString();

  if (queryString) {
    apiEndpoint = `${apiEndpoint}&${queryString}`;
  }

  const dataIframe = await getIframeBySlug(apiEndpoint);

  return (
    <IframeSports
      iframeUrl={String(dataIframe)}
      slug={String(resolvedParams.slug)}
    />
  );
};
export default SlugPage;
