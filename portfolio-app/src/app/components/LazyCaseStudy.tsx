"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudy from "./CaseStudy";
import NotionContent from "./NotionContent";
import CaseStudySkeleton from "./CaseStudySkeleton";
import { NotionBlock } from "../../lib/notion";

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
    image: "/work/tomandco.png",
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
  },
  'frictionless-futures': {
    title: "Frictionless Futures",
    subtitle: "Strategic design for future-focused innovation",
    image: "/work/frictionless-futures.png",
    notionPageId: '23ceac4e7ae980d5be60c55fff75a92e'
  },
  oliverbonas: {
    title: "Oliver Bonas",
    subtitle: "Ecommerce design for an independent British brand",
    image: "/work/oliver-bonas.png",
    notionPageId: '12ceac4e7ae9801b9cc0f59f4c03386e'
  }
};

interface NotionProperties {
  tags?: string[];
  role?: string;
  company?: string;
  tools?: string[];
  date?: string;
  summary?: string;
}

interface NotionData {
  properties?: NotionProperties;
  blocks?: NotionBlock[];
  coverImage?: string;
}

const LazyCaseStudy: React.FC<LazyCaseStudyProps> = ({ workSlug, isOpen, onClose }) => {
  const [notionData, setNotionData] = useState<NotionData | null>(null);
  const [showContent, setShowContent] = useState(false);

  // Make studyData available everywhere in the component
  const studyData = caseStudyData[workSlug as keyof typeof caseStudyData];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: true } }));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: false } }));
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: false } }));
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !showContent) {
      setNotionData(null);
      if (studyData) {
        const fetchNotionData = async () => {
          try {
            const response = await fetch(`/api/notion/${studyData.notionPageId}`);
            if (!response.ok) {
              console.warn('Notion API failed, using fallback content');
              // Use fallback content instead of throwing error
              setNotionData({
                properties: {
                  role: "Design Lead",
                  company: studyData.title,
                  tools: ["Figma", "Design Systems", "User Research"],
                  tags: ["Design", "Strategy"],
                  date: "2023",
                  summary: studyData.subtitle
                },
                blocks: [],
                coverImage: studyData.image
              });
            } else {
              const notionData = await response.json();
              setNotionData(notionData);
            }
            setTimeout(() => {
              console.log('Setting showContent to true (success)');
              setShowContent(true);
            }, 800);
          } catch (error) {
            console.error('Error fetching Notion data:', error);
            // Use fallback content on error
            setNotionData({
              properties: {
                role: "Design Lead",
                company: studyData.title,
                tools: ["Figma", "Design Systems", "User Research"],
                tags: ["Design", "Strategy"],
                date: "2023",
                summary: studyData.subtitle
              },
              blocks: [],
              coverImage: studyData.image
            });
            setTimeout(() => {
              console.log('Setting showContent to true (error)');
              setShowContent(true);
            }, 800);
          }
        };
        fetchNotionData();
      } else {
        setTimeout(() => {
          console.log('Setting showContent to true (no studyData)');
          setShowContent(true);
        }, 800);
      }
    }
  }, [isOpen, workSlug, showContent, studyData]);

  // Reset content when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNotionData(null);
      setShowContent(false);
    }
  }, [isOpen]);

  // Prepare CaseStudy props when ready
  let caseStudyContent = null;
  if (showContent && studyData) {
    caseStudyContent = (
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
              <li>Led design strategy and implementation</li>
              <li>Collaborated with cross-functional teams</li>
              <li>Delivered user-centered solutions</li>
              <li>Established design systems and processes</li>
            </ul>
            <h2>Process</h2>
            <p>This project involved extensive research, prototyping, and user testing to create a solution that meets both business and user needs. The process included stakeholder interviews, user research, iterative design, and implementation support.</p>
            <h2>Tools & Technologies</h2>
            <p>Figma, Design Systems, User Research, Prototyping, User Testing</p>
          </div>
        )}
      </CaseStudy>
    );
  } else if (showContent && !studyData) {
    caseStudyContent = (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        color: "var(--foreground)",
        fontSize: "1.3rem",
        fontWeight: 500,
        textAlign: "center"
      }}>
        Content not found
      </div>
    );
  }
  console.log('showContent:', showContent, 'caseStudyContent:', caseStudyContent);

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
              duration: 0.1,
              ease: [0.25, 0.46, 0.35, 0.4]
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
                fontSize: "32px"
              }}
            >
              BACK
            </motion.button>
            {/* Content Container */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ 
                duration: 0.2,
                delay: showContent ? 0 : 0.2
              }}
            >
              {!showContent && <CaseStudySkeleton />}
              {showContent && caseStudyContent}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LazyCaseStudy; 