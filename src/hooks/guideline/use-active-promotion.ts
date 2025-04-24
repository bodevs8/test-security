import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useActivePromotion = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'promotionsGuides',
    'category-title': 'Hướng dẫn',
    'page-title': 'Hướng dẫn sử dụng khuyến mãi',
    section1: {
      title: `<div class="!text-[20px] mb-4">1. Hướng dẫn sử dụng gói khuyến mãi tại ${brandName}</div>`,
      sub_title:
        '<div class="text-base">BƯỚC 1: Đăng nhập hoặc đăng ký tài khoản.</div>',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value: 'Tại trang chủ Đăng nhập hoặc đăng ký tài khoản',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'active-promotion-1',
          value: {
            url: isMobile
              ? '/images/_brand/guide/promotion-1-mobile.webp'
              : '/images/_brand/guide/promotion-1.webp',
            caption: 'Giao diện tại trang chủ',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content2',
          value: `Sau khi đăng nhập / đăng ký bạn vui lòng vào <a href="/khuyen-mai" target="_blank">Khuyến mãi</a> để tìm các sự kiện khuyến mãi tại ${brandName} đang diễn ra.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content5',
          value: `<strong>LƯU Ý:</strong> Tại ${brandName} có 4 loại trạng thái khuyến mãi:`,
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'contentArr',
          value: [
            '<strong>Đang sử dụng:</strong> Khuyến mãi bạn đang áp dụng.',
            `<strong>Khả dụng:</strong> Các khuyến mãi tại ${brandName} mà bạn có thể áp dụng.`,
            `<strong>Không khả dụng:</strong> Loại khuyến mãi tại ${brandName} chưa diễn ra.`,
            `<strong>VIP:</strong> Loại khuyến mãi yêu cầu người dùng phải tham gia chương trình VIP mới có thể sử dụng.`,
          ],
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'active-promotion-2',
          value: {
            url: isMobile
              ? '/images/_brand/guide/promotion-2-mobile.webp'
              : '/images/_brand/guide/promotion-2.webp',
            caption: 'Giao diện tại trang khuyến mãi',
          },
        },
      ],
    },
    section2: {
      sub_title: 'BƯỚC 2: Tìm hiểu thông tin gói khuyến mãi',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value:
            'Sau khi tìm hiểu thông tin chi tiết các loại khuyến mãi, bao gồm 2 loại: <strong>Gói thưởng nạp, gói hoàn trả.</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            'Nhấn vào các gói khuyến mãi để xem điều kiện và điều khoản chi tiết của từng gói.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'active-promotion-3',
          value: {
            url: isMobile
              ? '/images/guide/promotion-3-mobile.webp'
              : '/images/guide/promotion-3.webp',
            caption: 'Ví dụ: Trang chi tiết một trong các gói khuyến mãi.',
          },
        },
      ],
    },
    section3: {
      sub_title: 'BƯỚC 3: Chọn & sử dụng khuyến mãi',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value:
            'Sau khi tìm hiểu thông tin chi tiết các gói khuyến mãi, bạn vui lòng nhấn vào nút <strong>[Nạp Tiền Ngay].</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            'Người dùng sẽ được điều hướng qua trang nạp tiền thông qua phương thức Codepay.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'active-promotion-4',
          value: {
            url: isMobile
              ? '/images/guide/promotion-4-mobile.webp'
              : '/images/guide/promotion-4.webp',
          },
        },
      ],
    },
    section4: {
      sub_title: 'BƯỚC 4: Áp dụng khuyến mãi thành công',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value:
            'Sau khi người dùng nạp tiền và áp dụng khuyến mãi thành công sẽ có thông báo hiển thị đến màn hình của Quý khách. Gói khuyến mãi sẽ chuyển trạng thái thành <strong>Đang áp dụng</strong>.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content3',
          value:
            'Bạn có thể xem gói khuyến mãi đang được áp dụng và tiến trình hoàn thành ở màn hình <strong>Khuyến mãi áp dụng</strong>.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'active-promotion-5',
          value: {
            url: isMobile
              ? '/images/guide/promotion-5-mobile.webp'
              : '/images/guide/promotion-5.webp',
            caption: 'Nội dung gói thưởng chào mừng 100%',
          },
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'active-promotion-6',
          value: {
            url: isMobile
              ? '/images/guide/promotion-6-mobile.webp'
              : '/images/guide/promotion-6.webp',
            caption: 'Nội dung gói hoàn trả',
          },
        },
      ],
    },
    section5: {
      title: '2. Những lưu ý quan trọng trong khi chọn khuyến mãi',
      sub_title: '2.1. Kiểm tra số dư trước khi tham gia khuyến mãi.',
      items: [
        {
          type: SectionItemTypeEnum.LIST,
          key: 'arrContent',
          value: [
            'Trước khi áp dụng bất kỳ chương trình khuyến mãi nào, Quý khách cần đảm bảo rằng số dư trong tài khoản của mình đủ điều kiện để tham gia. Nếu số dư hiện tại của Quý khách không đủ, Quý khách sẽ không thể áp dụng các gói khuyến mãi thông thường.',
            'Trong trường hợp này, để không bỏ lỡ cơ hội tham gia khuyến mãi, Quý khách vui lòng nạp thêm tiền vào tài khoản. Điều này sẽ đảm bảo rằng Quý khách có đủ số dư để tham gia các chương trình khuyến mãi đang diễn ra.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'sub_title2',
          value:
            '<div class="text-sm font-semibold lg:text-base">2.2. Không thể hủy khuyến mãi khi có vé cược chưa hoàn thành.</div>',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'arrContent1',
          value: [
            'Một khi đã tham gia chương trình khuyến mãi và có vé cược chưa hoàn thành, Quý khách không thể hủy bỏ gói khuyến mãi đó. Điều này có nghĩa là nếu Quý khách đã đặt cược trong chương trình khuyến mãi và vé cược đó chưa được xử lý, Quý khách sẽ cần chờ đến khi vé cược được hoàn tất hoặc phải hủy khuyến mãi hiện tại trước khi có thể tiếp tục thực hiện bất kỳ thay đổi nào đối với các khuyến mãi khác.',
            'Do đó, Quý khách nên cân nhắc kỹ lưỡng trước khi áp dụng các gói khuyến mãi nếu dự định hủy hoặc thay đổi.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'sub_title3',
          value:
            '<div class="text-sm font-semibold lg:text-base">2.3. Chỉ áp dụng một gói khuyến mãi tại cùng một thời điểm.</div>',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'arrContent2',
          value: [
            'Quý khách lưu ý rằng tại mỗi thời điểm, chỉ có thể áp dụng duy nhất một gói khuyến mãi. Điều này có nghĩa là nếu Quý khách đã tham gia một chương trình khuyến mãi, Quý khách cần hoàn thành, hủy hoặc chờ cho chương trình đó kết thúc trước khi có thể tham gia thêm bất kỳ khuyến mãi nào khác.',
            'Việc này giúp quản lý rõ ràng các chương trình khuyến mãi mà Quý khách đang tham gia, tránh việc trùng lặp hoặc xung đột các gói ưu đãi khác nhau.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'sub_title4',
          value:
            '<div class="text-sm font-semibold lg:text-base">2.4. Lưu ý quan trọng về việc hủy gói khuyến mãi thưởng nạp 100%.</div>',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'arrContent3',
          value: [
            'Khi Quý khách thực hiện hủy gói khuyến mãi thưởng nạp 100% mà chưa hoàn thành, điều này sẽ dẫn đến việc hủy bỏ toàn bộ tiền nạp và tiền thưởng khuyến mãi mà Quý khách đã nhận được từ chương trình.',
            'Điều này có nghĩa là mọi khoản tiền khuyến mãi mà Quý khách đang có trong tài khoản từ chương trình đó sẽ bị mất đi, và Quý khách sẽ không thể tiếp tục sử dụng chúng cho các lần cược hoặc giao dịch tiếp theo.',
            'Quý khách cần lưu ý rằng khi tham gia bất kỳ gói khuyến mãi nào, chương trình thường yêu cầu Quý khách hoàn thành một số vòng cược nhất định để có thể nhận và sử dụng toàn bộ tiền thưởng. Nếu Quý khách hủy gói khuyến mãi trước khi hoàn thành đủ các vòng cược này, tất cả số dư khuyến mãi hiện có sẽ bị xóa khỏi tài khoản của Quý khách.',
            'Do đó, việc hủy khuyến mãi khi chưa đạt đủ điều kiện có thể dẫn đến mất toàn bộ lợi ích mà Quý khách có thể nhận được từ chương trình khuyến mãi.',
            'Trước khi quyết định hủy bất kỳ gói khuyến mãi nào, Quý khách cần kiểm tra kỹ lưỡng điều kiện của chương trình và tình trạng tài khoản của mình. Đảm bảo rằng Quý khách đã hoàn thành các yêu cầu cược hoặc đã tận dụng hết các lợi ích khuyến mãi trước khi thực hiện thao tác hủy.',
          ],
        },
      ],
    },
    section7: {
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'content1',
          value:
            '<div class="font-semibold">ĐỂ BIẾT THÊM THÔNG TIN CHI TIẾT VỀ KHUYẾN MÃI, BAO GỒM ĐIỀU KHOẢN VÀ ĐIỀU KIỆN ÁP DỤNG, QUÝ KHÁCH VUI LÒNG THAM KHẢO NỘI DUNG CÁC GÓI TẠI MỤC <a class="text-primary-200" href="/khuyen-mai">KHUYẾN MÃI</a> TRÊN MÀN HÌNH.</div>',
        },
      ],
    },
  };
};
