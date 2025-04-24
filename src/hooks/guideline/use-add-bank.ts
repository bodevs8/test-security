import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

export const useAddBank = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'addBankGuide',
    'category-title': 'Hướng dẫn',
    'page-title': 'THÊM TÀI KHOẢN NGÂN HÀNG',
    section1: {
      title: '  ',
      items: [
        {
          type: SectionItemTypeEnum.STEP,
          key: 'step1',
          value:
            '<strong>Bước 1: </strong> Tại trang chủ, nhấp vào nút "Nạp tiền", sau đó nhấp vào nút "Thông tin ngân hàng".',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'add-bank-1',
          value: {
            url: isMobile
              ? '/images/_brand/guide/tutorial-add-bank-1-mobile.webp'
              : '/images/_brand/guide/tutorial-add-bank-1.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.STEP,
          key: 'step2',
          value: '<strong>Bước 2: </strong> Nhấp vào nút "Thêm tài khoản".',
        },
        {
          type: SectionItemTypeEnum.STEP,
          key: 'step3',
          value:
            '<strong>Bước 3: </strong> Điền đầy đủ các thông tin cần thiết.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'add-bank-2',
          value: {
            url: isMobile
              ? '/images/_brand/guide/tutorial-add-bank-2-mobile.webp'
              : '/images/_brand/guide/tutorial-add-bank-2.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.STEP,
          key: 'step4',
          value: '<strong>Bước 4: </strong> Nhấp vào nút "Thêm tài khoản".',
        },
        {
          type: SectionItemTypeEnum.STEP,
          key: 'step5',
          value:
            '<strong>Bước 5: </strong> Hệ thống sẽ tiến hành xác minh tài khoản của bạn.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'add-bank-3',
          value: {
            url: isMobile
              ? '/images/_brand/guide/tutorial-add-bank-3-mobile.webp'
              : '/images/_brand/guide/tutorial-add-bank-3.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.NOTELIST,
          key: 'content6',
          title: '<strong>LƯU Ý: </strong>',
          value: [
            'Mỗi ngân hàng chỉ có thể thêm một tài khoản duy nhất.',
            'Quý khách chỉ có thể thêm tối đa 10 tài khoản ngân hàng.',
          ],
        },
      ],
    },
  };
};
