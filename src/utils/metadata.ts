import { METADATA } from '@/constant/metadata';
import { RouterPathEnum } from '@/enums';

export function getDataSEO(currentPath: string) {
  if (currentPath.startsWith(RouterPathEnum.News)) {
    currentPath = RouterPathEnum.News;
  }

  if (currentPath.startsWith(RouterPathEnum.Promotions)) {
    currentPath = RouterPathEnum.Promotions;
  }
  const seoData = METADATA[currentPath] || METADATA['/'];
  return seoData;
}
