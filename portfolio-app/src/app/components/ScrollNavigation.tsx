"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ScrollNavigation.module.css";

interface NavigationItem {
  id: string;
  title: string;
  level: number;
  element: HTMLElement;
}

interface ScrollNavigationProps {
  containerSelector?: string;
  className?: string;
}

const ScrollNavigation: React.FC<ScrollNavigationProps> = ({
  containerSelector = ".markdown-content",
  className = ""
}) => {

  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate navigation items from headings
  useEffect(() => {

    
    const findHeadings = () => {
      const container = document.querySelector(containerSelector);
      
      if (!container) {
        setTimeout(findHeadings, 100);
        return;
      }

      const headings = container.querySelectorAll('h2, h3, h4, h5, h6');
      
      // Try a broader search
      const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      // Initialize items array
      const items: NavigationItem[] = [];
      
      // Always add "Summary" as the first item
      const summaryElement = document.getElementById('summary');
      if (summaryElement) {
        items.push({
          id: 'summary',
          title: 'Summary',
          level: 2,
          element: summaryElement
        });
      }
      
      // If no headings in container, let's use all headings except the first one (page title)
      if (headings.length === 0 && allHeadings.length > 1) {
        const fallbackHeadings = Array.from(allHeadings).slice(1); // Skip first heading (page title)
        fallbackHeadings.forEach((heading, index) => {
          const element = heading as HTMLElement;
          const level = parseInt(element.tagName.charAt(1)) - 1;
          const title = element.textContent || '';
          
          // Only include level 2 headings (h3 in DOM, which are ## in markdown)
          if (level !== 2) return;
          
          let id = element.id;
          if (!id) {
            id = title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            element.id = id;
          }

          items.push({
            id,
            title,
            level,
            element
          });
        });
        
        setNavigationItems(items);
        return;
      }

      headings.forEach((heading, index) => {
        const element = heading as HTMLElement;
        const level = parseInt(element.tagName.charAt(1)) - 1; // Adjust level since h2=1, h3=2, etc.
        const title = element.textContent || '';
        
        // Generate or use existing ID
        let id = element.id;
        if (!id) {
          id = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          element.id = id;
        }

        items.push({
          id,
          title,
          level,
          element
        });
      });

      setNavigationItems(items);
      setIsVisible(true); // Show immediately when items are found
    };

    // Try immediately
    findHeadings();
    
    // Also try after a delay to catch dynamically rendered content
    const timer = setTimeout(findHeadings, 1000);
    
    // Set up a MutationObserver to detect when content is added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain headings
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.matches('h2, h3, h4, h5, h6') || element.querySelector('h2, h3, h4, h5, h6')) {
                findHeadings();
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [containerSelector]);

  // Set up scroll-based visibility
  useEffect(() => {
    if (navigationItems.length === 0) return;

    const checkScrollPosition = () => {
      if (typeof window !== 'undefined') {
        // Calculate dynamic height based on actual main content position
        const mainContent = document.querySelector('[class*="mainContent"]') as HTMLElement;
        const dynamicHeight = mainContent?.offsetTop ? mainContent.offsetTop - 100 : 800;
        const heroHeight = Math.max(dynamicHeight, 600); // Ensure minimum 600px before showing
        setIsVisible(window.scrollY > heroHeight);
      }
    };

    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition);

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [navigationItems.length]);

  // Set up intersection observer for active section tracking
  useEffect(() => {
    if (navigationItems.length === 0) return;

    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    // Create a mapping of subsection headings to their parent level 2 heading
    const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingToParentMap = new Map();
    let currentLevel2Parent = null;

    Array.from(allHeadings).forEach((heading) => {
      const element = heading as HTMLElement;
      const level = parseInt(element.tagName.charAt(1)) - 1;
      
      if (level === 2) {
        currentLevel2Parent = element.id;
      } else if (level > 2 && currentLevel2Parent) {
        headingToParentMap.set(element.id, currentLevel2Parent);
      }
    });

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          // If this is a subsection, map it to its parent level 2 heading
          const parentId = headingToParentMap.get(targetId);
          setActiveId(parentId || targetId);
        }
      });
    }, observerOptions);

    // Observe all navigation items (level 2 headings)
    navigationItems.forEach((item) => {
      if (observerRef.current) {
        observerRef.current.observe(item.element);
      }
    });

    // Also observe all subsection headings (level 3, 4, etc.)
    Array.from(allHeadings).forEach((heading) => {
      const element = heading as HTMLElement;
      const level = parseInt(element.tagName.charAt(1)) - 1;
      
      if (level > 2 && observerRef.current) {
        // Ensure the heading has an ID
        if (!element.id) {
          const title = element.textContent || '';
          element.id = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [navigationItems]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.scrollHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(100, (scrolled / containerHeight) * 100);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerSelector]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      let offsetTop;
      
      if (id === 'summary') {
        // For summary, scroll to the main content section
        const mainContentSection = document.querySelector('[class*="mainContent"]') as HTMLElement;
        offsetTop = mainContentSection?.offsetTop ? mainContentSection.offsetTop + 50 : element.offsetTop - 100;
      } else {
        // Calculate position relative to viewport, accounting for the new layout
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        offsetTop = rect.top + scrollTop - 80; // 80px offset from top
      }
      
      window.scrollTo({
        top: Math.max(0, offsetTop), // Ensure we don't scroll to negative values
        behavior: 'smooth'
      });
    }
  };


  
  if (navigationItems.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div className={styles.scrollNavigation}>
      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation items */}
      <nav className={styles.navigation}>

        <ul className={styles.navList}>
          {navigationItems.map((item, index) => (
            <li
              key={item.id}
              className={`${styles.navItem} ${styles[`level-${item.level}`]} ${
                activeId === item.id ? styles.active : ''
              }`}
            >
              <button
                className={styles.navLink}
                onClick={() => scrollToSection(item.id)}
                title={item.title}
              >
                <span className={styles.navText}>{item.title}</span>
                <div
                  className={styles.activeIndicator}
                  style={{
                    transform: activeId === item.id ? 'scale(1)' : 'scale(0)',
                    opacity: activeId === item.id ? 1 : 0
                  }}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Scroll to top button */}
      <button
        className={styles.scrollToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          opacity: scrollProgress > 10 ? 1 : 0,
          transform: `scale(${scrollProgress > 10 ? 1 : 0.8})`
        }}
        title="Scroll to top"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default ScrollNavigation;