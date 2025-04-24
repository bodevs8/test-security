import type { NewsCategoryEnum } from '@/enums';
import { DESKTOP_ITEMS_PER_PAGE, MOBILE_ITEMS_PER_PAGE } from '@/constant/news';
import { getPosts, getPostsMostView } from '@/services';
import { isMobileDevice } from '@/utils/device';

/**
 * Fetches all required news data for the page
 */
export async function fetchNewsData(
  currentPage: number,
  category: NewsCategoryEnum,
) {
  try {
    // Check if device is mobile first before making API call
    const isMobile = await isMobileDevice();
    const ITEMS_PER_PAGE = isMobile
      ? MOBILE_ITEMS_PER_PAGE
      : DESKTOP_ITEMS_PER_PAGE;

    // Call getPosts API with the appropriate items per page
    const newsDataResponse = await getPosts({
      limit: ITEMS_PER_PAGE,
      page: currentPage,
      category,
    });

    // For desktop only, fetch hot news data
    const hotNewsData = !isMobile ? await getPostsMostView() : [];

    const newsData = newsDataResponse?.posts || [];

    const totalItems = newsDataResponse?.total || 0;

    return {
      newsData,
      hotNewsData,
      totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };
  } catch (error) {
    console.error('Error fetching news data:', error);
    return {
      newsData: [],
      hotNewsData: [],
      totalPages: 0,
    };
  }
}
