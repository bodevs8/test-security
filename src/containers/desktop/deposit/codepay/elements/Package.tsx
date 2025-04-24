import type { RadioOption } from '@/types/app';
import { Button } from '@/components/ui/button';
import { MAPPING_PROMOTION_DEPOSIT_IMAGE } from '@/constant/images';
import { ButtonVariantsEnum } from '@/enums';
import clsx from 'clsx';
import Image from 'next/image';

type PackageProps = {
  packages: RadioOption[];
  onChange: (value: number) => void;
  value: number;
};

export default function Package({ packages, onChange, value }: PackageProps) {
  return (
    <div className="flex items-center gap-2 codepay-package">
      {packages.map((item: RadioOption) => (
        <Button
          key={item.value}
          className={clsx(
            'cursor-pointer relative max-w-[50%] w-full !h-fit aspect-[180/56] md:aspect-[258/80] !p-0 !rounded-[4px] group overflow-hidden',
            {
              '!outline-none': value !== item.value,
              '!selected !outline-[2px] !outline-green-500':
                value === item.value,
            },
          )}
          type="button"
          id={item.value.toString()}
          name={item.value.toString()}
          variant={ButtonVariantsEnum.Transparent}
          onClick={() => onChange(Number(item.value))}
        >
          {value === item.value && (
            <div className="bg-green-500 size-[16px] absolute top-0 right-0 rounded-[4px] z-2 flex justify-center items-center">
              <i className="icon-success text-[12px] text-primary-light-0" />
            </div>
          )}
          <Image
            src={
              MAPPING_PROMOTION_DEPOSIT_IMAGE[
                item.value as keyof typeof MAPPING_PROMOTION_DEPOSIT_IMAGE
              ]
            }
            alt={item.value as string}
            width={258}
            height={80}
            className="relative z-[1] w-full aspect-[180/56] md:aspect-[258/80] object-cover !rounded-[4px] group-hover:brightness-110 transition-all duration-300"
          />
        </Button>
      ))}
    </div>
  );
}
