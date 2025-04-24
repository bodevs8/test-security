type FooterLineProps = {
  className?: string;
};

export const FooterLine: React.FC<FooterLineProps> = ({ className = '' }) => {
  return (
    <div
      className={`w-full h-[1px] my-6 opacity-60 bg-gradient-to-r from-transparent via-[#2d2d2d] to-transparent ${className}`}
    />
  );
};
