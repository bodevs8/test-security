import clsx from 'clsx';
import Link from 'next/link';

type CategoryTabProps = {
  href: string;
  isActive: boolean;
  label: string;
  icon?: string;
  isMobile?: boolean;
};

export const CategoryTab = ({
  href,
  isActive,
  label,
  icon = 'icon-news',
  isMobile,
}: CategoryTabProps) => {
  const baseClasses =
    'h-10 px-[10px] rounded-sm border-1 border-transparent text-sm font-medium flex items-center justify-center';
  const activeClasses =
    'bg-light-green-gradient !border-green-500 text-green-500';
  const inactiveClasses = isMobile
    ? 'from-transparent to-transparent text-dark-200 bg-primary-light-100'
    : 'from-transparent to-transparent text-dark-200';

  return (
    <Link
      prefetch={false}
      href={href}
      className={clsx(
        baseClasses,
        isActive ? activeClasses : inactiveClasses,
        'hover:border-green-500 hover:bg-light-green-gradient hover:text-green-500',
      )}
    >
      {icon && <span className={clsx('text-lg mr-2', icon)} />}
      {label}
    </Link>
  );
};
