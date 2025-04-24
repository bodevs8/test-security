import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const DOI_TAC_DANG_TIN_CAY: GuidelineContent = {
  key: 'responsibleGaming',
  'category-title': 'Hỗ trợ & pháp lý',
  'page-title': 'ĐỐI TÁC ĐÁNG TIN CẬY',
  section1: {
    title: '1. Chơi Game Có Trách Nhiệm',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Tại ${brandName}, chúng tôi cam kết mang đến một trải nghiệm chơi game an toàn, công bằng và thú vị cho tất cả người chơi. Dù cá cược có thể mang lại sự giải trí và phấn khích, nhưng chúng tôi hiểu tầm quan trọng của việc kiểm soát và chơi một cách có trách nhiệm.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Chúng tôi cung cấp nhiều công cụ hỗ trợ người chơi kiểm soát bản thân, như giới hạn nạp tiền, giới hạn thời gian và các tùy chọn loại trừ. Mục tiêu của chúng tôi là giúp người chơi đặt ra giới hạn và luôn giữ được sự kiểm soát.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Ngoài ra, chúng tôi cũng thực hiện các biện pháp bảo vệ người dễ bị tổn thương bằng cách xác minh độ tuổi nghiêm ngặt và cung cấp các nguồn hỗ trợ cho những ai gặp khó khăn.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content4',
        value:
          'Hãy nhớ rằng, cá cược chỉ nên là một hoạt động giải trí, và kiểm soát bản thân là chìa khóa để có một trải nghiệm chơi game an toàn và tích cực.',
      },
    ],
  },
  section2: {
    title: `2. Nhận thức về ${brandName} & Bảo vệ Trẻ Thành Niên`,
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Tại ${brandName}, chúng tôi cam kết thúc đẩy việc chơi game có trách nhiệm và bảo vệ những đối tượng dễ bị tổn thương, đặc biệt là trẻ vị thành niên.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Chúng tôi tuân thủ nghiêm ngặt các quy định về độ tuổi hợp pháp và sử dụng công nghệ xác minh tiên tiến để đảm bảo chỉ những người đủ tuổi mới có thể truy cập vào nền tảng của chúng tôi.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Chúng tôi cung cấp nhiều công cụ hỗ trợ như giới hạn nạp tiền, thông báo nhắc nhở và tùy chọn tự loại trừ để giúp người chơi kiểm soát thói quen cá cược.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content4',
        value:
          'Hãy nhớ rằng, cá cược là để giải trí, và điều quan trọng là chơi có trách nhiệm trong giới hạn của mình.',
      },
    ],
  },
};
