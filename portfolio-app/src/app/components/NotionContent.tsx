import React from 'react';
import { NotionBlock } from '../../lib/notion';
import Image from 'next/image';

interface NotionContentProps {
  blocks: NotionBlock[];
}

const NotionContent: React.FC<NotionContentProps> = ({ blocks }) => {
  const renderBlocks = () => {
    const elements: React.ReactElement[] = [];
    let currentList: React.ReactElement[] = [];
    let currentListType: 'bulleted' | 'numbered' | null = null;

    const flushCurrentList = () => {
      if (currentList.length > 0) {
        const listElement = currentListType === 'bulleted' ? (
          <ul key={`list-${elements.length}`} className="mb-6 space-y-2 list-disc list-outside pl-6">
            {currentList}
          </ul>
        ) : (
          <ol key={`list-${elements.length}`} className="mb-6 space-y-2 list-decimal list-outside pl-6">
            {currentList}
          </ol>
        );
        elements.push(listElement);
        currentList = [];
        currentListType = null;
      }
    };

    const renderRichText = (richText: Array<{ plain_text: string; annotations?: { bold?: boolean; italic?: boolean; code?: boolean } }>) => {
      return richText.map((text, i) => (
        <span
          key={i}
          style={{
            fontWeight: text.annotations?.bold ? 600 : 400,
            fontStyle: text.annotations?.italic ? 'italic' : 'normal',
            fontFamily: text.annotations?.code ? 'monospace' : 'inherit',
          }}
        >
          {text.plain_text}
        </span>
      ));
    };

    blocks.forEach((block, index) => {
      switch (block.type) {
        case 'paragraph':
          flushCurrentList();
          elements.push(
            <p key={index} className="p mb-6 leading-relaxed">
              {renderRichText(block.paragraph?.rich_text || [])}
            </p>
          );
          break;

        case 'heading_1':
          flushCurrentList();
          elements.push(
            <h2 key={index} className="h2 mb-8 mt-12">
              {renderRichText(block.heading_1?.rich_text || [])}
            </h2>
          );
          break;

        case 'heading_2':
          flushCurrentList();
          elements.push(
            <h3 key={index} className="h3 mb-4 mt-12">
              {renderRichText(block.heading_2?.rich_text || [])}
            </h3>
          );
          break;

        case 'heading_3':
          flushCurrentList();
          elements.push(
            <h3 key={index} className="h4 font-semibold mb-4 mt-12">
              {block.heading_3?.rich_text.map((text, i) => (
                <span
                  key={i}
                  style={{
                    fontWeight: 500, // Always semibold for heading_3
                    fontStyle: text.annotations?.italic ? 'italic' : 'normal',
                    fontFamily: text.annotations?.code ? 'monospace' : 'inherit',
                  }}
                >
                  {text.plain_text}
                </span>
              ))}
            </h3>
          );
          break;

        case 'bulleted_list_item':
          if (currentListType !== 'bulleted') {
            flushCurrentList();
            currentListType = 'bulleted';
          }
          currentList.push(
            <li key={index} className="leading-relaxed">
              {renderRichText(block.bulleted_list_item?.rich_text || [])}
            </li>
          );
          break;

        case 'numbered_list_item':
          if (currentListType !== 'numbered') {
            flushCurrentList();
            currentListType = 'numbered';
          }
          currentList.push(
            <li key={index} className="leading-relaxed">
              {renderRichText(block.numbered_list_item?.rich_text || [])}
            </li>
          );
          break;

        case 'divider':
          flushCurrentList();
          elements.push(
            <hr key={index} className="mt-12 mb-4 border-t border-border" />
          );
          break;

        case 'image':
          flushCurrentList();
          const imageUrl = block.image?.file?.url || block.image?.external?.url;
          const caption = block.image?.caption?.[0]?.plain_text;
          
          if (imageUrl) {
            elements.push(
              <figure key={index} className="my-8">
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={caption || 'Notion image'}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    style={{
                      borderRadius: '0',
                      backgroundColor: 'var(--muted)',
                    }}
                  />
                </div>
                {caption && (
                  <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          break;

        default:
          flushCurrentList();
          break;
      }
    });

    // Flush any remaining list
    flushCurrentList();

    return elements;
  };

  return (
    <div className="notion-content prose prose-lg max-w-none">
      {renderBlocks()}
    </div>
  );
};

export default NotionContent; 