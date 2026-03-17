"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import DrawingCanvas from "./DrawingCanvas";
import StickerLayer, { Sticker } from "./StickerLayer";
import PlaygroundToolbar, { Tool } from "./PlaygroundToolbar";
import { useTheme } from "../ThemeProvider";
import styles from "./PlaygroundOverlay.module.css";

interface PlaygroundOverlayProps {
  visible: boolean;
  onClose: () => void;
}

let stickerIdCounter = 0;

const PlaygroundOverlay: React.FC<PlaygroundOverlayProps> = ({ visible, onClose }) => {
  const themeCtx = useTheme();
  const isDark = themeCtx?.theme === "dark";
  const [activeTool, setActiveTool] = useState<Tool>("pen");
  const [color, setColor] = useState("#1c1c1c");
  const [lineWidth, setLineWidth] = useState(6);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedSticker, setSelectedSticker] = useState<{ content: string; type: "emoji" | "custom" } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [screenshotMode, setScreenshotMode] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevToolRef = useRef<Tool>("pen");

  useEffect(() => {
    setColor((prev) => {
      if (isDark && prev === "#1c1c1c") return "#ffffff";
      if (!isDark && prev === "#ffffff") return "#1c1c1c";
      return prev;
    });
  }, [isDark]);

  useEffect(() => {
    if (!screenshotMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setScreenshotMode(false);
        setActiveTool(prevToolRef.current);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screenshotMode]);

  const handleStickerSelect = useCallback((content: string, type: "emoji" | "custom") => {
    setSelectedSticker((prev) =>
      prev?.content === content ? null : { content, type }
    );
    setActiveTool("sticker");
  }, []);

  const handlePlaceSticker = useCallback(
    (x: number, y: number) => {
      if (!selectedSticker) return;
      const id = `sticker-${++stickerIdCounter}`;
      setStickers((prev) => [
        ...prev,
        { id, content: selectedSticker.content, x, y, type: selectedSticker.type },
      ]);
      setHasInteracted(true);
    },
    [selectedSticker]
  );

  const handleUpdateSticker = useCallback((id: string, x: number, y: number) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, x, y } : s))
    );
  }, []);

  const handleDeleteSticker = useCallback((id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleClear = useCallback(() => {
    setStickers([]);
    const canvas = document.querySelector<HTMLCanvasElement>("[data-playground-canvas]");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const handleEnterScreenshotMode = useCallback(() => {
    prevToolRef.current = activeTool;
    setScreenshotMode(true);
  }, [activeTool]);

  const captureViewport = useCallback(async () => {
    setScreenshotMode(false);
    setIsCapturing(true);

    await new Promise((r) => setTimeout(r, 100));

    try {
      const { default: html2canvas } = await import("html2canvas");
      const result = await html2canvas(document.body, {
        useCORS: true,
        scale: window.devicePixelRatio || 2,
        ignoreElements: (el) => {
          return el.hasAttribute("data-playground-toolbar") || el.hasAttribute("data-playground-fab");
        },
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = `playground-${Date.now()}.png`;
      link.href = result.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    } finally {
      setIsCapturing(false);
      setActiveTool(prevToolRef.current);
    }
  }, []);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      style={{ display: visible ? undefined : "none" }}
    >
      <DrawingCanvas
        active={visible && !screenshotMode && (activeTool === "pen" || activeTool === "eraser")}
        color={color}
        lineWidth={lineWidth}
        eraser={activeTool === "eraser"}
        onDrawStart={() => setHasInteracted(true)}
      />

      <StickerLayer
        stickers={stickers}
        onUpdateSticker={handleUpdateSticker}
        onDeleteSticker={handleDeleteSticker}
        stickerMode={visible && !screenshotMode && activeTool === "sticker"}
        selectedSticker={selectedSticker?.content ?? null}
        onPlaceSticker={handlePlaceSticker}
      />

      {screenshotMode && (
        <div
          className={styles.screenshotTarget}
          onClick={captureViewport}
        >
          <div className={styles.screenshotHint}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
            <span>Click anywhere to capture &middot; Esc to cancel</span>
          </div>
        </div>
      )}

      {visible && !isCapturing && !screenshotMode && (
        <>
          <div className={`${styles.title} ${hasInteracted ? styles.titleHidden : ""}`}>Sometimes all you need is a break and a whiteboard. Start drawing and add stickers!</div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            title="Close playground"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
          <PlaygroundToolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            color={color}
            onColorChange={setColor}
            lineWidth={lineWidth}
            onLineWidthChange={setLineWidth}
            onClear={handleClear}
            onScreenshot={handleEnterScreenshotMode}
            onClose={onClose}
            selectedSticker={selectedSticker?.content ?? null}
            onStickerSelect={handleStickerSelect}
            isDark={isDark}
          />
        </>
      )}
    </div>
  );
};

export default PlaygroundOverlay;
