import clsx from 'clsx';

type LoadingProps = {
  fixed?: boolean;
  className?: string;
};

export const Loading = ({ fixed, className }: LoadingProps) => {
  return (
    <div
      className={clsx(
        'loading-container z-50 w-full h-full top-0 left-0 bottom-0 right-0 flex items-center justify-center',
        {
          absolute: !fixed,
          fixed,
          className,
        },
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2.5">
        <div className="loader"></div>
        <div className="loading-text">Đang tải...</div>
      </div>
    </div>
  );
};
