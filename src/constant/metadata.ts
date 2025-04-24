import { join } from 'path';
import { MetadataLdJsonEnum, PAYMENT_METHODS, URL_WIKIDATA } from '@/enums';
import { getBaseUrl } from '@/utils/helpers';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';
const baseUrl = getBaseUrl().replace(/\/$/, '');

type typeMetaData = {
  title?: string;
  description?: string;
  keywords?: string;
  h1?: string;
  type?: string;
};

export const METADATA: Record<string, typeMetaData> = {
  '/': {
    title: `${brandName} - Nhà cái cá cược live casino hàng đầu châu Á`,
    description: `${brandName} là một trong top 10 nhà cái uy tín hàng đầu châu Á, chuyên cung cấp bảng kèo thể thao, live casino và game online với tỷ lệ trả thưởng tốt nhất thị trường.`,
    keywords: `${brandName}, nhà cái ${brandName}, nha cai ${brandName}`,
    h1: `${brandName} - Trang cá cược đổi thưởng trực tuyến "xanh chín"`,
  },
  '/the-thao': {
    title: `Thể thao ${brandName} | Soi kèo cá cược với bảng kèo đa dạng`,
    description: `Thể thao ${brandName} là địa chỉ cá cược danh tiếng của nhà cái ${brandName}. Tại đây, chúng tôi cung cấp kèo bóng đá, bóng rổ, tennis và một số game khác với mức thưởng cao.`,
    keywords: `Thể thao ${brandName}, kèo nhà cái ${brandName}, tỷ lệ kèo cược ${brandName}, kèo bóng đá ${brandName}.`,
    h1: `Thể thao ${brandName} - Bảng kèo đa dạng với tỷ lệ hoàn trả tới 5%.`,
  },
  '/saba-sports': {
    title: `Thể thao SabaSports - ${brandName}.`,
    description: '',
    keywords: `Nhà cung cấp Sport. Nhà cái cá cược thể thao bóng đá châu Âu uy tín ${brandName}. Cung cấp đa dạng sản phẩm thể thao cá độ trực tuyến các kèo châu Á - handicap, kèo châu Âu 1x2. Tỷ lệ kèo Macao, Malaysia, Indo,... | ${brandName}.`,
  },
  '/im-sport': {
    title: `Thể thao IMSports - ${brandName}.`,
    description: '',
    keywords: `Nhà cung cấp Sport. Nhà cái cá cược thể thao bóng đá châu Âu uy tín ${brandName}. Cung cấp đa dạng sản phẩm thể thao cá độ trực tuyến các kèo châu Á - handicap, kèo châu Âu 1x2. Tỷ lệ kèo Macao, Malaysia, Indo,... | ${brandName}.`,
  },
  '/btisports': {
    title: `Thể thao BTISports - ${brandName}.`,
    description: '',
    keywords: `Nhà cung cấp Sport. Nhà cái cá cược thể thao bóng đá châu Âu uy tín ${brandName}. Cung cấp đa dạng sản phẩm thể thao cá độ trực tuyến các kèo châu Á - handicap, kèo châu Âu 1x2. Tỷ lệ kèo Macao, Malaysia, Indo,... | ${brandName}.`,
  },
  '/ksports': {
    title: `K Sports | Sảnh cược thể thao lừng danh tại ${brandName}.`,
    description: `K Sports - Sảnh cược thể thao chất lượng với mức hoàn trả không giới hạn. Cập nhật tỷ lệ kèo mới nhất cho mọi giải đấu hằng ngày. Cùng ${brandName} chơi ngay.`,
    keywords: `KSport, KSport ${brandName}, Sảnh cược thể thao K-Sports`,
    h1: `K Sports ${brandName} - Tỷ lệ kèo bóng đá cập nhật "nóng" nhất mỗi ngày`,
  },
  '/virtual-sports': {
    title: `Virtual Sports | Thử sức với cá cược thể thao ảo cùng - ${brandName}`,
    description: `Trải nghiệm các trò chơi cá cược Thể Thao Ảo nổi bật. Nhận thưởng và rút tiền siêu nhanh chỉ trong 3 phút với Virtual Sports ${brandName}.`,
    keywords: `Virtual Sports ${brandName}, cá cược thể thao ảo, kèo thể thao ảo ${brandName}`,
    h1: `Virtual Sports ${brandName} - Sự lựa chọn hàng đầu trong thể thao ảo.`,
  },
  '/virtual-saba-sports': {
    title: `Thể thao ảo SabaSports - ${brandName}. Nhà cái cá cược thể thao ảo, bóng đá ảo uy tín ${brandName}.`,
    description: '',
    keywords:
      'cá cược thể thao ảo, thể thao ảo, cá cược bóng đá ảo, cá cược bóng rổ ảo, quần vợt ảo, đua ngựa ảo, chơi goft ảo, bóng chày ảo, đua chó ảo, cricket ảo',
  },
  '/virtual-ksports': {
    title: `Thể thao ảo KSports - ${brandName}. Nhà cái cá cược thể thao ảo, bóng đá ảo uy tín ${brandName}.`,
    description: '',
    keywords:
      'cá cược thể thao ảo, thể thao ảo, cá cược bóng đá ảo, cá cược bóng rổ ảo, quần vợt ảo, đua ngựa ảo, chơi goft ảo, bóng chày ảo, đua chó ảo, cricket ảo',
  },
  '/e-saba-sports': {
    title: `ESports - ${brandName}. Đặt cược thể thao điện tử hấp dẫn ${brandName}.`,
    description: '',
    keywords:
      'cá cược esports, cá độ esports, cá cược thể thao điện tử, trang cá cược esports, trang cá cược thể thao điện tử, trang web cá cược esport, nhà cái cá cược esport, cá cược lmht, cá cược liên minh huyền thoại, cá cược dota 2, ca cuoc esport, cược esports online',
  },
  '/pp-sports': {
    title: `Thể thao ảo PragmaticSports  - ${brandName}. Nhà cái cá cược thể thao ảo, bóng đá ảo uy tín ${brandName}.`,
    description: '',
    keywords:
      'cá cược thể thao ảo, thể thao ảo, cá cược bóng đá ảo, cá cược bóng rổ ảo, quần vợt ảo, đua ngựa ảo, chơi goft ảo, bóng chày ảo, đua chó ảo, cricket ảo',
  },
  '/im-esports': {
    title: `Thể thao ảo IMSports - ${brandName}. Nhà cái cá cược thể thao ảo, bóng đá ảo uy tín ${brandName}.`,
    description: '',
    keywords:
      'cá cược thể thao ảo, thể thao ảo, cá cược bóng đá ảo, cá cược bóng rổ ảo, quần vợt ảo, đua ngựa ảo, chơi goft ảo, bóng chày ảo, đua chó ảo, cricket ảo',
  },
  '/e-sports': {
    title: `E-Sports | Cược thể thao điện tử đẳng cấp quốc tại ${brandName}`,
    description: `E Sports - Sảnh thể thao điện tử độc đáo, vô số trò chơi cá cược hấp dẫn. Chơi nhanh chóng và tiện lợi với bản web không giật lag ${brandName}.`,
    keywords: `ESport ${brandName}, thể thao điện tử ${brandName}`,
    h1: `E-Sports ${brandName} - Chơi và cược thể thao điện tử, mê ngay từ lần đầu.`,
  },
  '/casino': {
    title: `Live Casino ${brandName} | Sòng bạc trực tuyến đẳng cấp, cược là mê.`,
    description: `Live casino đẳng cấp tại nhà cái ${brandName} - Trải nghiệm live casino đỉnh cao với dàn Dealer sexy cùng tỷ lệ trả thưởng cao nhất thị trường.`,
    keywords: `casino trực tuyến, casino online, live casino uy tín, sòng casino online, casino ${brandName}`,
    h1: `Live Casino ${brandName} - Live Casino ${brandName} - Sòng bạc trực tuyến với mức hoàn trả cao số 1`,
  },
  '/casino/xoc-dia': {
    title: `Xóc Đĩa ${brandName} | Cá cược xanh chín siêu cuốn với những dealer xinh đẹp`,
    description: `Xóc đĩa online tại ${brandName} mở ra không gian cá cược đầy lôi cuốn, với tỷ lệ trả thưởng hàng đầu và dịch vụ khách hàng chuyên nghiệp.`,
    keywords: `xóc đĩa, xóc đĩa trực tuyến, xóc đĩa ${brandName}, xóc đĩa online`,
    h1: `Xóc Đĩa ${brandName} - Tiền thưởng đầy tay, thắng mãi không hay.`,
  },
  '/casino/bau-cua': {
    title: `Bầu Cua ${brandName} | Phiên bản online game dân gian huyền thoại`,
    description: `Bầu cua online ${brandName} - Trải nghiệm game dân gian nổi tiếng với tỷ lệ trúng thưởng siêu hấp dẫn, mang đến giây phút giải trí thoải mái.`,
    keywords: `bầu cua, bầu cua ${brandName}, bầu cua online, bầu cua trực tuyến`,
    h1: `Bầu Cua ${brandName} - Hòa mình vào game dân gian đặc sắc, thử chơi ngay`,
  },
  '/casino/baccarat': {
    title: `Baccarat ${brandName} |Sảnh chơi đẳng cấp, uy tín hàng đầu trong khu vực`,
    description: `Baccarat ${brandName} là game casino nổi bật, thu hút người chơi khắp thế giới. Nhà cái sẽ đưa bạn đến gần hơn với thế giới giải trí đỉnh cao này.`,
    keywords: `baccarat, baccarat trực tuyến, baccarat online, baccarat ${brandName}`,
    h1: `Baccarat ${brandName} - Sảnh Baccarat đẳng cấp, thưởng lớn đang chờ`,
  },
  '/casino/blackjack': {
    title: `Blackjack ${brandName} | Cược nhịp độ nhanh, chơi mượt mà và nhận thưởng ngay`,
    description: `Blackjack ${brandName} đưa bạn đến với những ván cược đỉnh cao. Chất lượng và tiền thưởng cao ngất đã giúp nhà cái giữ vững vị thế số một.`,
    keywords: `blackjack, blackjack online, blackjack ${brandName}`,
    h1: `Blackjack ${brandName} - Chinh phục xì dách online, kiếm tiền hàng ngày`,
  },
  '/casino/roulette': {
    title: `Roulette ${brandName} | Mở ra cơ hội vàng với từng vòng quay`,
    description: `Roulette online ${brandName} - Thử sức cùng vòng quay mang lại vận may và phần thưởng khủng cho những phút giây sảng khoái.`,
    keywords: `roulette, roulette online, roulette ${brandName}`,
    h1: `Roulette ${brandName} - Vòng quay hấp dẫn, săn giải thưởng vượt trội.`,
  },
  '/casino/tai-xiu': {
    title: `Tài Xỉu ${brandName} | Livestream cuốn hút trên nền tảng công nghệ đỉnh cao.`,
    description: `Tài Xỉu online ${brandName} đem đến trải nghiệm giải trí tuyệt vời, với nền tảng livestream chất lượng hàng đầu.`,
    keywords: `casino trực tuyến, casino online, live casino uy tín, sòng casino online, casino ${brandName}`,
    h1: `Tài Xỉu ${brandName} - Livestream sắc nét, đặt cược hấp dẫn chỉ có tại ${brandName}`,
  },
  '/casino/poker': {
    title: `Poker ${brandName} | Đẳng cấp vượt trội trong từng ván bài.`,
    description: `Tham gia Poker ${brandName}, tận hưởng các ván bài kịch tính và thể hiện tư duy đỉnh cao. Cơ hội săn thưởng hấp dẫn đang chờ bạn!`,
    keywords: `poker, poker online, poker ${brandName}`,
    h1: `Poker ${brandName} - So tài poker, khẳng định đẳng cấp chiến thuật.`,
  },
  '/casino/rong-ho': {
    title: `Rồng Hổ ${brandName} | Game bài cổ điền thu hút cược thủ châu Á`,
    description: `Chơi game bài Rồng Hổ tiền thật cùng dàn dealer xinh đẹp từ hàng loạt nhà cung cấp sảnh casino live hàng đầu thế giới.`,
    keywords: `rồng hổ, game bài rồng hổ, rồng hổ ${brandName}`,
    h1: `Rổng Hổ ${brandName} - Kiến tiền từ game bài cổ điển siêu cuốn `,
  },
  '/casino/other': {
    title: `Game bài khác ${brandName} | Game bài cổ điền thu hút cược thủ châu Á`,
    description: `Chơi game bài khác ${brandName} với tỷ lệ trả thưởng cao, đồ họa sắc nét, phần thưởng khủng.`,
    keywords: `game bài khác, game bài khác ${brandName}`,
    h1: `Game bài khác ${brandName} - Kiến tiền từ game bài cổ điển siêu cuốn `,
  },
  '/lo-de': {
    title: `Lô Đề ${brandName} | Cơ hội đổi đời khi cược 1 ăn 99`,
    description: `Lô đề online ${brandName} với nhiều hình thức chơi đa dạng, từ xổ số miền Bắc, Trung, Nam đến lô xiên, đề 3 càng, cùng tỷ lệ thưởng lên tới 1 ăn 99.`,
    keywords: `lô đề online, lô đề ${brandName}, xổ số truyền thống, đánh lô đề online`,
    h1: `Lô Đề ${brandName} - Thử đỏ đen với tỷ lệ thưởng vượt trội`,
  },
  '/lo-de-3-mien': {
    title: `Lô đề 3 miền Bắc - Trung - Nam online quay thưởng liên tục | ${brandName}`,
    description: `${brandName} là trang đánh lô đề 3 miền trực tuyến uy tín, an toàn, bảo mật và tỷ lệ trả thưởng cao. Dự đoán kết quả xổ số 3 miền, xskeno mỗi ngày. Tham gia ngay để có cơ hội trở thành tỷ phú với ${brandName}.`,
    keywords: `lô đề 3 miền, xổ số 3 miền, lô đề 3 miền online, xskeno`,
  },
  '/vip-club': {
    title: `Khuyến mãi Vip - Ưu đãi đặc quyền dành cho những thành viên Vip tại ${brandName}`,
    description: `Trở thành thành viên Vip của ${brandName} để nhận những ưu đãi độc quyền, khuyến mãi hấp dẫn, đưa trải nghiệm của người chơi lên một tầm cao mới.`,
    keywords: `khuyến mãi vip, vip, vip ${brandName}, vip club`,
  },
  '/sanh-game/slots': {
    title: `Slots ${brandName} | Tham gia chơi game Slot cùng tỷ lệ trúng cao`,
    description: `Slot tại ${brandName} mang đến trải nghiệm tuyệt vời với giao diện sống động, đồ họa sắc nét. Cùng tham gia để săn hũ khủng và nhận thưởng cực kỳ hấp dẫn.`,
    keywords: `slot, game quay hũ, slot đổi thưởng, slot ${brandName}`,
    h1: `Slot ${brandName} - Quay slot tiền thật, Jackpot khủng trong mỗi lần quay.`,
  },
  '/sanh-game/game-bai': {
    title: `Game Bài ${brandName} | Chơi bài ảo, đổi thưởng tiền thật siêu uy tín`,
    description: `Với sự đa dạng trò chơi như Mậu binh, Sâm lốc, Tiến lên, Liêng, Ba cây, Phỏm, game bài ${brandName} đem lại giây phút giải trí sống động.`,
    keywords: `game bài, game bài ${brandName}, game bài đổi thưởng, game đánh bài, đánh bài online`,
    h1: `Game Bài ${brandName} - Đánh bài trực tuyến, đổi thưởng trực tiếp`,
  },
  '/sanh-game/jackpot': {
    title: `Nổ Hũ ${brandName} | Chơi game nổ hũ săn Jackpot cao ngất`,
    description: `Nổ hũ ${brandName} với tỷ lệ Jackpot cực cao đang chờ đón người chơi tại cổng game của nhà cái hàng đầu châu Á.`,
    keywords: `nổ hũ, game nổ hũ, nổ hũ đổi thưởng, nổ hũ ${brandName}`,
    h1: `Nổ hũ ${brandName} - Nổ hũ siêu hấp dẫn, Jackpot khủng trong mỗi lần quay.`,
  },
  '/sanh-game/ban-ca': {
    title: `Bắn Cá ${brandName} | Thỏa sức săn cá, nhận tiền thật`,
    description: `Đồ họa sắc nét, phần thưởng khủng, cơ hội chơi game bắn cá ăn tiền thật. Tham gia ngay Bắn Cá ${brandName} ngay!`,
    keywords: `bắn cá ${brandName}, bắn cá online, bắn cá đổi thưởng, bắn cá đổi tiền thật, bắn cá trực tuyến, bắn cá rút tiền thật`,
    h1: `Bắn Cá ${brandName} - Tham gia săn cá, đổi thưởng tiền thật và trúng to!`,
  },
  '/sanh-game/table-games': {
    title: `Table Games ${brandName} | Kho game bàn thịnh hành`,
    description: `Table Game ${brandName} - Sân chơi với các game đổi thưởng hot nhất, hợp tác với các ông lớn như TechPlay, Go88, Netent, Pragmatic,...`,
    keywords: `game đổi thưởng, game ${brandName}, Table Game ${brandName}`,
    h1: `Table Games ${brandName} - Cảm nhận sự đột phá với các trò chơi bàn siêu hot`,
  },
  '/sanh-game/quay-so': {
    title: `Quay Số ${brandName} | Cơ hội quay số nhận thưởng lớn và đổi tiền thật`,
    description: `Các trò chơi như keno, xổ số nhanh cùng nhiều loại hình cược đa dạng với tỷ lệ trúng thưởng hấp dẫn. Tham gia ngay quay số ${brandName} và nhận thưởng cực lớn!`,
    keywords: `quay số đổi thưởng, trò chơi quay số, quay số ${brandName}`,
    h1: `Quay Số ${brandName} - Vòng quay may mắn, cơ hội săn tiền thưởng vô tận`,
  },
  '/sanh-game/keno': {
    title: `Keno ${brandName} | Xác suất trúng thưởng keno hệ số nhân tại ${brandName}`,
    description: `Xác suất trúng thưởng keno tùy thuộc vào số số bạn chọn và số số bạn đoán đúng, Hệ số nhân với số tiền bạn cược vào trò chơi tại ${brandName}. Hãy tham gia kiếm tiền ngay.`,
    keywords: `ghi số keno, keno, keno ${brandName}`,
    h1: `Keno ${brandName} - Ghi số may mắn, kiếm tiền không giới hạn`,
  },
  '/sanh-game/game-nhanh': {
    title: `Game Nhanh ${brandName} | Chơi tốc độ cao, nhận thưởng siêu nhanh, cược ngay!`,
    description: `Game 10BET – Tham gia cá cược nhanh, trả thưởng ngay lập tức, cơ hội trúng thưởng cực khủng đang chờ bạn! Cùng thử sức nào!`,
    keywords: `game nhanh, chơi game nhanh, game trả thưởng nhanh, game nhanh ${brandName}`,
    h1: `Game Nhanh ${brandName} - Xuống vốn liền tay, nhận tiền ngay tức khắc`,
  },
  '/number-game': {
    title: `Number game ${brandName} - Quay số online, tỷ lệ trả thưởng cao`,
    description: `Hệ thống trò chơi Number game ${brandName} cung cấp nhiều trò chơi hấp dẫn cùng tỷ lệ thưởng cao, mang lại phút giây giải trí và kiếm tiền an toàn.`,
    keywords: `number game, chơi number game`,
  },
  '/da-ga': {
    title: `Đá gà ${brandName} - Đá gà online, tỷ lệ trả thưởng cao`,
    description: `Hệ thống trò chơi Đá gà ${brandName} cung cấp nhiều trò chơi hấp dẫn cùng tỷ lệ thưởng cao, mang lại phút giây giải trí và kiếm tiền an toàn.`,
    keywords: `đá gà, chơi đá gà, đá gà ${brandName}`,
  },
  '/khuyen-mai': {
    title: `Khuyến Mãi ${brandName} | Tổng hợp giftcode mới nhất cho hội viên`,
    description: `Khuyến mãi ưu đãi tại ${brandName} với nhiều cơ hội nhận thưởng siêu khủng. Nạp càng nhiều, thưởng càng lớn rút càng to, giúp bạn có thêm nhiều cơ hội trải nghiệm trò chơi đỉnh cao tại đây.`,
    keywords: `khuyến mãi, ưu đãi, khuyến mãi ${brandName}, giftcode ${brandName}`,
    h1: `Khuyến Mãi ${brandName} - Danh sách quà tặng cập nhật mới nhất`,
  },
  '/sanh-game/ingame': {
    title: `Hệ thống trò chơi Ingame đổi thưởng hấp dẫn tại nhà cái ${brandName}`,
    description: `Sảnh Ingame ${brandName} cung cấp nhiều trò chơi hot như Bacarrat Kim Tài, Xèng Hoa Quả, Đua Ngựa Xèng, Cờ Úp,... Đăng ký ${brandName} chơi ngay Ingame!`,
    keywords: `ingame, chơi ingame, xẻ hoa quả, cờ up`,
  },
  '/tin-tuc': {
    title: `Tin Tức ${brandName} - Cập nhật Tin tức khuyến mãi, sự kiện thể thao, kết quả xổ số, game đổi thưởng`,
    description: `Cập nhật các tin tức, sự kiện hiện hành của nhà cái ${brandName}. Hướng dẫn cá cược, Soi kèo bóng đá, Soi cầu lô đề và các tin tức tổng hợp khác.`,
    keywords: `tin tức ${brandName}, tin tức bóng đá, tin tức thể thao, tin tức casino, tin tức game đổi thưởng`,
  },
  '/refer-a-friend': {
    title: `${brandName} - Nhà cái cá cược live casino hàng đầu châu Á`,
    description: `${brandName} là một trong top 10 nhà cái uy tín hàng đầu châu Á, chuyên cung cấp bảng kèo thể thao, live casino và game online với tỷ lệ trả thưởng tốt nhất thị trường.`,
    keywords: `${brandName}, nhà cái ${brandName}, nha cai ${brandName}`,
    h1: `${brandName} - Trang cá cược đổi thưởng trực tuyến "xanh chín"`,
  },
  '/affiliate': {
    title: `${brandName} - Nhà cái cá cược live casino hàng đầu châu Á`,
    description: `${brandName} là một trong top 10 nhà cái uy tín hàng đầu châu Á, chuyên cung cấp bảng kèo thể thao, live casino và game online với tỷ lệ trả thưởng tốt nhất thị trường.`,
    keywords: `${brandName}, nhà cái ${brandName}, nha cai ${brandName}`,
    h1: `${brandName} - Trang cá cược đổi thưởng trực tuyến "xanh chín"`,
  },
  '/ve-chung-toi': {
    title: `Giới Thiệu ${brandName} | Thiên đường cá cược trực tuyến`,
    description: `Thành lập từ năm 2022, ${brandName} là nhà cái uy tín, được tổ chức cờ bạc uy tín thế giới PAGCOR kiểm duyệt và cấp giấy phép hoạt động.`,
    keywords: `giới thiệu ${brandName}, thông tin nhà cái ${brandName}`,
    h1: `Giới Thiệu ${brandName} - Nhà cái uy tín số 1 hiện nay`,
  },
  '/trung-tam-ho-tro': {
    title: `${brandName} | Nhà cái thể thao trực tuyến, web game đổi thưởng đỉnh cao`,
    description: `Nhà cái ${brandName} cung cấp hệ thống cá độ bóng đá trực tuyến, casino, game đổi thưởng tốt nhất. Cập nhật tỷ lệ kèo, tỷ số bóng đã sớm nhất. An toàn bảo mật, nạp nhanh rút đủ, hỗ trợ 24/7.`,
    keywords: `${brandName}, ${brandName}, nhà cái ${brandName}`,
  },
  '/dieu-khoan-va-dieu-kien': {
    title: `Quy định điều khoàn và điều kiện bắt buộc khi tham gia ${brandName}`,
    description: `Quyền và trách nhiệm của người chơi được quy định trong việc truy cập và sử dụng trang web của ${brandName} một cách hợp pháp.`,
    keywords: `Quy định điều khoàn và điều kiện bắt buộc khi tham gia ${brandName}`,
  },
  '/chinh-sach-bao-mat': {
    title: `${brandName} bảo mật an toàn và tuyệt đối cho người chơi`,
    description: `Nhà cái ${brandName} xây dựng hệ thống bảo mật, đảm bảo an toàn thông tin cho khách hàng khi tham gia cá cược với công nghệ tiên tiến nhất.`,
    keywords: `${brandName} bảo mật an toàn và tuyệt đối cho người chơi`,
  },
  '/doi-tac-dang-tin-cay': {
    title: `Chơi game có trách nhiệm tại nhà cái ${brandName}`,
    description: `Người chơi cần thực hiện các quyền và nghĩa vụ được quy định rõ ràng khi tham gia chơi tại ${brandName} để đảm bảo tính công bằng và bảo mật.`,
    keywords: `Chơi game có trách nhiệm tại nhà cái ${brandName}`,
  },
  '/dieu-khoan-khuyen-mai': {
    title: `Điều khoản và điều kiện khi nhận khuyến mãi ${brandName}`,
    description: `Tham gia nhận khuyến mãi đồng nghĩa với việc bạn cần cung cấp thông tin chính xác, nắm rõ các quy định ${brandName} sau.`,
    keywords: `Điều khoản và điều kiện khi nhận khuyến mãi ${brandName}`,
  },
  '/huong-dan/huong-dan-cuoc-the-thao': {
    title: `Tổng hợp mẹo cược Thể Thao, Lịch thi đấu ${brandName}`,
    description: `${brandName} liên tục cập nhật tin tức mới nhất liên quan đến Mẹo cược thể thao, Soi kèo bóng đá, Tỷ lệ kèo, Lịch Thi đấu bóng đá. Nhà cái ${brandName} đẳng cấp số 1, chuyên soi kèo trực tuyến tốt nhất hiện nay.`,
    keywords: `Tổng hợp mẹo cược Thể Thao, Lịch thi đấu ${brandName}`,
  },
  '/huong-dan-cuoc-casino': {
    title: `Tổng hợp mẹo cược Casino trực tuyến ${brandName}`,
    description: `${brandName} cung cấp mẹo cược casino trực tuyến hiệu quả, thắng lớn. Trải nghiệm các phiên live cực chất tại nhà cái ${brandName}.`,
    keywords: `Tổng hợp mẹo cược Casino trực tuyến ${brandName}`,
  },
  '/huong-dan-cuoc-lo-de': {
    title: `Tổng hợp các Mẹo xổ số, tin tức Soi cầu Xổ số, Lô đề ${brandName}`,
    description: `${brandName} thường xuyên cập nhật tin tức mới nhất về Soi cầu xổ số - lô đề, kết quả Xổ số sớm nhất. Nhà cái ${brandName} đẳng cấp hàng đầu Việt Nam, soi cầu chuẩn xác lên đến 99%.`,
    keywords: `Tổng hợp các Mẹo xổ số, tin tức Soi cầu Xổ số, Lô đề ${brandName}`,
  },
  '/huong-dan-cuoc-e-game': {
    title: 'Tổng hợp Mẹo chơi e-games, sảnh game đổi thưởng đẳng cấp',
    description: `Cập nhật mẹo chơi e-games ${brandName} mới nhất, khám phá cách chơi game đổi thưởng đỉnh cao tại nhà cái ${brandName} rinh thưởng lớn.`,
    keywords: 'Tổng hợp Mẹo chơi e-games, sảnh game đổi thưởng đẳng cấp',
  },
  '/huong-dan-khuyen-mai': {
    title: `Tổng hợp mẹo sử dụng khuyến mãi ${brandName}`,
    description: '',
    keywords: `Tổng hợp mẹo sử dụng khuyến mãi ${brandName}`,
  },
  '/huong-dan/cau-hoi-thuong-gap': {
    title: `FAQ ${brandName} | Giải đáp thắc mắc của người chơi`,
    description: `Trả lời các thắc mắc, các câu hỏi thường gặp phổ biến về sản phẩm cá cược và dịch vụ của nhà cái ${brandName}.`,
    keywords: `câu hỏi thường gặp, câu hỏi thường gặp ${brandName}`,
    h1: `FAQ ${brandName} - Giải đáp thắc mắc tất cả thông tin`,
  },
  '/huong-dan/su-dung-khuyen-mai': {
    title: `Tổng hợp mẹo sử dụng khuyến mãi ${brandName}`,
    description: '',
    keywords: `Tổng hợp mẹo sử dụng khuyến mãi ${brandName}`,
  },
  '/huong-dan/meo-cuoc-the-thao': {
    title: `Tổng hợp mẹo cược Thể Thao, Lịch thi đấu ${brandName}`,
    description: `${brandName} liên tục cập nhật tin tức mới nhất liên quan đến Mẹo cược thể thao, Soi kèo bóng đá, Tỷ lệ kèo, Lịch Thi đấu bóng đá. Nhà cái ${brandName} đẳng cấp số 1, chuyên soi kèo trực tuyến tốt nhất hiện nay.`,
    keywords: `Tổng hợp mẹo cược Thể Thao, Lịch thi đấu ${brandName}`,
  },
  '/huong-dan/huong-dan-nap-tien': {
    title: `Nạp Tiền ${brandName} | Quy trình nạp tiền vào tài khoản`,
    description: `Nạp tiền tài khoản nhà cái ${brandName}. Cược thủ đã nắm rõ cách thức nạp tiền chưa? Hãy xem hướng dẫn đơn giản bên dưới đây`,
    keywords: `nạp tiền ${brandName}, nạp tiền tài khoản ${brandName}`,
    h1: `Nạp tiền ${brandName} dễ dàng – Phương thức nạp tiền tích tắc 1 phút`,
  },
  '/huong-dan/huong-dan-rut-tien': {
    title: `Rút Tiền ${brandName} | Hướng dẫn rút tiền từ tài khoản nhanh chóng`,
    description: `Rút tiền ${brandName} nhanh chóng với đa dạng phương thức: ngân hàng, ví điện tử đến thẻ cào. Chỉ vài thao tác đơn giản, bạn có thể nhận tiền trong vòng 1 phút.`,
    keywords: `rút tiền ${brandName}, hướng dẫn rút tiền ${brandName}`,
    h1: `Rút Tiền ${brandName} - Rút tiền trong tích tắc, an toàn tuyệt đối`,
  },
  '/huong-dan/huong-dan-p2p': {
    title: `${brandName} | Nhà cái thể thao trực tuyến, web game đổi thưởng đỉnh cao`,
    description: `Nhà cái ${brandName} cung cấp hệ thống cá độ bóng đá trực tuyến, casino, game đổi thưởng tốt nhất. Cập nhật tỷ lệ kèo, tỷ số bóng đã sớm nhất. An toàn bảo mật, nạp nhanh rút đủ, hỗ trợ 24/7.`,
    keywords: `${brandName}, ${brandName}, nhà cái ${brandName}`,
  },
  '/huong-dan/huong-dan-dang-ky': {
    title: `Đăng Ký ${brandName} | Thao tác tạo tài khoản đơn giản với 4 bước`,
    description: `Đăng ký ${brandName} ngay hôm nay – Tạo tài khoản dễ dàng chỉ trong 4 bước và nhận ngay phần thưởng 100% cho lần nạp đầu tiên.`,
    keywords: `đăng ký ${brandName}, đăng ký tài khoản ${brandName}`,
    h1: `Đăng Ký ${brandName} - Tạo tài khoản, nhận tiền thưởng đến 100% mức nạp`,
  },
  '/huong-dan/huong-dan-add-bank': {
    title: `${brandName} | Nhà cái thể thao trực tuyến, web game đổi thưởng đỉnh cao`,
    description: `Nhà cái ${brandName} cung cấp hệ thống cá độ bóng đá trực tuyến, casino, game đổi thưởng tốt nhất. Cập nhật tỷ lệ kèo, tỷ số bóng đã sớm nhất. An toàn bảo mật, nạp nhanh rút đủ, hỗ trợ 24/7.`,
    keywords: `${brandName}, ${brandName}, nhà cái ${brandName}`,
  },
};

