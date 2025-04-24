import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const VE_CHUNG_TOI: GuidelineContent = {
  key: 'aboutUs',
  'category-title': 'Hỗ trợ & pháp lý',
  'page-title': 'Giới thiệu',
  section: {
    title: '',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'intro1',
        value: `${brandName} mang đến những trải nghiệm tuyệt vời với tỷ lệ cá cược thể thao cạnh tranh, nhiều trò chơi sòng bạc đa dạng và các tính năng độc quyền.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'intro2',
        value:
          'Cam kết của chúng tôi trong việc cung cấp dịch vụ hàng đầu và ưu tiên sự hài lòng của khách hàng được thể hiện rõ ràng khi chúng tôi tập trung vào các tùy chọn hỗ trợ đa dạng, đảm bảo trải nghiệm chơi trò chơi tinh tế và đa dạng với chi phí hợp lý cùng với các phần thưởng hấp dẫn.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'intro3',
        value: `Có trụ sở chính tại Đường Goadsby ngoài Phố Swan, Manchester, M4 5JY, Vương quốc Anh, các dịch vụ và trò chơi của ${brandName} được cung cấp bởi Sunbet Group và được cấp phép bởi Isle of Man GCS, cơ quan quản lý sòng bạc nổi tiếng ở Vương quốc Anh.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'intro4',
        value: `Phương châm của chúng tôi là cung cấp các dịch vụ giải trí và cá cược thể thao trực tuyến hàng đầu, liên tục đa dạng hóa các sản phẩm để đáp ứng nhu cầu của khách hàng và đặt lợi ích của bạn lên hàng đầu trong các ưu tiên của chúng tôi.`,
      },
    ],
  },
  section1: {
    title: 'Một loạt các sản phẩm',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Chúng tôi cung cấp cho khách hàng nhiều lựa chọn cá cược và trò chơi trực tuyến, bao gồm cá cược thể thao cạnh tranh với các sự kiện trực tiếp từ các giải đấu hàng đầu như Premier League, La Liga, Serie A, Bundesliga, Champions League và một số giải đấu khác. Và tất nhiên là không thể thiếu các trò chơi nổi tiếng như bài Poker, Nổ hũ, Quay số, game Bắn cá, Tài xỉu…',
      },
    ],
  },
  section2: {
    title: 'Danh tiếng gương mẫu',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Là nền tảng chơi game và đổi thưởng trực tuyến hàng đầu, ${brandName} hợp tác với các Nhà cung cấp thông tin uy tín.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Chúng tôi tự hào có đội ngũ dịch vụ giàu kinh nghiệm, các nhà nghiên cứu thị trường lâu năm và các nhà phát triển phần mềm chuyên nghiệp, đảm bảo cung cấp dữ liệu mới nhất, an toàn nhất và chính xác nhất cho mọi khách hàng.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Các trò chơi của chúng tôi được cung cấp bởi phần mềm tiên tiến, đảm bảo cho khách hàng trải nghiệm chơi game hàng đầu mọi lúc, mọi nơi.',
      },
    ],
  },
  section3: {
    title: 'Các biện pháp an ninh mạnh mẽ',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `${brandName} hoạt động trên toàn cầu, có giấy phép và trải qua quá trình kiểm tra an ninh nghiêm ngặt từ các cơ quan quản lý hoạt động cá cược có uy tín.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Mã hóa điện tử tiên tiến của chúng tôi đảm bảo một môi trường an toàn cho tất cả thành viên, với các quy trình bảo mật được tối ưu hóa, các tùy chọn Nạp tiền và Rút tiền an toàn cũng như tuân thủ nghiêm ngặt các giao thức bảo vệ dữ liệu.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Chúng tôi cam kết duy trì các tiêu chuẩn bảo vệ cao nhất trong ngành, sử dụng hệ thống bảo mật tiên tiến và cơ chế cảnh báo sớm để ngăn chặn mọi hoạt động gian lận.',
      },
    ],
  },
  section4: {
    title: 'Phương thức thanh toán hiệu quả',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Khách hàng có thể tùy chọn các phương thức đa dạng của chúng tôi để Nạp tiền/Rút tiền nhanh chóng và thuận tiện nhất với nhu cầu của mình.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value: `Tại ${brandName}, nạp và rút tiền thông qua tài khoản ngân hàng là hình thức được nhiều người lựa chọn. Đa dạng phương thức nạp tiền: Codepay, Flexpay (chuyển khoản ngân hàng), Tiền ảo, Ví điện tử ( Momo, Viettel Money, Zalo Pay), Thẻ cào.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value: `Chỉ sau một thời gian ngắn, tiền sẽ được nạp vào tài khoản của bạn. Mọi thông tin giao dịch tại ${brandName} đều được đảm bảo. Vì thế người chơi sẽ hoàn toàn không phải lo lắng tới việc bị lừa đảo hay mất tiền oan.`,
      },
    ],
  },
  section5: {
    title: 'Tiêu chuẩn đạo đức',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Tại ${brandName}, chúng tôi đề cao nguyên tắc xác suất ngẫu nhiên và đưa ra mức giá cạnh tranh để thu hút lượng khách hàng rộng rãi, luôn ưu tiên lợi ích của khách hàng lên trên tất cả.`,
      },
    ],
  },
};
