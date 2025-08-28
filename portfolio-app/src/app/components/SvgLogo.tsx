"use client";
import React, { useState, useEffect } from "react";

interface SvgLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const SvgLogo: React.FC<SvgLogoProps> = ({ src, alt, className }) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(src);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error loading SVG:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSvg();
  }, [src]);

  if (loading) {
    return <div className={className}>Loading...</div>;
  }

  // More comprehensive replacement of fill colors
  const processedSvg = svgContent
    // Replace fill attributes in quotes
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/fill='[^']*'/g, "fill='currentColor'")
    // Replace fill in style attributes
    .replace(/fill:\s*[^;"]*;?/g, 'fill: currentColor;')
    // Replace any remaining fill attributes
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/fill='[^']*'/g, "fill='currentColor'")
    // Also handle stroke attributes if needed
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
    .replace(/stroke='[^']*'/g, "stroke='currentColor'");

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
      style={{ color: 'var(--foreground)' }}
    />
  );
};

export default SvgLogo;
