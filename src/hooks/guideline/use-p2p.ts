import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

export const useP2P = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'p2pGuides',
    'category-title': 'Hướng dẫn',
    'page-title': 'HƯỚNG DẪN P2P',
    section: {
      title: '',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Vui lòng đảm bảo bạn đã hoàn tất xác minh tài khoản, cập nhật thông tin ngân hàng trên hệ thống đang sử dụng và chuyển đổi số dư trên tài khoản thành Kcoin để thực hiện mua bán Kcoin sang VND. Liên hệ CSKH để được hỗ trợ chi tiết.',
        },
      ],
    },
    section1: {
      title: '1. Quy trình giao dịch nạp rút P2P',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'p2p-1',
          value: {
            url: isMobile
              ? '/images/guide/p2p-1.webp'
              : '/images/guide/p2p-1.webp',
            caption: '',
          },
        },
      ],
    },
    section2: {
      title:
        '2. Hướng dẫn chuyển đổi số dư tài khoản trên hệ thống thành Kcoin để thực hiện bán sang VND',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value:
            '<strong>Bước 1:</strong> Tại góc phải trên màn hình sẽ hiển thị số Kcoin bạn đang có. Nhấn vào nút này để chuyển đổi giữa số dư trong tài khoản của bạn vào tài khoản Kcoin.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'p2p-2',
          value: {
            url: isMobile
              ? '/images/guide/p2p-2.webp'
              : '/images/guide/p2p-2.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong>  Nhập số lượng K bạn muốn chuyển đổi thành Kcoin để giao dịch với thương nhân trên sàn và Nhấn nút [Chuyển].',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Lưu ý:</strong>  Để chuyển đổi từ K sang Kcoin và ngược lại bạn chỉ cần click vào mũi tên màu xám chỉ xuống dưới (vị trí mũi tên nằm giữa "Tài khoản chính" và "Tài khoản Kcoin").',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 3:</strong>  Nhấn [Xác nhận] để hoàn tất việc chuyển đổi và chờ CSKH duyệt phiếu chuyển đổi.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'p2p-3',
          value: {
            url: isMobile
              ? '/images/guide/p2p-3.webp'
              : '/images/guide/p2p-3.webp',
            caption: '',
          },
        },
      ],
    },
    section3: {
      title: '3. Hướng dẫn bán Kcoin',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value:
            '<strong>Bước 1: </strong> Trên thanh công cụ phụ của màn hình [P2P] nhấp vào [BÁN]. Tuỳ chọn thương gia, chọn [BÁN].',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong> Lưu ý: </strong> Bạn cần đảm bảo ví có số dư Kcoin để thực hiện giao dịch bán.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'p2p-4',
          value: {
            url: isMobile
              ? '/images/guide/p2p-4.webp'
              : '/images/guide/p2p-4.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 2: </strong>   Khi đó màn hình sẽ hiển thị ra ô như bên dưới, Nhập số lượng muốn bán vào ô [Nhập số lượng bán] Ở [Chọn hình thức thanh toán], hệ thống sẽ tự động thêm số tài khoản ngân hàng mà bạn đã thêm vào tài khoản của mình.',
        },
        // {
        //   type: SectionItemTypeEnum.CONTENT,
        //   key: 'step4',
        //   value:
        //     '[Nhập số lượng bán] Ở [Chọn hình thức thanh toán], hệ thống sẽ tự động thêm số tài khoản ngân hàng mà bạn đã thêm vào tài khoản của mình.',
        // },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            '<strong>Lưu ý: </strong>  Hãy kiểm tra lại 1 lần nữa để đảm bảo đúng số tài khoản ngân hàng của mình trước khi nhấn [Bán].',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'p2p-5',
          value: {
            url: isMobile
              ? '/images/guide/p2p-5.webp'
              : '/images/guide/p2p-5.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step6',
          value:
            '<strong>Bước 3: </strong>  Màn hình sẽ chuyển sang tab [Lịch sử giao dịch] trong đó có chi tiết thông tin lệnh vừa bán và hiển thị đồng hồ đếm ngược.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'p2p-6',
          value: {
            url: isMobile
              ? '/images/guide/p2p-6.webp'
              : '/images/guide/p2p-6.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step7',
          value:
            '<strong>Bước 4: </strong>  Lúc này thương gia sẽ tiến hành chuyển tiền vào tài khoản cho bạn và hoàn tất giao dịch. Ở đây bạn không cần thao tác gì thêm. Nếu bạn vẫn chưa nhận được tiền, vui lòng liên hệ CSKH để được hỗ trợ xử lý.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'p2p-7',
          value: {
            url: isMobile
              ? '/images/guide/p2p-7.webp'
              : '/images/guide/p2p-7.webp',
            caption: '',
          },
        },
      ],
    },
    section4: {
      title: '4. Hướng dẫn mua Kcoin',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value:
            '<strong>Bước 1: </strong>  Trên thanh công cụ phụ của màn hình [P2P] nhấp vào [MUA]. Tuỳ chọn thương gia, chọn [MUA].',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value: '<strong>Bước 2: </strong> Tuỳ chọn thương gia, chọn [MUA].',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Lưu ý: </strong> “Giới hạn” là số tiền tối thiểu và tối đa mà thương gia có thể thanh toán cho bạn trong 1 giao dịch. Hãy chú ý đến “Số lượng có sẵn” và “Giới hạn” của mỗi quảng cáo để lựa chọn thương gia phù hợp với số lượng Kcoin mà bạn muốn mua.',
        },
        // {
        //   type: SectionItemTypeEnum.IMAGE,
        //   key: 'image2',
        //   value: {
        //     url: isMobile
        //       ? '/images/guide/tutorial-p2p-8-mobile.webp'
        //       : '/images/guide/tutorial-p2p-8.webp',
        //     caption: '',
        //   },
        // },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 3: </strong> Màn hình sẽ chuyển sang [Lịch sử giao dịch] trong đó có chi tiết thông tin lệnh vừa mua. Bạn có thể tuỳ chọn tài khoản ngân hàng mà thương gia có hỗ trợ thanh toán bên cột [Chọn ngân hàng] và tiến hành quét mã QR hiển thị trên màn hình để thanh toán cho người bán.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'image3',
          value: {
            url: isMobile
              ? '/images/guide/p2p-8.webp'
              : '/images/guide/p2p-8.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            '<strong>Bước 4: </strong> Đến đây bạn đã hoàn thành giao dịch của mình và đợi người mua chuyển Kcoin vào ví của bạn.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step6',
          value:
            '<strong>Lưu ý: </strong> Khi người bán nhận được tiền vào tài khoản sẽ ngay lập tức chuyển Kcoin vào ví cho bạn, bạn chỉ cần đợi và không cần làm thao tác gì thêm.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'image4',
          value: {
            url: isMobile
              ? '/images/guide/p2p-9.webp'
              : '/images/guide/p2p-9.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step7',
          value:
            'Màn hình sẽ hiển thị như (hình phía dưới) khi người mua đã nhận được tiền và hoàn tất giao dịch.',
        },
      ],
    },
    section5: {
      title: '5. Hướng dẫn mua nhanh',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value:
            '<strong>Bước 1: </strong>  Bấm vào nút “Mua bán nhanh” ở trên góc phải màn hình.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'image1',
          value: {
            url: isMobile
              ? '/images/guide/p2p-10.webp'
              : '/images/guide/p2p-10.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2: </strong> Ở tab mua: Nhập số lượng Kcoin cần mua và bấm “Xác nhận mua”. Sau đó hệ thống sẽ tự động tìm kiếm và tạo giao dịch mua nếu khớp lệnh. Sau đó tiến hành giao dịch như bình thường.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'image2',
          value: {
            url: isMobile
              ? '/images/guide/p2p-11.webp'
              : '/images/guide/p2p-11.webp',
            caption: '',
          },
        },
      ],
    },
    section6: {
      title: '6. Hướng dẫn bán nhanh',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value:
            '<strong>Bước 1: </strong> Bấm vào nút “Mua bán nhanh” ở trên góc phải màn hình.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'image1',
          value: {
            url: isMobile
              ? '/images/guide/p2p-12.webp'
              : '/images/guide/p2p-12.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2: </strong> Chọn tab bán: Nhập số lượng cần bán, sau đó chọn hình thức thanh toán và bấm “Xác nhận bán”. Lúc này hệ thống cũng sẽ tự động tìm kiếm và tạo giao dịch bán nếu khớp lệnh. Sau đó tiến hành giao dịch như bình thường.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'image2',
          value: {
            url: isMobile
              ? '/images/guide/p2p-13.webp'
              : '/images/guide/p2p-13.webp',
            caption: '',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Lưu ý: </strong> Trường hợp bạn đặt lệnh không thành công, vui lòng thử lại với số tiền khác, hoặc chọn một tin đăng phù hợp theo nhu cầu của bạn trên thị trường và tiến hành giao dịch.',
        },
      ],
    },
  };
};
