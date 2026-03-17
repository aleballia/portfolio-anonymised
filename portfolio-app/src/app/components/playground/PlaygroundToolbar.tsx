"use client";

import React, { useState, useEffect, useCallback } from "react";
import StickerPicker from "./StickerPicker";
import styles from "./PlaygroundToolbar.module.css";

export type Tool = "pen" | "eraser" | "sticker";

const COLORS = ["#1c1c1c", "#FF4B6E", "#FFB800", "#1efb7d", "#7e27e0", "#3B82F6", "#ffffff"];
const SIZES = [3, 6, 10, 16];

interface PlaygroundToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  color: string;
  onColorChange: (color: string) => void;
  lineWidth: number;
  onLineWidthChange: (w: number) => void;
  onClear: () => void;
  onScreenshot: () => void;
  onClose?: () => void;
  selectedSticker: string | null;
  onStickerSelect: (content: string, type: "emoji" | "custom") => void;
}

const PlaygroundToolbar: React.FC<PlaygroundToolbarProps> = ({
  activeTool,
  onToolChange,
  color,
  onColorChange,
  lineWidth,
  onLineWidthChange,
  onClear,
  onScreenshot,
  onClose,
  selectedSticker,
  onStickerSelect,
}) => {
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const closeAllPopovers = useCallback(() => {
    setShowStickerPicker(false);
    setShowColors(false);
    setShowSizes(false);
  }, []);

  useEffect(() => {
    const anyOpen = showStickerPicker || showColors || showSizes;
    if (!anyOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeAllPopovers();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showStickerPicker, showColors, showSizes, closeAllPopovers]);

  const handleToolClick = (tool: Tool) => {
    if (tool === "sticker") {
      setShowStickerPicker((v) => !v);
      setShowColors(false);
      setShowSizes(false);
      onToolChange(tool);
    } else {
      setShowStickerPicker(false);
      onToolChange(tool);
    }
  };

  return (
    <div className={styles.toolbar} data-playground-toolbar>
      <div className={styles.group}>
        <button
          className={`${styles.btn} ${activeTool === "pen" ? styles.btnActive : ""}`}
          onClick={() => handleToolClick("pen")}
          title="Pen"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
          </svg>
          <span className={styles.label}>Pen</span>
        </button>

        <button
          className={`${styles.btn} ${activeTool === "eraser" ? styles.btnActive : ""}`}
          onClick={() => handleToolClick("eraser")}
          title="Eraser"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
            <path d="M22 21H7"/>
            <path d="m5 11 9 9"/>
          </svg>
          <span className={styles.label}>Eraser</span>
        </button>

        <div className={styles.popoverAnchor}>
          <button
            className={`${styles.btn} ${activeTool === "sticker" ? styles.btnActive : ""}`}
            onClick={() => handleToolClick("sticker")}
            title="Stickers"
          >
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>✨</span>
            <span className={styles.label}>Stickers</span>
          </button>
          {showStickerPicker && (
            <StickerPicker
              onSelect={(content, type) => {
                onStickerSelect(content, type);
              }}
              selectedSticker={selectedSticker}
            />
          )}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <div className={styles.popoverAnchor}>
          <button
            className={styles.btn}
            onClick={() => { setShowColors((v) => !v); setShowSizes(false); setShowStickerPicker(false); }}
            title="Color"
          >
            <span className={styles.colorDot} style={{ background: color }} />
            <span className={styles.label}>Colour</span>
          </button>
          {showColors && (
            <div className={styles.popover}>
              <div className={styles.colorGrid}>
                {COLORS.map((c) => (
                  <button
                    key={c}
                    className={`${styles.colorSwatch} ${c === color ? styles.colorSwatchActive : ""}`}
                    style={{ background: c }}
                    onClick={() => { onColorChange(c); setShowColors(false); }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.popoverAnchor}>
          <button
            className={styles.btn}
            onClick={() => { setShowSizes((v) => !v); setShowColors(false); setShowStickerPicker(false); }}
            title="Size"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r={Math.max(3, lineWidth / 2)} fill="currentColor" />
            </svg>
            <span className={styles.label}>Size</span>
          </button>
          {showSizes && (
            <div className={styles.popover}>
              <div className={styles.sizeGrid}>
                {SIZES.map((s) => (
                  <button
                    key={s}
                    className={`${styles.sizeBtn} ${s === lineWidth ? styles.sizeBtnActive : ""}`}
                    onClick={() => { onLineWidthChange(s); setShowSizes(false); }}
                  >
                    <span className={styles.sizeDot} style={{ width: s + 4, height: s + 4 }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <button className={styles.btn} onClick={onClear} title="Clear all">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
          <span className={styles.label}>Clear</span>
        </button>

        <button className={`${styles.btn} ${styles.btnScreenshot}`} onClick={onScreenshot} title="Screenshot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
          <span className={styles.label}>Screenshot</span>
        </button>
      </div>

    </div>
  );
};

export default PlaygroundToolbar;
