import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

export const MEO_XO_SO: GuidelineContent = {
  key: 'lotteryGuides',
  'category-title': 'Mẹo hay',
  'page-title': 'MẸO XỔ SỐ',
  section1: {
    title: '<span class="text-base">Xổ số</span>',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Sòng bạc trực tuyến của chúng tôi mang đến cho bạn nhiều lựa chọn trò chơi xổ số đa dạng, mỗi trò chơi có những tính năng độc đáo, cơ cấu giải thưởng và mức độ phấn khích riêng. Cho dù bạn thích xổ số Nháp cổ điển với luật chơi đơn giản hay các biến thể hiện đại với các tính năng Thưởng cải tiến, luôn có thứ gì đó dành cho tất cả mọi người trong bộ sưu tập xổ số của chúng tôi.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Quá trình này đơn giản nhưng đầy phấn khích: người chơi mua vé số, chọn những con số may mắn và hồi hộp chờ đợi Nháp. Phần mềm tiên tiến của chúng tôi đảm bảo Nháp công bằng và ngẫu nhiên bằng cách sử dụng các bộ tạo số ngẫu nhiên được chứng nhận (RNG), mang đến cho người chơi trải nghiệm chơi game chân thực và minh bạch.',
      },
    ],
  },
  section2: {
    title: 'Cách chơi xổ số',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: '1. Mua vé xổ số:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr1',
        value: [
          'Người chơi mua vé xổ số trực tuyến thông qua nền tảng của sòng bạc.',
          'Họ chọn một bộ số hoặc sử dụng tùy chọn chọn nhanh để chọn số ngẫu nhiên.',
          'Giá vé và số lượng để lựa chọn được xác định bởi trò chơi xổ số cụ thể.',
        ],
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value: '2. Nhập Lịch Thi Đấu:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr2',
        value: [
          'Lô tô nháp diễn ra vào những thời điểm đã định trước, chẳng hạn như hằng ngày, hằng tuần hoặc hai tuần một lần, nhằm dừng trò chơi.',
          'Người chơi có thể kiểm tra lịch thi đấu và mua vé trước giờ Nháp.',
        ],
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value: '3. Tạo số ngẫu nhiên:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr3',
        value: [
          'Trước mỗi Nháp, phần mềm của sòng bạc trực tuyến sử dụng trình tạo số ngẫu nhiên (RNG) để tạo số tiền thắng cược.',
          'RNG đảm bảo kết quả công bằng và không thiên vị, mô phỏng tính ngẫu nhiên của xổ số truyền thống Nháp.',
        ],
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content4',
        value: '4. Trùng số và giải thưởng:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr4',
        value: [
          'Sau Nháp, người chơi so sánh số vé của mình với số tiền thắng cược do RNG tạo ra.',
          'Giải thưởng được trao dựa trên số trận đấu, theo cơ cấu giải thưởng của trò chơi xổ số cụ thể.',
          'Người chơi thắng giải độc đắc bằng cách khớp tất cả các số và có thể có giải thưởng bổ sung cho các trận đấu một phần.',
        ],
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content5',
        value: '5. Thắng Xuất chi:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr5',
        value: [
          'Các khoản thanh toán của Thắng được xác định bởi các yếu tố như số trận đấu và quy mô của giải độc đắc (nếu có).',
          'Giải Jackpot có thể cố định hoặc lũy tiến, với mức Nổ hũ lũy tiến tăng dần cho đến khi trúng giải.',
        ],
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content6',
        value: '6. An ninh và Công bằng:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr6',
        value: [
          'Sòng bạc trực tuyến đảm bảo tính bảo mật của trò chơi xổ số thông qua cơ chế chuyển đổi mã hóa và chơi công bằng.',
          'RNG được chứng nhận và kiểm toán thường xuyên của các cơ quan quản lý đảm bảo tính toàn vẹn và công bằng của trò chơi xổ số.',
        ],
      },
    ],
  },
};

export default MEO_XO_SO;
