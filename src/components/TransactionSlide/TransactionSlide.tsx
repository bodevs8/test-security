import { BaseSlide } from '@/components/BaseSlide';
import { BoxNote } from '@/components/BoxNote';
import clsx from 'clsx';

type TransactionSlideProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isShowFooter?: boolean;
  containerClassName?: string;
  boxNoteClassName?: string;
  slideClassName?: string;
};

export function TransactionSlide({
  isOpen,
  onClose,
  title,
  children,
  isShowFooter = false,
  containerClassName,
  boxNoteClassName,
  slideClassName,
}: TransactionSlideProps) {
  return (
    <BaseSlide
      isOpen={isOpen}
      onClose={() => onClose()}
      title={title}
      slideClassName={slideClassName}
    >
      <div
        className={clsx(
          'mobile-side-deposit max-[375px]:px-2 p-3',
          {
            'hide-scrollbar overflow-y-auto h-full pb-[88px]': isShowFooter,
          },
          containerClassName,
        )}
      >
        <div className="form-deposit-mb">{children}</div>
        <div className={clsx('pt-4', boxNoteClassName)}>
          <BoxNote />
        </div>
      </div>
      {isShowFooter && (
        <div className="p-4 bg-primary-light-0 w-full h-[72px] fixed-deposit-footer fixed bottom-0 left-0 right-0"></div>
      )}
    </BaseSlide>
  );
}
