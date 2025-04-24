import { PromotionSubContent } from '@/components/PromotionSubContent';
import { PromotionTable } from '@/components/PromotionTable';
import { PromotionSectionItemTypeEnum } from '@/enums';
import clsx from 'clsx';

type TermsAndConditionsProps = {
  title?: string;
  items?: any[];
  isMobile?: boolean;
};

export const PromotionTermAndConditions = ({
  title,
  items,
  isMobile,
}: TermsAndConditionsProps) => {
  if (!items) return null;

  const renderItem = (item: any) => {
    switch (item.type) {
      case PromotionSectionItemTypeEnum.Text:
        return (
          <p
            className="text-sm text-dark-700 font-normal leading-5"
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></p>
        );
      case PromotionSectionItemTypeEnum.Header:
        return (
          <div className="">
            <h4
              className="text-sm font-medium leading-5 text-dark-700 whitespace-pre-wrap md:whitespace-nowrap !inline"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            &nbsp;
            <p className="text-sm font-normal leading-5 text-dark-700 !inline">
              {item.subContent}
            </p>
          </div>
        );
      case PromotionSectionItemTypeEnum.List:
        return (
          <PromotionSubContent data={item.content} className={item.className} />
        );
      case PromotionSectionItemTypeEnum.Table:
        return (
          <div className={clsx('my-6', { '!mt-4': isMobile })}>
            <PromotionTable
              data={item.data}
              title={item.title}
              isMobile={isMobile}
              tableHeadClassName="!bg-cta-tertiary"
            />
          </div>
        );
      case PromotionSectionItemTypeEnum.Notelist:
        return (
          <div>
            <h4 className="mb-2 text-sm font-normal leading-5 text-dark-700">
              {item.title}
            </h4>
            <ul
              className={clsx(
                'text-sm text-dark-700 font-normal leading-5',
                item.className,
              )}
            >
              {item.content.map((content: string, index: number) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-dark-700 text-base font-bold leading-6 mb-2">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
};
