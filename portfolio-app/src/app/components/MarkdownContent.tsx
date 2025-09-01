"use client";

import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import styles from './MarkdownContent.module.css';
import Video from './Video';
import VennInnovation from './VennInnovation';
import Stats from './Stats';

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

  // Process content to handle video embeds, lottievenn components, and stats
  const processedContent = useMemo(() => {
    let processed = content;
    
    // Replace video syntax: {{video:src|poster|caption|options}}
    processed = processed.replace(
      /\{\{video:([^}]+)\}\}/g,
      (match, content) => {
        const parts = content.split('|');
        const src = parts[0] || '';
        const poster = parts[1] || '';
        const caption = parts[2] || '';
        // Everything after caption is options, join with commas for parsing
        const options = parts.slice(3).join(',');
        
        const videoId = `video-${Math.random().toString(36).substr(2, 9)}`;
        return `VIDEO_EMBED_${videoId}_${src}_${poster}_${caption}_${options}_VIDEO_EMBED`;
      }
    );

    // Replace lottievenn syntax: {{lottievenn:title}}
    processed = processed.replace(
      /\{\{lottievenn:([^}]+)\}\}/g,
      (match, title) => {
        const vennId = `venn-${Math.random().toString(36).substr(2, 9)}`;
        return `LOTTIEVENN_EMBED_${vennId}_${title}_LOTTIEVENN_EMBED`;
      }
    );

    // Replace stats syntax: {{stats:title|layout}}
    processed = processed.replace(
      /\{\{stats:([^}]+)\}\}/g,
      (match, content) => {
        const parts = content.split('|');
        const title = parts[0] || '';
        const layout = parts[1] || 'grid';
        
        const statsId = `stats-${Math.random().toString(36).substr(2, 9)}`;
        return `STATS_EMBED_${statsId}_${title}_${layout}_STATS_EMBED`;
      }
    );
    
    return processed;
  }, [content]);

  // Dynamic stats data based on title
  const getStatsData = (title: string) => {
    const statsMap: Record<string, any[]> = {
      'Marketing Website Performance': [
        { label: 'New Users from Organic Search', value: '740%', change: 'growth', changeType: 'positive' as const },
        { label: 'Returning Users', value: '400%', change: 'increase', changeType: 'positive' as const },
        { label: 'Views per Session', value: '+6%', change: 'improvement', changeType: 'positive' as const }
      ],

      'OB Website Performance': [
        { label: 'Mobile Traffic', value: '58%', change: 'growth', changeType: 'positive' as const },
        { label: 'Product Revenue from Gifting Experience.', value: '70%', change: 'increase', changeType: 'positive' as const },
      ],
      };
    
    return statsMap[title] || statsMap['Performance Metrics'];
  };

  const openGallery = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setGalleryOpen(true);
  };

  return (
    <div className={`markdown-content prose prose-lg max-w-none ${styles.markdownContent}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{

          h1: ({ children }) => <h2 className="h2 mb-8 mt-12">{children}</h2>,
          h2: ({ children }) => <h3 className="h2 font-normal mb-4 mt-12">{children}</h3>,
          h3: ({ children }) => <h4 className="h3 font-normal mb-4 mt-12">{children}</h4>,
          p: ({ children }) => {
            // Check if this paragraph contains only an image (to avoid p > div nesting)
            const childArray = React.Children.toArray(children);
            if (childArray.length === 1 && React.isValidElement(childArray[0]) && childArray[0].type === 'img') {
              // If paragraph contains only an image, return the image without p wrapper
              return childArray[0];
            }
            
            // Check if this paragraph contains our embed placeholders
            const childrenString = childArray.join('');
            
            // Handle video embeds
            const videoMatch = childrenString.match(/VIDEO_EMBED_([^_]+)_([^_]+)_([^_]*)_([^_]*)_([^_]*)_VIDEO_EMBED/);
            if (videoMatch) {
              const [, videoId, src, poster, caption, options] = videoMatch;
              
              // Parse options
              const opts = options ? options.split(',').reduce((acc, opt) => {
                const [key, value] = opt.split(':');
                const trimmedKey = key.trim();
                const trimmedValue = value ? value.trim() : 'true';
                
                // Convert string boolean values
                if (trimmedValue === 'true') acc[trimmedKey] = true;
                else if (trimmedValue === 'false') acc[trimmedKey] = false;
                else acc[trimmedKey] = trimmedValue;
                
                return acc;
              }, {} as Record<string, any>) : {};
              
              const autoPlay = opts.autoPlay || opts.autoplay || false;
              const muted = autoPlay ? true : (opts.muted || false);
              
              return (
                <Video
                  src={src}
                  poster={poster || undefined}
                  caption={caption || undefined}
                  autoPlay={autoPlay}
                  muted={muted}
                  loop={opts.loop || false}
                  controls={opts.controls !== false}
                  className={opts.fullWidth ? 'fullWidth' : ''}
                />
              );
            }

            // Handle lottievenn embeds
            const vennMatch = childrenString.match(/LOTTIEVENN_EMBED_([^_]+)_([^_]+)_LOTTIEVENN_EMBED/);
            if (vennMatch) {
              const [, vennId, title] = vennMatch;
              return (
                <VennInnovation
                  key={vennId}
                  title={title}
                />
              );
            }

            // Handle stats embeds
            const statsMatch = childrenString.match(/STATS_EMBED_([^_]+)_([^_]+)_([^_]*)_STATS_EMBED/);
            if (statsMatch) {
              const [, statsId, title, layout] = statsMatch;
              
              try {
                console.log('Stats embed found:', { statsId, title, layout });
                
                const statsData = getStatsData(title);
                console.log('Stats data retrieved:', statsData);
                
                if (!statsData || !Array.isArray(statsData)) {
                  console.error('Invalid stats data for title:', title, statsData);
                  return <div>Error: Invalid stats data for {title}</div>;
                }
                
                return (
                  <Stats
                    key={statsId}
                    title={title}
                    stats={statsData}
                    layout={layout as 'grid' | 'list'}
                  />
                );
              } catch (error) {
                console.error('Error processing stats embed:', error);
                return <div>Error: Failed to load stats for {title}</div>;
              }
            }
            
            return <p className="mb-6 leading-relaxed">{children}</p>;
          },
          ul: ({ children }) => <ul className="mb-6 space-y-2 list-disc list-outside pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="mb-6 space-y-2 list-decimal list-outside pl-6">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          hr: () => <hr className="mt-12 mb-4 border-t border-border" />,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          code: ({ children }) => <code className="bg-muted px-1 py-0.5 text-sm font-mono">{children}</code>,
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

            // Return a simple img element to avoid p > div nesting issues
            return (
              <img
                src={imageSrc}
                alt={alt || 'Case study image'}
                className="w-full h-auto object-cover transition-opacity"
                /* onClick={() => imageIndex !== -1 && openGallery(imageIndex)} */
                style={{ display: 'block', margin: '1rem 0' }}
              />
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
      
      {/* Image Gallery Modal 
      <ImageGallery
        images={images}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={selectedImageIndex}
      />*/}
    </div>
  );
};

export default MarkdownContent;
