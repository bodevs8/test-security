'use client';

import { GUIDELINE_MENUS } from '@/constant/app';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const GuideSidebar = () => {
  const pathname = usePathname();
  const currentSlug = pathname.replace('/', '');

  return (
    <div className="bg-white text-dark-200 rounded-lg p-4">
      <nav>
        {GUIDELINE_MENUS.map((category, index) => (
          <div
            key={category.id}
            className={clsx(index < GUIDELINE_MENUS.length - 1 ? 'mb-4' : '')}
          >
            <div className="px-5 py-3 uppercase font-bold leading-7 text-dark-700">
              {category.title}
            </div>

            <div className="menu-items flex flex-col gap-3">
              {category.items.map((item) => {
                const isActive = item.id === currentSlug;
                return (
                  <Link
                    key={item.id}
                    href={`/${item.id}`}
                    prefetch={false}
                    className={clsx(
                      'menu-item block px-5 py-3 font-medium capitalize transition-all leading-normal relative z-10 whitespace-nowrap rounded-[4px]',
                      isActive
                        ? 'text-green-500 !font-bold bg-primary-light-50'
                        : 'hover:text-green-500 hover:font-bold hover:bg-primary-light-50',
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            {/* Add divider between categories except for the last one */}
            {index < GUIDELINE_MENUS.length - 1 && (
              <div className="mx-10 h-px bg-neutral-400 my-2"></div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
