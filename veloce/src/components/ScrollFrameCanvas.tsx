"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollFrameCanvasProps {
  frameCount: number;
  framePath: (index: number) => string;
  scrollHeight?: string;
}

export default function ScrollFrameCanvas({
  frameCount,
  framePath,
  scrollHeight = "600vh",
}: ScrollFrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const loadedCountRef = useRef(0);

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Cover fit
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        x,
        y,
        img.naturalWidth * scale,
        img.naturalHeight * scale
      );
    },
    []
  );

  useEffect(() => {
    // Preload all images
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCountRef.current++;
        if (i === 0) {
          drawFrame(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // Scroll handler
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollProgress * (frameCount - 1))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    // Resize handler
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial draw
    drawFrame(0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [frameCount, framePath, drawFrame]);

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
      <div className="hero-canvas-container">
        <canvas ref={canvasRef} className="w-full h-full" />
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/30" />
      </div>
    </div>
  );
}
