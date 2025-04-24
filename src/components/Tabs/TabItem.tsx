import type { TabType } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { ButtonSizeEnum, ButtonVariantsEnum, TabVariantEnum } from '@/enums';
import { clsx } from 'clsx';

type TabItemProps = TabType & {
  variant?: TabVariantEnum;
  onClick: (id: string | number) => void;
  className?: string;
  active?: boolean;
};

export const TabItem = ({
  id,
  title,
  variant = TabVariantEnum.Sold,
  onClick,
  className = '',
  active,
}: TabItemProps) => {
  return (
    <Button
      id={`tab-item-${id}`}
      name={`tab-item-${id}`}
      className={clsx(
        'tab-item bg-primary-light-100 text-dark-200 !border border-transparent py-2 h-10 w-[101px] rounded-[4px]',
        variant,
        className,
        {
          'text-green-500 border-green-200 bg-linear-gradient': active,
        },
      )}
      onClick={() => onClick(id)}
      size={ButtonSizeEnum.SM}
      variant={ButtonVariantsEnum.Transparent}
    >
      {title}
    </Button>
  );
};
