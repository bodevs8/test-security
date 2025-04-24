'use client';

import type { SectionItem } from '@/types/guideline';
import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import { SectionItemTypeEnum } from '@/enums';
import { getGuidelineBySlug, replaceBrandName } from '@/utils/guideline';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { GuidelineImageViewer } from './GuidelineImageViewer';

type GuidelineContentProps = {
  isMobile?: boolean;
};

export const GuidelineContent = ({ isMobile }: GuidelineContentProps) => {
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImage, setCurrentImage] = useState<{
    url: string | StaticImageData;
    caption: string;
  }>({ url: '', caption: '' });

  const pathname = usePathname();
  const slug = pathname.replace('/', '');
  const guidelineContent = getGuidelineBySlug(slug);

  const handleOpenImage = (url: string | StaticImageData, caption?: string) => {
    setCurrentImage({ url, caption: caption || '' });
    setShowImageViewer(true);
  };

  const handleCloseImage = () => {
    setShowImageViewer(false);
  };

  // Render section content based on type
  const renderSectionContent = (item: SectionItem) => {
    switch (item.type) {
      case SectionItemTypeEnum.CONTENT:
        return (
          <div
            key={item.key}
            className={clsx('mb-2', item.className)}
            dangerouslySetInnerHTML={{
              __html: replaceBrandName(item.value),
            }}
          />
        );
      case SectionItemTypeEnum.STEP:
        return (
          <div
            key={item.key}
            className="mb-2 text-[14px] leading-[18px] lg:text-[16px] font-bold lg:leading-[22px]"
            dangerouslySetInnerHTML={{
              __html: replaceBrandName(item.value),
            }}
          />
        );
      case SectionItemTypeEnum.IMAGE:
        return (
          <div
            key={item.key}
            className="mb-6 md:flex md:flex-col md:items-center"
          >
            <div
              className="cursor-pointer"
              onClick={() =>
                handleOpenImage(item.value.url as string, item.value.caption)
              }
            >
              <Image
                src={item.value.url}
                alt={item.value.caption || 'Guide image'}
                width={556}
                height={280}
                className="mb-2 max-w-full rounded-lg hover:opacity-90 transition-opacity"
              />
            </div>
            {item.value.caption && (
              <p className="text-xs text-white text-center font-normal">
                {item.value.caption}
              </p>
            )}
          </div>
        );
      case SectionItemTypeEnum.LIST:
        return (
          <ul key={item.key} className="list-disc pl-6 mb-4 space-y-2">
            {item.value.map((listItem: string, index: number) => (
              <li key={index}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: replaceBrandName(listItem),
                  }}
                />
              </li>
            ))}
          </ul>
        );
      case SectionItemTypeEnum.NOTELIST:
        return (
          <div key={item.key}>
            <span
              className="text-white text-[14px] font-normal mb-2 inline-block"
              dangerouslySetInnerHTML={{
                __html: item.title ?? '',
              }}
            />
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {item.value.map((listItem: string, index: number) => (
                <li key={index}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: replaceBrandName(listItem),
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      case SectionItemTypeEnum.LINK:
        return (
          <div key={item.key} className="mb-4">
            <Link
              href={item.value}
              className="text-primary-100 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
            >
              {item.value}
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  // Render a complete section with title, subtitle and content
  const renderSection = (
    sectionKey: string,
    guidelineContent: Record<string, any>,
  ): ReactNode => {
    const section =
      guidelineContent[sectionKey as keyof typeof guidelineContent];
    if (!section || typeof section !== 'object') return null;

    return (
      <div className="mb-4 md:mb-6" key={sectionKey}>
        {section.title && (
          <div
            className="text-sm md:text-base font-bold mb-1 md:mb-4 text-dark-700 capitalize"
            dangerouslySetInnerHTML={{
              __html: replaceBrandName(section.title),
            }}
          />
        )}

        {section.sub_title && (
          <div
            className="text-sm md:text-base font-semibold mb-3"
            dangerouslySetInnerHTML={{
              __html: replaceBrandName(section.sub_title),
            }}
          />
        )}

        {section.items?.map((item: SectionItem, index: number) => (
          <Fragment key={item.key || `item-${index}`}>
            {renderSectionContent(item)}
          </Fragment>
        ))}
      </div>
    );
  };

  const content = isMobile
    ? getGuidelineBySlug(slug, isMobile)
    : guidelineContent;

  if (!content) return null;

  return (
    <>
      <div className="text-xs font-normal md:text-sm max-w-none">
        {content.section && renderSection('section', content)}

        {Array.from({ length: 15 }, (_, i) => `section${i + 1}`).map(
          (sectionKey) => renderSection(sectionKey, content),
        )}
      </div>

      <GuidelineImageViewer
        show={showImageViewer}
        imageUrl={currentImage.url as string}
        imageCaption={currentImage.caption}
        onClose={handleCloseImage}
      />
    </>
  );
};
