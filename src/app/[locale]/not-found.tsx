import { Button } from '@/components/ui/button';
import { ButtonVariantsEnum } from '@/enums';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container md:-mt-7 md:bg-auto px-3 bg-[auto_600px]">
      <div className="overlay"></div>

      <div className="content-container mt-12">
        <Image
          src="/images/404.svg"
          alt="Not Found"
          height={200}
          width={300}
          className="mx-auto md:mb-5.5 max-w-[243px] md:w-[316px] md:max-w-full"
          priority
          loading="eager"
          fetchPriority="high"
        />

        <div className="text-center m-auto">
          <Button
            id="login-button"
            name="login-button"
            className="w-[155px]"
            variant={ButtonVariantsEnum.Secondary}
          >
            <Link href="/" prefetch={false}>
              Trang Chủ
            </Link>
          </Button>
        </div>
      </div>
      <div className="text-center text-dark-200 font-medium mt-5.5 text-xs md:text-base max-w-[600px] flex flex-col items-center justify-center">
        <p>Có vẻ như chúng tôi không thể tìm thấy trang mà bạn yêu cầu.</p>
        <p>Vui lòng quay lại trang chủ hoặc thử tìm kiếm thông tin bạn cần.</p>
      </div>
    </div>
  );
}
