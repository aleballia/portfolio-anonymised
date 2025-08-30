"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Video.module.css";

interface VideoProps {
  src: string;
  poster?: string;
  alt?: string;
  caption?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

const Video: React.FC<VideoProps> = ({
  src,
  poster,
  alt = "Video content",
  caption,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  width,
  height,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      
      // Attempt autoplay when video is loaded
      if (autoPlay) {
        video.play().catch(error => {
          console.log('Autoplay failed:', error);
          // If autoplay fails, the user will need to manually start the video
        });
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleVideoClick = () => {
    if (!controls) {
      togglePlay();
    }
  };

  return (
    <div className={`${styles.videoContainer} ${className}`}>
      <div 
        className={styles.videoWrapper}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onTouchStart={() => setShowControls(true)}
        onTouchEnd={() => setTimeout(() => setShowControls(false), 3000)}
      >
        <video
          ref={videoRef}
          className={styles.video}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          width={width}
          height={height}
          onClick={handleVideoClick}
          aria-label={alt}
          playsInline
        >
          <source src={src} type="video/mp4" />
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Custom overlay controls for videos without native controls */}
        {!controls && (
          <div className={`${styles.customControls} ${showControls || !isLoaded ? styles.visible : ''}`}>
            <button
              className={styles.playButton}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m7 4 10 6L7 16V4z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {!isLoaded && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
