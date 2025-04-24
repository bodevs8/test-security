type Props = {
  data: string[];
  className?: string;
};

export const PromotionSubContent = ({ data, className }: Props) => {
  const renderContent = (content: string) => {
    return content;
  };

  return (
    <ul className={`ml-6 ${className || 'list-disc'}`}>
      {data.map((item, index) => (
        <li
          key={index}
          className="text-dark-700 text-sm mb-2 last:mb-0 font-normal leading-5"
        >
          {renderContent(item)}
        </li>
      ))}
    </ul>
  );
};
