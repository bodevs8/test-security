import type { GuidelineContent } from '@/types/guideline';
import { SectionItemTypeEnum } from '@/enums';

export const DIEU_KHOAN_DIEU_KIEN: GuidelineContent = {
  key: 'termsAndConditions',
  'category-title': 'Hỗ trợ & pháp lý',
  'page-title': 'Điều khoản và điều kiện',

  section1: {
    title: '1. Định nghĩa',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value: `Các quy định sau đây xác định các điều khoản điều kiện chi phối quyền truy cập và tham gia của bạn vào bất kỳ dịch vụ "cá cược" nào do Công ty cung cấp hoặc gọi chung là "Công ty", "chúng tôi", "của chúng tôi" hoặc "về chúng tôi" trong bối cảnh tương ứng. Các điều khoản này được kết hợp tham khảo cùng lúc với "Chính sách bảo mật" và bất kỳ Điều khoản điều kiện nào khác liên quan đến việc sử dụng (các) Dịch vụ, Trang web và Thông tin được bao gồm trong đó (gọi chung là "Điều khoản và điều kiện").`,
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Các điều khoản và điều kiện này có giá trị như một bản cam kết giữa khách hàng và công ty. Ngoài các điều khoản và điều kiện dưới đây, Quý khách cần tham khảo thêm Chính sách bảo mật cũng như các quy định, chính sách và điều kiện khác liên quan đến các sản phẩm và chương trình khuyến mãi đang có tại website chúng tôi:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr',
        value: [
          `Đăng Ký và sử dụng dịch vụ cá cược tại GEN88 đồng nghĩa với việc bạn đã chấp nhận các điều khoản và điều kiện của chúng tôi. Điều khoản và điều kiện này có hiệu lực ngay từ lần truy cập đầu tiên và nếu bạn không đồng ý xin vui lòng không truy cập và sử dụng trang web của chúng tôi.`,
          'Chúng tôi có và được toàn quyền sửa đổi hoặc bổ sung các điều khoản và điều kiện cũng như Chính sách bảo mật sao cho phù hợp nhất bất cứ lúc nào, Quý khách vui lòng truy cập để theo dõi và cập nhật thường xuyên.',
          'Chúng tôi có quyền từ chối, vô hiệu hóa tài khoản nếu phát hiện có sự gian lận trong cá cược cũng như gian lận trong chính sách khuyến mãi. Trong thời gian khuyến mãi, chúng tôi luôn kiểm tra và chấp hành nghiêm ngặt các điều khoản và điều kiện khuyến mãi. Việc một khách hàng tạo nhiều tài khoản để trục lợi khuyến mãi thưởng nạp hoặc hoàn trả hàng ngày được xem là vi phạm.',
        ],
      },
    ],
  },

  section2: {
    title: '2. Sử dụng trang web',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Bằng việc nhấp vào nút "Đăng ký" trong quá trình đăng ký của bạn, bạn xác nhận và chấp nhận rằng:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr',
        value: [
          'Bạn phải ít nhất 18 tuổi và/hoặc có đủ năng lực pháp lý để ký kết các hợp đồng ràng buộc, bao gồm các Điều khoản và Điều kiện này.',
          'Bạn đã đọc, hiểu rõ và chấp nhận các Điều khoản và Điều kiện này; và Các Điều khoản và Điều kiện này tạo thành một thỏa thuận ràng buộc pháp lý (thỏa thuận) giữa bạn và Công ty về việc sử dụng Dịch vụ.',
        ],
      },
    ],
  },

  section3: {
    title: '3. Sửa đổi',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Chúng tôi có quyền sửa đổi, cập nhật hoặc bổ sung các Điều khoản và Điều kiện này mà không cần thông báo trước, theo quyết định riêng của chúng tôi. Các Điều khoản và Điều kiện được sửa đổi, cập nhật hoặc bổ sung sẽ có hiệu lực khi được công bố trên (các) Trang web của chúng tôi. Việc tiếp tục sử dụng, truy cập và tham gia vào Dịch vụ trên hoặc thông qua (các) Trang web và (các) Thiết bị của chúng tôi sau khi có sự cập nhật và sửa đổi đó đồng nghĩa với việc bạn chấp nhận Điều khoản và Điều kiện được sửa đổi hoặc cập nhật.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Bạn thừa nhận và đồng ý rằng bạn có trách nhiệm kiểm tra mọi sửa đổi, cập nhật và/hoặc bổ sung các Điều khoản và Điều kiện. Công ty sẽ không có nghĩa vụ thông báo cho bạn về những sửa đổi, cập nhật và/hoặc bổ sung đó.',
      },
    ],
  },

  section4: {
    title: '4. Sở hữu trí tuệ',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Các thông tin, tài liệu và dữ liệu được cung cấp hoặc hiển thị trên trang web, dịch vụ hoặc bất kỳ hình thức nào khác bao gồm, nhưng không giới hạn, các chương trình và tài liệu tiếp thị, kết quả thi đấu, thống kê, dữ liệu thể thao, lịch thi đấu, tỷ lệ cược và thông tin cá cược, văn bản, đồ họa, video, và âm thanh ("Thông Tin") thuộc quyền sở hữu của Công ty và các đối tác cấp phép. Thông Tin này chỉ dành cho mục đích cá nhân và phi thương mại của bạn.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Bạn không được phép thay đổi, sao chép, chỉnh sửa, tái tạo, lưu trữ, phân phối, hiển thị, xuất bản, truyền tải, bán, cho thuê, cấp phép, hoặc cung cấp Thông Tin cho bất kỳ cá nhân, trang web hay phương tiện nào khác mà không có sự đồng ý trước bằng văn bản của Công ty.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Phần mềm, dịch vụ và thông tin trên trang web được bảo vệ bởi các quyền sở hữu trí tuệ, bao gồm bản quyền và nhãn hiệu. Toàn bộ quyền và lợi ích đối với phần mềm, dịch vụ và thông tin trên trang web đều thuộc sở hữu hoặc được cấp phép và/hoặc kiểm soát bởi Công ty và các đối tác cấp phép. Khi sử dụng trang web, bạn thừa nhận rằng mình không có bất kỳ quyền sở hữu, lợi ích hoặc giấy phép nào đối với phần mềm, dịch vụ và thông tin trên trang web.',
      },
    ],
  },

  section5: {
    title: '5. Điều kiện sử dụng',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Khi sử dụng các Dịch vụ của chúng tôi, bạn cam kết và đảm bảo rằng bạn sẽ không truy cập hoặc sử dụng Trang web, Dịch vụ, Phần mềm hoặc Thông tin với bất kỳ mục đích nào trái pháp luật hoặc vi phạm các Điều khoản và Điều kiện này. Cụ thể, bạn cam kết:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr',
        value: [
          'Bạn tham gia với tư cách cá nhân, không đại diện cho người khác.',
          'Bạn có đầy đủ năng lực pháp lý và không bị hạn chế về năng lực hành vi.',
          'Bạn chưa từng bị chẩn đoán hoặc phân loại là người nghiện cờ bạc.',
          'Bạn đã đủ 18 tuổi hoặc độ tuổi hợp pháp để tham gia theo quy định.',
          'Bạn nhận thức đầy đủ về các rủi ro tài chính khi sử dụng Dịch vụ.',
          'Bạn không sử dụng tiền từ các hoạt động phi pháp hoặc không hợp lệ.',
          'Bạn không tiến hành hoặc có ý định thực hiện các hành vi phạm pháp và cam kết không sử dụng tài khoản của bạn cho mục đích rửa tiền hoặc bất kỳ hoạt động phi pháp nào.',
          'Bạn sẽ giữ thông tin tài khoản, tên đăng nhập và mật khẩu an toàn, đồng thời thông báo ngay khi có mất mát hoặc truy cập trái phép.',
          'Bạn chịu trách nhiệm hoàn toàn cho các hoạt động xảy ra dưới tài khoản của bạn, dù có được bạn ủy quyền hay không.',
          'Bạn cam kết không sử dụng trang web hoặc dịch vụ theo cách làm gián đoạn hiệu suất hoạt động cho người dùng khác.',
          'Bạn không truy cập hoặc thu thập thông tin của người dùng khác trái phép.',
          'Bạn không tải lên hoặc phân phối các chương trình có chứa vi-rút ảnh hưởng đến hoạt động của Trang web, Dịch vụ hoặc Thiết bị.',
          'Việc truy cập và sử dụng Dịch vụ của bạn phải tuân thủ pháp luật và không vi phạm bất kỳ quy định nào tại nơi bạn truy cập.',
          'Bạn không đăng tải hoặc gửi bất kỳ nội dung nào vi phạm pháp luật, quấy rối, đe dọa, phỉ báng hoặc gây ảnh hưởng xấu đến cộng đồng.',
          'Bạn không phải là cán bộ, giám đốc, nhân viên hoặc người thân của bất kỳ nhân sự nào liên quan đến Công ty.',
          'Bạn không được chuyển nhượng, bán hoặc cầm cố tài khoản của mình cho bất kỳ bên nào khác. Điều này bao gồm mọi hình thức chuyển giao giá trị hoặc quyền sở hữu tài khoản, tiền thắng cược, tiền gửi và các quyền liên quan. Việc cấm chuyển nhượng áp dụng cho các giao dịch như đình chỉ, cầm cố, chuyển nhượng, thế chấp hoặc tặng quà qua người ủy quyền hoặc bên thứ ba.',
        ],
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Nếu bạn không đáp ứng các điều kiện trên, Công ty có quyền chấm dứt quyền sử dụng Dịch vụ, hủy bỏ tài khoản hoặc báo cáo với các cơ quan chức năng khi cần thiết.',
      },
    ],
  },

  section6: {
    title: '6. Đăng ký và thành viên',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Để bắt đầu đặt cược, bạn cần hoàn tất đăng ký. Chúng tôi có quyền vô hiệu hóa tài khoản của bạn nếu phát hiện vi phạm mà không cần thông báo hoặc nêu lý do.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Bạn cam kết rằng mọi thông tin cung cấp trong quá trình đăng ký là chính xác, đầy đủ và đúng sự thật, bao gồm số điện thoại, địa chỉ email của bạn, nguồn tiền (bao gồm số tài khoản ngân hàng và tên chủ tài khoản chính chủ).',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Chúng tôi sẽ áp dụng các biện pháp bảo mật hợp lý nhằm giữ bí mật mọi thông tin cá nhân bạn cung cấp. Thông tin cá nhân hoặc thông tin cá cược của bạn sẽ không được tiết lộ, trừ khi có yêu cầu từ luật pháp hoặc quy định hiện hành.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content4',
        value:
          'Bạn có trách nhiệm bảo mật thông tin cá nhân của mình. Chúng tôi có quyền chuyển dữ liệu cá nhân của bạn đến các nhà cung cấp dịch vụ thanh toán và tổ chức tài chính của chúng tôi trong phạm vi cần thiết để hoàn tất các thanh toán.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content5',
        value:
          'Bạn cần đảm bảo rằng các luật áp dụng cho bạn không ngăn cấm bạn truy cập Trang web hoặc sử dụng các Dịch vụ của chúng tôi.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content6',
        value: '',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content7',
        value:
          'Chúng tôi cũng có quyền xác minh số điện thoại và địa chỉ email của bạn. Có thể tiến hành kiểm tra bảo mật bổ sung đối với bất kỳ thông tin nào bạn cung cấp. Bằng cách chấp nhận Điều khoản và Điều kiện này, bạn đồng ý cho phép chúng tôi truy cập, sử dụng và lưu trữ mọi kết quả xác minh hoặc kiểm tra danh tính liên quan đến bạn.',
      },
    ],
  },

  section7: {
    title: '7. Đặt cược',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Chúng tôi chấp nhận vé cược cho các trò chơi được quảng cáo trên Trang web và Thiết bị, tuân theo quy tắc đặt cược của từng sự kiện và các Điều khoản và Điều kiện. Nếu phát hiện lỗi hoặc sai lệch trong thông tin sự kiện, chúng tôi có quyền hủy bỏ tất cả vé cược liên quan.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Chúng tôi có quyền từ chối vé cược hoặc đóng tài khoản của bạn nếu có dấu hiệu vi phạm điều khoản, gian lận, sử dụng trí tuệ nhân tạo hoặc các hành vi gây ảnh hưởng đến tính công bằng của dịch vụ. Trong những trường hợp này, số dư và tiền thắng có thể bị tịch thu.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Bạn chịu trách nhiệm cho tất cả hoạt động liên quan đến tài khoản của mình và bảo mật thông tin đăng nhập. Vé cược chỉ được xác nhận khi mã giao dịch hiển thị trên màn hình và trong lịch sử giao dịch.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content4',
        value:
          'Bạn không được đặt cược sau khi sự kiện đã bắt đầu hoặc khi kết quả đã được xác định. Chúng tôi có quyền hủy bỏ các vé cược sai sót được đặt ngoài thời điểm hợp lệ.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content5',
        value:
          'Tỷ lệ cược, kèo và tỷ lệ chấp có thể thay đổi và chỉ được xác định khi chúng tôi chấp nhận cược. Trong trường hợp lỗi hệ thống dẫn đến sai lệch tỷ lệ cược, chúng tôi có thể liên hệ bạn để điều chỉnh cược theo tỷ lệ chính xác.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content6',
        value:
          'Chúng tôi sẽ không chấp nhận các vé cược trùng lặp vào cùng một sự kiện. Quyết định của chúng tôi là quyết định cuối cùng và có tính tiên quyết.',
      },
    ],
  },

  section8: {
    title: '8. Giấy phép trang web',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Bạn thừa nhận rằng Trang web truy cập được thuộc quyền sở hữu của chúng tôi, và bạn không có quyền sở hữu đối với Trang web. Bạn không được phép sao chép, chỉnh sửa, phân phối, truyền tải, bán, cho thuê hoặc cung cấp Trang web cho người khác, trang web khác, hoặc phương tiện khác.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Trang web được cấp phép chỉ nhằm mục đích truy cập và sử dụng Dịch vụ. Bạn không được phép:',
      },

      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr',
        value: [
          'Cài đặt hoặc sử dụng Trang web trên máy chủ hoặc thiết bị mạng khác',
          'Chuyển giao, cho thuê hoặc cấp phép Trang web cho bên thứ ba',
          'Dịch ngược, tháo rời, sửa đổi hoặc tạo tác phẩm phái sinh từ Trang web',
          'Sử dụng Trang web theo cách vi phạm luật pháp hoặc quy định hiện hành',
        ],
      },
    ],
  },

  section9: {
    title: '9. Giải quyết các giao dịch',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Tiền thắng cược sẽ được ghi có vào tài khoản của bạn và có thể rút về theo Điều khoản và Điều kiện. Tiền sẽ không được giải ngân nếu số tiền gửi chưa sử dụng hết hoàn toàn.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Việc rút tiền chỉ được thực hiện bằng cùng loại tiền tệ đã nạp, và tài khoản ngân hàng sử dụng để nạp tiền phải trùng tên với tài khoản đăng ký.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Chúng tôi có quyền tính phí tài khoản của bạn để trang trải các chi phí liên quan đến giao dịch nạp và rút tiền.',
      },
    ],
  },

  section10: {
    title: '10. Nhận tiền thắng cược',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Tiền thắng cược sẽ được ghi có vào tài khoản của bạn và có thể rút về theo Điều khoản và Điều kiện. Tiền sẽ không được giải ngân nếu số tiền gửi chưa sử dụng hết hoàn toàn.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Việc rút tiền chỉ được thực hiện bằng cùng loại tiền tệ đã nạp, và tài khoản ngân hàng sử dụng để nạp tiền phải trùng tên với tài khoản đăng ký.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Chúng tôi có quyền tính phí tài khoản của bạn để trang trải các chi phí liên quan đến giao dịch nạp và rút tiền.',
      },
    ],
  },

  section11: {
    title: '11. Khuyến mãi',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Mọi chương trình khuyến mãi hoặc ưu đãi đều phải tuân thủ Điều khoản và Điều kiện này. Chúng tôi có quyền đơn phương điều chỉnh, thay đổi, đình chỉ hoặc hủy bỏ các chương trình mà không cần báo trước.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Nếu phát hiện người dùng lạm dụng hoặc cố ý lạm dụng chương trình khuyến mãi, chúng tôi có thể chặn hoặc loại bỏ người dùng khỏi chương trình.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Chúng tôi cũng có quyền hủy bỏ các vé cược của bất kỳ cá nhân hoặc nhóm nào có hành vi gian lận thông đồng; tài khoản liên quan sẽ bị tịch thu tiền ngay lập tức.',
      },
    ],
  },

  section12: {
    title: '12. Miễn trừ trách nhiệm',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Chúng tôi không chịu trách nhiệm về nội dung và sản phẩm của trang web bên thứ ba. Bạn tự chịu rủi ro khi tham gia Trò chơi và phải tuân thủ luật pháp địa phương nếu sử dụng Trang web là bất hợp pháp tại quốc gia bạn.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại, chậm trễ hoặc gián đoạn nào từ Trang web hoặc Dịch vụ bên thứ 3. Dịch vụ bên thứ 3 có thể thay đổi và không đảm bảo sẽ luôn đáp ứng kỳ vọng của bạn.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content3',
        value:
          'Kết quả trên máy chủ của chúng tôi là quyết định cuối cùng trong trường hợp có sự khác biệt. Chúng tôi có quyền thay đổi hoặc ngừng Dịch vụ mà không chịu trách nhiệm cho các tổn thất phát sinh.',
      },
    ],
  },

  section13: {
    title: '13. Hủy bỏ, chấm dứt, và đình chỉ tài khoản',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Chúng tôi có quyền hủy bỏ tiền thắng cược, đóng băng và tịch thu số dư hoặc đóng tài khoản của bạn bất kỳ lúc nào mà không cần lý do, bao gồm nhưng không giới hạn nếu:',
      },
      {
        type: SectionItemTypeEnum.LIST,
        key: 'contentArr',
        value: [
          'Bạn có nhiều tài khoản hoạt động với chúng tôi.',
          'Tên tài khoản không khớp với tên trên thẻ hoặc tài khoản thanh toán.',
          'Bạn rút tiền trước khi hoàn thành yêu cầu của chương trình khuyến mãi.',
          'Bạn cung cấp thông tin đăng ký sai hoặc không cung cấp thông tin nhận dạng cần thiết.',
          'Bạn không đủ tuổi hợp pháp hoặc truy cập từ khu vực bị cấm.',
          'Bạn từ chối giao dịch hoặc nộp tiền từ nguồn bất hợp pháp.',
          'Bạn có hành vi gian lận, sử dụng hệ thống tự động hoặc cấu kết với người chơi khác để trục lợi.',
          'Bạn cho phép người khác sử dụng tài khoản hoặc vi phạm các điều khoản.',
        ],
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Việc cung cấp Dịch vụ hoặc mở lại tài khoản chỉ được xem xét sau khi hoàn tất các xác minh cần thiết. Chúng tôi có toàn quyền phát hành, duy trì hoặc đóng tài khoản mà không chịu trách nhiệm xem xét hay kháng cáo và sẽ thông báo trước khi thực hiện, trừ khi không thể.',
      },
    ],
  },

  section14: {
    title: '14. Các trang web bên ngoài',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Các liên kết đến trang web bên ngoài chỉ để thuận tiện và chúng tôi không chịu trách nhiệm về nội dung, quyền riêng tư hoặc độ chính xác của các trang này.',
      },
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content2',
        value:
          'Chúng tôi không chịu trách nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào phát sinh từ việc bạn sử dụng các liên kết bên ngoài. Chúng tôi cũng không liên kết hay phối hợp với bất kỳ tuyên bố, nhãn hiệu, sản phẩm hoặc dịch vụ nào từ các trang bên ngoài.',
      },
    ],
  },

  section15: {
    title: '15. Thêm hoặc ngừng (các) trò chơi',
    items: [
      {
        type: SectionItemTypeEnum.CONTENT,
        key: 'content1',
        value:
          'Chúng tôi có quyền, theo quyết định riêng và tuyệt đối của công ty, để thêm các trò chơi hoặc chức năng mới vào (các) Trang web hoặc bắt đầu, ngừng, tạm ngừng, hạn chế quyền truy cập hoặc sửa đổi bất kỳ trò chơi hoặc chức năng nào vào bất kỳ lúc nào.',
      },
    ],
  },
};
