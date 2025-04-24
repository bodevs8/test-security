'use client';

type GuidelineSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const GuidelineSection = ({ children, className }: GuidelineSectionProps) => {
  return <div className={className}>{children}</div>;
};

export default GuidelineSection;
