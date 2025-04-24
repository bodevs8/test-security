import { join } from 'path';
import { MetadataOgEnum } from '@/enums';
import { headers } from 'next/headers';
import { getBaseUrl } from './helpers';
import { getDataSEO } from './metadata';

const baseUrl = getBaseUrl();

export const getSeoData = async () => {
  const headersList = await headers();
  const currentPath = headersList.get('current_path') || '/';
  const dataSeo = getDataSEO(currentPath);
  return {
    ...dataSeo,
    currentPath,
  };
};

export const getSEOMetadata = async () => {
  const dataSeo = await getSeoData();

  return {
    h1: dataSeo?.h1,
    metadataBase: new URL(baseUrl),
    title: dataSeo?.title,
    description: dataSeo?.description,
    openGraph: {
      title: dataSeo?.title,
      description: dataSeo?.description,
      locale: MetadataOgEnum.LOCALE.toString(),
      images: [
        {
          url: MetadataOgEnum.IMG.toString(),
          width: Number(MetadataOgEnum.OG_WITDH),
          height: Number(MetadataOgEnum.OG_HEIGHT),
        },
      ],
      url: join(baseUrl, dataSeo.currentPath),
      type: (dataSeo?.type || MetadataOgEnum.OG_TYPE) as 'website',
    },
    twitter: {
      title: dataSeo?.title,
      site: baseUrl,
      description: dataSeo?.description,
      card: 'summary_large_image',
      images: join(baseUrl, MetadataOgEnum.IMG),
    },
    alternates: {
      canonical: join(baseUrl, dataSeo.currentPath),
    },
  };
};
