"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HoverImageProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

const HoverImage: React.FC<HoverImageProps> = ({ 
  children, 
  imageSrc, 
  imageAlt, 
  className = "" 
}) => {
  const [showImage, setShowImage] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      const touch = e.touches[0];
      setMousePosition({ x: touch.clientX, y: touch.clientY });
      setShowImage(true);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setShowImage(false);
    }
  };

  return (
    <span
      className={`hover-image-trigger ${className}`}
      onMouseEnter={() => !isMobile && setShowImage(true)}
      onMouseLeave={() => !isMobile && setShowImage(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ 
        position: 'relative',
        display: 'inline-block',
        color: 'var(--accent-text)',
        textDecoration: 'underline',
        fontWeight: 500,
        cursor: isMobile ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {children}
      
      <AnimatePresence>
        {showImage && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              left: isMobile ? '50%' : mousePosition.x + 20,
              top: isMobile ? '50%' : mousePosition.y - 100,
              transform: isMobile ? 'translate(-50%, -50%)' : 'none',
              zIndex: 1000,
              pointerEvents: 'none',
              minHeight: '150px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              maxWidth: isMobile ? '90vw' : 'none',
              maxHeight: isMobile ? '60vh' : 'none',
              display: 'block'
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={0}
              height={0}
              sizes="100vw"
              className="object-cover"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                minHeight: '200px',
                minWidth: '200px'
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default HoverImage;
