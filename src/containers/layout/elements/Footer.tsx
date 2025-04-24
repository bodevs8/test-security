'use client';

import type { FooterContactItem, FooterMenuItem } from '@/types/menu';
import { DEFAULT_BRAND_NAME } from '@/constant/app';
import { GUIDELINE_LINKS } from '@/constant/guidelines/guideline';
import { IframeLinkEnum, RouterPathEnum } from '@/enums';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { BankList } from './BankList';
import { ContactList } from './ContactList';
import { FooterCopyright } from './FooterCopyright';
import { FooterIntro } from './FooterIntro';
import { FooterLine } from './FooterLine';
import { FooterMenu } from './FooterMenu';
import { FooterPartner } from './FooterPartner';
import { Providers } from './Providers';

const AppFooter = () => {
  const pathname = usePathname();
  const FOOTER_MENU_ITEMS: FooterMenuItem[] = [
    {
      name: 'Pages.Footer.games.title',
      children: [
        {
          name: 'Pages.Footer.games.live_casino',
          url: RouterPathEnum.LiveCasino,
        },
        { name: 'Pages.Footer.games.slots', url: RouterPathEnum.Slots },
        {
          name: 'Pages.Footer.games.cock_fight',
          url: RouterPathEnum.Cockfight,
        },
        {
          name: 'Pages.Footer.games.table_games',
          url: RouterPathEnum.TableGame,
        },
        {
          name: 'Pages.Footer.games.fast_games',
          url: RouterPathEnum.FastGame,
        },
        { name: 'Pages.Footer.games.fishing', url: RouterPathEnum.Fishing },
        { name: 'Pages.Footer.games.lottery', url: RouterPathEnum.Lottery },
      ],
    },
    {
      name: 'Pages.Footer.sports.title',
      children: [
        {
          name: 'Pages.Footer.sports.saba_sport',
          url: RouterPathEnum.SabaSport,
          isOpenNewTab: true,
        },
        {
          name: 'Pages.Footer.sports.im_sport',
          url: IframeLinkEnum.IBC,
          isOpenNewTab: true,
        },
        {
          name: 'Pages.Footer.sports.virtual_sport',
          url: `${RouterPathEnum.Sports}#virtual-sport`,
        },
        {
          name: 'Pages.Footer.sports.e_sport',
          url: `${RouterPathEnum.Sports}#e-sport`,
        },
        { name: 'Pages.Footer.sports.odds', url: RouterPathEnum.Odds },
      ],
    },
    {
      name: 'Pages.Footer.events.title',
      children: [
        { name: 'Pages.Footer.events.vip_club', url: RouterPathEnum.VipClub },
        {
          name: 'Pages.Footer.events.promotions',
          url: RouterPathEnum.Promotions,
        },
        { name: 'Pages.Footer.events.news', url: RouterPathEnum.News },
        { name: 'Pages.Footer.events.event', url: RouterPathEnum.Event },
      ],
    },
    {
      name: 'Pages.Footer.security.title',
      children: [
        {
          name: 'Pages.Footer.security.about_us',
          url: `/${GUIDELINE_LINKS.ABOUT_US}`,
        },
        {
          name: 'Pages.Footer.security.help',
          url: `/${GUIDELINE_LINKS.HELP_CENTER}`,
        },
        {
          name: 'Pages.Footer.security.terms',
          url: `/${GUIDELINE_LINKS.TERMS_AND_CONDITIONS}`,
        },
        {
          name: 'Pages.Footer.security.privacy',
          url: `/${GUIDELINE_LINKS.PRIVACY_POLICY}`,
        },
        {
          name: 'Pages.Footer.security.promotions',
          url: `/${GUIDELINE_LINKS.PROMOTION_TERM}`,
        },
      ],
    },
    {
      name: 'Pages.Footer.tip.title',
      children: [
        {
          name: 'Pages.Footer.tip.trick',
          url: `/${GUIDELINE_LINKS.SPORTS_TIPS}`,
        },
        {
          name: 'Pages.Footer.tip.faq',
          url: `/${GUIDELINE_LINKS.FAQ}`,
        },
        {
          name: 'Pages.Footer.tip.guideline_deposit',
          url: `/${GUIDELINE_LINKS.DEPOSIT_GUIDE}`,
        },
        {
          name: 'Pages.Footer.tip.guideline_withdraw',
          url: `/${GUIDELINE_LINKS.WITHDRAWAL_GUIDE}`,
        },
        {
          name: 'Pages.Footer.tip.guideline_p2p',
          url: `/${GUIDELINE_LINKS.P2P_GUIDE}`,
        },
      ],
    },
  ];

  const contactList: FooterContactItem[] = [
    {
      id: 'livechat',
      title: 'Live Chat',
      icon: 'live-chat',
      link: process.env.NEXT_PUBLIC_LIVE_CHAT_LINK,
      newTab: false,
    },
    {
      id: 'telegram',
      title: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME,
      icon: 'telegram',
      link: process.env.NEXT_PUBLIC_TELEGRAM_LINK,
      newTab: true,
    },
    {
      id: 'email',
      title: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      icon: 'mail-support',
      link: `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`,
      newTab: true,
    },
  ];

  const currentYear = new Date().getFullYear();
  const brandCode = process.env.NEXT_PUBLIC_BRAND_NAME || DEFAULT_BRAND_NAME;
  const isHomePage = pathname === RouterPathEnum.Home;
  const isPageNotFound = pathname === RouterPathEnum.NotFound;

  return (
    <div
      className={clsx({
        '!hidden': !isHomePage || isPageNotFound,
      })}
    >
      <Providers />
      <footer className="!bg-[linear-gradient(180deg,#002415_0%,#00120a_100%)] !shadow-[--color-shadow-default] pt-11">
        <div className="mx-auto x-container">
          <div className="w-full flex flex-wrap justify-between gap-[10px]">
            <div className="flex flex-col gap-5 max-w-[360px] min-[1200px]:flex 2xl:max-w-[460px]">
              <FooterIntro />
              <ContactList contactList={contactList} />
              <FooterPartner />
            </div>

            <div className="flex justify-between flex-wrap gap-y-4 lg:flex-nowrap flex-1 min-[1280px]:max-w-[862px] gap-[10px] min-[1920px]:gap-[60px]">
              {FOOTER_MENU_ITEMS.map((menu, index) => (
                <FooterMenu key={index} menu={menu} />
              ))}
            </div>
            <FooterLine className="min-[1200px]:hidden !my-4" />
          </div>
          <FooterLine />
          <BankList className="max-w-6xl mx-auto" />
          <FooterLine />
          <FooterCopyright currentYear={currentYear} brandCode={brandCode} />
        </div>
      </footer>
    </div>
  );
};

export default AppFooter;
