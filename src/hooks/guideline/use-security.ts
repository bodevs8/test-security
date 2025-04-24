import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useSecurity = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'securityGuides',
    'category-title': 'Hướng dẫn',
    'page-title': 'HƯỚNG DẪN BẢO MẬT TÀI KHOẢN',
    section1: {
      title: '1. Tạo mật khẩu mạnh',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Mật khẩu là lớp bảo vệ đầu tiên cho tài khoản của bạn. Một mật khẩu mạnh sẽ giúp bảo vệ tài khoản khỏi các cuộc tấn công và đánh cắp thông tin.',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'password_tips',
          value: [
            'Sử dụng ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
            'Tránh sử dụng thông tin cá nhân như tên, ngày sinh, hoặc số điện thoại trong mật khẩu.',
            'Không sử dụng các từ phổ biến hoặc dễ đoán như "password", "123456", v.v.',
            'Thay đổi mật khẩu định kỳ, ít nhất 3 tháng một lần.',
            'Không sử dụng cùng một mật khẩu cho nhiều tài khoản khác nhau.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'example',
          value:
            'Ví dụ về mật khẩu mạnh: "Br@nd2023!Secure" - Mật khẩu này có đủ độ dài, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt, và không dễ đoán.',
        },
      ],
    },
    section2: {
      title: '2. Xác thực hai yếu tố (2FA)',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Xác thực hai yếu tố (2FA) là một lớp bảo mật bổ sung, yêu cầu không chỉ mật khẩu mà còn một mã xác thực được gửi đến thiết bị của bạn khi đăng nhập.',
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
            '<strong>Bước 2:</strong> Vào phần Cài đặt tài khoản > Bảo mật.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'security-1',
          value: {
            url: isMobile
              ? '/asset/images/guide/security-2fa-1.png'
              : '/asset/images/guide/security-2fa-1.png',
            caption: 'Menu Bảo mật trong Cài đặt tài khoản',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value: '<strong>Bước 3:</strong> Chọn Bật xác thực hai yếu tố.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Nhập mã xác thực được gửi đến số điện thoại của bạn.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'security-2',
          value: {
            url: isMobile
              ? '/asset/images/guide/security-2fa-2.png'
              : '/asset/images/guide/security-2fa-2.png',
            caption: 'Nhập mã xác thực',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value: '<strong>Bước 5:</strong> Xác nhận để hoàn tất việc bật 2FA.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Sau khi bật 2FA, mỗi lần đăng nhập bạn sẽ cần nhập mã xác thực được gửi đến số điện thoại của bạn. Điều này giúp bảo vệ tài khoản của bạn ngay cả khi mật khẩu bị lộ.',
        },
      ],
    },
    section3: {
      title: '3. Bảo mật thông tin cá nhân',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Bảo vệ thông tin cá nhân là một phần quan trọng trong việc bảo mật tài khoản. Dưới đây là một số biện pháp để bảo vệ thông tin cá nhân của bạn:',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'personal_info_tips',
          value: [
            `Không chia sẻ thông tin đăng nhập (tên đăng nhập, mật khẩu) với bất kỳ ai, kể cả nhân viên ${brandName}.`,
            'Không chia sẻ thông tin cá nhân nhạy cảm như số CMND/CCCD, thông tin thẻ ngân hàng trên các diễn đàn hoặc mạng xã hội.',
            'Kiểm tra và cập nhật thông tin liên hệ (email, số điện thoại) thường xuyên để đảm bảo bạn nhận được các thông báo bảo mật.',
            `Sử dụng email riêng cho tài khoản ${brandName}, không dùng chung với các dịch vụ khác.`,
            'Đăng xuất khỏi tài khoản khi sử dụng thiết bị công cộng hoặc không phải của bạn.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'warning',
          value: `Cảnh báo: ${brandName} sẽ không bao giờ yêu cầu bạn cung cấp mật khẩu hoặc mã xác thực qua điện thoại, email hoặc tin nhắn. Nếu bạn nhận được yêu cầu như vậy, đó có thể là nỗ lực lừa đảo.`,
        },
      ],
    },
    section4: {
      title: '4. Nhận biết và phòng tránh lừa đảo',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Lừa đảo trực tuyến ngày càng tinh vi. Dưới đây là một số dấu hiệu và cách phòng tránh lừa đảo:',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'scam_signs',
          value: [
            'Email hoặc tin nhắn yêu cầu thông tin cá nhân, mật khẩu hoặc thông tin tài chính.',
            `Liên kết đáng ngờ hoặc trang web giả mạo ${brandName}.`,
            'Lời mời tham gia các chương trình khuyến mãi quá hấp dẫn hoặc không thực tế.',
            'Yêu cầu chuyển tiền để nhận thưởng hoặc mở khóa tài khoản.',
            `Tin nhắn hoặc cuộc gọi từ người tự xưng là nhân viên ${brandName} nhưng không thông qua các kênh chính thức.`,
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'prevention',
          value: `Để phòng tránh lừa đảo, hãy luôn truy cập ${brandName} thông qua trang web chính thức hoặc ứng dụng. Kiểm tra kỹ URL trước khi đăng nhập và không nhấp vào các liên kết đáng ngờ. Nếu nghi ngờ, hãy liên hệ trực tiếp với bộ phận CSKH qua các kênh chính thức.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'image1',
          value: {
            url: '/asset/images/guide/security-scam.png',
            caption: 'Ví dụ về email lừa đảo - Chú ý các dấu hiệu đáng ngờ',
          },
        },
      ],
    },
    section5: {
      title: '5. Câu hỏi thường gặp về bảo mật',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question1',
          value:
            '<strong>Tôi nghi ngờ tài khoản của mình bị xâm nhập, tôi nên làm gì?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer1',
          value:
            'Nếu bạn nghi ngờ tài khoản bị xâm nhập, hãy ngay lập tức thay đổi mật khẩu và liên hệ với bộ phận CSKH. Bạn cũng nên kiểm tra lịch sử đăng nhập và giao dịch để phát hiện các hoạt động bất thường.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question2',
          value:
            '<strong>Làm thế nào để kiểm tra xem tài khoản của tôi có đang đăng nhập ở nơi khác không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer2',
          value:
            'Bạn có thể kiểm tra lịch sử đăng nhập trong phần Cài đặt tài khoản > Bảo mật > Lịch sử đăng nhập. Tại đây, bạn sẽ thấy danh sách các thiết bị và địa điểm đã đăng nhập vào tài khoản của bạn gần đây.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question3',
          value:
            '<strong>Tôi có thể đăng xuất khỏi tất cả các thiết bị khác không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer3',
          value:
            'Có, bạn có thể đăng xuất khỏi tất cả các thiết bị khác bằng cách vào Cài đặt tài khoản > Bảo mật > Đăng xuất khỏi tất cả các thiết bị khác. Điều này sẽ buộc tất cả các phiên đăng nhập hiện tại, ngoại trừ phiên của bạn, phải đăng nhập lại.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question4',
          value:
            '<strong>Tôi quên mật khẩu và không thể truy cập vào số điện thoại đã đăng ký, tôi nên làm gì?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer4',
          value:
            'Trong trường hợp này, bạn cần liên hệ trực tiếp với bộ phận CSKH qua Live Chat hoặc Email. Bạn sẽ cần cung cấp các thông tin xác minh bổ sung để chứng minh bạn là chủ tài khoản, như thông tin cá nhân, lịch sử giao dịch, v.v.',
        },
      ],
    },
  };
};