export const JSON_LD_DEFAULT = {
  '@context': MetadataLdJsonEnum.CONTEXT,
  '@type': MetadataLdJsonEnum.TYPE,
  name: `${brandName}`,
  address: `${MetadataLdJsonEnum.ADDRESS}`,
  priceRange: MetadataLdJsonEnum.PRICE_RANGE,
  image: join(baseUrl, '/logo.svg'),
  '@graph': [
    {
      '@type': MetadataLdJsonEnum.TYPE,
      '@id': baseUrl,
      name: `${brandName}`,
      url: baseUrl,
      brand: `${brandName}`,
      legalName: `${brandName}`,
      description: `${brandName} ${MetadataLdJsonEnum.DESCRIPTION}`,
      address: {
        '@type': MetadataLdJsonEnum.ADDRESS_TYPE,
        streetAddress: MetadataLdJsonEnum.ADDRESS,
        addressLocality: MetadataLdJsonEnum.ADDRESS_LOCALE,
        addressRegion: MetadataLdJsonEnum.ADDRESS_REGION,
        postalCode: MetadataLdJsonEnum.ADDRESS_POSTAL_CODE,
        addressCountry: {
          '@type': MetadataLdJsonEnum.COUNTRY_TYPE,
          name: MetadataLdJsonEnum.ADDRESS_COUNTRY,
        },
      },
      numberOfEmployees: {
        '@type': MetadataLdJsonEnum.EMPLOYEES_TYPE,
        value: MetadataLdJsonEnum.NUMBER_OF_EMPLOYEES,
      },
      sameAs: [],
      currenciesAccepted: MetadataLdJsonEnum.CURRENCIES_ACCEPTED,
      paymentAccepted: PAYMENT_METHODS,
      priceRange: MetadataLdJsonEnum.PRICE_RANGE,
      email: `${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`,
      knowsLanguage: MetadataLdJsonEnum.KNOWS_LANGUAGE,
      openingHoursSpecification: {
        '@type': MetadataLdJsonEnum.OPENING_HOURS_SPECIFICATION,
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
      foundingLocation: {
        '@type': MetadataLdJsonEnum.PLACE_TYPE,
        '@id': join(baseUrl, '/#place'),
        address: {
          '@type': MetadataLdJsonEnum.ADDRESS_TYPE,
          streetAddress: MetadataLdJsonEnum.ADDRESS,
          addressLocality: MetadataLdJsonEnum.ADDRESS_LOCALE,
          addressRegion: MetadataLdJsonEnum.ADDRESS_REGION,
          postalCode: MetadataLdJsonEnum.ADDRESS_POSTAL_CODE,
          addressCountry: {
            '@type': MetadataLdJsonEnum.COUNTRY_TYPE,
            name: MetadataLdJsonEnum.ADDRESS_COUNTRY,
          },
        },
      },
      location: {
        '@type': MetadataLdJsonEnum.ADDRESS_TYPE,
        '@id': join(baseUrl, '#postaladdress'),
        streetAddress: MetadataLdJsonEnum.ADDRESS,
        addressLocality: MetadataLdJsonEnum.ADDRESS_LOCALE,
        addressRegion: MetadataLdJsonEnum.ADDRESS_REGION,
        postalCode: MetadataLdJsonEnum.ADDRESS_POSTAL_CODE,
        addressCountry: {
          '@type': MetadataLdJsonEnum.COUNTRY_TYPE,
          name: MetadataLdJsonEnum.ADDRESS_COUNTRY,
        },
      },
      contactPoint: {
        '@type': MetadataLdJsonEnum.CONTACT_POINT,
        email: `${MetadataLdJsonEnum.EMAIL_CONTACT}${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`,
        areaServed: {
          '@type': MetadataLdJsonEnum.CITY_TYPE,
          name: MetadataLdJsonEnum.ADDRESS_LOCALE,
          url: URL_WIKIDATA,
        },
      },
      image: {
        '@type': MetadataLdJsonEnum.IMAGE_TYPE,
        url: join(baseUrl, '/logo.svg'),
        width: MetadataLdJsonEnum.IMAGE_SIZE_WIDTH,
        height: MetadataLdJsonEnum.IMAGE_SIZE_HEIGHT,
      },
      logo: {
        '@type': MetadataLdJsonEnum.IMAGE_TYPE,
        url: join(baseUrl, '/logo.svg'),
        width: MetadataLdJsonEnum.IMAGE_SIZE_WIDTH,
        height: MetadataLdJsonEnum.IMAGE_SIZE_HEIGHT,
      },
    },
  ],
};

export const JSON_LD_BREADCRUMB = {
  '@context': MetadataLdJsonEnum.CONTEXT,
  '@type': MetadataLdJsonEnum.BREADCRUMB_LIST,
  itemListElement: [
    {
      '@type': MetadataLdJsonEnum.BREADCRUMB_ITEM,
      position: 1,
      name: `✅ ${MetadataLdJsonEnum.BREADCRUMB_TEXT} ${brandName}`,
      item: baseUrl,
    },
    {
      '@type': MetadataLdJsonEnum.BREADCRUMB_ITEM,
      position: 2,
      name: `✅ ${MetadataLdJsonEnum.BREADCRUMB_TEXT_2} ${brandName} ${MetadataLdJsonEnum.BREADCRUMB_TEXT_3}`,
      item: join(baseUrl, '/casino'),
    },
  ],
};
