"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudy from "./CaseStudy";
import NotionContent from "./NotionContent";

interface LazyCaseStudyProps {
  workSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

// Case study data mapping with Notion page IDs
const caseStudyData = {
  tomandco: {
    title: "Tom&Co.",
    subtitle: "White Label Design System for Award Winning Ecommerce Agency",
    image: "/work/dragonfly.png",
    notionPageId: '7a52ff3c3e2b464d8e923b7d37ac35fb'
  },
  freedom2hear: {
    title: "Freedom2hear",
    subtitle: "Product Design, Innovation & Growth for an Emotion AI Startup",
    image: "/work/freedom2hear.png",
    notionPageId: '142eac4e7ae980d3b74ef291a22af62d'
  },
  myfujifilm: {
    title: "MyFujifilm",
    subtitle: "Ecommerce Product Design & Development for a Global Brand",
    image: "/work/myfujifilm.png",
    notionPageId: '12ceac4e7ae980fd9d45fc49c9a47d19'
  }
};

const LazyCaseStudy: React.FC<LazyCaseStudyProps> = ({ workSlug, isOpen, onClose }) => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notionData, setNotionData] = useState<any>(null);
  const [showContent, setShowContent] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Dispatch event to notify homepage about modal state
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: true } }));
    } else {
      document.body.style.overflow = 'unset';
      // Dispatch event to notify homepage about modal state
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: false } }));
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: false } }));
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !content) {
      setIsLoading(true);
      setShowContent(false);
      
      // Get case study data
      const studyData = caseStudyData[workSlug as keyof typeof caseStudyData];
      
      if (studyData) {
        // Fetch data from Notion via API route
        const fetchNotionData = async () => {
          try {
            const response = await fetch(`/api/notion/${studyData.notionPageId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch Notion data');
            }
            const notionData = await response.json();
            setNotionData(notionData);
            
            // Create case study content with Notion data
            const caseStudyContent = (
              <CaseStudy
                title={studyData.title}
                subtitle={studyData.subtitle}
                tags={notionData?.properties?.tags || [""]}
                image={notionData?.coverImage || studyData.image}
                role={notionData?.properties?.role || ""}
                company={notionData?.properties?.company || ""}
                tools={notionData?.properties?.tools || [""]}
                date={notionData?.properties?.date || ""}
                summary={notionData?.properties?.summary || ""}
              >
                {notionData?.blocks ? (
                  <NotionContent blocks={notionData.blocks} />
                ) : (
                  <div className="prose prose-invert">
                    <h2>Project Overview</h2>
                    <p>{studyData.subtitle}</p>
                    
                    <h2>Key Achievements</h2>
                    <ul>
                      <li>Designed comprehensive design system</li>
                      <li>Improved user experience metrics</li>
                      <li>Collaborated with cross-functional teams</li>
                    </ul>
                    
                    <h2>Process</h2>
                    <p>This project involved extensive research, prototyping, and user testing to create a solution that meets both business and user needs.</p>
                  </div>
                )}
              </CaseStudy>
            );
            
            setContent(caseStudyContent);
            setIsLoading(false);
            
            // Delay showing content to allow for smooth transition
            setTimeout(() => {
              setShowContent(true);
            }, 400);
          } catch (error) {
            console.error('Error fetching Notion data:', error);
            setIsLoading(false);
            setContent(
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                color: "var(--foreground)"
              }}>
                Error loading case study
              </div>
            );
            setTimeout(() => {
              setShowContent(true);
            }, 400);
          }
        };
        
        fetchNotionData();
      } else {
        setIsLoading(false);
        setContent(
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            color: "var(--foreground)"
          }}>
            Case study not found
          </div>
        );
        setTimeout(() => {
          setShowContent(true);
        }, 400);
      }
    }
  }, [isOpen, workSlug, content]);

  // Reset content when modal closes
  useEffect(() => {
    if (!isOpen) {
      setContent(null);
      setShowContent(false);
      setNotionData(null);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ 
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.2)",
              zIndex: 1000
            }}
            onClick={onClose}
          />
          
          {/* Modal Content with enhanced animation */}
          <motion.div
            initial={{ 
              y: "100%",
              scale: 0.9,
              rotateX: 15
            }}
            animate={{ 
              y: 0,
              scale: 1,
              rotateX: 0
            }}
            exit={{ 
              y: "100%",
              scale: 0.9,
              rotateX: -15
            }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4 // Staggered timing
            }}
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              right: "20px",
              bottom: 0,
              background: "var(--background)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)",
              overflow: "auto",
              zIndex: 1001,
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onClick={onClose}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(0, 0, 0, 0.5)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: "white",
                cursor: "pointer",
                zIndex: 1002,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px"
              }}
            >
              ×
            </motion.button>
            
            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ 
                duration: 0.4,
                delay: showContent ? 0 : 0.3
              }}
            >
              {/* Loading State */}
              {isLoading && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                  color: "var(--foreground)"
                }}>
                  Loading...
                </div>
              )}
              
              {/* Case Study Content */}
              {!isLoading && content}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LazyCaseStudy; 