"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { PropertyScene } from "@/data/property";

type Props = {
  id: string;
  scenes: PropertyScene[];
  desktopHeight: number;
  mobileHeight: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/**
 * A real scroll-driven canvas timeline. The sample media consists of stills;
 * canvas draws smoothly interpolated cinematic pans and dissolves between them.
 * Replace the scene renderer with decoded video frames for a true walkthrough.
 */
export function ScrollSequence({ id, scenes, desktopHeight, mobileHeight }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!section || !canvas || !ctx) return;

    let alive = true;
    let visible = false;
    let ready = false;
    let raf = 0;
    let width = 0;
    let height = 0;
    let target = 0;
    let current = 0;
    let lastTime = 0;
    let lastState = -1;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const images = scenes.map((scene) => {
      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => { ready = true; };
      image.src = scene.image;
      return image;
    });
    ready = images.some((image) => image.complete && image.naturalWidth > 0);

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const calculate = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      target = clamp(-rect.top / distance);
    };

    const paintCover = (image: HTMLImageElement, opacity: number, pan: number, index: number) => {
      if (!image.complete || !image.naturalWidth || opacity <= 0) return;
      const iw = image.naturalWidth;
      const ih = image.naturalHeight;
      const zoom = 1.035 + pan * 0.075;
      const scale = Math.max(width / iw, height / ih) * zoom;
      const drawW = iw * scale;
      const drawH = ih * scale;
      const direction = index % 2 === 0 ? -1 : 1;
      const shiftX = direction * (pan - 0.5) * Math.min(width * 0.045, 58);
      const shiftY = (0.5 - pan) * Math.min(height * 0.045, 36);
      ctx.globalAlpha = opacity;
      ctx.drawImage(image, (width - drawW) / 2 + shiftX, (height - drawH) / 2 + shiftY, drawW, drawH);
      ctx.globalAlpha = 1;
    };

    const render = () => {
      if (!width || !height || !ready) return;
      const position = current * (scenes.length - 1);
      const leftIndex = Math.min(scenes.length - 1, Math.floor(position));
      const rightIndex = Math.min(scenes.length - 1, leftIndex + 1);
      const blend = clamp(position - leftIndex);
      const eased = blend * blend * (3 - 2 * blend);

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#0d0d0f";
      ctx.fillRect(0, 0, width, height);

      const left = images[leftIndex];
      const right = images[rightIndex];
      if (left.complete && left.naturalWidth) {
        paintCover(left, 1, blend, leftIndex);
        if (rightIndex !== leftIndex) paintCover(right, eased, blend, rightIndex);
      } else if (right.complete && right.naturalWidth) {
        paintCover(right, 1, blend, rightIndex);
      } else {
        const firstReady = images.find((image) => image.complete && image.naturalWidth);
        if (firstReady) paintCover(firstReady, 1, 0.5, 0);
      }
    };

    const tick = (now: number) => {
      if (!alive) return;
      const elapsed = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;
      if (visible) {
        calculate();
        const follow = media.matches ? 1 : 1 - Math.exp(-11 * elapsed);
        current += (target - current) * follow;
        if (Math.abs(target - current) < 0.0005) current = target;
        render();
        if (Math.abs(current - lastState) > 0.004 || lastState < 0) {
          setProgress(current);
          lastState = current;
        }
      }
      raf = window.requestAnimationFrame(tick);
    };

    const intersection = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; if (visible) calculate(); },
      { rootMargin: "25% 0px 25% 0px" },
    );
    intersection.observe(section);
    resize();
    calculate();
    raf = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      alive = false;
      window.cancelAnimationFrame(raf);
      intersection.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [scenes]);

  const sectionStyle = {
    "--section-height": `${desktopHeight}vh`,
    "--section-height-mobile": `${mobileHeight}vh`,
  } as CSSProperties;

  return (
    <section ref={sectionRef} id={id} className="scroll-sequence" style={sectionStyle} aria-label="Recorrido visual de la vivienda">
      <div className="sequence-sticky" style={{ backgroundImage: `url('${scenes[0].image}')` }}>
        <canvas className="sequence-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="sequence-vignette" aria-hidden="true" />
        {scenes.map((scene, index) => {
          const distance = Math.abs(progress * (scenes.length - 1) - index);
          const opacity = clamp((0.5 - distance) * 4);
          const style = {
            opacity,
            transform: `translate3d(0, ${Math.round((1 - opacity) * 24)}px, 0)`,
            visibility: opacity < 0.01 ? "hidden" : "visible",
          } as CSSProperties;
          return (
            <div key={`${id}-${index}`} className={`sequence-caption ${scene.hero ? "sequence-hero" : `sequence-${scene.align || "left"}`}`} style={style}>
              <p className="eyebrow">{scene.eyebrow}</p>
              {scene.hero ? (
                <h1>{scene.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h1>
              ) : (
                <h2>{scene.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2>
              )}
              <p className="sequence-description">{scene.description}</p>
              {scene.hero && <div className="scroll-hint" aria-hidden="true"><span />DESLIZÁ PARA RECORRER LA CASA</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
