import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useDeposit = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'depositGuide',
    'category-title': 'Hướng dẫn',
    'page-title': 'HƯỚNG DẪN NẠP TIỀN',
    section1: {
      title: '1. Nạp Codepay',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Quý khách đăng nhập vào ${brandName} chọn mục Nạp Tiền -> Codepay.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-1',
          value: {
            url: isMobile
              ? '/images/guide/deposit-1-mobile.webp'
              : '/images/guide/deposit-1.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong> Chọn Khuyến Mãi: Chọn khuyến mãi Quý Khách muốn Áp Dụng.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Nhập số tiền muốn nạp và bấm [Nạp Tiền] để lấy thông tin chuyển tiền.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-2',
          value: {
            url: isMobile
              ? '/images/guide/deposit-2-mobile.webp'
              : '/images/guide/deposit-2.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Đăng nhập tài khoản Internet Banking ngân hàng của Quý khách để chuyển tiền, hoặc quét mã QR code trên trang ngân hàng tương ứng chuyển tiền nhanh chóng hơn.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            '<strong>Bước 5:</strong> Điền nội dung chuyển là mã code hệ thống cung cấp.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step6',
          value:
            '<strong>Bước 6:</strong> Sau khi Quý khách chuyển tiền thành công, hệ thống sẽ tự động kiểm tra và cộng tiền vào tài khoản của Quý khách.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-3',
          value: {
            url: isMobile
              ? '/images/guide/deposit-3-mobile.webp'
              : '/images/guide/deposit-3.webp',
          },
        },
        {
          type: SectionItemTypeEnum.NOTELIST,
          title: 'Lưu ý:',
          key: 'notes',
          value: [
            'Nhập nội dung được cung cấp khi chuyển khoản ngân hàng để cập nhật tiền chuyển khoản thành công.',
            'Nạp nhanh siêu tốc 2 phút, không cần tạo phiếu.',
            'Mỗi User có 1 mã chuyển tiền duy nhất, mã này sử dụng được nhiều lần.',
            `Quý khách có thể chuyển khoản liên ngân hàng đến bất kỳ tài khoản nào của ${brandName}.`,
          ],
        },
      ],
    },
    section2: {
      title: '2. Nạp Flexpay',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Quý khách đăng nhập vào ${brandName} chọn mục Nạp Tiền -> Flexpay.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-4',
          value: {
            url: isMobile
              ? '/images/guide/deposit-4-mobile.webp'
              : '/images/guide/deposit-4.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong> Nhập số tiền muốn nạp và bấm [Nạp Tiền] để lấy thông tin chuyển tiền.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-5',
          value: {
            url: isMobile
              ? '/images/guide/deposit-5-mobile.webp'
              : '/images/guide/deposit-5.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-flexpay-step3',
          value:
            '<strong>Bước 3:</strong> Lấy thông tin và thực hiện chuyển tiền. Quý khách có thể quét mã QR code ngân hàng tương ứng để giao dịch nhanh hơn.',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'deposit-flexpay-step4',
          value: [
            'Chọn ngân hàng.',
            'Nhập thông tin người gửi.',
            'Nhập số tiền.',
            'Chọn gói khuyến mãi: Chọn gói khuyến mãi mà Quý khách muốn tham gia.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-flexpay-step5',
          value: '<strong>Bước 4:</strong> Hoàn thành và chờ phiếu được xử lý.',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'deposit-flexpay-step6',
          value: [
            'Quý khách có thể xem mục "Lịch sử giao dịch" để theo dõi các giao dịch Nạp - Rút tiền của mình.',
            `Mọi thắc mắc về quy trình nạp tiền quý khách vui lòng liên hệ trực tiếp ${brandName} tại mục Livechat để được hướng dẫn chi tiết nhất.`,
          ],
        },
      ],
    },
    section3: {
      title: '3. Nạp tiền ảo',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-crypto-1',
          value: `<strong>Bước 1:</strong> Quý khách đăng nhập vào ${brandName} chọn mục Nạp Tiền -> Tiền ảo.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-6',
          value: {
            url: isMobile
              ? '/images/guide/deposit-6-mobile.webp'
              : '/images/guide/deposit-6.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-crypto-2',
          value: '<strong>Bước 2:</strong> Chọn loại tiền ảo.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-crypto-3',
          value:
            '<strong>Bước 3:</strong> Vào page nạp tiền ảo để lấy địa chỉ ví.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-crypto-4',
          value:
            '<strong>Bước 4:</strong> Chuyển tiền ảo vào địa chỉ ví ở bước 2.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-crypto-5',
          value:
            '<strong>Bước 5:</strong> Quý khách đợi từ 2-5 phút hệ thống sẽ tự động xác nhận tiền nạp.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-crypto-6',
          value:
            'Lưu ý: Quý khách có thể quét mã QR code để giao dịch nhanh chóng hơn.',
        },
      ],
    },
    section4: {
      title: '4. Nạp qua Ví điện tử',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-ewallet-1',
          value: `<strong>Bước 1:</strong> Quý khách đăng nhập vào ${brandName} chọn mục Nạp Tiền -> Ví điện tử.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-7',
          value: {
            url: isMobile
              ? '/images/guide/deposit-7-mobile.webp'
              : '/images/guide/deposit-7.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-ewallet-2',
          value:
            '<strong>Bước 2:</strong> Bấm [Nạp Tiền] để lấy thông tin và chuyển tiền.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-8',
          value: {
            url: isMobile
              ? '/images/guide/deposit-8-mobile.webp'
              : '/images/guide/deposit-8.webp',
          },
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'deposit-ewallet-3',
          value: [
            `Sau khi lấy thông tin, quý khách đăng nhập vào tài khoản ví điện tử (Momo, ZaloPay, Viettelmoney) của Quý khách và tiến hành chuyển tiền vào tài khoản của ${brandName}.`,
            'Vui lòng điền lời nhắn chuyển là "Nội dung chuyển" hệ thống cung cấp.',
            'Xác nhận nạp tiền trong momo của quý khách và đợi 30s tiền sẽ tự động chuyển vào tài khoản cược.',
          ],
        },

        {
          type: SectionItemTypeEnum.NOTELIST,
          key: 'deposit-ewallet-6',
          title: 'Lưu ý:',
          value: [
            'Quý khách có thể quét mã QR code để giao dịch nhanh chóng hơn.',
            'Sau khi chuyển khoản hãy chờ khoảng 30 giây tiền sẽ được nạp vào tài khoản của bạn.',
            'Nếu chuyển khoản không điền hoặc điền sai nội dung sẽ không nhận tiền được ngay.',
            'Sau 3 phút nếu chưa nhận được tiền hãy nhờ hỗ trợ SUPPORT 24/24.',
          ],
        },
      ],
    },
    section5: {
      title: '5. Nạp thẻ cào',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-card-1',
          value: `<strong>Bước 1:</strong> Quý khách đăng nhập vào ${brandName} chọn mục Nạp Tiền -> Thẻ cào.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'deposit-9',
          value: {
            url: isMobile
              ? '/images/guide/deposit-9-mobile.webp'
              : '/images/guide/deposit-9.webp',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-card-2',
          value: '<strong>Bước 2:</strong> Điền đầy đủ thông tin thẻ cào.',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'deposit-card-3',
          value: [
            'Nhà mạng: Chọn nhà mạng Quý khách muốn nạp.',
            'Mệnh giá: Nhấp chọn mệnh giá thẻ cào (vui lòng chọn đúng mệnh giá trên thẻ).',
            'Mã thẻ PIN: Nhập đúng mã thẻ (PIN) của thẻ cào.',
            'Số series thẻ: Nhập đúng số series trên thẻ tương ứng.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit-c4rd-4',
          value: '<strong>Bước 3:</strong> Nhấn [Nạp Tiền].',
        },
      ],
    },
  };
};
