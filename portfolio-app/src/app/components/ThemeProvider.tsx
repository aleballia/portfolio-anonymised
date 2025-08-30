"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no saved preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply theme to document
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply smooth transitions with inline styles
    const transitionDuration = isAnimating ? '1s' : '0.3s';
    const transitionProperties = [
      'background-color',
      'color', 
      'border-color',
      'box-shadow',
      'fill',
      'stroke'
    ].join(', ');
    
    // Apply transition styles only to specific theme-related elements
    const styleSheet = document.getElementById('theme-transitions');
    if (styleSheet) {
      styleSheet.remove();
    }
    
    const newStyleSheet = document.createElement('style');
    newStyleSheet.id = 'theme-transitions';
    newStyleSheet.textContent = `
      /* Only apply theme transitions to basic elements and avoid components */
      :root {
        transition: ${transitionProperties} ${transitionDuration} cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      body {
        transition: background-color ${transitionDuration} cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Target only basic HTML elements without classes */
      h1:not([class]), h2:not([class]), h3:not([class]), h4:not([class]), h5:not([class]), h6:not([class]),
      p:not([class]), div:not([class]), span:not([class]),
      a:not([class]), button:not([class]) {
        transition: ${transitionProperties} ${transitionDuration} cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Specific theme-aware classes only */
      .theme-aware {
        transition: ${transitionProperties} ${transitionDuration} cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(newStyleSheet);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme, mounted, isAnimating]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      console.log('Theme toggled to:', newTheme);
      return newTheme;
    });
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating, setIsAnimating }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType | null {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.warn('useTheme must be used within a ThemeProvider');
    return null;
  }
  return context;
} 