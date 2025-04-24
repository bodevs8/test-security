import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const MEO_CUOC_THE_THAO: GuidelineContent = {
  key: 'sportsBettingGuides',
  'category-title': 'Mẹo hay',
  'page-title': 'MẸO CƯỢC THỂ THAO',
  section: {
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Với hơn 10.000 sự kiện mỗi tháng, bạn sẽ không bao giờ bỏ lỡ những trận đấu thể thao yêu thích tại ${brandName}. Rất nhiều sự kiện, rất nhiều lựa chọn!`,
      },
    ],
  },
  section1: {
    title: '1. Nhiều sự kiện, nhiều lựa chọn!',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Chúng tôi cung cấp cá cược cho tất cả các giải bóng đá lớn ở Châu Âu, bao gồm UEFA Champions League, EPL, Spanish Primera Liga, German Bundesliga và Italian Serie A.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value: `Hơn nữa, chúng tôi cung cấp cá cược cho các giải đấu trên toàn thế giới, từ J-League của Nhật Bản ở phương Đông cho đến Major League của Hoa Kỳ ở phương Tây. Đừng bỏ lỡ các sự kiện bóng đá quốc tế hàng đầu tại ${brandName}`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Nếu bạn quan tâm đến cá cược Tennis, Golf hay thậm chí Thể thao điện tử (E-Sports), chúng tôi cũng có tất cả, đảm bảo mang đến trải nghiệm tốt nhất! Nếu có sự kiện nào bạn quan tâm nhưng chưa được cung cấp trên trang web, hãy cho chúng tôi biết và chúng tôi sẽ rất vinh hạnh xem xét bổ sung.',
      },
    ],
  },
  section2: {
    title: '2. Trải nghiệm cá cược đỉnh cao',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Chúng tôi tự hào mang đến những trận đấu cá cược thể thao nổi tiếng cho các thành viên của mình. Cá cược thể thao trực tiếp tại ${brandName} có sẵn trên nhiều sự kiện suốt 365 ngày trong năm! Nếu bạn yêu thích sự hồi hộp từ cá cược trực tiếp, đừng tìm đâu xa, ${brandName} chính là lựa chọn hoàn hảo!`,
      },
    ],
  },
};
