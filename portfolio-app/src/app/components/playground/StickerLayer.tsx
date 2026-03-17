"use client";

import React, { useRef, useCallback } from "react";
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
  onDragChange?: (dragging: boolean, overTrash: boolean) => void;
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
  onDragChange,
}) => {
  const dragging = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const justDragged = useRef(false);

  const handleLayerClick = (e: React.MouseEvent) => {
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
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
      onDragChange?.(true, false);

      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        onUpdateSticker(
          dragging.current.id,
          ev.clientX - dragging.current.offsetX,
          ev.clientY - dragging.current.offsetY
        );
        onDragChange?.(true, hitTestTrash(ev.clientX, ev.clientY));
      };

      const onUp = (ev: MouseEvent) => {
        if (dragging.current && hitTestTrash(ev.clientX, ev.clientY)) {
          onDeleteSticker(dragging.current.id);
        }
        dragging.current = null;
        justDragged.current = true;
        onDragChange?.(false, false);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [onUpdateSticker, onDeleteSticker, onDragChange]
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
      onDragChange?.(true, false);

      const onMove = (ev: TouchEvent) => {
        if (!dragging.current) return;
        ev.preventDefault();
        const t = ev.touches[0];
        onUpdateSticker(
          dragging.current.id,
          t.clientX - dragging.current.offsetX,
          t.clientY - dragging.current.offsetY
        );
        onDragChange?.(true, hitTestTrash(t.clientX, t.clientY));
      };

      const onEnd = (ev: TouchEvent) => {
        const t = ev.changedTouches[0];
        if (dragging.current && t && hitTestTrash(t.clientX, t.clientY)) {
          onDeleteSticker(dragging.current.id);
        }
        dragging.current = null;
        justDragged.current = true;
        onDragChange?.(false, false);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
      };

      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onEnd);
    },
    [onUpdateSticker, onDeleteSticker, onDragChange]
  );

  return (
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
  );
};

export default StickerLayer;
