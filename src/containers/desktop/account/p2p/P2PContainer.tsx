import clsx from 'clsx';
import IframeP2P from './elements/IframeP2P';

const P2PContainer = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div
      className={clsx(
        'w-full h-full',
        isMobile && 'x-container !h-[calc(100vh-174px)] !mt-6 max-sm:!pb-3',
      )}
    >
      <IframeP2P />
    </div>
  );
};

export { P2PContainer };
