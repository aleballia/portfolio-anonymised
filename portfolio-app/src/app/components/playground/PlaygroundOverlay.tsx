"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import DrawingCanvas from "./DrawingCanvas";
import StickerLayer, { Sticker } from "./StickerLayer";
import MandalaCanvas from "./MandalaCanvas";
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
  const [stickerDrag, setStickerDrag] = useState({ dragging: false, overTrash: false });
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevToolRef = useRef<Tool>("pen");

  // Mandala state
  const [showMandala, setShowMandala] = useState(false);
  const [mandalaSeed, setMandalaSeed] = useState(() => Math.floor(Math.random() * 2147483646) + 1);
  const [mandalaFills, setMandalaFills] = useState<Record<string, string>>({});

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

  const handleStickerDragChange = useCallback((dragging: boolean, overTrash: boolean) => {
    setStickerDrag({ dragging, overTrash });
  }, []);

  const handleClear = useCallback(() => {
    setMandalaFills({});
    setStickers([]);
    const canvas = document.querySelector<HTMLCanvasElement>("[data-playground-canvas]");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const handleToggleMandala = useCallback(() => {
    setShowMandala((prev) => {
      if (!prev) {
        setActiveTool("fill");
      } else if (activeTool === "fill") {
        setActiveTool("pen");
      }
      return !prev;
    });
    setHasInteracted(true);
  }, [activeTool]);

  const handleShuffle = useCallback(() => {
    setMandalaSeed(Math.floor(Math.random() * 2147483646) + 1);
    setMandalaFills({});
  }, []);

  const handleFillRegion = useCallback(
    (regionId: string) => {
      setHasInteracted(true);
      setMandalaFills((prev) => ({ ...prev, [regionId]: color }));
    },
    [color]
  );

  const handleEraseRegion = useCallback((regionId: string) => {
    setHasInteracted(true);
    setMandalaFills((prev) => {
      if (!prev[regionId]) return prev;
      const next = { ...prev };
      delete next[regionId];
      return next;
    });
  }, []);

  const mandalaFillsRef = useRef(mandalaFills);
  mandalaFillsRef.current = mandalaFills;

  const stickersRef = useRef(stickers);
  stickersRef.current = stickers;

  const handleEraseAt = useCallback((x: number, y: number) => {
    const EMOJI_HIT = 24;
    const CUSTOM_HIT = 36;
    for (const s of stickersRef.current) {
      const r = s.type === "custom" ? CUSTOM_HIT : EMOJI_HIT;
      if (Math.abs(x - s.x) <= r && Math.abs(y - s.y) <= r) {
        handleDeleteSticker(s.id);
      }
    }

    const svg = document.querySelector<SVGSVGElement>("[data-mandala-svg]");
    if (!svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const pt = new DOMPoint(x, y).matrixTransform(ctm.inverse());
    svg.querySelectorAll<SVGPathElement>("[data-region-id]").forEach((path) => {
      const regionId = path.getAttribute("data-region-id");
      if (regionId && mandalaFillsRef.current[regionId] && path.isPointInFill(pt)) {
        handleEraseRegion(regionId);
      }
    });
  }, [handleEraseRegion, handleDeleteSticker]);

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
      {showMandala && (
        <MandalaCanvas
          seed={mandalaSeed}
          regionFills={mandalaFills}
          onFillRegion={handleFillRegion}
          fillActive={visible && !screenshotMode && activeTool === "fill"}
        />
      )}

      <DrawingCanvas
        active={visible && !screenshotMode && (activeTool === "pen" || activeTool === "eraser")}
        color={color}
        lineWidth={lineWidth}
        eraser={activeTool === "eraser"}
        isDark={isDark}
        onDrawStart={() => setHasInteracted(true)}
        onEraseAt={handleEraseAt}
      />

      <StickerLayer
        stickers={stickers}
        onUpdateSticker={handleUpdateSticker}
        onDeleteSticker={handleDeleteSticker}
        stickerMode={visible && !screenshotMode && activeTool === "sticker" && !!selectedSticker}
        selectedSticker={selectedSticker?.content ?? null}
        onPlaceSticker={handlePlaceSticker}
        onDragChange={handleStickerDragChange}
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
          <div className={`${styles.title} ${hasInteracted ? styles.titleHidden : ""}`}>
            Sometimes all you need is a break and a whiteboard!
          </div>
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
          {stickerDrag.dragging ? (
            <div
              data-playground-trash
              className={`${styles.trashZone} ${stickerDrag.overTrash ? styles.trashZoneActive : ""}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
              <span>Drop to delete</span>
            </div>
          ) : (
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
              showMandala={showMandala}
              onToggleMandala={handleToggleMandala}
              onShuffle={handleShuffle}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PlaygroundOverlay;
