import { EmblaCarousel } from '@/components/EmblaCarousel/EmblaCarousel';
import clsx from 'clsx';
import AutoScroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const BANK_LIST = [
  { id: 'abb', name: 'ABB Bank', image: '/images/bank/circle/abb.webp' },
  { id: 'acb', name: 'ACB', image: '/images/bank/circle/acb.webp' },
  { id: 'agri', name: 'Agribank', image: '/images/bank/circle/agri.webp' },
  {
    id: 'baoviet',
    name: 'Bao Viet Bank',
    image: '/images/bank/circle/baoviet.webp',
  },
  { id: 'baca', name: 'Bac A Bank', image: '/images/bank/circle/baca.webp' },
  { id: 'cb', name: 'CB Bank', image: '/images/bank/circle/cb.webp' },
  { id: 'exim', name: 'Eximbank', image: '/images/bank/circle/exim.webp' },
  { id: 'gp', name: 'GP Bank', image: '/images/bank/circle/gp.webp' },
  { id: 'hd', name: 'HD Bank', image: '/images/bank/circle/hd.webp' },
  { id: 'hsbc', name: 'HSBC', image: '/images/bank/circle/hsbc.webp' },
  { id: 'ivb', name: 'IVB', image: '/images/bank/circle/ivb.webp' },
  {
    id: 'kienlong',
    name: 'Kien Long Bank',
    image: '/images/bank/circle/kienlong.webp',
  },
  { id: 'mb', name: 'MB Bank', image: '/images/bank/circle/mb.webp' },
  { id: 'lp', name: 'LP Bank', image: '/images/bank/circle/lp.webp' },
  { id: 'nama', name: 'Nam A Bank', image: '/images/bank/circle/nama.webp' },
  { id: 'ocean', name: 'Ocean Bank', image: '/images/bank/circle/ocean.webp' },
  { id: 'ncb', name: 'NCB', image: '/images/bank/circle/ncb.webp' },
  { id: 'pvb', name: 'PVB', image: '/images/bank/circle/pvb.webp' },
  { id: 'pgb', name: 'PGB', image: '/images/bank/circle/pgb.webp' },
  {
    id: 'saigon',
    name: 'Saigon Bank',
    image: '/images/bank/circle/saigon.webp',
  },
  { id: 'sea', name: 'Sea Bank', image: '/images/bank/circle/sea.webp' },
  { id: 'scb', name: 'SCB', image: '/images/bank/circle/scb.webp' },
  { id: 'shb', name: 'SHB', image: '/images/bank/circle/shb.webp' },
  { id: 'vcb', name: 'VCB', image: '/images/bank/circle/vcb.webp' },
  { id: 'tp', name: 'TP Bank', image: '/images/bank/circle/tp.webp' },
  {
    id: 'vietcapital',
    name: 'Viet Capital Bank',
    image: '/images/bank/circle/vietcapital.webp',
  },
  { id: 'vp', name: 'VP Bank', image: '/images/bank/circle/vp.webp' },
  {
    id: 'viettin',
    name: 'Vietin Bank',
    image: '/images/bank/circle/viettin.webp',
  },
];

const DUPLICATED_BANK_LIST = [...BANK_LIST, ...BANK_LIST];

type BankListProps = {
  className?: string;
};

export const BankList = ({ className }: BankListProps) => {
  const bankItems = DUPLICATED_BANK_LIST.map((bank) => (
    <div
      key={bank.id}
      className="relative w-6 h-6 rounded-full overflow-hidden p-1transition-transform"
    >
      <Image
        src={bank.image}
        alt={bank.name}
        fill
        className="object-contain"
        sizes="24px"
        loading="lazy"
      />
    </div>
  ));

  return (
    <div className={clsx('w-full !max-w-full', className)}>
      <EmblaCarousel
        id="bank-carousel"
        loop={true}
        dragFree={true}
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
          dragFree: true,
          loop: true,
          skipSnaps: true,
          duration: 30,
        }}
        plugins={[
          Autoplay({
            delay: 1000,
            stopOnInteraction: false,
            playOnInit: true,
          }),
          AutoScroll({
            speed: 0.5,
            stopOnInteraction: false,
          }),
        ]}
        navigation={undefined}
        pagination={undefined}
        containerClassName=""
        contentClassName="gap-4 flex"
      >
        {bankItems}
      </EmblaCarousel>
    </div>
  );
};
