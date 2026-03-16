"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./AllProjectsModal.module.css";
import SelectedWork from "./SelectedWork";

const CLOSE_DURATION_MS = 350;

interface AllProjectsModalProps {
  open: boolean;
  onClose: () => void;
  currentProjectId?: string;
}

export const AllProjectsModal: React.FC<AllProjectsModalProps> = ({
  open,
  onClose,
  currentProjectId,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    if (!open) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, CLOSE_DURATION_MS);
  }, [open, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.sheet} ${isClosing ? styles.sheetClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.inner}>
          <div className={styles.header}>
            <button className={styles.closeButton} onClick={handleClose}>
              ×
            </button>
          </div>

          <div className={styles.list}>
            <SelectedWork heading="More Projects" excludeProjectId={currentProjectId} />
          </div>
        </div>
      </div>
    </div>
  );
};

