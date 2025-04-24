'use client';

import type { NewsPaginationProps } from '@/types/news';
import { NewsCategoryEnum, RouterPathEnum } from '@/enums';
import { useRouter } from 'next/navigation';
import { Pagination } from './Pagination';

/**
 * NewsPagination component for the NewsPage
 * This is a client component wrapper for the Pagination component
 */
export const NewsPagination = ({
  totalPages,
  currentPage,
  category,
}: NewsPaginationProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    let url;
    if (category === NewsCategoryEnum.Events) {
      url = `${RouterPathEnum.Event}?page=${page}`;
    } else {
      url = `${RouterPathEnum.News}?page=${page}`;
    }
    router.push(url);
  };

  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};
