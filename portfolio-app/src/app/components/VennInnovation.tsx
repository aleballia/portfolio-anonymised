"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import lottie from 'lottie-web';
import styles from './VennInnovation.module.css';

interface VennInnovationProps {
  title?: string;
  circles?: {
    design: string;
    mission: string;
    technology: string;
    business: string;
  };
}

const VennInnovation: React.FC<VennInnovationProps> = ({ 
  title = "Innovation approach",
  circles = {
    design: "Design",
    mission: "Mission", 
    technology: "Technology",
    business: "Business"
  }
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Check if device is mobile (up to 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Transform scroll progress to Lottie time (in seconds)
  // Use a shorter effective duration for better responsiveness
  const lottieTime = useTransform(
    scrollYProgress,
    [0, 1], // Full scroll range
    [0, 120],// 30 seconds effective duration (much shorter than the actual 120s)
  );

  // Scale animation for mobile only - scales up to 1.5x at 0.5 scroll progress
  const lottieScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1], // Scale from 0 to 0.5, then maintain
    isMobile ? [1, 1.5, 1.5] : [1, 1, 1] // Scale only on mobile, stay at 1x on desktop
  );

  // Load Lottie animation
  useEffect(() => {
    if (!lottieContainerRef.current) return;

    // Clean up previous animation
    if (animationRef.current) {
      animationRef.current.destroy();
    }

    // Load new animation
    animationRef.current = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/lottie/venn-innovation-2.json',
    });

    // Handle load event
    animationRef.current.addEventListener('DOMLoaded', () => {
      console.log('Lottie loaded successfully');
      setIsLoaded(true);
      setDuration(animationRef.current.getDuration()); // Keep in seconds
    });

    // Handle error event
    animationRef.current.addEventListener('error', (error: any) => {
      console.error('Lottie error:', error);
    });

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, []);

  // Update Lottie time based on scroll
  const updateLottieTime = useCallback((time: number) => {
    if (animationRef.current && isLoaded) {
      try {
        // time is already in seconds from useTransform
        animationRef.current.goToAndStop(time, true);
      } catch (error) {
        console.error('Error seeking Lottie:', error);
      }
    }
  }, [isLoaded]);

  // Listen to scroll changes
  useEffect(() => {
    const unsubscribe = lottieTime.on('change', updateLottieTime);
    return unsubscribe;
  }, [lottieTime, updateLottieTime]);

  return (
    <div className={styles.container}>
      {/* Animation container */}
      <div ref={containerRef} className="relative h-[400vh]">
        {/* Sticky container for the animation */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Lottie container */}
          <motion.div 
            className={`${styles.lottieContainer}`}
            style={{
              scale: lottieScale,
            }}
          >
            {!isLoaded && (
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <div className="text-xl mb-2">Loading Lottie Animation...</div>
                  <div className="text-sm">Check console for errors</div>
                </div>
              </div>
            )}
            
            {/* Lottie animation container */}
            <div 
              ref={lottieContainerRef}
              style={{
                width: '100%',
                height: '100%',
                opacity: isLoaded ? 1 : 0,
              }}
            />

            {/* Content overlays that appear at different scroll times */}
            <div className={styles.contentOverlay}>
              
              {/* Content 1: 0.5 appears, 0.66 disappears */}
              <motion.div
                className={styles.contentBlock}
                style={{
                  opacity: useTransform(scrollYProgress, [0.5, 0.65, 0.66], [0, 1, 0]),
                }}
              >
                <p className={'p'}>
                Turning emerging technologies into bold, buildable solutions.
                </p>
              </motion.div>

              {/* Content 2: 0.66 appears, 0.81 disappears */}
              <motion.div
                className={styles.contentBlock}
                style={{
                  opacity: useTransform(scrollYProgress, [0.66, 0.80, 0.81], [0, 1, 0]),
                }}
              >
                <p className={'p'}>
                Creating products people truly want, need, and adopt.
                </p>
              </motion.div>

              {/* Content 3: 0.81 appears, 0.95 disappears */}
              <motion.div
                className={styles.contentBlock}
                style={{
                  opacity: useTransform(scrollYProgress, [0.81, 0.94, 0.95], [0, 1, 0]),
                }}
              >
                <p className={'p'}>
                Ensuring ideas are viable, scalable, and deliver long-term value.
                </p>
              </motion.div>

              {/* Content 4: 0.95 appears, stays */}
              <motion.div
                className={styles.contentBlock}
                style={{
                  opacity: useTransform(scrollYProgress, [0.94, 0.99], [0, 1]),
                }}
              >
                <p className={styles.contentParagraph}>
                Aligning innovation with overall strategy, ethics, and vision.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VennInnovation;