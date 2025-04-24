import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';
export const useLogin = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'loginGuides',
    'category-title': 'Hướng dẫn',
    'page-title': 'HƯỚNG DẪN ĐĂNG NHẬP',
    section1: {
      title: '1. Đăng nhập trên website',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `Đăng nhập vào tài khoản ${brandName} của bạn rất đơn giản. Dưới đây là các bước để đăng nhập trên website:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Truy cập trang chủ ${brandName} và nhấn vào nút ĐĂNG NHẬP ở góc trên bên phải màn hình.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'login-1',
          value: {
            url: isMobile
              ? '/asset/images/guide/login-1.png'
              : '/asset/images/guide/login-1.png',
            caption: 'Nút đăng nhập trên trang chủ',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong> Nhập tên đăng nhập và mật khẩu của bạn vào form đăng nhập.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'login-2',
          value: {
            url: '/asset/images/guide/login-2.png',
            caption: 'Form đăng nhập',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Nhấn nút ĐĂNG NHẬP để truy cập vào tài khoản của bạn.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Nếu bạn đã đăng ký tài khoản nhưng chưa xác minh, bạn vẫn có thể đăng nhập nhưng sẽ bị giới hạn một số tính năng.',
        },
      ],
    },
    section2: {
      title: '2. Đăng nhập trên ứng dụng di động',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `Nếu bạn muốn đăng nhập vào tài khoản ${brandName} thông qua ứng dụng di động, hãy làm theo các bước sau:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Mở ứng dụng ${brandName} trên thiết bị di động của bạn.`,
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'login-3',
          value: {
            url: '/asset/images/guide/login-app-1.png',
            caption: 'Màn hình khởi động ứng dụng',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong> Nhập tên đăng nhập và mật khẩu của bạn vào form đăng nhập.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'login-4',
          value: {
            url: '/asset/images/guide/login-app-2.png',
            caption: 'Form đăng nhập trên ứng dụng',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Nhấn nút ĐĂNG NHẬP để truy cập vào tài khoản của bạn.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'tip',
          value:
            'Mẹo: Bạn có thể bật tùy chọn "Lưu thông tin đăng nhập" để không phải nhập lại thông tin đăng nhập mỗi lần mở ứng dụng.',
        },
      ],
    },
    section3: {
      title: '3. Đăng nhập bằng sinh trắc học (Vân tay/Face ID)',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `${brandName} hỗ trợ đăng nhập bằng sinh trắc học (vân tay hoặc Face ID) trên ứng dụng di động để tăng tính bảo mật và tiện lợi. Dưới đây là cách thiết lập:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value: `<strong>Bước 1:</strong> Đăng nhập vào ứng dụng ${brandName} bằng tên đăng nhập và mật khẩu của bạn.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong> Vào mục CÀI ĐẶT > BẢO MẬT > ĐĂNG NHẬP BẰNG SINH TRẮC HỌC.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'login-5',
          value: {
            url: '/asset/images/guide/biometric-1.png',
            caption: 'Cài đặt đăng nhập bằng sinh trắc học',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Bật tùy chọn ĐĂNG NHẬP BẰNG VÂN TAY hoặc ĐĂNG NHẬP BẰNG FACE ID (tùy thuộc vào thiết bị của bạn).',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Làm theo hướng dẫn trên màn hình để thiết lập đăng nhập bằng sinh trắc học.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Tính năng đăng nhập bằng sinh trắc học chỉ khả dụng trên các thiết bị hỗ trợ vân tay hoặc Face ID và chỉ hoạt động sau khi bạn đã đăng nhập bằng tên đăng nhập và mật khẩu ít nhất một lần.',
        },
      ],
    },
    section4: {
      title: '4. Xử lý các vấn đề khi đăng nhập',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Dưới đây là một số vấn đề thường gặp khi đăng nhập và cách khắc phục:',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'forgot_password',
          value:
            '<strong>Quên mật khẩu:</strong> Nếu bạn quên mật khẩu, hãy nhấn vào liên kết "Quên mật khẩu" trên trang đăng nhập. Nhập số điện thoại đã đăng ký và làm theo hướng dẫn để đặt lại mật khẩu mới.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'account_locked',
          value:
            '<strong>Tài khoản bị khóa:</strong> Nếu bạn nhập sai mật khẩu nhiều lần, tài khoản có thể bị khóa tạm thời. Hãy đợi khoảng 30 phút và thử lại, hoặc liên hệ với bộ phận CSKH để được hỗ trợ mở khóa tài khoản.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'connection_issues',
          value:
            '<strong>Lỗi kết nối:</strong> Nếu bạn gặp vấn đề về kết nối, hãy kiểm tra kết nối internet của bạn, làm mới trang web hoặc khởi động lại ứng dụng và thử lại.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'browser_issues',
          value:
            '<strong>Vấn đề với trình duyệt:</strong> Nếu bạn không thể đăng nhập trên trình duyệt, hãy xóa cache và cookie, hoặc thử sử dụng trình duyệt khác.',
        },
      ],
    },
    section5: {
      title: '5. Câu hỏi thường gặp về đăng nhập',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question1',
          value:
            '<strong>Tôi có thể đăng nhập cùng lúc trên nhiều thiết bị không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer1',
          value: `Có, ${brandName} cho phép bạn đăng nhập cùng lúc trên nhiều thiết bị khác nhau. Tuy nhiên, vì lý do bảo mật, một số hoạt động nhạy cảm như rút tiền có thể yêu cầu xác thực bổ sung.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question2',
          value:
            '<strong>Tôi nên làm gì nếu nghi ngờ tài khoản của mình bị xâm nhập?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer2',
          value:
            'Nếu bạn nghi ngờ tài khoản bị xâm nhập, hãy ngay lập tức thay đổi mật khẩu và liên hệ với bộ phận CSKH để được hỗ trợ. Chúng tôi có thể kiểm tra lịch sử đăng nhập và giúp bạn bảo vệ tài khoản.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question3',
          value:
            '<strong>Tôi có thể thay đổi tên đăng nhập sau khi đã đăng ký không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer3',
          value:
            'Không, tên đăng nhập không thể thay đổi sau khi đã đăng ký. Tuy nhiên, bạn có thể thay đổi mật khẩu và các thông tin cá nhân khác trong phần cài đặt tài khoản.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question4',
          value:
            '<strong>Tôi có thể đăng nhập bằng tài khoản mạng xã hội không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer4',
          value: `Hiện tại, ${brandName} chưa hỗ trợ đăng nhập bằng tài khoản mạng xã hội. Bạn cần sử dụng tên đăng nhập và mật khẩu đã đăng ký với ${brandName} để đăng nhập.`,
        },
      ],
    },
  };
};
