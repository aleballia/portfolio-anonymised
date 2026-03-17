"use client";

import React, { useState } from "react";
import styles from "./StickerPicker.module.css";

const EMOJI_SET = [
  "⭐", "❤️", "🔥", "👍", "🎉", "✨", "💯", "🚀",
  "💜", "🌈", "🦄", "👀", "💡", "🎨", "🌟", "😍",
  "👏", "💪", "🙌", "🤩", "🫶", "✅", "💎", "🏆",
];

const CUSTOM_STICKERS = [
  { src: "/stickers/star.svg", label: "Star" },
  { src: "/stickers/heart.svg", label: "Heart" },
  { src: "/stickers/lightning.svg", label: "Lightning" },
  { src: "/stickers/sparkle.svg", label: "Sparkle" },
];

interface StickerPickerProps {
  onSelect: (content: string, type: "emoji" | "custom") => void;
  selectedSticker: string | null;
}

const StickerPicker: React.FC<StickerPickerProps> = ({ onSelect, selectedSticker }) => {
  const [tab, setTab] = useState<"emoji" | "custom">("emoji");

  return (
    <div className={styles.picker}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "emoji" ? styles.tabActive : ""}`}
          onClick={() => setTab("emoji")}
        >
          Emoji
        </button>
        <button
          className={`${styles.tab} ${tab === "custom" ? styles.tabActive : ""}`}
          onClick={() => setTab("custom")}
        >
          Stickers
        </button>
      </div>
      <div className={styles.grid}>
        {tab === "emoji"
          ? EMOJI_SET.map((emoji) => (
              <button
                key={emoji}
                className={`${styles.item} ${selectedSticker === emoji ? styles.itemSelected : ""}`}
                onClick={() => onSelect(emoji, "emoji")}
              >
                {emoji}
              </button>
            ))
          : CUSTOM_STICKERS.map((s) => (
              <button
                key={s.src}
                className={`${styles.item} ${selectedSticker === s.src ? styles.itemSelected : ""}`}
                onClick={() => onSelect(s.src, "custom")}
                title={s.label}
              >
                <img src={s.src} alt={s.label} className={styles.customThumb} />
              </button>
            ))}
      </div>
    </div>
  );
};

export default StickerPicker;
