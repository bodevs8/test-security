import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

export const useRegister = (isMobile?: boolean): GuidelineContent => {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';
  return {
    key: 'registerGuides',
    'category-title': 'Hướng dẫn',
    'page-title': `Hướng dẫn tạo tài Khoản trên ${brandName}`,
    section1: {
      title: '',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          className: 'font-bold text-base',
          value:
            'Bước 1: Ấn chọn nút "Đăng Ký" nằm phía trên cùng góc phải màn hình.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'register-1',
          value: {
            url: isMobile
              ? '/images/_brand/guide/tutorial-register-1-mobile.webp'
              : '/images/_brand/guide/tutorial-register-1.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          className: 'font-bold text-base',
          value: 'Bước 2: Điền các thông tin yêu cầu trong phiếu Đăng Ký.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'register-2',
          value: {
            url: isMobile
              ? '/images/_brand/guide/tutorial-register-2-mobile.webp'
              : '/images/_brand/guide/tutorial-register-2.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.NOTELIST,
          key: 'step3',
          value: [
            'Tên đăng nhập: Không được ít hơn 6 ký tự, viết liền, không dấu, không có khoảng trắng và không được trùng với Tên đăng nhập đã tạo trước đó.',
            'Mật khẩu: Không được ít hơn 6 ký tự, viết liền không dấu.',
            'Số điện thoại: Cung cấp số điện thoại Quý khách đang dùng. Bắt đầu bằng số 0 và không được ít hơn 10 số.',
            'Mã giới thiệu: Nhập mã giới thiệu từ bạn bè nếu có.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          className: 'font-bold text-base',
          value:
            'Bước 3: Sau khi đã điền đầy đủ các thông tin, nhấn nút "Đăng Ký".',
        },
      ],
    },
  };
};
