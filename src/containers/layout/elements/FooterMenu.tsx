import type { FooterMenuItem } from '@/types/menu';
import { useGameContext } from '@/hooks/contexts';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type FooterMenuProps = {
  menu: FooterMenuItem;
};

export const FooterMenu = ({ menu }: FooterMenuProps) => {
  const gameContext = useGameContext();
  const t = useTranslations();

  return (
    <div>
      <div className="max-[389px]:text-[14px] text-white font-medium uppercase leading-5 whitespace-nowrap">
        {t(menu.name)}
      </div>
      <ul className="flex flex-col items-start justify-start gap-3.5 max-[389px]:gap-[10px] max-[389px]:mt-[10px] mt-[18px]">
        {menu.children.map((child, childIndex) => {
          if (child.isOpenNewTab) {
            return (
              <li key={childIndex}>
                <div
                  className="max-[389px]:text-[12px] text-[14px] md:text-base font-normal capitalize leading-[22px] text-primary-light-200-50 hover:text-white whitespace-nowrap"
                  onClick={() => {
                    gameContext.openIframeGame(child.url);
                  }}
                >
                  {t(child.name)}
                </div>
              </li>
            );
          }
          return (
            <li key={childIndex}>
              <Link
                prefetch={false}
                href={child.url}
                className="max-[389px]:text-[12px] text-[14px] md:text-base font-normal capitalize leading-[22px] text-primary-light-200-50 hover:text-white whitespace-nowrap"
              >
                {t(child.name)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
