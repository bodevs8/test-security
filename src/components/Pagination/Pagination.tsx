'use client';
import { MAX_PAGE } from '@/constant/app';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

export const Pagination = ({
  totalPages,
  currentPage,
  className,
  onPageChange,
}: PaginationProps) => {
  const t = useTranslations();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      type="button"
      className={clsx('page-number page-item', {
        active: currentPage === page,
      })}
      onClick={() => handlePageClick(page)}
    >
      {page}
    </button>
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= MAX_PAGE) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      pageNumbers.push(renderPageButton(1));

      if (currentPage > 3) {
        pageNumbers.push(
          <span key="left-ellipsis" className="page-ellipsis">
            ...
          </span>,
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <span key="right-ellipsis" className="page-ellipsis">
            ...
          </span>,
        );
      }

      if (totalPages > 1) {
        pageNumbers.push(renderPageButton(totalPages));
      }
    }

    return pageNumbers;
  };

  return (
    <div
      className={clsx(
        'pagination flex items-center justify-center w-full gap-2',
        className,
      )}
    >
      <button
        type="button"
        className={clsx('page-item flex items-center gap-1 !w-[62px]', {
          disabled: currentPage === 1,
        })}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="icon-nav-left" />
        <span className="text-[12px] !font-medium">
          {t('Common.button.prev')}
        </span>
      </button>

      {renderPageNumbers()}

      <button
        type="button"
        className={clsx('page-item flex items-center gap-1 !w-[50px]', {
          disabled: currentPage === totalPages,
        })}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="text-[12px] !font-medium">
          {t('Common.button.next')}
        </span>
        <i className="icon-nav-right" />
      </button>
    </div>
  );
};
