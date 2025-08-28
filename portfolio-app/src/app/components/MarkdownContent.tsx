"use client";

import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import styles from './MarkdownContent.module.css';
import ImageGallery from './ImageGallery';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Extract all images from the markdown content
  const images = useMemo(() => {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const matches = [...content.matchAll(imageRegex)];
    return matches.map(match => ({
      alt: match[1] || 'Image',
      src: match[2]
    }));
  }, [content]);

  const openGallery = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setGalleryOpen(true);
  };

  return (
    <div className={`markdown-content prose prose-lg max-w-none ${styles.markdownContent}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h2 className="h2 mb-8 mt-12">{children}</h2>,
          h2: ({ children }) => <h3 className="h3 mb-4 mt-12">{children}</h3>,
          h3: ({ children }) => <h4 className="h4 font-semibold mb-4 mt-12">{children}</h4>,
          p: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-6 space-y-2 list-disc list-outside pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="mb-6 space-y-2 list-decimal list-outside pl-6">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          hr: () => <hr className="mt-12 mb-4 border-t border-border" />,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) => {
            // Handle image rendering with proper error handling
            const imageSrc = src as string;
            
            if (!imageSrc || imageSrc === '') {
              return null;
            }

            // Find the index of this image in our images array
            const imageIndex = images.findIndex(img => img.src === imageSrc);

            // Use a div wrapper instead of figure to avoid nesting issues
            return (
              <div className="" key={`img-${imageSrc}`}>
                <div 
                  className="relative w-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openGallery(imageIndex)}
                >
                  <Image
                    src={imageSrc}
                    alt={alt || 'Markdown image'}
                    width={800}
                    height={500}
                    className="w-full h-auto object-contain"
                    style={{
                      borderRadius: '0',
                      backgroundColor: 'var(--muted)',
                    }}
                  />
                  {/* Zoom indicator */}
                  <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
      
      {/* Image Gallery Modal */}
      <ImageGallery
        images={images}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
};

export default MarkdownContent;
