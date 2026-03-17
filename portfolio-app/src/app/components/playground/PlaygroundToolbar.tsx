"use client";

import React, { useState, useEffect, useCallback } from "react";
import StickerPicker from "./StickerPicker";
import styles from "./PlaygroundToolbar.module.css";

export type Tool = "pen" | "eraser" | "sticker" | "fill";

const COLORS_LIGHT = ["#1c1c1c", "#FF4B6E", "#FFB800", "#1efb7d", "#7e27e0", "#3B82F6", "#ffffff"];
const COLORS_DARK = ["#ffffff", "#FF4B6E", "#FFB800", "#1efb7d", "#7e27e0", "#3B82F6", "#1c1c1c"];
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
  isDark?: boolean;
  showMandala: boolean;
  onToggleMandala: () => void;
  onShuffle: () => void;
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
  isDark,
  showMandala,
  onToggleMandala,
  onShuffle,
}) => {
  const COLORS = isDark ? COLORS_DARK : COLORS_LIGHT;
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [showMandalaMenu, setShowMandalaMenu] = useState(false);
  const [showPenMenu, setShowPenMenu] = useState(false);

  const closeAllPopovers = useCallback(() => {
    setShowStickerPicker(false);
    setShowColors(false);
    setShowSizes(false);
    setShowMandalaMenu(false);
    setShowPenMenu(false);
  }, []);

  useEffect(() => {
    const anyOpen = showStickerPicker || showColors || showSizes || showMandalaMenu || showPenMenu;
    if (!anyOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeAllPopovers();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showStickerPicker, showColors, showSizes, showMandalaMenu, showPenMenu, closeAllPopovers]);

  const handleToolClick = (tool: Tool) => {
    if (tool === "sticker") {
      setShowStickerPicker((v) => !v);
      setShowColors(false);
      setShowSizes(false);
      setShowMandalaMenu(false);
      setShowPenMenu(false);
    } else {
      setShowStickerPicker(false);
      setShowPenMenu(false);
    }
    onToolChange(tool);
  };

  return (
    <div className={styles.toolbar} data-playground-toolbar>
      {/* Drawing tools */}
      <div className={styles.group}>
        <div className={styles.popoverAnchor}>
          <button
            className={`${styles.btn} ${(activeTool === "pen" || activeTool === "fill" || activeTool === "eraser") ? styles.btnActive : ""}`}
            onClick={() => {
              setShowPenMenu((v) => !v);
              setShowStickerPicker(false);
              setShowColors(false);
              setShowSizes(false);
              setShowMandalaMenu(false);
            }}
            title="Pen"
          >
            <span className={styles.btnIcon}>
              {activeTool === "fill" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/>
                  <path d="m5 2 5 5"/>
                  <path d="M2 13h15"/>
                  <path d="M22 20a2 2 0 1 1-4 0c0-1.6 2-3 2-3s2 1.4 2 3"/>
                </svg>
              ) : activeTool === "eraser" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
                  <path d="M22 21H7"/>
                  <path d="m5 11 9 9"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                </svg>
              )}
            </span>
            <span className={styles.label}>Tools</span>
          </button>
          {showPenMenu && (
            <div className={styles.popover}>
              <div className={styles.mandalaMenu}>
                <button
                  className={`${styles.mandalaMenuBtn} ${activeTool === "pen" ? styles.mandalaMenuBtnActive : ""}`}
                  onClick={() => { handleToolClick("pen"); setShowPenMenu(false); }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  </svg>
                  Draw
                </button>
                <button
                  className={`${styles.mandalaMenuBtn} ${activeTool === "eraser" ? styles.mandalaMenuBtnActive : ""}`}
                  onClick={() => { handleToolClick("eraser"); setShowPenMenu(false); }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
                    <path d="M22 21H7"/>
                    <path d="m5 11 9 9"/>
                  </svg>
                  Erase
                </button>
                {showMandala && (
                  <button
                    className={`${styles.mandalaMenuBtn} ${activeTool === "fill" ? styles.mandalaMenuBtnActive : ""}`}
                    onClick={() => { handleToolClick("fill"); setShowPenMenu(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/>
                      <path d="m5 2 5 5"/>
                      <path d="M2 13h15"/>
                      <path d="M22 20a2 2 0 1 1-4 0c0-1.6 2-3 2-3s2 1.4 2 3"/>
                    </svg>
                    Fill
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.popoverAnchor}>
          <button
            className={`${styles.btn} ${activeTool === "sticker" && selectedSticker ? styles.btnActive : ""}`}
            onClick={() => handleToolClick("sticker")}
            title="Stickers"
          >
            <span className={styles.btnIcon}>
              {selectedSticker ? (
                selectedSticker.startsWith("/") ? (
                  <img src={selectedSticker} alt="" width="20" height="20" />
                ) : selectedSticker
              ) : "✨"}
            </span>
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

        <div className={styles.popoverAnchor}>
          <button
            className={`${styles.btn} ${showMandalaMenu ? styles.btnActive : ""}`}
            onClick={() => {
              setShowMandalaMenu((v) => !v);
              setShowStickerPicker(false);
              setShowColors(false);
              setShowSizes(false);
              setShowPenMenu(false);
            }}
            title="Mandala"
          >
            <span className={styles.btnIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </span>
            <span className={styles.label}>Mandala</span>
          </button>
          {showMandalaMenu && (
            <div className={styles.popover}>
              <div className={styles.mandalaMenu}>
                {!showMandala && (
                  <button className={styles.mandalaMenuBtn} onClick={() => { onToggleMandala(); setShowMandalaMenu(false); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                    Add mandala
                  </button>
                )}
                {showMandala && (
                  <>
                    <button className={styles.mandalaMenuBtn} onClick={() => { onShuffle(); setShowMandalaMenu(false); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                        <path d="M16 16h5v5"/>
                      </svg>
                      New mandala
                    </button>
                    <button className={styles.mandalaMenuBtn} onClick={() => { onToggleMandala(); setShowMandalaMenu(false); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                      </svg>
                      Remove mandala
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Color and size */}
      <div className={styles.group}>
        <div className={styles.popoverAnchor}>
          <button
            className={styles.btn}
            onClick={() => { setShowColors((v) => !v); setShowSizes(false); setShowStickerPicker(false); setShowMandalaMenu(false); setShowPenMenu(false); }}
            title="Color"
          >
            <span className={styles.btnIcon}><span className={styles.colorDot} style={{ background: color }} /></span>
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
            onClick={() => { setShowSizes((v) => !v); setShowColors(false); setShowStickerPicker(false); setShowMandalaMenu(false); setShowPenMenu(false); }}
            title="Size"
          >
            <span className={styles.btnIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r={Math.max(3, lineWidth / 2)} fill="currentColor" />
              </svg>
            </span>
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

      {/* Actions */}
      <div className={styles.group}>
        <button className={styles.btn} onClick={onClear} title="Clear all">
          <span className={styles.btnIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </span>
          <span className={styles.label}>Clear</span>
        </button>

        <button className={`${styles.btn} ${styles.btnScreenshot}`} onClick={onScreenshot} title="Screenshot">
          <span className={styles.btnIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
          </span>
          <span className={styles.label}>Screenshot</span>
        </button>
      </div>
    </div>
  );
};

export default PlaygroundToolbar;
