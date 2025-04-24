import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const usePromotion = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'promotionGuides',
    'category-title': 'Hướng dẫn',
    'page-title': 'HƯỚNG DẪN KHUYẾN MÃI',
    section1: {
      title: `1. Các loại khuyến mãi tại ${brandName}`,
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `${brandName} cung cấp nhiều loại khuyến mãi hấp dẫn để nâng cao trải nghiệm của người chơi. Dưới đây là các loại khuyến mãi chính:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'welcome_bonus',
          value:
            '<strong>Khuyến mãi chào mừng:</strong> Dành cho người chơi mới đăng ký tài khoản. Thường bao gồm tiền thưởng nạp lần đầu, vòng quay miễn phí hoặc cược miễn phí.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'deposit_bonus',
          value:
            '<strong>Khuyến mãi nạp tiền:</strong> Thưởng thêm một phần trăm khi bạn nạp tiền vào tài khoản. Có thể áp dụng cho lần nạp đầu tiên hoặc các lần nạp tiếp theo.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'cashback',
          value:
            '<strong>Hoàn trả (Cashback):</strong> Hoàn lại một phần tiền thua cược trong một khoảng thời gian nhất định, giúp giảm thiểu rủi ro cho người chơi.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'free_bets',
          value:
            '<strong>Cược miễn phí:</strong> Cơ hội đặt cược mà không cần sử dụng tiền thật, thường được tặng trong các sự kiện đặc biệt hoặc cho người chơi thân thiết.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'loyalty',
          value:
            '<strong>Chương trình thành viên thân thiết:</strong> Tích điểm thưởng khi chơi và đổi điểm lấy các phần thưởng như tiền thưởng, vật phẩm, hoặc ưu đãi đặc biệt.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'special_events',
          value: `<strong>Khuyến mãi sự kiện đặc biệt:</strong> Các ưu đãi giới hạn thời gian nhân dịp các sự kiện thể thao lớn, ngày lễ, hoặc kỷ niệm của ${brandName}.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'promotion-1',
          value: {
            url: isMobile
              ? '/asset/images/guide/promotions-types.png'
              : '/asset/images/guide/promotions-types.png',
            caption: `Các loại khuyến mãi tại ${brandName}`,
          },
        },
      ],
    },
    section2: {
      title: '2. Cách nhận khuyến mãi chào mừng',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `Khuyến mãi chào mừng là ưu đãi đặc biệt dành cho người chơi mới. Dưới đây là cách để nhận khuyến mãi chào mừng tại ${brandName}:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Đăng ký tài khoản mới tại ${brandName}.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value: `<strong>Bước 2:</strong> Nạp tiền vào tài khoản của bạn (tối thiểu theo quy định của chương trình khuyến mãi).`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'promotion-2',
          value: {
            url: '/asset/images/guide/welcome-bonus-1.png',
            caption: 'Nạp tiền để nhận khuyến mãi chào mừng',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Vào mục KHUYẾN MÃI và chọn khuyến mãi chào mừng.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'promotion-3',
          value: {
            url: '/asset/images/guide/welcome-bonus-2.png',
            caption: 'Chọn khuyến mãi chào mừng',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Nhấn NHẬN THƯỞNG để kích hoạt khuyến mãi.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Khuyến mãi chào mừng thường có điều kiện vòng cược (wagering requirements) trước khi bạn có thể rút tiền thưởng. Hãy đọc kỹ điều khoản và điều kiện của khuyến mãi.',
        },
      ],
    },
    section3: {
      title: '3. Cách nhận khuyến mãi nạp tiền',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Khuyến mãi nạp tiền giúp bạn nhận thêm tiền thưởng khi nạp tiền vào tài khoản. Dưới đây là cách nhận khuyến mãi nạp tiền:',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Đăng nhập vào tài khoản ${brandName} của bạn.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value: `<strong>Bước 2:</strong> Vào mục KHUYẾN MÃI và chọn khuyến mãi nạp tiền đang có.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'promotion-4',
          value: {
            url: '/asset/images/guide/deposit-bonus-1.png',
            caption: 'Chọn khuyến mãi nạp tiền',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value: `<strong>Bước 3:</strong> Đọc và hiểu các điều kiện của khuyến mãi.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value: `<strong>Bước 4:</strong> Nạp tiền vào tài khoản với số tiền đủ điều kiện nhận khuyến mãi.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'promotion-5',
          value: {
            url: '/asset/images/guide/deposit-bonus-2.png',
            caption: 'Nạp tiền để nhận khuyến mãi',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value: `<strong>Bước 5:</strong> Quay lại mục KHUYẾN MÃI và nhấn NHẬN THƯỞNG để kích hoạt khuyến mãi.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Một số khuyến mãi nạp tiền có thể được áp dụng tự động sau khi bạn nạp tiền, không cần kích hoạt thủ công. Hãy kiểm tra điều khoản của từng khuyến mãi cụ thể.',
        },
      ],
    },
    section4: {
      title: '4. Chương trình thành viên thân thiết',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `Chương trình thành viên thân thiết của ${brandName} là cách để chúng tôi tri ân những người chơi trung thành. Càng chơi nhiều, bạn càng nhận được nhiều ưu đãi.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'how_it_works',
          value: `<strong>Cách thức hoạt động:</strong> Mỗi khi bạn đặt cược bằng tiền thật, bạn sẽ tích lũy điểm thưởng. Số điểm này sẽ quyết định cấp độ thành viên của bạn, từ đó mở khóa các ưu đãi đặc biệt.`,
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'levels',
          value: [
            'Cấp 1 (Đồng): Cấp độ khởi đầu cho tất cả người chơi mới.',
            'Cấp 2 (Bạc): Nhận hoàn trả 5% và các ưu đãi nạp tiền hàng tuần.',
            'Cấp 3 (Vàng): Nhận hoàn trả 10%, ưu đãi nạp tiền hàng tuần và quà sinh nhật.',
            'Cấp 4 (Bạch Kim): Nhận hoàn trả 15%, ưu đãi nạp tiền hàng tuần, quà sinh nhật và quản lý tài khoản VIP.',
            'Cấp 5 (Kim Cương): Nhận hoàn trả 20%, ưu đãi nạp tiền không giới hạn, quà sinh nhật, quản lý tài khoản VIP và các đặc quyền độc quyền.',
          ],
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'promotion-6',
          value: {
            url: '/asset/images/guide/loyalty-program.png',
            caption: 'Các cấp độ thành viên và ưu đãi tương ứng',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'check_points',
          value:
            '<strong>Kiểm tra điểm thưởng:</strong> Bạn có thể kiểm tra số điểm thưởng và cấp độ thành viên hiện tại bằng cách vào mục TÀI KHOẢN > THÀNH VIÊN THÂN THIẾT.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'redeem_points',
          value:
            '<strong>Đổi điểm thưởng:</strong> Bạn có thể đổi điểm thưởng lấy tiền thưởng, vòng quay miễn phí, hoặc các phần thưởng khác trong mục ĐỔI ĐIỂM THƯỞNG.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Điểm thưởng có thể hết hạn sau một khoảng thời gian nhất định nếu không được sử dụng. Hãy kiểm tra chính sách điểm thưởng để biết thêm chi tiết.',
        },
      ],
    },
    section5: {
      title: '5. Điều khoản và điều kiện khuyến mãi',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Để tận dụng tối đa các khuyến mãi, việc hiểu rõ các điều khoản và điều kiện là rất quan trọng. Dưới đây là một số điều khoản phổ biến:',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'wagering',
          value:
            '<strong>Yêu cầu vòng cược (Wagering Requirements):</strong> Số lần bạn cần đặt cược với số tiền thưởng trước khi có thể rút. Ví dụ: Yêu cầu vòng cược 20x có nghĩa là bạn cần đặt cược tổng cộng 20 lần số tiền thưởng trước khi có thể rút.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'time_limits',
          value:
            '<strong>Giới hạn thời gian:</strong> Thời gian khuyến mãi có hiệu lực và thời gian để hoàn thành yêu cầu vòng cược. Sau thời gian này, khuyến mãi hoặc tiền thưởng có thể bị hủy.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'game_restrictions',
          value:
            '<strong>Hạn chế trò chơi:</strong> Một số khuyến mãi chỉ áp dụng cho các trò chơi cụ thể. Ngoài ra, các trò chơi khác nhau có thể đóng góp khác nhau vào yêu cầu vòng cược.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'max_bet',
          value:
            '<strong>Cược tối đa:</strong> Giới hạn số tiền cược tối đa khi sử dụng tiền thưởng. Vượt quá giới hạn này có thể dẫn đến việc hủy tiền thưởng và tiền thắng.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'max_win',
          value:
            '<strong>Thắng tối đa:</strong> Giới hạn số tiền tối đa bạn có thể thắng và rút từ tiền thưởng.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'country_restrictions',
          value:
            '<strong>Hạn chế quốc gia:</strong> Một số khuyến mãi có thể không áp dụng cho người chơi từ các quốc gia nhất định.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Luôn đọc kỹ điều khoản và điều kiện của mỗi khuyến mãi trước khi tham gia. Nếu có bất kỳ thắc mắc nào, hãy liên hệ với bộ phận CSKH để được giải đáp.',
        },
      ],
    },
    section6: {
      title: '6. Câu hỏi thường gặp về khuyến mãi',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question1',
          value:
            '<strong>Tôi có thể nhận nhiều khuyến mãi cùng một lúc không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer1',
          value:
            'Thông thường, bạn chỉ có thể tham gia một khuyến mãi tại một thời điểm. Tuy nhiên, một số khuyến mãi có thể được kết hợp với nhau, như khuyến mãi nạp tiền và chương trình thành viên thân thiết. Hãy kiểm tra điều khoản của từng khuyến mãi để biết thêm chi tiết.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question2',
          value:
            '<strong>Tôi có thể rút tiền thưởng ngay sau khi nhận không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer2',
          value:
            'Không, hầu hết các tiền thưởng đều có yêu cầu vòng cược trước khi bạn có thể rút. Điều này có nghĩa là bạn cần đặt cược một số lần nhất định với số tiền thưởng trước khi có thể rút tiền thưởng và tiền thắng từ tiền thưởng.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question3',
          value:
            '<strong>Điểm thưởng trong chương trình thành viên thân thiết có hết hạn không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer3',
          value:
            'Có, điểm thưởng thường có thời hạn sử dụng, thường là 3-6 tháng kể từ ngày tích lũy. Nếu không sử dụng trong thời gian này, điểm thưởng sẽ hết hạn. Bạn có thể kiểm tra thời hạn của điểm thưởng trong mục TÀI KHOẢN > THÀNH VIÊN THÂN THIẾT.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question4',
          value:
            '<strong>Tôi có thể nhận khuyến mãi chào mừng nhiều lần không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer4',
          value: `Không, khuyến mãi chào mừng chỉ dành cho người chơi mới và chỉ có thể nhận một lần duy nhất. Tuy nhiên, ${brandName} cung cấp nhiều khuyến mãi khác cho người chơi hiện tại, như khuyến mãi nạp tiền, hoàn trả, và các ưu đãi đặc biệt.`,
        },
      ],
    },
  };
};
