import type { GuidelineContent } from '@/types/guideline';
import process from 'process';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useRemitano = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'remitanoGuides',
    'category-title': 'Hướng dẫn',
    'page-title': `Hướng Dẫn Rút Và Bán USDT Trên ${brandName} Qua Ví Remitano`,
    section: {
      title: '',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Hiện nay giao dịch rút tiền ảo USDT thông qua ví Remitano đã trở nên phổ biến hơn bao giờ hết. Bắt đầu từ 1:00 ngày 9/7/2024 ${brandName} đã chính thức áp dụng phương thức này giúp cược thủ rút tiền về ví điện tử Remitano nhanh chóng tiện lợi. Bài viết dưới đây chúng tôi hướng dẫn chi tiết từng bước từ A đến Z để Quý Khách có thể thực hiện giao dịch dễ dàng.`,
        },
      ],
    },
    section1: {
      title: `1. Lợi ích khi sử dụng Remitano để giao dịch trên ${brandName}`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Nhiều cược thủ đã chọn Remitano để thực hiện các giao dịch rút tiền tại ${brandName} nhờ những lợi ích sau:`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'remitano-1',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-remi-1-mobile.webp'
              : '/images/guide/tutorial-remi-1.webp',
            caption: 'Giao diện ví Remitano',
          },
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content2',
          value: [
            'Giao dịch rút tiền không giới hạn: Phù hợp với cược thủ thu về tiền thưởng cao.',
            'Thao tác xác minh và thanh toán đơn giản: Chỉ trong vòng 1 phút.',
            'Bảo mật thông tin: Đảm bảo an toàn tuyệt đối khi giao dịch.',
          ],
        },
      ],
    },
    section2: {
      title: `2. Hướng dẫn cách tạo tài khoản ví Remitano để giao dịch trên ${brandName}`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `${brandName} hiện hỗ trợ cược thủ rút tiền USDT thông qua ví Remitano. Tuy nhiên, để thực hiện giao dịch này cần có tài khoản Remitano hợp lệ. Dưới đây là hướng dẫn từng bước để tạo tài khoản Remitano dễ dàng nhanh chóng.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value:
            '<strong>Bước 1: </strong>Thực hiện đăng ký tài khoản Remitano',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            'Sau khi vào trang chủ Remitano nhấn vào mục đăng ký. Tại đây, hệ thống sẽ hiển thị biểu mẫu thiết lập tài khoản, cần cung cấp các thông tin chính xác như sau:',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'remitano-2',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-remi-2-mobile.webp'
              : '/images/guide/tutorial-remi-2.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content4',
          value: [
            'Nhập địa chỉ email đang sử dụng và nhấn tiếp tục.',
            'Hệ thống sẽ gửi mã OTP vào email, hãy mở email nhấp vào liên kết xác nhận và nhập bí danh để hoàn tất quá trình đăng ký.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content5',
          value: '<strong> Bước 2: </strong>Xác minh danh tính trên Remitano',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content6',
          value:
            'Sau khi đăng ký thành công, cần xác minh danh tính của mình. Thực hiện theo các bước sau:',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'remitano-3',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-remi-3-mobile.webp'
              : '/images/guide/tutorial-remi-3.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content7',
          value: [
            'Đăng nhập vào tài khoản Remitano bằng email đã đăng ký.',
            'Nhấn vào biểu tượng fồ sơ ở góc phải trên màn hình, sau đó vào mục cài đặt và chọn tab xác thực tài khoản.',
            'Nhập số điện thoại chính chủ đang hoạt động và gửi mã xác nhận sau đó nhập mã OTP được gửi về số điện thoại.',
            'Tiếp tục xác minh danh tính bằng cách chụp ảnh hoặc quét bản sao hộ chiếu, CCCD, hoặc bằng lái xe. Tải lên các mặt trước và mặt sau của tài liệu này. Đảm bảo ảnh chụp rõ nét và đầy đủ thông tin.',
            'Chụp ảnh chân dung cùng với mảnh giấy ghi "Remitano + ngày hiện tại" và chờ hệ thống xác minh. Quá trình này có thể mất từ vài giờ đến vài ngày.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content8',
          value:
            '<strong> Bước 3: </strong>Liên kết tài khoản ngân hàng trên Remitano',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content9',
          value:
            'Để thực hiện giao dịch mua bán USDT nhanh chóng, cần liên kết tài khoản ngân hàng với Remitano:',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content10',
          value:
            'Vào mục Ví trên Remitano chọn VNDR sau đó nhấn vào mục ngân hàng và thêm thông tin ngân hàng mong muốn',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content11',
          value:
            '<strong>LƯU Ý:</strong> Thông tin ngân hàng phải trùng khớp với dữ liệu đã đăng ký trên Remitano để đảm bảo quá trình giao dịch diễn ra thuận lợi',
        },
      ],
    },
    section3: {
      title: `3. Hướng dẫn rút tiền từ ${brandName} về ví Remitano đơn giản`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Để rút tiền từ ${brandName} về ví Remitano anh em cần thực hiện theo các bước sau:`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'remitano-4',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-remi-4-mobile.webp'
              : '/images/guide/tutorial-remi-4.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value: `<strong>Bước 1: </strong> Đăng nhập vào tài khoản ${brandName} - Sử dụng thông tin đăng nhập để truy cập vào tài khoản ${brandName}.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            '<strong>Bước 2: </strong>Truy cập vào mục tài khoản chọn rút tiền và nhấn vào tiền ảo -> Chọn loại tiền ảo là USDT (TRC20) -> Nhập địa chỉ ví Remitano, số tiền cần rút, và xác nhận 5 số cuối của số điện thoại.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content4',
          value: `<strong>Bước 3: </strong> Kiểm tra lại các thông tin đã nhập và nhấn Rút tiền. Hệ thống ${brandName} sẽ xử lý giao dịch và chuyển tiền vào ví Remitano của Quý Khách.`,
        },
      ],
    },
    section4: {
      title: `4. Bán USDT trên Remitano để rút về tài khoản ngân hàng`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Sau khi USDT đã được chuyển vào ví Remitano, Quý Khách có thể bán chúng để rút tiền về tài khoản ngân hàng. Dưới đây là các bước thực hiện:`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'remitano-5',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-remi-5-mobile.webp'
              : '/images/guide/tutorial-remi-5.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value:
            '<strong>Bước 1: </strong> Sử dụng thông tin đăng nhập để truy cập vào ví Remitano.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            '<strong>Bước 2: </strong> Trên thanh công cụ, chọn mục Mua bán Crypto.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content4',
          value:
            '<strong>Bước 3: </strong>Nhấn vào tab bán -> chọn loại tiền ảo là USDT -> Chọn phương thức thanh toán là VNDR để nhận tiền VND về tài khoản ngân hàng. Nhập số tiền USDT cần bán, chọn khuyến mãi phù hợp và nhấn Bán để hoàn tất giao dịch',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'remitano-6',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-remi-6-mobile.webp'
              : '/images/guide/tutorial-remi-6.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content6',
          value:
            '<strong>Bước 4: </strong>Sau khi bán USDT thành công, chọn mục Ví trên thanh công cụ, chọn Rút VNDR. Nhập số tiền cần rút, chọn phương thức thanh toán và thêm thông tin ngân hàng. Xác nhận Rút tiền và chờ hệ thống xử lý.',
        },
      ],
    },
  };
};
