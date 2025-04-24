import { HEADER_MENU_ITEMS } from '@/constant/app';
import { MenuItem } from '@/containers/layout';
import { RouterPathEnum } from '@/enums';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type OffcanvasContentProps = {
  onClose: () => void;
};

export const OffcanvasContent = ({ onClose }: OffcanvasContentProps) => {
  const pathname = usePathname();

  return (
    <div className="max-h-full overflow-y-auto scrollbar-hidden py-6 px-4">
      <Link
        href={RouterPathEnum.Promotions}
        prefetch={false}
        className="block text-white mb-3"
        onClick={onClose}
      >
        <Image
          src="/images/promotions/vip-50-percent.webp"
          width={312}
          height={33}
          className="!object-contain w-full rounded-lg"
          alt="Vip Promotions"
        />
      </Link>

      {HEADER_MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          isActive={pathname === item.to}
          onClick={onClose}
          itemofOffcanvas
        />
      ))}
    </div>
  );
};
