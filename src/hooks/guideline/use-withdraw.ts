import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useWithdraw = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'withdrawGuides',
    'category-title': 'Hướng dẫn',
    'page-title': 'HƯỚNG DẪN RÚT TIỀN',
    section1: {
      title: '1. Rút tiền qua tài khoản ngân hàng',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `<strong>Bước 1:</strong> Đăng nhập tài khoản tại trang chủ ${brandName}. Quý khách chọn mục RÚT TIỀN, chọn RÚT TIỀN QUA NGÂN HÀNG.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'withdraw-1',
          value: {
            url: isMobile
              ? '/images/guide/withdraw-1-mobile.webp'
              : '/images/guide/withdraw-1.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value:
            '<strong>Bước 2:</strong> Quý khách điền đầy đủ thông tin RÚT TIỀN.',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'notes',
          value: [
            'Chọn Ngân hàng: Ngân hàng Quý khách muốn rút tiền về.',
            'Chủ tài khoản: Sẽ được cố định sau khi quý khách cập nhật thông tin tài khoản.',
            'Số tài khoản: Sẽ được cố định sau khi Quý khách cập nhật thông tin tài khoản.',
            'Số tiền: Điền số tiền Quý khách muốn rút (Lưu ý: Cần loại bỏ 3 số 0. Ví dụ rút 1,000,000 VND chỉ cần điền 1,000).',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value: `Quý khách Click chọn RÚT TIỀN để hoàn tất và chờ ${brandName} xử lý trong vài phút. Quý khách có thể truy cập lịch sử giao dịch để kiểm tra lệnh rút của mình.`,
        },
        {
          type: SectionItemTypeEnum.NOTELIST,
          key: 'content4',
          title: 'Lưu ý:',
          value: [
            'Số tiền tối thiểu cho mỗi một lần rút là 100,000 VND.',
            'Số tiền tối đa cho mỗi lần rút là 1,000,000,000 VND.',
          ],
        },
      ],
    },
    section2: {
      title: '2. Rút tiền qua thẻ cào',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `<strong>Bước 1:</strong> Đăng nhập tài khoản tại trang chủ ${brandName}. Quý khách chọn mục RÚT TIỀN, chọn RÚT TIỀN QUA THẺ CÀO.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'withdraw-2',
          value: {
            url: isMobile
              ? '/images/guide/withdraw-2-mobile.webp'
              : '/images/guide/withdraw-2.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            '<strong>Bước 2:</strong> Quý khách điền đầy đủ thông tin rút THẺ CÀO.',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'notes',
          value: [
            'Chọn nhà mạng: Click chọn nhà mạng Quý khách muốn rút về.',
            'Mệnh giá: Chọn mệnh giá thẻ.',
            'Số lượng thẻ: Chọn số lượng thẻ ứng với mệnh giá đã chọn.',
          ],
        },
        {
          type: SectionItemTypeEnum.NOTELIST,
          key: 'content4',
          title: 'Lưu ý:',
          value: [
            'Vui lòng chọn đúng mệnh giá và nhà mạng, nếu chọn sai chúng tôi không chịu trách nhiệm.',
            'Sau khi điền đầy đủ các thông tin trên Quý khách bấm chọn RÚT TIỀN đồng thời vui lòng chờ ít phút để hệ thống kiểm tra và chuyển tiền đến tài khoản của Quý khách. Quý khách có thể theo dõi việc xử lý giao dịch tại mục Lịch sử giao dịch.',
            'Số lượng thẻ cào tối đa cho mỗi lần rút là 5 thẻ cào.',
          ],
        },
      ],
    },
    section3: {
      title: '3. Rút qua tiền ảo / COIN12',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `<strong>Bước 1:</strong> Đăng nhập tài khoản tại trang chủ ${brandName}. Quý khách chọn mục RÚT TIỀN, sau đó chọn Tiền Ảo / COIN12.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'withdraw-3',
          value: {
            url: isMobile
              ? '/images/guide/withdraw-3-mobile.webp'
              : '/images/guide/withdraw-3.webp',
            caption: 'Tiền Ảo',
          },
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'withdraw-4',
          value: {
            url: isMobile
              ? '/images/guide/withdraw-4-mobile.webp'
              : '/images/guide/withdraw-4.webp',
            caption: 'COIN12',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value:
            '<strong>Bước 2:</strong> Quý khách điền đầy đủ thông tin RÚT TIỀN QUA CRYPTO.',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'notes',
          value: [
            'Loại Crypto: Chọn loại tiền điện tử mà Quý khách muốn rút (Ví dụ: Bitcoin, Ethereum, USDT, ...).',
            'Địa chỉ ví: Nhập địa chỉ ví tiền điện tử của Quý khách.',
            'Số tiền: Điền số tiền Quý khách muốn rút bằng tiền điện tử.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content4',
          value:
            'Xác minh qua điện thoại: Quý khách cần nhập mã xác minh được gửi đến số điện thoại đã đăng ký để hoàn tất yêu cầu rút tiền.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content5',
          value: 'Lưu ý: Số tiền tối thiểu cho mỗi lần rút là 100,000 VND',
        },
      ],
    },
  };
};
