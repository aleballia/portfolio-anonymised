import React from 'react';
import { NotionBlock } from '../../lib/notion';

interface NotionContentProps {
  blocks: NotionBlock[];
}

const NotionContent: React.FC<NotionContentProps> = ({ blocks }) => {
  const renderBlock = (block: NotionBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="p mb-6">
            {block.paragraph?.rich_text.map((text, i) => (
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
            ))}
          </p>
        );

      case 'heading_1':
        return (
          <h2 key={index} className="h2 mb-8">
            {block.heading_1?.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </h2>
        );

      case 'heading_2':
        return (
          <h3 key={index} className="h3 mb-6 mt-12">
            {block.heading_2?.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </h3>
        );

      case 'heading_3':
        return (
          <h4 key={index} className="h4 mb-4 mt-8">
            {block.heading_3?.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </h4>
        );

      case 'bulleted_list_item':
        return (
          <li key={index} className="p mb-2 list-disc list-inside">
            {block.bulleted_list_item?.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </li>
        );

      case 'numbered_list_item':
        return (
          <li key={index} className="p mb-2 list-decimal list-inside">
            {block.numbered_list_item?.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </li>
        );

      default:
        return null;
    }
  };

  return (
    <div className="notion-content">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default NotionContent; 