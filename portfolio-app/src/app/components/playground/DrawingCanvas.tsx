"use client";

import React, { useRef, useEffect, useCallback } from "react";

export interface DrawingCanvasProps {
  active: boolean;
  color: string;
  lineWidth: number;
  eraser: boolean;
  isDark?: boolean;
  onDrawStart?: () => void;
  onEraseAt?: (x: number, y: number) => void;
}

function buildEraserCursor(dark: boolean) {
  const fg = dark ? "%23ffffff" : "%231c1c1c";
  const bg = dark ? "%231c1c1c" : "%23ffffff";
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21' stroke='${bg}' stroke-width='4'/%3E%3Cpath d='M22 21H7' stroke='${bg}' stroke-width='4'/%3E%3Cpath d='m5 11 9 9' stroke='${bg}' stroke-width='4'/%3E%3Cpath d='m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21' stroke='${fg}' stroke-width='2'/%3E%3Cpath d='M22 21H7' stroke='${fg}' stroke-width='2'/%3E%3Cpath d='m5 11 9 9' stroke='${fg}' stroke-width='2'/%3E%3C/svg%3E") 7 21, crosshair`;
}

const ERASER_LIGHT = buildEraserCursor(false);
const ERASER_DARK = buildEraserCursor(true);

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  active,
  color,
  lineWidth,
  eraser,
  isDark,
  onDrawStart,
  onEraseAt,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const dpr = window.devicePixelRatio || 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    canvas.width = vw * dpr;
    canvas.height = vh * dpr;
    canvas.style.width = `${vw}px`;
    canvas.style.height = `${vh}px`;

    ctx.scale(dpr, dpr);
    ctx.putImageData(imageData, 0, 0);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX, y: clientY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!active) return;
    isDrawing.current = true;
    const pos = getPos(e);
    lastPos.current = pos;
    onDrawStart?.();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.globalCompositeOperation = eraser ? "destination-out" : "source-over";
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    if (eraser) onEraseAt?.(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!active || !isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !lastPos.current) return;

    const pos = getPos(e);

    ctx.save();
    ctx.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.restore();

    if (eraser) onEraseAt?.(pos.x, pos.y);
    lastPos.current = pos;
  };

  const endDraw = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      data-playground-canvas
      onMouseDown={startDraw}
      onMouseMove={draw}
      onMouseUp={endDraw}
      onMouseLeave={endDraw}
      onTouchStart={startDraw}
      onTouchMove={draw}
      onTouchEnd={endDraw}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10000,
        pointerEvents: active ? "auto" : "none",
        cursor: active ? (eraser ? (isDark ? ERASER_DARK : ERASER_LIGHT) : "crosshair") : "default",
        touchAction: active ? "none" : "auto",
      }}
    />
  );
};

export default DrawingCanvas;
