
import type { PromotionDetailType } from '@/types/promotion';
import { DepositLinkEnum, PromotionPackageEnum, PromotionSectionItemTypeEnum, PromotionSlugEnum } from '@/enums';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';

const VIP_LEVEL_LIST: string[] = [
  'VIP/Trò Chơi',
  'PHỔ THÔNG',
  'VIP 1',
  'VIP 2',
  'VIP 3',
  'VIP 4',
  'VIP 5',
  'VIP 6',
  'VIP 7',
  'VIP 8',
  'VIP 9',
]

const CASHBACK_REWARD_SPORT_LIST: string[] = [
  '0.50%',
  '0.60%',
  '0.70%',
  '0.80%',
  '0.90%',
  '1.00%',
  '1.10%',
  '1.20%',
  '1.30%',
  '1.40%',
]

const CASHBACK_REWARD_NORMAL_LIST: string[] = [
  '0.50%',
  '0.55%',
  '0.60%',
  '0.65%',
  '0.70%',
  '0.75%',
  '0.80%',
  '0.85%',
  '0.90%',
  '0.95%',
]

export const PROMOTION_DETAIL: PromotionDetailType[] = [
  {
    id: PromotionPackageEnum.Welcome,
    slug: PromotionSlugEnum.WelcomeBonus,
    title: 'Thưởng chào mừng 100%',
    titleMb: 'Thưởng chào\nmừng 100%',
    subtitle: 'Lên đến 20,000,000 VND',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/welcome-bonus.webp',
    bannerImageMb: '/images/promotion/welcome-bonus-mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Table,
          title: '',
          data: {
            tableHead: [
              'Số tiền nạp tối thiểu',
              'Tỷ lệ thưởng',
              'Giới hạn',
              'Yêu cầu vòng cược',
            ],
            tableBody: [
              '100,000 VND',
              '100%',
              '20,000,000 VND',
              '20 vòng cược',
            ],
          },
        },
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '1. Chương trình khuyến mãi (CTKM) này không thể áp dụng đồng thời với chương trình khuyến mãi nào khác. Mỗi tài khoản chỉ được áp dụng CTKM này 1 lần.',
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '2. Quý khách vui lòng áp dụng CTKM trong "Khuyến Mãi". CTKM có hiệu lực 30 ngày kể từ thời điểm phiếu nạp được tạo thành công và tiền thưởng được cộng vào tài khoản của Quý khách.',
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '3. Sau khi hoàn thành quá trình xác minh kết quả, thưởng nạp sẽ được ghi có vào tài khoản của Quý khách và Quý khách cần hoàn thành 20 lần doanh thu cược trước khi có thể rút.',
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content: 'Ví dụ:',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              className: 'list-none ml-3',
              content: [
                'Nạp = 1,000,000 VND',
                'Thưởng = 1,000,000 VND',
                'Doanh thu cược yêu cầu = (1,000,000 VND + 1,000,000 VND) x 20 = 40,000,000 VND',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '4. Doanh thu cược được tính dựa trên các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, vé cược bị hủy, vé cược có hành vi gian lận, lạm dụng khuyến mãi, cược hai bên, cược hủy, cược vô hiệu, cược kiểu CN tỷ lệ dưới 0.5 (tương tự cho các kiểu cược khác như Malay odds dưới 0.5; Indo odds dưới -2.00; US odds dưới -200 và Dec odd dưới 1.5) sẽ không được tính vào tổng tiền đặt cược.',
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '5. Doanh số được tính dựa trên tổng cược được tính khác nhau của các sản phẩm trên trang:',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Các sản phẩm có 100% doanh thu cược: Thể Thao, Thể Thao Ảo, E-Sports, Number Game, Đá Gà GA28.',
                'Các sản phẩm có 60% doanh thu cược: Lô Đề 3 miền.',
                'Các sản phẩm có 25% doanh thu cược: Nổ Hũ, Bắn Cá.',
                'Ngoài các sản phẩm được liệt kê ở trên, tất cả các sản phẩm còn lại trên website sẽ không được tính vào doanh số.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Notelist,
              title: 'Lưu ý:',
              key: 'notes',
              content: [
                'Cược thể thao chỉ bao gồm các sản phẩm liên quan đến cá cược thể thao. Một số nhà cung cấp thể thao có thể tích hợp thêm một số trò chơi khác không thuộc lĩnh vực cá cược thể thao trong sản phẩm của mình, các trò chơi này không nằm trong danh sách được tính doanh thu cược.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '6. Khi áp dụng chương trình khuyến mãi trên, quý khách <strong>không thể chơi</strong> các game thuộc danh mục sau:',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Game Bài.',
                'Table Games.',
                'Sòng Bài Trực Tuyến (Live Casino).',
                'Tất cả Game trên menu Mini Game (Tài Xỉu, Roulette MD5, Xóc Đĩa MD5, Mr.Bean Go Home MD5, Tom & Jerry MD5, Vé Số Cào, Mini Poker, Trên Dưới, Super Wheel).',
                "Game của các nhà cung cấp: QTech, PGSoft, Microgaming, Askmebet, Jili, Play'n Go, Evoplay, Fachai, Tom Horn, Red Tiger, Netent, Onegame, Spribe, Pragmatic, các game nhanh của TechPlay, các game Slots của nhà cung cấp Habanero.",
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '7. Mỗi khách hàng chỉ được áp dụng 01 chương trình khuyến mãi trong một thời điểm. Vé cược được tính trong một chương trình khuyến mãi sẽ không được tính trong bất kỳ chương trình khuyến mãi nào khác.',
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '8. Hủy khuyến mãi: Trong trường hợp người chơi yêu cầu Hủy tham gia khuyến mãi, tài khoản của Quý khách sẽ bị khấu trừ theo điều khoản (Bao gồm tiền khuyến mãi & tiền thắng cược).',
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '9. Công ty có quyền hủy bỏ bất kỳ hoặc tất cả các vé cược được thực hiện bởi bất kỳ cá nhân/nhóm người nào hoạt động liên lạc/thông đồng và cố gắng gian lận. Tiền trong tài khoản liên quan sẽ bị tịch thu ngay lập tức.',
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content:
                '10. Công ty có quyền sửa đổi, cập nhật và bổ sung các Điều khoản và Điều kiện, nội dung chương trình khuyến mãi này mà không cần thông báo trước, theo quyết định riêng của chúng tôi.',
            },
            {
              type: PromotionSectionItemTypeEnum.Text,
              content: `11. Điều khoản điều kiện chung của ${brandName} được áp dụng.`,
            },
          ],
        },
      ],
    },
  },
  {
    id: PromotionPackageEnum.Cashback,
    slug: PromotionSlugEnum.CashbackSportBonus,
    title: 'Hoàn trả thể thao',
    titleMb: 'Hoàn trả\nthể thao',
    subtitle: 'Lên đến 1.4%',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/sports_banner.webp',
    bannerImageMb: '/images/promotion/sports_banner_mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '1. Thời hạn áp dụng:',
              subContent: 'Dài hạn.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '2. Đối tượng:',
              subContent: 'Tất cả các khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '3. Tiền hoàn trả',
              subContent: 'sẽ được trả vào ví của khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '4. Hoàn trả dựa vào:',
              subContent: '',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Vé cược thành công trong khoảng thời gian từ 11:00 đến 10:59 (GMT+7) ngày tiếp theo.',
                'Tỷ lệ hoàn trả của từng thể loại trò chơi và phân hạng của khách hàng.',
                'Vé cược hợp lệ đã trả kết quả.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Table,
              title: 'Tỷ Lệ Hoàn Trả',
              data: {
                tableHead: VIP_LEVEL_LIST,
                tableBody: [
                  'Thể Thao',
                  ...CASHBACK_REWARD_SPORT_LIST,
                ],
              },
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Doanh thu hợp lệ được tính theo các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, cược cân cửa, các vé cược bị hủy sẽ không hợp lệ và không được tính doanh thu hoàn trả.',
                'Doanh thu cược của SABA Sports, BTI, IM, Thể Thao Ảo, E-Sports được tính 100% tổng tiền cược thực tế.',
                'Doanh thu cược của K-Sports được tính 70% tổng tiền cược thực tế.',
                'Tiền thưởng hoàn trả từ chương trình này không yêu cầu vòng cược trước khi rút.',
                'Chúng tôi có quyền hủy bỏ hoặc đình chỉ, vô hiệu lực chương trình khuyến mãi, thu hồi các khoản tiền thưởng, tiền thắng cược nếu phát hiện vi phạm điều khoản và điều kiện của chương trình hoặc hành vi cược cá độ gian lận và lạm dụng chương trình khuyến mãi.',
                'Chúng tôi có quyền chỉnh sửa bất kỳ nội dung nào của chương trình khuyến mãi vào bất kỳ thời điểm nào mà không cần thông báo trước.',
                'Bằng việc tham gia chương trình khuyến mãi, bạn thừa nhận đã đọc và hiểu rõ các điều khoản và điều kiện của chương trình.',
                `Điều khoản điều kiện chung của ${brandName} được áp dụng.`,
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: PromotionPackageEnum.Cashback,
    slug: PromotionSlugEnum.CashbackSportBonusVirtual,
    title: 'Hoàn trả Thể thao Ảo, \nE-sports',
    titleMb: 'Hoàn trả\nThể thao Ảo,\nE-sports',
    subtitle: 'Lên đến 1.4%',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/esports-banner.webp',
    bannerImageMb: '/images/promotion/esports-banner-mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '1. Thời hạn áp dụng:',
              subContent: 'Dài hạn.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '2. Đối tượng:',
              subContent: 'Tất cả các khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '3. Tiền hoàn trả',
              subContent: 'sẽ được trả vào ví của khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '4. Hoàn trả dựa vào:',
              subContent: '',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Vé cược thành công trong khoảng thời gian từ 11:00 đến 10:59 (GMT+7) ngày tiếp theo.',
                'Tỷ lệ hoàn trả của từng thể loại trò chơi và phân hạng của khách hàng.',
                'Vé cược hợp lệ đã trả kết quả.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Table,
              title: 'Tỷ lệ hoàn trả',
              data: {
                tableHead: VIP_LEVEL_LIST,
                tableBody: [
                  'Thể Thao Ảo, E-sports',
                  ...CASHBACK_REWARD_SPORT_LIST,
                ],
              },
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Doanh thu hợp lệ được tính theo các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, cược cân cửa, các vé cược bị hủy sẽ không hợp lệ và không được tính doanh thu hoàn trả.',
                'Doanh thu cược của SABA Sports, BTI, IM, Thể Thao Ảo, E-Sports được tính 100% tổng tiền cược thực tế.',
                'Doanh thu cược của K-Sports được tính 70% tổng tiền cược thực tế.',
                'Tiền thưởng hoàn trả từ chương trình này không yêu cầu vòng cược trước khi rút.',
                'Chúng tôi có quyền hủy bỏ hoặc đình chỉ, vô hiệu lực chương trình khuyến mãi, thu hồi các khoản tiền thưởng, tiền thắng cược nếu phát hiện vi phạm điều khoản và điều kiện của chương trình hoặc hành vi cược cá độ gian lận và lạm dụng chương trình khuyến mãi.',
                'Chúng tôi có quyền chỉnh sửa bất kỳ nội dung nào của chương trình khuyến mãi vào bất kỳ thời điểm nào mà không cần thông báo trước.',
                'Bằng việc tham gia chương trình khuyến mãi, bạn thừa nhận đã đọc và hiểu rõ các điều khoản và điều kiện của chương trình.',
                `Điều khoản điều kiện chung của ${brandName} được áp dụng.`,
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: PromotionPackageEnum.Cashback,
    slug: PromotionSlugEnum.CashbackKenoBonus,
    title: 'Hoàn trả keno siêu tốc, keno vietlott',
    titleMb: 'Hoàn trả\nkeno siêu tốc,\nkeno vietlott',
    subtitle: 'Lên đến 0.95%',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/keno-banner.webp',
    bannerImageMb: '/images/promotion/keno-banner-mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '1. Thời hạn áp dụng:',
              subContent: 'Dài hạn.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '2. Đối tượng:',
              subContent: 'Tất cả các khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '3. Tiền hoàn trả',
              subContent: 'sẽ được trả vào ví của khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '4. Hoàn trả dựa vào:',
              subContent: '',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Vé cược thành công trong khoảng thời gian từ 11:00 đến 10:59 (GMT+7) ngày tiếp theo.',
                'Tỷ lệ hoàn trả của từng thể loại trò chơi và phân hạng của khách hàng.',
                'Vé cược hợp lệ đã trả kết quả.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Table,
              title: 'Tỷ lệ hoàn trả',
              data: {
                tableHead: VIP_LEVEL_LIST,
                tableBody: [
                  'Keno Siêu Tốc, Keno Vietlott',
                  ...CASHBACK_REWARD_NORMAL_LIST,
                ],
              },
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Doanh thu hợp lệ được tính theo các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, cược cân cửa, các vé cược bị hủy sẽ không hợp lệ và không được tính doanh thu hoàn trả.',
                'Tiền thưởng hoàn trả từ chương trình này không yêu cầu vòng cược trước khi rút.',
                'Chúng tôi có quyền hủy bỏ hoặc đình chỉ, vô hiệu lực chương trình khuyến mãi, thu hồi các khoản tiền thưởng, tiền thắng cược nếu phát hiện vi phạm điều khoản và điều kiện của chương trình hoặc hành vi cược cá độ gian lận và lạm dụng chương trình khuyến mãi.',
                'Chúng tôi có quyền chỉnh sửa bất kỳ nội dung nào của chương trình khuyến mãi vào bất kỳ thời điểm nào mà không cần thông báo trước.',
                'Bằng việc tham gia chương trình khuyến mãi, bạn thừa nhận đã đọc và hiểu rõ các điều khoản và điều kiện của chương trình.',
                `Điều khoản điều kiện chung của ${brandName} được áp dụng.`,
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: PromotionPackageEnum.Cashback,
    slug: PromotionSlugEnum.CashbackNumberGamesBonus,
    title: 'Hoàn trả number game, Quay Số',
    titleMb: 'Hoàn trả\nnumber game,\nQuay Số',
    subtitle: 'Lên đến 0.95%',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/number-game-banner.webp',
    bannerImageMb: '/images/promotion/number-game-banner-mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '1. Thời hạn áp dụng:',
              subContent: 'Dài hạn.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '2. Đối tượng:',
              subContent: 'Tất cả các khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '3. Tiền hoàn trả',
              subContent: 'sẽ được trả vào ví của khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '4. Hoàn trả dựa vào:',
              subContent: '',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Vé cược thành công trong khoảng thời gian từ 11:00 đến 10:59 (GMT+7) ngày tiếp theo.',
                'Tỷ lệ hoàn trả của từng thể loại trò chơi và phân hạng của khách hàng.',
                'Vé cược hợp lệ đã trả kết quả.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Table,
              className: 'my-6',
              title: 'Tỷ Lệ Hoàn Trả',
              data: {
                tableHead: VIP_LEVEL_LIST,
                tableBody: [
                  'Number Game, Quay Số',
                  ...CASHBACK_REWARD_NORMAL_LIST,
                ],
              },
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Doanh thu hợp lệ được tính theo các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, cược cân cửa, các vé cược bị hủy sẽ không hợp lệ và không được tính doanh thu hoàn trả.',
                // 'Sau khi hoàn tất quá trình tổng kết và xác minh, tiền thưởng hoàn trả sẽ được cộng trực tiếp vào tài khoản của Quý khách sau 11:45 (GMT+7) thứ Tư hằng tuần.',
                'Tiền thưởng hoàn trả từ chương trình này không yêu cầu vòng cược trước khi rút.',
                'Chúng tôi có quyền hủy bỏ hoặc đình chỉ, vô hiệu lực chương trình khuyến mãi, thu hồi các khoản tiền thưởng, tiền thắng cược nếu phát hiện vi phạm điều khoản và điều kiện của chương trình hoặc hành vi cược cá độ gian lận và lạm dụng chương trình khuyến mãi.',
                'Chúng tôi có quyền chỉnh sửa bất kỳ nội dung nào của chương trình khuyến mãi vào bất kỳ thời điểm nào mà không cần thông báo trước.',
                'Bằng việc tham gia chương trình khuyến mãi, bạn thừa nhận đã đọc và hiểu rõ các điều khoản và điều kiện của chương trình.',
                `Điều khoản và điều kiện chung của ${brandName} được áp dụng.`,
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: PromotionPackageEnum.Cashback,
    slug: PromotionSlugEnum.CashbackInstantGamesBonus,
    title: 'Hoàn trả Game nhanh',
    titleMb: 'Hoàn trả\nGame nhanh',
    subtitle: 'Lên đến 0.95%',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/instant-game-banner.webp',
    bannerImageMb: '/images/promotion/instant-game-banner-mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '1. Thời hạn áp dụng:',
              subContent: 'Dài hạn.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '2. Đối tượng:',
              subContent: 'Tất cả các khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '3. Tiền hoàn trả',
              subContent: 'sẽ được trả vào ví của khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '4. Hoàn trả dựa vào:',
              subContent: '',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Vé cược thành công trong khoảng thời gian từ 11:00 đến 10:59 (GMT+7) ngày tiếp theo.',
                'Tỷ lệ hoàn trả của từng thể loại trò chơi và phân hạng của khách hàng.',
                'Vé cược hợp lệ đã trả kết quả.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Table,
              className: 'my-6',
              title: 'Tỷ Lệ Hoàn Trả',
              data: {
                tableHead: VIP_LEVEL_LIST,
                tableBody: [
                  'Các game của EVOPLAY-QTECH (thuộc game nhanh)',
                  ...CASHBACK_REWARD_NORMAL_LIST,
                ],
              },
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Doanh thu hợp lệ được tính theo các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, cược cân cửa, các vé cược bị hủy sẽ không hợp lệ và không được tính doanh thu hoàn trả.',
                // 'Sau khi hoàn tất quá trình tổng kết và xác minh, tiền thưởng hoàn trả sẽ được cộng trực tiếp vào tài khoản của Quý khách sau 11:45 (GMT+7) thứ Tư hằng tuần.',
                'Tiền thưởng hoàn trả từ chương trình này không yêu cầu vòng cược trước khi rút.',
                'Chúng tôi có quyền hủy bỏ hoặc đình chỉ, vô hiệu lực chương trình khuyến mãi, thu hồi các khoản tiền thưởng, tiền thắng cược nếu phát hiện vi phạm điều khoản và điều kiện của chương trình hoặc hành vi cược cá độ gian lận và lạm dụng chương trình khuyến mãi.',
                'Chúng tôi có quyền chỉnh sửa bất kỳ nội dung nào của chương trình khuyến mãi vào bất kỳ thời điểm nào mà không cần thông báo trước.',
                'Bằng việc tham gia chương trình khuyến mãi, bạn thừa nhận đã đọc và hiểu rõ các điều khoản và điều kiện của chương trình.',
                `Điều khoản và điều kiện chung của ${brandName} được áp dụng.`,
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: PromotionPackageEnum.Cashback,
    slug: PromotionSlugEnum.CashbackSlotsBonus,
    title: 'Hoàn trả game Slots ',
    titleMb: 'Hoàn trả\ngame Slots ',
    subtitle: 'Lên đến 0.95%',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/slots-banner.webp',
    bannerImageMb: '/images/promotion/slots-banner-mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '1. Thời hạn áp dụng:',
              subContent: 'Dài hạn.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '2. Đối tượng:',
              subContent: 'Tất cả các khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '3. Tiền hoàn trả',
              subContent: 'sẽ được trả vào ví của khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '4. Hoàn trả dựa vào:',
              subContent: '',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Vé cược thành công trong khoảng thời gian từ 11:00 đến 10:59 (GMT+7) ngày tiếp theo.',
                'Tỷ lệ hoàn trả của từng thể loại trò chơi và phân hạng của khách hàng.',
                'Vé cược hợp lệ đã trả kết quả.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Table,
              className: 'my-6',
              title: 'Tỷ Lệ Hoàn Trả',
              data: {
                tableHead: VIP_LEVEL_LIST,
                tableBody: [
                  'Slots',
                  ...CASHBACK_REWARD_NORMAL_LIST,
                ],
              },
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: [
                'Doanh thu cược của Slots được tính 25% tổng tiền cược thực tế.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Notelist,
              className: 'ml-6 list-disc',
              title: 'Lưu ý:',
              key: 'notes',
              content: [
                'Không áp dụng cho các game Nổ Hũ',
                'Doanh thu hợp lệ được tính theo các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, cược cân cửa, các vé cược bị hủy sẽ không hợp lệ và không được tính doanh thu hoàn trả.',
                'Tiền thưởng hoàn trả từ chương trình này không yêu cầu vòng cược trước khi rút.',
                'Chúng tôi có quyền hủy bỏ hoặc đình chỉ, vô hiệu lực chương trình khuyến mãi, thu hồi các khoản tiền thưởng, tiền thắng cược nếu phát hiện vi phạm điều khoản và điều kiện của chương trình hoặc hành vi cược cá độ gian lận và lạm dụng chương trình khuyến mãi.',
                'Chúng tôi có quyền chỉnh sửa bất kỳ nội dung nào của chương trình khuyến mãi vào bất kỳ thời điểm nào mà không cần thông báo trước.',
                'Bằng việc tham gia chương trình khuyến mãi, bạn thừa nhận đã đọc và hiểu rõ các điều khoản và điều kiện của chương trình.',
                `Điều khoản và điều kiện chung của ${brandName} được áp dụng.`,
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: PromotionPackageEnum.Cashback,
    slug: PromotionSlugEnum.CashbackCookfightBonus,
    title: 'Hoàn trả đá gà',
    titleMb: 'Hoàn trả\nđá gà',
    subtitle: 'Lên đến 0.95%',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/cookfight-banner.webp',
    bannerImageMb: '/images/promotion/cookfight-banner-mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '1. Thời hạn áp dụng:',
              subContent: 'Dài hạn.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '2. Đối tượng:',
              subContent: 'Tất cả các khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '3. Tiền hoàn trả',
              subContent: 'sẽ được trả vào ví của khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '4. Hoàn trả dựa vào:',
              subContent: '',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Vé cược thành công trong khoảng thời gian từ 11:00 đến 10:59 (GMT+7) ngày tiếp theo.',
                'Tỷ lệ hoàn trả của từng thể loại trò chơi và phân hạng của khách hàng.',
                'Vé cược hợp lệ đã trả kết quả.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Table,
              className: 'my-6',
              title: 'Tỷ Lệ Hoàn Trả',
              data: {
                tableHead: VIP_LEVEL_LIST,
                tableBody: [
                  'Đá Gà',
                  ...CASHBACK_REWARD_NORMAL_LIST,
                ],
              },
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Doanh thu hợp lệ được tính theo các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, cược cân cửa, các vé cược bị hủy sẽ không hợp lệ và không được tính doanh thu hoàn trả.',
                'Tiền thưởng hoàn trả từ chương trình này không yêu cầu vòng cược trước khi rút.',
                'Chúng tôi có quyền hủy bỏ hoặc đình chỉ, vô hiệu lực chương trình khuyến mãi, thu hồi các khoản tiền thưởng, tiền thắng cược nếu phát hiện vi phạm điều khoản và điều kiện của chương trình hoặc hành vi cược cá độ gian lận và lạm dụng chương trình khuyến mãi.',
                'Chúng tôi có quyền chỉnh sửa bất kỳ nội dung nào của chương trình khuyến mãi vào bất kỳ thời điểm nào mà không cần thông báo trước.',
                'Bằng việc tham gia chương trình khuyến mãi, bạn thừa nhận đã đọc và hiểu rõ các điều khoản và điều kiện của chương trình.',
                `Điều khoản và điều kiện chung của ${brandName} được áp dụng.`,
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: PromotionPackageEnum.Cashback,
    slug: PromotionSlugEnum.CashbackLotteryBonus,
    title: 'Hoàn trả lô đề',
    titleMb: 'Hoàn trả\nlô đề',
    subtitle: 'Lên đến 0.95%',
    linkButton: DepositLinkEnum.CodePay,
    bannerImage: '/images/promotion/lottery-banner.webp',
    bannerImageMb: '/images/promotion/lottery-banner-mb.webp',
    content: {
      sections: [
        {
          type: PromotionSectionItemTypeEnum.Terms,
          title: 'Điều khoản & điều kiện',
          items: [
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '1. Thời hạn áp dụng:',
              subContent: 'Dài hạn.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '2. Đối tượng:',
              subContent: 'Tất cả các khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '3. Tiền hoàn trả',
              subContent: 'sẽ được trả vào ví của khách hàng.',
            },
            {
              type: PromotionSectionItemTypeEnum.Header,
              content: '4. Hoàn trả dựa vào:',
              subContent: '',
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Vé cược thành công trong khoảng thời gian từ 11:00 đến 10:59 (GMT+7) ngày tiếp theo.',
                'Tỷ lệ hoàn trả của từng thể loại trò chơi và phân hạng của khách hàng.',
                'Vé cược hợp lệ đã trả kết quả.',
              ],
            },
            {
              type: PromotionSectionItemTypeEnum.Table,
              className: 'my-6',
              title: 'Tỷ Lệ Hoàn Trả',
              data: {
                tableHead: VIP_LEVEL_LIST,
                tableBody: [
                  'Lô Đề',
                  ...CASHBACK_REWARD_NORMAL_LIST,
                ],
              },
            },
            {
              type: PromotionSectionItemTypeEnum.List,
              content: [
                'Doanh thu hợp lệ được tính theo các vé cược thành công và đã trả kết quả. Các vé cược có kết quả hòa, cược cân cửa, các vé cược bị hủy sẽ không hợp lệ và không được tính doanh thu hoàn trả.',
                // 'Sau khi hoàn tất quá trình tổng kết và xác minh, tiền thưởng hoàn trả sẽ được cộng trực tiếp vào tài khoản của Quý khách sau 11:45 (GMT+7) thứ Tư hằng tuần.',
                'Hoàn trả cược Lô Đề 3 Miền sẽ được tính là 40% tổng tiền cược thực tế.',
                'Tiền thưởng hoàn trả từ chương trình này không yêu cầu vòng cược trước khi rút.',
                'Chúng tôi có quyền hủy bỏ hoặc đình chỉ, vô hiệu lực chương trình khuyến mãi, thu hồi các khoản tiền thưởng, tiền thắng cược nếu phát hiện vi phạm điều khoản và điều kiện của chương trình hoặc hành vi cược cá độ gian lận và lạm dụng chương trình khuyến mãi.',
                'Chúng tôi có quyền chỉnh sửa bất kỳ nội dung nào của chương trình khuyến mãi vào bất kỳ thời điểm nào mà không cần thông báo trước.',
                'Bằng việc tham gia chương trình khuyến mãi, bạn thừa nhận đã đọc và hiểu rõ các điều khoản và điều kiện của chương trình.',
                `Điều khoản và điều kiện chung của ${brandName} được áp dụng.`,
              ],
            },
          ],
        },
      ],
    },
  },
];