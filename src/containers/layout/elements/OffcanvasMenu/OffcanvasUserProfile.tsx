import { AccountLinkEnum } from '@/enums';
import { useUserStore } from '@/hooks/stores';
import { formatNumberWithCommas } from '@/utils/format-currency';
import Image from 'next/image';
import Link from 'next/link';

export const OffcanvasUserProfile = ({
  toggleOffcanvas,
}: {
  toggleOffcanvas: () => void;
}) => {
  const { user } = useUserStore((state) => state);

  // TODO: Get vip icon src from backend
  const vipIconSrc = '/images/account/vip/vip-0.webp';

  const handleToOverview = () => {
    toggleOffcanvas();
  };

  return (
    <Link
      href={AccountLinkEnum.Overview}
      onClick={handleToOverview}
      className="block"
      prefetch={false}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-[14px]">
          <Image
            src="/images/account/profile/avatar.webp"
            alt="user avatar"
            width={48}
            height={48}
            loading="lazy"
            className="!w-[48px] aspect-[48/48] object-cover"
          />
          <div className="w-full overflow-hidden max-w-[180px]">
            <div className="flex items-center gap-2">
              <div className="font-medium leading-6 text-white username text-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                {user?.fullname}
              </div>
              <Image
                src={vipIconSrc}
                alt="Vip 1"
                width={32}
                height={32}
                loading="lazy"
                className="!w-[32px] aspect-[32/32] object-cover"
              />
            </div>
            <div className="font-bold text-yellow-100 text-[14px] leading-[21px]">
              {`${formatNumberWithCommas(user?.balance || 0)} D`}
            </div>
          </div>
        </div>
        <span className="icon icon-arrow-right text-xs flex items-center justify-center w-6 h-6 rounded-full bg-neutral-400 before:!text-white" />
      </div>
    </Link>
  );
};
