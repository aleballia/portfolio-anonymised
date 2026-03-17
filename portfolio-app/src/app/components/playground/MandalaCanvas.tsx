"use client";

import React, { useMemo, useCallback } from "react";
import generateMandala, { MandalaRegion } from "./generateMandala";
import styles from "./MandalaCanvas.module.css";

interface MandalaCanvasProps {
  seed: number;
  regionFills: Record<string, string>;
  onFillRegion: (regionId: string) => void;
  fillActive: boolean;
}

const MandalaCanvas: React.FC<MandalaCanvasProps> = ({
  seed,
  regionFills,
  onFillRegion,
  fillActive,
}) => {
  const regions: MandalaRegion[] = useMemo(() => generateMandala(seed), [seed]);

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      if (!fillActive) return;
      const target = e.target as SVGElement;
      const regionId = target.getAttribute("data-region-id");
      if (!regionId || regionFills[regionId]) return;
      onFillRegion(regionId);
    },
    [fillActive, regionFills, onFillRegion]
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      if (!fillActive) return;
      const target = e.target as SVGElement;
      const regionId = target.getAttribute("data-region-id");
      if (!regionId) return;
      target.style.cursor = regionFills[regionId] ? "default" : "pointer";
    },
    [fillActive, regionFills]
  );

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.svg}
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        data-mandala-svg
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        style={{ pointerEvents: fillActive ? "auto" : "none" }}
      >
        {regions.map((region) => (
          <path
            key={region.id}
            d={region.d}
            data-region-id={region.id}
            className={`${styles.region} ${regionFills[region.id] ? styles.regionFilled : ""}`}
            style={regionFills[region.id] ? { fill: regionFills[region.id] } : undefined}
          />
        ))}
      </svg>
    </div>
  );
};

export default MandalaCanvas;
