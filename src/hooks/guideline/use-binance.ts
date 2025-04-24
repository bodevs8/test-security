import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useBinance = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'binanceGuides',
    'category-title': 'Hướng dẫn',
    'page-title': `Hướng Dẫn Rút Và Bán USDT Trên ${brandName} Qua Ví Binance`,
    section1: {
      title: '',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `Hiện nay việc giao dịch rút tiền ảo USDT thông qua ví Binance đã trở nên phổ biến hơn bao giờ hết. Từ 1:00 ngày 9/7/2024, ${brandName} đã chính thức áp dụng phương thức này, giúp người dùng rút tiền về ví điện tử Binance một cách thuận tiện. Bài viết dưới đây ${brandName} sẽ cung cấp hướng dẫn chi tiết từng bước từ A đến Z để Quý Khách có thể thực hiện giao dịch một cách dễ dàng. `,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'binance-1',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-binance-1-mobile.webp'
              : '/images/guide/tutorial-binance-1.webp',
            caption: '',
          },
        },
      ],
    },
    section2: {
      title: `1. Lợi ích khi sử dụng Binance để giao dịch trên ${brandName}`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'benefits',
          value: `Nhiều cược thủ đã chọn Binance để thực hiện các giao dịch rút tiền tại ${brandName} nhờ những lợi ích sau:`,
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'benefits_list',
          value: [
            'Phí giao dịch thấp: Người dùng chỉ phải chịu phí mạng lưới blockchain, chi phí không đáng kể.',
            'Điều kiện đơn giản: Không có nhiều điều khoản phức tạp, giúp quá trình giao dịch trở nên thuận tiện.',
            'Giao dịch nhanh chóng: Tiền được chuyển ngay lập tức sau khi gửi lệnh, đảm bảo người dùng nhận được tiền trong thời gian ngắn nhất.',
            `Nhiều cược thủ đã chọn Binance để thực hiện các giao dịch rút tiền tại ${brandName} nhờ những lợi ích sau:`,
          ],
        },
      ],
    },
    section3: {
      title: `2. Hướng dẫn cách tạo tài khoản ví Binance để giao dịch trên ${brandName}`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section3',
          value:
            'Dưới đây là hướng dẫn chi tiết giúp anh em tạo tài khoản trên Binance – một trong những sàn giao dịch tiền ảo hàng đầu hiện nay.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section4',
          value: '<strong>Bước 1</strong> Tải ứng dụng Binance',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section5',
          value:
            'Ứng dụng Binance có sẵn trên các cửa hàng ứng dụng phổ biến hãy tải về để sử dụng ví tiền ảo này tiện lợi:',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section6',
          value:
            'Android: Tải app Binance từ Google Play Store. <br /> iOS: Tải app Binance từ App Store.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section7',
          value: '<strong>Bước 2</strong> Thực hiện đăng ký tài khoản Binance',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section8',
          value:
            'Ứng dụng Binance có sẵn trên các cửa hàng ứng dụng phổ biến hãy tải về để sử dụng ví tiền ảo này tiện lợi:',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'binance-2',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-binance-2-mobile.webp'
              : '/images/guide/tutorial-binance-2.webp',
            caption: 'Giao diện Binance',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section9',
          value:
            "Mở ứng dụng Binance và chọn I'm new to crypto (tôi là người mới) sau đó nhập địa chỉ email hoặc số điện thoại để đăng ký. Anh em cũng có thể sử dụng tài khoản Google hoặc Apple ID để tạo tài khoản nhanh hơn.",
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'section10',
          value: [
            'Nhập mã OTP được gửi đến email hoặc số điện thoại và nhấn Next để tiếp tục',
            'Tạo mật khẩu cho tài khoản: Đảm bảo mật khẩu phải có ít nhất 8 ký tự bao gồm ít nhất 1 số và 1 ký tự viết hoa.',
          ],
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'binance-3',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-binance-3-mobile.webp'
              : '/images/guide/tutorial-binance-3.webp',
            caption: 'Giao diện Binance',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section11',
          value: '<strong>Bước 3</strong> Tiến hành xác minh tài khoản Binance',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section12',
          value:
            'Cược thủ cần xác minh danh tính theo đúng quy định của Binance:',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'binance-4',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-binance-4-mobile.webp'
              : '/images/guide/tutorial-binance-4.webp',
            caption: 'Giao diện Binance',
          },
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'section13',
          value: [
            'Vào mục hồ sơ, chọn tài khoản, và vào nhận dạng hoặc ở cửa sổ mở lên Quý Khách chọn hoàn tất ngay.',
            'Chọn xác minh nhập quốc gia cư trú đảm bảo thông tin cung cấp và giấy tờ tùy thân trùng khớp với nhau.',
          ],
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'binance-5',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-binance-5-mobile.webp'
              : '/images/guide/tutorial-binance-5.webp',
            caption: 'Giao diện Binance',
          },
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'section14',
          value: [
            'Nhập thông tin cá nhân và chọn tiếp tục sau khi xác nhận thông tin thì cược thủ sẽ không thể thay đổi nên hãy kiểm tra kỹ.',
            'Binance sẽ yêu cầu cược thủ xác minh giấy tờ tùy thân. Quý Khách có thể chọn chụp ảnh bằng Camera hoặc xác minh thông qua ứng dụng Binance và nhấn Tiếp tục.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section15',
          value:
            'Chụp ảnh giấy tờ theo hướng dẫn trên màn hình hoàn tất quy trình kiểm tra người thật, quay video theo yêu cầu và chờ nhận thông báo xác minh hoàn tất qua email. Lưu ý, không tải lại trình duyệt khi chờ xác nhận từ Binance.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section16',
          value:
            '<strong>Bước 4</strong> Kết nối tài khoản ngân hàng trên Binance.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'section117',
          value:
            'Vào mục giao dịch trên binance nhấn P2P chọn tiếp vào mục hồ sơ và click vào phương thức thanh toán.',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'section18',
          value: [
            'Thêm phương thức thanh toán mới bằng cách nhấn vào tất cả phương thức thanh toán.',
            'Chọn phương thức thanh toán có sẵn trong tùy chọn nhập thông tin và nhấn xác nhận để hoàn tất.',
          ],
        },
      ],
    },
    section4: {
      title: `3. Hướng dẫn cược thủ rút tiền về ví Binance trên ${brandName} bằng USDT `,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `Hiện nay, cược thủ có thể dễ dàng rút tiền từ ${brandName} về ví Binance thông qua phương thức tiền ảo USDT:`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'binance-6',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-binance-6-mobile.webp'
              : '/images/guide/tutorial-binance-6.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: '<strong>Bước 1:</strong> Bước 1: Tải ứng dụng Binance',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value: `Đầu tiên, hãy đăng nhập vào tài khoản ${brandName} của Quý Khách để bắt đầu quá trình rút tiền một cách nhanh chóng và tiện lợi.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value: '<strong>Bước 2:</strong> Thực hiện đăng ký tài khoản Binance',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'benefits_list',
          value: [
            'Chọn loại tiền ảo: Hãy chọn USDT (TRC20) để thực hiện giao dịch.',
            'Địa chỉ ví: Nhập địa chỉ ví Binance cá nhân của Quý Khách vào ô trống.',
            'Số tiền: Tiến hành nhập số tiền muốn rút.',
            'Số điện thoại: Xác nhận 5 số cuối của số điện thoại đã đăng ký.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value: '<strong>Bước 3:</strong>Hoàn tất giao dịch',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            'Sau khi điền đầy đủ và chính xác các thông tin yêu cầu, hãy kiểm tra lại một lần nữa. Cuối cùng, nhấn nút Rút tiền. Hệ thống của nhà cái sẽ xử lý và hoàn tất giao dịch trong vài giây.',
        },
      ],
    },
    section5: {
      title: '4. Bán USDT trên Binance để rút về tài khoản ngân hàng',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Sau khi USDT đã được chuyển vào ví Binance Quý Khách có thể bán chúng để rút tiền về tài khoản ngân hàng:',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value:
            '<strong>Bước 1:</strong>Sử dụng thông tin đăng nhập của để truy cập vào ví Binance.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value: '<strong>Bước 2:</strong> Chọn P2P.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Nhấn vào tab bán chọn tiền điện tử muốn bán là USDT chọn phương thức thanh toán là chuyển khoản ngân hàng.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong>Ưu tiên chọn người mua phù hợp nhấn Bán USDT và thực hiện theo hướng dẫn để đặt lệnh.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'binance-7',
          value: {
            url: isMobile
              ? '/images/guide/tutorial-binance-7-mobile.webp'
              : '/images/guide/tutorial-binance-7.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            '<strong>Bước 5:</strong> Chờ người mua thanh toán và nhấn xác nhận nhận tiền để hoàn tất. Anh em sẽ nhận được tiền về tài khoản ngân hàng liên kết trên ví Binance.',
        },
      ],
    },
    section6: {
      title: '5. Kết Luận',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'result',
          value: `Giao dịch rút và bán USDT trên ${brandName} thông qua ví Binance mang lại nhiều lợi ích về chi phí và thời gian. Chỉ cần làm theo hướng dẫn chi tiết ở trên Quý Khách đã có thể thực hiện giao dịch một cách an toàn và hiệu quả. Hy vọng bài viết này sẽ giúp anh em có trải nghiệm tốt hơn khi sử dụng dịch vụ của ${brandName} và Binance.`,
        },
      ],
    },
  };
};
