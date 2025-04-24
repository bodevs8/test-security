import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const useVerification = (isMobile?: boolean): GuidelineContent => {
  return {
    key: 'verificationGuides',
    'category-title': 'Hướng dẫn',
    'page-title': 'HƯỚNG DẪN XÁC MINH TÀI KHOẢN',
    section1: {
      title: '1. Tại sao cần xác minh tài khoản?',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Xác minh tài khoản là một bước quan trọng để đảm bảo an toàn cho người dùng và tuân thủ các quy định pháp luật. Dưới đây là những lợi ích của việc xác minh tài khoản:',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'benefits',
          value: [
            'Bảo vệ tài khoản của bạn khỏi các hoạt động trái phép.',
            'Mở khóa tất cả các tính năng và giới hạn giao dịch cao hơn.',
            'Rút tiền nhanh chóng và dễ dàng hơn.',
            'Nhận các ưu đãi và khuyến mãi đặc biệt dành cho tài khoản đã xác minh.',
            'Tuân thủ các quy định pháp luật về phòng chống rửa tiền và bảo vệ người dùng.',
          ],
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Tài khoản chưa xác minh sẽ bị giới hạn một số tính năng và có thể bị hạn chế về số tiền giao dịch.',
        },
      ],
    },
    section2: {
      title: '2. Các loại xác minh tài khoản',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `${brandName} yêu cầu hai loại xác minh chính để đảm bảo tài khoản của bạn được bảo vệ tối đa:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'phone_verification',
          value:
            '<strong>Xác minh số điện thoại:</strong> Đây là bước xác minh cơ bản và bắt buộc khi đăng ký tài khoản. Số điện thoại của bạn sẽ được sử dụng để nhận mã xác thực khi đăng nhập và thực hiện các giao dịch quan trọng.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'kyc_verification',
          value:
            '<strong>Xác minh danh tính (KYC):</strong> Đây là bước xác minh nâng cao, yêu cầu bạn cung cấp giấy tờ tùy thân và thông tin cá nhân để xác nhận danh tính của bạn. KYC là bắt buộc để mở khóa tất cả các tính năng và giới hạn giao dịch cao.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'verification-1',
          value: {
            url: isMobile
              ? '/asset/images/guide/verification-types.png'
              : '/asset/images/guide/verification-types.png',
            caption: 'Các loại xác minh tài khoản',
          },
        },
      ],
    },
    section3: {
      title: '3. Hướng dẫn xác minh số điện thoại',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value: `Xác minh số điện thoại là bước đầu tiên và bắt buộc khi đăng ký tài khoản tại ${brandName}. Dưới đây là các bước để xác minh số điện thoại của bạn:`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step1',
          value:
            '<strong>Bước 1:</strong> Trong quá trình đăng ký, nhập số điện thoại của bạn vào ô yêu cầu.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'verification-2',
          value: {
            url: '/asset/images/guide/phone-verification-1.png',
            caption: 'Nhập số điện thoại',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step2',
          value:
            '<strong>Bước 2:</strong> Nhấn nút GỬI MÃ XÁC THỰC để nhận mã OTP qua SMS.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Nhập mã OTP nhận được vào ô xác thực.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'verification-3',
          value: {
            url: '/asset/images/guide/phone-verification-2.png',
            caption: 'Nhập mã OTP',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Nhấn XÁC NHẬN để hoàn tất quá trình xác minh số điện thoại.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Nếu bạn không nhận được mã OTP, hãy kiểm tra lại số điện thoại đã nhập và nhấn GỬI LẠI MÃ sau 60 giây. Nếu vẫn gặp vấn đề, vui lòng liên hệ với bộ phận CSKH để được hỗ trợ.',
        },
      ],
    },
    section4: {
      title: '4. Hướng dẫn xác minh danh tính (KYC)',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Xác minh danh tính (KYC) là bước quan trọng để mở khóa tất cả các tính năng và giới hạn giao dịch cao. Dưới đây là các bước để hoàn thành quá trình KYC:',
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
            '<strong>Bước 2:</strong> Vào mục TÀI KHOẢN > XÁC MINH DANH TÍNH.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'verification-4',
          value: {
            url: '/asset/images/guide/kyc-verification-1.png',
            caption: 'Menu Xác minh danh tính',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step3',
          value:
            '<strong>Bước 3:</strong> Điền đầy đủ thông tin cá nhân theo yêu cầu (họ tên, ngày sinh, địa chỉ, v.v.).',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'verification-5',
          value: {
            url: '/asset/images/guide/kyc-verification-2.png',
            caption: 'Điền thông tin cá nhân',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step4',
          value:
            '<strong>Bước 4:</strong> Tải lên hình ảnh giấy tờ tùy thân (CMND/CCCD/Hộ chiếu) - cả mặt trước và mặt sau.',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'verification-6',
          value: {
            url: '/asset/images/guide/kyc-verification-3.png',
            caption: 'Tải lên giấy tờ tùy thân',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step5',
          value:
            '<strong>Bước 5:</strong> Tải lên ảnh chụp bạn đang cầm giấy tờ tùy thân (ảnh selfie).',
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'verification-7',
          value: {
            url: '/asset/images/guide/kyc-verification-4.png',
            caption: 'Tải lên ảnh selfie với giấy tờ tùy thân',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'step6',
          value:
            '<strong>Bước 6:</strong> Nhấn GỬI YÊU CẦU XÁC MINH để hoàn tất quá trình.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Quá trình xác minh KYC thường mất từ 24-48 giờ làm việc. Bạn sẽ nhận được thông báo qua email hoặc SMS khi yêu cầu xác minh được phê duyệt hoặc cần bổ sung thông tin.',
        },
      ],
    },
    section5: {
      title: '5. Yêu cầu về hình ảnh giấy tờ',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'intro',
          value:
            'Để đảm bảo quá trình xác minh KYC diễn ra nhanh chóng và thuận lợi, hình ảnh giấy tờ tùy thân của bạn cần đáp ứng các yêu cầu sau:',
        },
        {
          type: SectionItemTypeEnum.LIST,
          key: 'requirements',
          value: [
            'Hình ảnh phải rõ nét, không bị mờ, nhòe hoặc quá sáng/tối.',
            'Toàn bộ giấy tờ phải hiển thị đầy đủ trong khung hình, bao gồm cả 4 góc.',
            'Thông tin trên giấy tờ phải dễ đọc, không bị che khuất.',
            'Giấy tờ phải còn hiệu lực, không hết hạn.',
            'Không chỉnh sửa hoặc photoshop hình ảnh.',
            'Đối với ảnh selfie, khuôn mặt và giấy tờ phải hiển thị rõ ràng trong cùng một khung hình.',
          ],
        },
        {
          type: SectionItemTypeEnum.IMAGE,
          key: 'verification-8',
          value: {
            url: '/asset/images/guide/document-requirements.png',
            caption: 'Ví dụ về hình ảnh giấy tờ đạt yêu cầu',
          },
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'note',
          value:
            'Lưu ý: Nếu hình ảnh không đáp ứng các yêu cầu trên, yêu cầu xác minh của bạn có thể bị từ chối và bạn sẽ cần gửi lại hình ảnh mới.',
        },
      ],
    },
    section6: {
      title: '6. Câu hỏi thường gặp về xác minh tài khoản',
      sub_title: '',
      items: [
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question1',
          value: `<strong>Tôi có thể sử dụng ${brandName} mà không cần xác minh KYC không?</strong>`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer1',
          value: `Có, bạn có thể sử dụng một số tính năng cơ bản của ${brandName} sau khi xác minh số điện thoại. Tuy nhiên, để mở khóa tất cả các tính năng, giới hạn giao dịch cao hơn và đảm bảo an toàn cho tài khoản, chúng tôi khuyến nghị bạn hoàn thành quá trình xác minh KYC.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question2',
          value:
            '<strong>Thông tin cá nhân của tôi có được bảo mật không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer2',
          value: `Có, ${brandName} cam kết bảo mật thông tin cá nhân của người dùng. Chúng tôi sử dụng các biện pháp bảo mật tiên tiến để bảo vệ dữ liệu của bạn và chỉ sử dụng thông tin cho mục đích xác minh danh tính theo quy định pháp luật.`,
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question3',
          value:
            '<strong>Tôi có thể thay đổi số điện thoại đã xác minh không?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer3',
          value:
            'Có, bạn có thể thay đổi số điện thoại đã xác minh bằng cách vào mục TÀI KHOẢN > CÀI ĐẶT > THAY ĐỔI SỐ ĐIỆN THOẠI. Bạn sẽ cần xác minh cả số điện thoại cũ và số điện thoại mới để hoàn tất quá trình thay đổi.',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'question4',
          value:
            '<strong>Yêu cầu xác minh KYC của tôi bị từ chối, tôi nên làm gì?</strong>',
        },
        {
          type: SectionItemTypeEnum.CONTENT,
          key: 'answer4',
          value:
            'Nếu yêu cầu xác minh KYC của bạn bị từ chối, bạn sẽ nhận được thông báo về lý do từ chối. Hãy kiểm tra lại thông tin và hình ảnh giấy tờ theo yêu cầu, sau đó gửi lại yêu cầu xác minh. Nếu vẫn gặp vấn đề, vui lòng liên hệ với bộ phận CSKH để được hỗ trợ.',
        },
      ],
    },
  };
};
