import type { PropsWithChildren } from 'react';
import { GuidelineLayout, GuidelineLayoutMobile } from '@/components/Guideline';
import { ResponsiveView } from '@/components/ResponsiveView';
import { RouterPathEnum } from '@/enums';
import { isGuidelineSlug } from '@/utils/guideline';

export const revalidate = 60;
export const dynamic = 'auto';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Layout = async ({ children, params }: PropsWithChildren<Props>) => {
  const resolvedParams = await params;
  const isGuideline = isGuidelineSlug(resolvedParams.slug.toLowerCase());

  if (resolvedParams.slug === RouterPathEnum.NotFound.replace(/^\/+/, '')) {
    return;
  }

  if (isGuideline) {
    return (
      <ResponsiveView
        mobile={<GuidelineLayoutMobile>{children}</GuidelineLayoutMobile>}
        desktop={<GuidelineLayout>{children}</GuidelineLayout>}
      />
    );
  }

  return children;
};

export default Layout;
