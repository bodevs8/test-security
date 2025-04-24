'use client';

import { TabLineMenu } from '@/components/TabLineMenu/TabLineMenu';
import { GUIDELINE_MENUS } from '@/constant/app';
import { TabVariantEnum } from '@/enums';
import { usePathname, useRouter } from 'next/navigation';

import { useCallback, useEffect, useMemo, useState } from 'react';

const HeaderGuidelineMobile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState('');

  useEffect(() => {
    const currentSlug = pathname?.split('/').pop() || '';

    for (const category of GUIDELINE_MENUS) {
      if (category.items.some((item) => item.id === currentSlug)) {
        setActive(category.id);
        break;
      }
    }
  }, [pathname]);

  const transformedMenu = useMemo(() => {
    return GUIDELINE_MENUS.map((category) => ({
      id: category.id,
      title: category.title,
    }));
  }, []);

  const handleTabClick = useCallback(
    (categoryId: string) => {
      setActive(categoryId);

      const selectedCategory = GUIDELINE_MENUS.find(
        (item) => item.id === categoryId,
      );

      if (!selectedCategory?.items?.length) return;

      const firstItem = selectedCategory.items[0];
      if (!firstItem) return;

      let path = firstItem.isDirectUrl
        ? `/${firstItem.id}`
        : `/${firstItem.id}`;

      if (categoryId === 'huong-dan' && !path.includes(`/`)) {
        path = `/${firstItem.id}`;
      }

      router.push(path);
    },
    [router],
  );

  return (
    <div className="w-full h-[50px] header-guideline-mobile fixed top-[50px] left-0 right-0 z-10 border-b border-neutral-200">
      <TabLineMenu
        items={transformedMenu}
        defaultActive={active}
        className="!bg-white text-dark-200 text-nowrap"
        titleClassName="leading-5 !text-[14px] font-[500]"
        tabClassName="!text-xs px-3 min-[390px]:!text-sm !h-[50px]  !font-[500] !bg-white !normal-case"
        isFillContainer={false}
        variant={TabVariantEnum.Gradient}
        onClick={handleTabClick}
        tabLineMenuClassName="justify-between !gap-0"
      />
    </div>
  );
};

export default HeaderGuidelineMobile;
