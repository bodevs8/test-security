type FooterCopyrightProps = {
  currentYear: number;
  brandCode: string;
};

export const FooterCopyright = ({
  currentYear,
  brandCode,
}: FooterCopyrightProps) => (
  <div className="flex flex-col items-center justify-start gap-2 pb-[24px]">
    <div className="text-dark-100 text-xs lg:text-base font-normal leading-[18px]">
      {`@${currentYear} @${brandCode} - All rights reserved`}
    </div>
  </div>
);
