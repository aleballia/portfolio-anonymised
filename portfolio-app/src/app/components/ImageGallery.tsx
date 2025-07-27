"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
          break;
        case 'ArrowRight':
          setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        aria-label="Close gallery"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Image container */}
      <div className="relative max-w-7xl max-h-[95vh] mx-4">
        <div className="relative w-full h-full">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={2000}
            height={1500}
            className="w-full h-auto max-h-[90vh] object-contain border-none"
            priority
          />
        </div>
        
        {/* Image caption */}
        {currentImage.alt && (
        <div className='flex flex-row justify-between'>
          <span className="mt-4 font-semibold text-left text-white text-sm">
            {currentImage.alt}
          </span>
          <span className="mt-4 text-right text-white text-sm">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery; 