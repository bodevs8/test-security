import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useBetting = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'bettingGuides',
    'category-title': 'Hướng dẫn',
    'page-title': 'HƯỚNG DẪN CÁ CƯỢC',
    section1: {
      title: '1. Cá cược thể thao',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `${brandName} cung cấp đa dạng các loại hình cá cược thể thao với tỷ lệ cược hấp dẫn. Dưới đây là hướng dẫn cơ bản để bắt đầu cá cược thể thao:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Đăng nhập vào tài khoản ${brandName} của bạn.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value: '<strong>Bước 2:</strong> Chọn mục THỂ THAO trên menu chính.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-1',
          value: {
            url: isMobile
              ? '/asset/images/guide/sports-1.png'
              : '/asset/images/guide/sports-1.png',
            caption: 'Giao diện cá cược thể thao',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Chọn môn thể thao và giải đấu mà bạn muốn đặt cược.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Chọn trận đấu và loại kèo mà bạn muốn đặt cược (Châu Á, Châu Âu, Tài/Xỉu, v.v.).',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-2',
          value: {
            url: '/asset/images/guide/sports-2.png',
            caption: 'Chọn kèo cược',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            '<strong>Bước 5:</strong> Nhập số tiền cược vào phiếu cược và xác nhận đặt cược.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-3',
          value: {
            url: '/asset/images/guide/sports-3.png',
            caption: 'Phiếu cược',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Tỷ lệ cược có thể thay đổi theo thời gian thực. Hãy kiểm tra kỹ tỷ lệ cược trước khi xác nhận đặt cược.',
        },
      ],
    },
    section2: {
      title: '2. Cá cược Casino trực tuyến',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `${brandName} cung cấp nhiều trò chơi casino trực tuyến hấp dẫn với dealer thật. Dưới đây là hướng dẫn để bắt đầu chơi casino trực tuyến:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Đăng nhập vào tài khoản ${brandName} của bạn.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong> Chọn mục CASINO TRỰC TUYẾN trên menu chính.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-4',
          value: {
            url: '/asset/images/guide/casino-1.png',
            caption: 'Giao diện casino trực tuyến',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Chọn nhà cung cấp casino mà bạn muốn chơi (Evolution Gaming, SA Gaming, v.v.).',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Chọn trò chơi mà bạn muốn tham gia (Baccarat, Roulette, Blackjack, v.v.).',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-5',
          value: {
            url: '/asset/images/guide/casino-2.png',
            caption: 'Chọn trò chơi casino',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            '<strong>Bước 5:</strong> Đặt cược theo quy tắc của trò chơi và tận hưởng trải nghiệm casino trực tuyến.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Mỗi trò chơi casino có quy tắc và cách chơi riêng. Hãy đọc kỹ hướng dẫn hoặc xem các video hướng dẫn trước khi bắt đầu chơi.',
        },
      ],
    },
    section3: {
      title: '3. Cá cược Slots và Game Nhanh',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `${brandName} cung cấp hàng nghìn trò chơi Slots và Game Nhanh từ các nhà phát triển game hàng đầu. Dưới đây là hướng dẫn để bắt đầu chơi:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Đăng nhập vào tài khoản ${brandName} của bạn.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong> Chọn mục SLOTS hoặc GAME NHANH trên menu chính.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-6',
          value: {
            url: '/asset/images/guide/slots-1.png',
            caption: 'Giao diện Slots',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Chọn nhà cung cấp game hoặc thể loại game mà bạn muốn chơi.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Chọn trò chơi cụ thể mà bạn muốn tham gia.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-7',
          value: {
            url: '/asset/images/guide/slots-2.png',
            caption: 'Chọn trò chơi Slots',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value: '<strong>Bước 5:</strong> Đặt mức cược và bắt đầu chơi.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Nhiều trò chơi Slots có tính năng quay tự động và các tính năng đặc biệt khác. Hãy tìm hiểu kỹ về các tính năng này để tối ưu hóa trải nghiệm chơi game của bạn.',
        },
      ],
    },
    section4: {
      title: '4. Cá cược Xổ số',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `${brandName} cung cấp nhiều loại hình xổ số từ khắp nơi trên thế giới. Dưới đây là hướng dẫn để bắt đầu cá cược xổ số:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Đăng nhập vào tài khoản ${brandName} của bạn.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value: '<strong>Bước 2:</strong> Chọn mục XỔ SỐ trên menu chính.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-8',
          value: {
            url: '/asset/images/guide/lottery-1.png',
            caption: 'Giao diện Xổ số',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Chọn loại xổ số mà bạn muốn đặt cược.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Chọn số hoặc cách thức đặt cược theo quy tắc của loại xổ số đó.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'betting-9',
          value: {
            url: '/asset/images/guide/lottery-2.png',
            caption: 'Chọn số xổ số',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            '<strong>Bước 5:</strong> Nhập số tiền cược và xác nhận đặt cược.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Mỗi loại xổ số có lịch quay thưởng riêng. Hãy kiểm tra lịch quay thưởng để biết khi nào kết quả sẽ được công bố.',
        },
      ],
    },
    section5: {
      title: '5. Mẹo cá cược thông minh',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `Dưới đây là một số mẹo giúp bạn cá cược thông minh và có trách nhiệm tại ${brandName}:`,
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'tips',
          value: [
            'Đặt giới hạn ngân sách - Quyết định trước số tiền bạn sẵn sàng chi cho cá cược và không vượt quá giới hạn đó.',
            'Nghiên cứu trước khi đặt cược - Đặc biệt là với cá cược thể thao, hãy tìm hiểu về các đội, cầu thủ, thống kê và xu hướng trước khi đặt cược.',
            `Tận dụng các khuyến mãi - ${brandName} thường xuyên cung cấp các ưu đãi và khuyến mãi hấp dẫn, hãy tận dụng chúng để tối đa hóa giá trị cược của bạn.`,
            'Đa dạng hóa cược - Không nên đặt tất cả tiền vào một cược duy nhất. Hãy đa dạng hóa các loại cược để giảm thiểu rủi ro.',
            'Quản lý cảm xúc - Không đặt cược khi đang tức giận, buồn bã hoặc quá phấn khích. Hãy giữ bình tĩnh và đưa ra quyết định dựa trên lý trí.',
            'Biết khi nào nên dừng - Nếu bạn đang thua liên tiếp, hãy dừng lại và nghỉ ngơi. Đừng cố gắng "gỡ lại" bằng cách đặt cược nhiều hơn.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'conclusion',
          value:
            'Nhớ rằng, cá cược nên là một hình thức giải trí, không phải là cách để kiếm tiền. Hãy chơi có trách nhiệm và biết giới hạn của mình.',
        },
      ],
    },
    section6: {
      title: '6. Câu hỏi thường gặp về cá cược',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question1',
          value:
            '<strong>Tôi có thể đặt cược với số tiền tối thiểu là bao nhiêu?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer1',
          value: `Số tiền cược tối thiểu tại ${brandName} thường là 10.000 VND, tuy nhiên có thể khác nhau tùy theo từng loại hình cá cược và trò chơi cụ thể.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question2',
          value:
            '<strong>Làm thế nào để kiểm tra lịch sử cược của tôi?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer2',
          value: `Bạn có thể kiểm tra lịch sử cược bằng cách đăng nhập vào tài khoản ${brandName}, sau đó vào mục "Lịch sử giao dịch" hoặc "Lịch sử cược" trong phần cài đặt tài khoản.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question3',
          value: '<strong>Tôi có thể hủy cược sau khi đã đặt không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer3',
          value:
            'Đối với cá cược thể thao, bạn có thể hủy cược trong một số trường hợp nhất định trước khi trận đấu bắt đầu. Tuy nhiên, đối với casino trực tuyến, slots và các trò chơi khác, thông thường bạn không thể hủy cược sau khi đã xác nhận.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question4',
          value: '<strong>Khi nào tôi sẽ nhận được tiền thắng cược?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer4',
          value:
            'Tiền thắng cược thường được cộng vào tài khoản của bạn ngay sau khi kết quả được xác định. Đối với cá cược thể thao, thời gian thanh toán có thể từ vài phút đến vài giờ sau khi sự kiện kết thúc, tùy thuộc vào loại cược và giải đấu.',
        },
      ],
    },
  };
};
