import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useCoin12 = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'coin12Guides',
    'category-title': 'Hướng dẫn',
    'page-title': `Hướng Dẫn Rút Và Bán USDT Trên ${brandName} Bằng Coin12`,
    section: {
      title: '',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Coin12 là một trong những ví tiền ảo phổ biến và được đánh giá cao với số lượng thành viên đông đảo. Kể từ 1:00 ngày 9/7/2024, ${brandName} đã hỗ trợ rút tiền ảo thông qua ví Coin12, mang đến sự tiện lợi và an toàn cho cược thủ. Dưới đây là hướng dẫn chi tiết về cách rút tiền và đổi USDT thành VND thông qua Coin12.`,
        },
      ],
    },
    section1: {
      title: `1. Lợi ích khi rút tiền từ ${brandName} về Coin12`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Coin12 được ưa chuộng bởi tính bảo mật và sự tiện lợi, nên khi liên kết với ${brandName}, cược thủ sẽ nhận được các lợi ích sau:`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'coin12-1',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-coin-12-1-mobile.webp'
              : '/images/guide/tutorial-coin-12-1.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content2',
          value: [
            'Miễn phí đăng ký và giao dịch: Không phải trả bất kỳ khoản phí nào khi tạo tài khoản và thực hiện giao dịch trên Huobi.',
            'Hạn mức giao dịch linh hoạt: Phù hợp cho cả người mới bắt đầu và những cược thủ lâu năm với các mức giao dịch khác nhau.',
            'Bảo mật cao: Thông tin cá nhân của được bảo vệ và anh em có thể nhận tiền vào tài khoản ngân hàng chỉ sau 1 – 2 phút.',
          ],
        },
      ],
    },
    section2: {
      title: '2. Hướng dẫn cược thủ tạo tài khoản ví Coin12 dễ hiểu nhất',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Để rút tiền từ ${brandName} về ví Coin12, cược thủ cần sở hữu một tài khoản ví điện tử hợp lệ. Dưới đây là hướng dẫn chi tiết từng bước giúp anh em dễ dàng đăng ký tài khoản trên Coin12:`,
        },

        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value: '<strong>Bước 1:</strong> Truy cập địa chỉ ví Coin12',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            'Trước tiên, anh em cần truy cập vào trang web chính thức của Coin12 để đảm bảo an toàn và thuận tiện cho quá trình đăng ký.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content4',
          value: '<strong>Bước 2:</strong> Đăng ký tài khoản Coin12',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content5',
          value:
            'Sau khi tạo tài khoản thành công hệ thống sẽ gửi một mã OTP qua email để xác minh. Quý Khách chỉ cần đăng nhập vào email và nhấn vào liên kết xác minh.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'coin12-2',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-coin-12-2-mobile.webp'
              : '/images/guide/tutorial-coin-12-2.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content6',
          value:
            'Tại giao diện trang chủ của Coin12 Quý Khách hãy nhấn vào mục đăng ký ở góc phải phía trên màn hình. Một biểu mẫu thiết lập tài khoản sẽ xuất hiện yêu cầu cung cấp các thông tin sau:',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content7',
          value: ['Email cá nhân', 'Mật khẩu', 'Xác nhận mật khẩu'],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content8',
          value:
            'Sau khi nhập đầy đủ thông tin Quý Khách tích vào ô đồng ý với điều khoản dịch vụ và chính sách quyền riêng tư của Coin12 và nhấn tạo tài khoản.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content9',
          value: '<strong>Bước 3:</strong> Xác minh danh tính trên Coin12',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content10',
          value:
            'Sau khi xác minh tài khoản, Quý Khách sẽ được chuyển hướng đến trang chủ của Coin12 và có thể bắt đầu sử dụng tài khoản của mình.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content11',
          value:
            'Tiếp theo, để mở khoá hạn mức giao dịch hàng ngày anh em cần cung cấp thông tin cá nhân và hoàn tất yêu cầu xác minh. Thông tin này sẽ được mã hóa theo tiêu chuẩn quân sự, đảm bảo an toàn tuyệt đối và không bị rò rỉ cho bên thứ ba.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content12',
          value: '<strong>Bước 4 :</strong> Bước 4: Đăng ký tài khoản Coin12',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content13',
          value:
            'Để thuận tiện cho việc bán và rút tiền từ Coin12 về tài khoản cá nhân, cần kết nối tài khoản ngân hàng:',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'coin12-3',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-coin-12-3-mobile.webp'
              : '/images/guide/tutorial-coin-12-3.webp',
            caption: '',
          },
        },
      ],
    },
    section3: {
      title: `3. Hướng dẫn rút USDT từ ${brandName} về sàn Coin12`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Để đáp ứng đầy đủ nhu cầu của cược thủ ${brandName} đã áp dụng phương thức rút tiền qua tiền ảo về Coin12:`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'coin12-4',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-coin-12-4-mobile.webp'
              : '/images/guide/tutorial-coin-12-4.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value: `<strong>Bước 1 :</strong> Đăng nhập vào tài khoản thành viên trên ${brandName}.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            '<strong>Bước 2 :</strong> Tại giao diện nhà cái, vào mục tài khoản chọn rút tiền rồi nhấn tiền ảo:',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content4',
          value: [
            'Chọn loại tiền ảo: USDT (TRC20).',
            'Địa chỉ ví: Nhập đúng địa chỉ ví Coin 12.',
            'Số tiền: Nhập số tiền cần rút.',
            'Số điện thoại: Xác nhận 5 số cuối của số điện thoại đã đăng ký.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content5',
          value:
            '<strong>Bước 3 :</strong> Kiểm tra lại thông tin đã nhập và nhấn rút tiền để hoàn tất giao dịch. Đảm bảo thông tin chính xác nhằm tránh các rủi ro không mong muốn.',
        },
      ],
    },
    section4: {
      title:
        '4. Hướng dẫn bán USDT trên Coin12 và rút về tài khoản ngân hàng miễn phí 100%',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Sau khi hoàn tất rút tiền từ ${brandName} bằng USDT về ví Coin12, Quý Khách cần bán USDT để chuyển đổi thành VND và rút về tài khoản ngân hàng của mình:`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'coin12-5',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-coin-12-5-mobile.webp'
              : '/images/guide/tutorial-coin-12-5.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value:
            '<strong>Bước 1 :</strong> Nhập số lượng USDT muốn bán và số tiền VND dự kiến nhận được - Chọn phương thức thanh toán phù hợp, rồi nhấn "Bán".',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            '<strong>Lưu ý: </strong>Chỉ được bán số lượng USDT bằng hoặc nhỏ hơn số tiền ký quỹ. Trước khi nhấn bán hãy đảm bảo đã chọn đúng nhà khuyến mãi, giá bán, thời gian, điều kiện thanh toán và phương thức thanh toán mà nhà khuyến mãi cung cấp.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content4',
          value:
            '<strong>Bước 2 :</strong> Sau khi hoàn tất việc đặt lệnh bán cần theo dõi tài khoản ngân hàng để kiểm tra xem đối tác đã thực hiện thanh toán hay chưa. Đăng nhập vào ứng dụng ngân hàng và kiểm tra biến động số dư để xác nhận.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content5',
          value:
            '<strong>Bước 3 :</strong> Bước 3: Khi thấy số dư tài khoản ngân hàng đã tăng lên do đối tác thanh toán anh em hãy:',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content6',
          value: [
            'Nhấn vào mục đã nhận thanh toán.',
            'Mở khoá tiền mã hoá cho đối tác bằng cách nhấn vào tôi đã nhận đủ tiền, …" rồi bấm xác minh.',
            'Nhập mã xác minh và nhấn gửi để hoàn tất việc mở khoá.',
            'Nhập số lượng USDT muốn bán và kiểm tra số tiền VND sẽ nhận được.',
          ],
        },
      ],
    },
    section5: {
      title: '5. Kết Luận',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Trên đây là hướng dẫn chi tiết về cách rút và bán USDT từ ${brandName} thông qua ví Coin12. Hãy thực hiện đúng các bước để nhận tiền thắng cược về tài khoản một cách nhanh chóng và an toàn anh em nhé.`,
        },
      ],
    },
  };
};
