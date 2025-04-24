import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useHuobi = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'huobiGuides',
    'category-title': 'Hướng dẫn',
    'page-title': `Hướng Dẫn Rút Và Bán USDT Trên ${brandName} Bằng Sàn Huobi Chi Tiết.`,
    section: {
      title: '',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Bắt đầu từ ngày 9/7/2024 ${brandName} đã hỗ trợ cược thủ rút tiền ảo về ví điện tử dễ dàng và nhanh chóng. Trong đó, việc rút và bán USDT trên ${brandName} thông qua sàn Huobi là một lựa chọn tuyệt vời giúp Quý Khách thực hiện giao dịch đơn giản bảo mật cao và không mất phí. Trong bài viết này hãy cùng chúng tôi tìm hiểu cách rút và bán USDT trên ${brandName} bằng sàn Huobi.`,
        },
      ],
    },
    section1: {
      title: `1. Lợi ích của việc giao dịch USDT qua sàn Huobi`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Hiện nay việc chuyển khoản ngân hàng đang gặp khó khăn do yêu cầu sinh trắc học từ ngân hàng nhà nước Việt Nam. Nên rút và bán USDT trên ${brandName} qua sàn Huobi là giải pháp tối ưu với ba ưu điểm nổi bật như sau:`,
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content2',
          value: [
            `Giao dịch rút tiền không giới hạn: Phù hợp với những cược thủ thu về nhiều tiền thưởng cao khi cá cược tại ${brandName}.`,
            'Miễn phí đăng ký và giao dịch: Không phải trả bất kỳ khoản phí nào khi tạo tài khoản và thực hiện giao dịch trên Huobi.',
            'Hạn mức giao dịch linh hoạt: Phù hợp cho cả người mới bắt đầu và những cược thủ lâu năm với các mức giao dịch khác nhau.',
            'Bảo mật cao: Thông tin cá nhân của được bảo vệ và anh em có thể nhận tiền vào tài khoản ngân hàng chỉ sau 1 – 2 phút.',
            'Bảo mật cao: Thông tin cá nhân được bảo vệ an toàn.',
          ],
        },
      ],
    },
    section2: {
      title: '2. Hướng dẫn tạo tài khoản ví Huobi với các bước chi tiết',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Nếu Quý Khách chưa có tài khoản ví Huobi thì đừng lo lắng. Dưới đây là hướng dẫn chi tiết để thiết lập tài khoản một cách nhanh chóng đơn giản và an toàn:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value: '<strong>Bước 1:</strong> Đăng ký tài khoản Huobi',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            'Sau khi vào trang chủ Remitano nhấn vào mục đăng ký. Tại đây, hệ thống sẽ hiển thị biểu mẫu thiết lập tài khoản, cần cung cấp các thông tin chính xác như sau:',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'huobi-1',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-houbi-1-mobile.webp'
              : '/images/guide/tutorial-houbi-1.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content4',
          value:
            'Tiếp theo, nhấn vào mục đăng ký màu xanh ở góc trên bên phải màn hình. Một biểu mẫu thông tin sẽ hiện ra, cần cung cấp hai thông tin cơ bản',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content5',
          value: [
            'Nhập địa chỉ email đang sử dụng và nhấn tiếp tục.',
            'Hệ thống sẽ gửi mã OTP vào email, hãy mở email nhấp vào liên kết xác nhận và nhập bí danh để hoàn tất quá trình đăng ký.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content6',
          value:
            'Sau khi cung cấp đầy đủ và chính xác thông tin, đồng ý với các điều khoản và điều kiện của Huobi rồi nhấn đăng ký thêm một lần nữa để hoàn tất.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content7',
          value: '<strong>Bước 2:</strong> Xác minh danh tính trên Houbi',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content8',
          value:
            'Hệ thống sẽ gửi mã OTP về email hoặc số điện thoại đã cung cấp. Quý Khách chỉ cần nhập đúng mã xác minh vào ô trống yêu cầu. Khi mã xác minh chính xác hệ thống sẽ thông báo thành công trên màn hình.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'huobi-2',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-houbi-2-mobile.webp'
              : '/images/guide/tutorial-houbi-2.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content9',
          value: 'Bước 3: Thực hiện liên kết ngân hàng ở trên Huobi',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content10',
          value:
            'Liên kết ngân hàng trên Huobi giúp Quý Khách có thể dễ dàng bán USDT ra VND và rút về tài khoản ngân hàng cá nhân:',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content11',
          value: [
            'Truy cập mục số dư trên giao diện Huobi sau đó nhấn vào mục tài khoản giao dịch. Tiếp tục nhấn rút tiền (hãy đảm bảo anh em đã hoàn thành KYC trước đó).',
            'Chọn thêm tài khoản ngân hàng mục này nằm ngay cạnh mục chọn tài khoản ngân hàng" nên rất dễ tìm.',
            'Cung cấp các thông tin cần thiết bao gồm: Số tài khoản cùng tên ngân hàng – mã ngân hàng – Địa chỉ và ID tài khoản bổ sung khi cần.',
          ],
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'huobi-3',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-houbi-3-mobile.webp'
              : '/images/guide/tutorial-houbi-3.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content12',
          value: [
            `Đăng nhập vào ${brandName}: Sử dụng link uy tín để truy cập vào trang chủ ${brandName}. Đăng nhập và cung cấp thông tin cá nhân.`,
            `Rút tiền từ ${brandName}: Vào mục tài khoản trên giao diện ${brandName} chọn rút tiền và chọn phương thức tiền ảo. Chọn loại tiền ảo là USDT (TRC20). Nhập địa chỉ ví Huobi và số tiền cần rút xác nhận số điện thoại và nhấn rút tiền.`,
            'Kiểm tra và xác nhận: Kiểm tra thông tin đã nhập sau đó nhấn rút tiền để hoàn tất.',
          ],
        },
      ],
    },
    section3: {
      title: '3. Hướng dẫn bán USDT và nhận tiền VND về tài khoản ngân hàng',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: `Sau khi đã có USDT trên sàn Huobi, có thể thực hiện các bước sau để bán USDT và nhận tiền VND về tài khoản ngân hàng một cách nhanh chóng:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value:
            '<strong>Bước 1:</strong>Trên giao diện của Huobi, hãy chọn mua Crypto sau đó nhấn vào mục P2P và chọn bán. Tiếp tục, cần chọn loại tiền điện tử là USDT và tiền tệ là VND.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'huobi-4',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-houbi-4-mobile.webp'
              : '/images/guide/tutorial-houbi-4.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            '<strong>Bước 2:</strong> Lựa chọn nhà cung cấp có mức giá phù hợp với nhu cầu và nhấn bán. Tại đây, sẽ cần cập nhật thông tin bảo mật Authenticator và biệt danh (Nickname)',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'content4',
          value: [
            'Để cập nhật biệt danh nhấn vào kích hoạt ngay.',
            'Tiếp tục, click vào mã xác minh Google để liên kết. Tải ứng dụng Authenticator cho Android tại đây và cho iOS.',
            'Hoàn tất cài đặt ứng dụng Authenticator mở ứng dụng và chọn dấu + sau đó chọn scan a QR code để quét mã QR trên màn hình.',
            'Nhập mã 6 số từ Authenticator nhấn Gửi sau đó nhập tiếp mã OTP được gửi đến email.',
            'Cập nhật thành công biệt danh và thông tin bảo mật Authenticator sẽ cần cập nhật phương thức nhận tiền để tiến hành bán USDT.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content5',
          value:
            '<strong>Bước 3:</strong> Chọn người mua từ danh sách hiện ra: Hãy cân nhắc giá và khối lượng bán để chọn được người mua phù hợp nhất.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'huobi-5',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-houbi-5-mobile.webp'
              : '/images/guide/tutorial-houbi-5.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content6',
          value:
            'Nhập số lượng USDT muốn bán và kiểm tra số tiền VND sẽ nhận được. Trong một số trường hợp, hệ thống sẽ yêu cầu xác nhận giao dịch bằng cách nhập mã Authenticator, hãy nhập mã chính xác.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content7',
          value:
            '<strong>Bước 4:</strong> Sau khi đã cung cấp dữ liệu và đặt lệnh thành công chỉ cần chờ người mua thanh toán. Khi nhận được tiền đừng quên xác nhận và hoàn tất giao dịch.',
        },
      ],
    },
    section4: {
      title: '5. Kết Luận',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'result',
          value: `Trên đây là hướng dẫn chi tiết cách rút và bán USDT trên ${brandName} qua sàn Huobi. Thực hiện theo các bước trên sẽ giúp nhận tiền thắng cược từ ${brandName} về tài khoản ngân hàng một cách nhanh chóng và an toàn. Nếu có thắc mắc hãy liên hệ bộ phận chăm sóc khách hàng ${brandName} để được giải đáp ngay nhé.`,
        },
      ],
    },
  };
};
