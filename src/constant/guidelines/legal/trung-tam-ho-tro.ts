import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const TRUNG_TAM_HO_TRO: GuidelineContent = {
  key: 'helpCenter',
  'category-title': 'Hỗ trợ & pháp lý',
  'page-title': 'Trung Tâm Hỗ Trợ',
  section1: {
    title: '1. Sự Công Bằng',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Tại ${brandName}, Sự Công Bằng là ưu tiên hàng đầu của chúng tôi.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value: `Chúng tôi tin rằng trò chơi nên mang lại niềm vui, sự minh bạch và quan trọng nhất là công bằng. Nền tảng của chúng tôi được thiết kế với tính công bằng làm trọng tâm, sử dụng các Trình Tạo Số Ngẫu Nhiên (RNG) được chứng nhận để đảm bảo rằng mọi kết quả đều thực sự ngẫu nhiên và không thiên vị. Chúng tôi hoạt động tuân theo các quy định cấp phép nghiêm ngặt và trải qua các cuộc kiểm toán định kỳ bởi các cơ quan độc lập để đảm bảo tính toàn vẹn của trò chơi.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value: `Cam kết về công bằng của chúng tôi có nghĩa là mọi người chơi đều có cơ hội thắng ngang nhau, các điều khoản và điều kiện của chúng tôi rõ ràng và minh bạch. Dù bạn đang chơi quay số, chơi bài, hay đặt cược vào môn thể thao yêu thích của mình, bạn có thể tin tưởng rằng chúng tôi hoạt động với sự trung thực và công bằng trong mọi trò chơi.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content4',
        value: `Tại ${brandName}, niềm tin của bạn là tài sản quý giá nhất của chúng tôi, và chúng tôi làm việc chăm chỉ để duy trì nó với một môi trường chơi game vừa thú vị vừa công bằng.`,
      },
    ],
  },
  section2: {
    title: '2. RNG Là Gì?',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'RNG (Trình Tạo Số Ngẫu Nhiên) là một thuật toán được sử dụng để tạo ra kết quả ngẫu nhiên cho các trò chơi như slots, poker và roulette. Nó đảm bảo rằng các kết quả không thể đoán trước hoặc bị can thiệp.',
      },
    ],
  },
  section3: {
    title: '3. Cách RNG Đảm Bảo Tính Công Bằng',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.LIST,
        key: 'content',
        value: [
          'RNG đảm bảo rằng mỗi lần quay của cuộn hay mỗi lá bài được chia đều hoàn toàn ngẫu nhiên và không phụ thuộc vào các kết quả trước đó hoặc sau này.',
          'Các nền tảng chơi game uy tín sử dụng các RNG được chứng nhận và kiểm toán để ngăn chặn việc can thiệp từ nhà điều hành hoặc người chơi.',
          'Các cuộc kiểm toán định kỳ từ các cơ quan độc lập đảm bảo rằng RNG luôn công bằng và tuân thủ các tiêu chuẩn của ngành.',
        ],
      },
    ],
  },
};
