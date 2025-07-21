"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SmoothCaseStudyTransitionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const SmoothCaseStudyTransition: React.FC<SmoothCaseStudyTransitionProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [transitionTitle, setTransitionTitle] = useState(title);
  const [transitionSubtitle, setTransitionSubtitle] = useState(subtitle);
  const [isReturningToHome, setIsReturningToHome] = useState(false);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
  const [caseStudyContent, setCaseStudyContent] = useState<ReactNode>(null);
  const pathname = usePathname();
  const isCaseStudy = pathname.includes('/work/');

  useEffect(() => {
    if (isCaseStudy) {
      // Case study page - show as modal
      setShowCaseStudyModal(true);
      setCaseStudyContent(children);
      setIsTransitioning(false);
      setShowTitle(false);
      setIsReturningToHome(false);
    } else {
      // Homepage - check if we're in a transition
      const clickedWorkIndex = localStorage.getItem('clickedWorkIndex');
      if (clickedWorkIndex !== null) {
        // We're transitioning to a case study modal
        setShowCaseStudyModal(true);
        localStorage.removeItem('clickedWorkIndex');
      } else {
        // Normal homepage state
        setShowCaseStudyModal(false);
      }
      setShowTitle(false);
      setIsReturningToHome(false);
    }
  }, [pathname, isCaseStudy, children]);

  const handleCloseModal = () => {
    setShowCaseStudyModal(false);
    // Navigate back to homepage
    window.history.back();
  };

  return (
    <>
      {/* Animated Title and Subtitle - only show on homepage when returning */}
      <AnimatePresence>
        {showTitle && transitionTitle && isReturningToHome && (
          <motion.div
            initial={{ 
              opacity: 0,
              y: -20,
              scale: 1
            }}
            animate={{ 
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              y: 20
            }}
            transition={{
              duration: 2,
              ease: "easeInOut"
            }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1001,
              pointerEvents: "none",
              width: "100%",
              maxWidth: "1200px",
              padding: "0 2rem",
              textAlign: "center"
            }}
          >
            <motion.h1
              className="display"
              style={{ 
                color: "var(--foreground)",
                fontWeight: 400,
                marginBottom: "0.5rem"
              }}
              animate={{
                fontSize: "clamp(2.5rem, 8vw, 4.8rem)"
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut"
              }}
            >
              {transitionTitle}
            </motion.h1>
            {transitionSubtitle && (
              <motion.p
                className="h3"
                style={{ 
                  color: "var(--muted-foreground)",
                  fontWeight: 300
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              >
                {transitionSubtitle}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Modal/Popover */}
      <AnimatePresence>
        {showCaseStudyModal && (
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
              onClick={handleCloseModal}
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
                top: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "1200px",
                maxHeight: "calc(100vh - 4rem)",
                background: "var(--background)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                zIndex: 1001,
                margin: "0 1rem",
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
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
                  fontSize: "20px"
                }}
              >
                ×
              </button>
              
              {caseStudyContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Homepage Content - only render when not showing modal */}
      {!showCaseStudyModal && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default SmoothCaseStudyTransition; 