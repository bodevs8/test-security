import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

export const CHINH_SACH_QUYEN_RIENG_TU: GuidelineContent = {
  key: 'privacyPolicy',
  'category-title': 'Hỗ trợ & pháp lý',
  'page-title': 'Chính sách quyền riêng tư',
  section: {
    title: '',
    sub_title: '',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'intro',
        value:
          'Chúng tôi luôn nhận thức và tôn trọng quyền riêng tư của Quý khách. Bảo đảm an toàn dữ liệu của Quý khách luôn là ưu tiên hàng đầu của chúng tôi.',
      },
    ],
  },
  section1: {
    title: 'Những loại thông tin cá nhân được thu thập',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `${brandName} có quyền thu thập thông tin cá nhân của người chơi bao gồm: tên, email, số điện thoại mà quý khách cung cấp khi đăng ký thành viên trên website. Việc thu thập này không áp dụng đối với các khách hàng truy cập trang để tham khảo, tìm hiểu.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value: `Quý khách hoàn toàn có quyền truy cập xem và chỉnh sửa thông tin cá nhân trên ${brandName} khi có thay đổi.`,
      },
    ],
  },
  section2: {
    title: 'Mục đích của việc thu thập thông tin cá nhân',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `${brandName} chỉ thu thập và sử dụng các thông tin cá nhân của người chơi để phục vụ cho quá trình sử dụng dịch vụ, xác nhận giao dịch của người chơi đó tại ${brandName} và được bảo hộ bởi hệ thống phòng chống giả mạo tiên tiến nhất hiện nay.`,
      },
    ],
  },
  section3: {
    title: 'Cookie',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Trang web bao gồm cả các trang được tối ưu hóa trên thiết bị điện thoại có sử dụng các Cookie và các công nghệ tương tự để quản lý các phiên đăng nhập, cung cấp các trang web được cá nhân hóa và các quảng cáo được tùy chỉnh theo nhu cầu và sở thích cá nhân của khách hàng.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Các Cookie này không chứa thông tin cá nhân của bạn và không có ý định thu thập bất kỳ thông tin cá nhân nào của khách hàng.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Bằng việc sử dụng Trang web, bạn đồng ý với việc sử dụng các Cookie và các công nghệ tương tự cho các mục đích đã nêu trên.',
      },
    ],
  },
  section4: {
    title: 'Bảo vệ thông tin cá nhân của bạn',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Trong suốt quá trình truy cập Trang web của bạn, chúng tôi luôn nỗ lực hết mình để đảm bảo tính an toàn, tính toàn vẹn, tính bảo mật, và tính riêng tư của những thông tin mà bạn cung cấp. Bất kỳ thông tin nhận diện, lý lịch, sở thích cá nhân đều được thu thập thận trọng và không tiết lộ cho bất kỳ bên thứ ba nào trừ trường hợp được cho phép hoặc yêu cầu từ cơ quan chính phủ hoặc cơ quan thi hành luật pháp.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Tuy nhiên, chúng tôi có quyền tiết lộ, chia sẻ thông tin cá nhân của khách hàng với các nhà cung cấp dịch vụ thanh toán và các tổ chức tài chính để phục vụ cho việc thanh toán.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Chúng tôi tuyệt đối không bao giờ yêu cầu bạn tiết lộ mật khẩu, hoặc mã bảo mật thông qua điện thoại, email. Tương tự như trên chúng tôi cũng không bao giờ gửi các liên kết dẫn đến các trang web khác yêu cầu thông tin cá nhân của khách hàng.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content4',
        value: `Chính sách bảo mật này quy định rằng các nhân viên bắt buộc phải bảo mật thông tin của Quý khách một cách nghiêm ngặt nhất. Đây là nghĩa vụ và trách nhiệm của tất cả nhân viên tại ${brandName}.`,
      },
    ],
  },
  section5: {
    title: 'Quyền và nghĩa vụ của người chơi',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Trong quá trình tham gia và sử dụng dịch vụ của ${brandName}, người chơi có quyền yêu cầu chúng tôi truy xuất các thông tin của mình để đối chứng cũng như cập nhật thông tin mới nếu có. Mọi thắc mắc về thông tin hay có nhu cầu cập nhật mới, người chơi có thể liên hệ bộ phận chăm sóc khách hàng của ${brandName} để hỗ trợ xử lý qua Livechat và Telegram CSKH.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value: `Đối với việc bảo mật thông tin, người chơi cũng có trách nhiệm tự bảo vệ thông tin của bản thân, không tiết lộ, chia sẻ thông tin cho người thứ ba. Các sự cố do việc tiết lộ thông tin từ phía người chơi, ${brandName} sẽ không chịu trách nhiệm.`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value: `Rất mong sự hợp tác của người chơi với ${brandName}!`,
      },
    ],
  },
};
