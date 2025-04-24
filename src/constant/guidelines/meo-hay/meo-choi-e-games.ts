import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

export const MEO_EGAMES: GuidelineContent = {
  key: 'egamesGuides',
  'category-title': 'Mẹo hay',
  'page-title': 'MẸO KHI CHƠI E-GAMES',
  section1: {
    title: '<span class="text-base">Thủ tục</span>',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Chọn Tên người dùng, mật khẩu, mã xác thực và nhấp vào nút 'Đăng nhập'. Bấm vào Slots, Table Games, Bắn Cá, Game Nhanh. Người chơi có thể lựa chọn trò chơi yêu thích của mình cho phù hợp.`,
      },
    ],
  },
};
