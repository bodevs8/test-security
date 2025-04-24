import type { FooterContactItem } from '@/types/menu';
import Link from 'next/link';

type ContactListProps = {
  contactList: FooterContactItem[];
};

export const ContactList = ({ contactList }: ContactListProps) => (
  <ul className="flex flex-row gap-2">
    {contactList.map((contact, index) => (
      <li key={index}>
        <Link
          target={contact.id !== 'email' ? '_blank' : '_self'}
          href={contact.link ? contact.link : '#'}
          prefetch={false}
          className="h-[36px] xl:h-[40px] w-[60px] flex justify-center text-white rounded-lg hover:text-white hover:bg-green-500 bg-white/10 py-2 px-2 md:px-4 max-sm:gap-1"
        >
          <span
            className={`icon icon-${contact.icon} text-white text-[24px]`}
          />
        </Link>
      </li>
    ))}
  </ul>
);
