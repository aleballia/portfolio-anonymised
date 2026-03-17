"use client";

import React, { useRef, useCallback, useState } from "react";
import styles from "./StickerLayer.module.css";

export interface Sticker {
  id: string;
  content: string;
  x: number;
  y: number;
  type: "emoji" | "custom";
}

interface StickerLayerProps {
  stickers: Sticker[];
  onUpdateSticker: (id: string, x: number, y: number) => void;
  onDeleteSticker: (id: string) => void;
  stickerMode: boolean;
  selectedSticker: string | null;
  onPlaceSticker: (x: number, y: number) => void;
}

function hitTestTrash(clientX: number, clientY: number) {
  const el = document.querySelector<HTMLElement>("[data-playground-trash]");
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const pad = 20;
  return (
    clientX >= rect.left - pad &&
    clientX <= rect.right + pad &&
    clientY >= rect.top - pad &&
    clientY <= rect.bottom + pad
  );
}

const StickerLayer: React.FC<StickerLayerProps> = ({
  stickers,
  onUpdateSticker,
  onDeleteSticker,
  stickerMode,
  selectedSticker,
  onPlaceSticker,
}) => {
  const dragging = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [overTrash, setOverTrash] = useState(false);

  const handleLayerClick = (e: React.MouseEvent) => {
    if (!stickerMode || !selectedSticker || dragging.current) return;
    onPlaceSticker(e.clientX, e.clientY);
  };

  const handleStickerMouseDown = useCallback(
    (e: React.MouseEvent, sticker: Sticker) => {
      e.stopPropagation();
      dragging.current = {
        id: sticker.id,
        offsetX: e.clientX - sticker.x,
        offsetY: e.clientY - sticker.y,
      };
      setIsDragging(true);
      setOverTrash(false);

      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        onUpdateSticker(
          dragging.current.id,
          ev.clientX - dragging.current.offsetX,
          ev.clientY - dragging.current.offsetY
        );
        setOverTrash(hitTestTrash(ev.clientX, ev.clientY));
      };

      const onUp = (ev: MouseEvent) => {
        if (dragging.current && hitTestTrash(ev.clientX, ev.clientY)) {
          onDeleteSticker(dragging.current.id);
        }
        dragging.current = null;
        setIsDragging(false);
        setOverTrash(false);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [onUpdateSticker, onDeleteSticker]
  );

  const handleStickerTouchStart = useCallback(
    (e: React.TouchEvent, sticker: Sticker) => {
      e.stopPropagation();
      const touch = e.touches[0];
      dragging.current = {
        id: sticker.id,
        offsetX: touch.clientX - sticker.x,
        offsetY: touch.clientY - sticker.y,
      };
      setIsDragging(true);
      setOverTrash(false);

      const onMove = (ev: TouchEvent) => {
        if (!dragging.current) return;
        ev.preventDefault();
        const t = ev.touches[0];
        onUpdateSticker(
          dragging.current.id,
          t.clientX - dragging.current.offsetX,
          t.clientY - dragging.current.offsetY
        );
        setOverTrash(hitTestTrash(t.clientX, t.clientY));
      };

      const onEnd = (ev: TouchEvent) => {
        const t = ev.changedTouches[0];
        if (dragging.current && t && hitTestTrash(t.clientX, t.clientY)) {
          onDeleteSticker(dragging.current.id);
        }
        dragging.current = null;
        setIsDragging(false);
        setOverTrash(false);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
      };

      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onEnd);
    },
    [onUpdateSticker, onDeleteSticker]
  );

  return (
    <>
      <div
        data-playground-stickers
        className={styles.layer}
        style={{ pointerEvents: stickerMode ? "auto" : "none", cursor: stickerMode && selectedSticker ? "copy" : "default" }}
        onClick={handleLayerClick}
      >
        {stickers.map((s) => (
          <div
            key={s.id}
            className={styles.sticker}
            style={{
              left: s.x,
              top: s.y,
              pointerEvents: "auto",
            }}
            onMouseDown={(e) => handleStickerMouseDown(e, s)}
            onTouchStart={(e) => handleStickerTouchStart(e, s)}
          >
            {s.type === "emoji" ? (
              <span className={styles.emoji}>{s.content}</span>
            ) : (
              <img src={s.content} alt="sticker" className={styles.customImg} draggable={false} />
            )}
          </div>
        ))}
      </div>

      {isDragging && (
        <div
          data-playground-trash
          className={`${styles.trashZone} ${overTrash ? styles.trashZoneActive : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </div>
      )}
    </>
  );
};

export default StickerLayer;
