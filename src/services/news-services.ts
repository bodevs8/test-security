import type { GetPostsParams, NewsItemType } from '@/types/news';
import type { ApiNewsResponse } from '@/types/service';
import { CACHE_DURATION } from '@/constant/app';
import { ApiEndpointEnum } from '@/enums';
import { get } from '@/services';

export const getPosts = async (params: GetPostsParams) => {
  try {
    const data = await get<
      ApiNewsResponse<{ posts: NewsItemType[]; total?: number }>
    >(ApiEndpointEnum.GetPosts, params, {
      next: { revalidate: CACHE_DURATION },
    });

    return data?.data;
  } catch {
    return {
      posts: [],
    };
  }
};

export const getPostsMostView = async () => {
  try {
    const data = await get<ApiNewsResponse<{ posts: NewsItemType[] }>>(
      ApiEndpointEnum.GetPostsMostView,
      {},
      {
        next: { revalidate: CACHE_DURATION },
      },
    );

    return data?.posts;
  } catch {
    return [];
  }
};

export const getNewsDetail = async (slug: string) => {
  try {
    const data = await get<ApiNewsResponse<NewsItemType>>(
      `${ApiEndpointEnum.GetPostDetail}/${slug}`,
      {},
      {
        next: { revalidate: CACHE_DURATION },
      },
    );

    return data?.data;
  } catch {
    return null;
  }
};
