"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { property } from "@/data/property";

export function Gallery() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slides = property.gallery;
  const goTo = (next: number) => setIndex((next + slides.length) % slides.length);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); goTo(index - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); goTo(index + 1); }
  };
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchStart.current = event.touches[0].clientX; };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const difference = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(difference) > 40) goTo(index + (difference < 0 ? 1 : -1));
    touchStart.current = null;
  };

  return (
    <section id="galeria" className="gallery-section" aria-label="Galería fotográfica">
      <div className="section-heading section-heading-dark">
        <p className="eyebrow">LA VIVIENDA EN IMÁGENES</p>
        <h2>Galería</h2>
      </div>
      <div className="gallery-shell" onKeyDown={onKeyDown}>
        <button className="gallery-arrow" type="button" onClick={() => goTo(index - 1)} aria-label="Fotografía anterior"><ArrowLeft size={21} strokeWidth={1.3}/></button>
        <div className="gallery-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} role="region" aria-roledescription="carrusel" aria-label="Fotografías de ejemplo" tabIndex={0}>
          <div className="gallery-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((slide, i) => (
              <figure className="gallery-slide" key={`${slide.image}-${i}`} aria-hidden={index !== i}>
                <div className="gallery-image">
                  <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 768px) 100vw, 86vw" quality={85} />
                  <figcaption>{slide.title}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
        <button className="gallery-arrow" type="button" onClick={() => goTo(index + 1)} aria-label="Siguiente fotografía"><ArrowRight size={21} strokeWidth={1.3}/></button>
      </div>
      <div className="gallery-dots" aria-label="Elegir fotografía">
        {slides.map((slide, i) => <button key={`${slide.image}-${i}`} type="button" aria-label={`Ir a la foto ${i + 1}`} aria-current={index === i ? "true" : undefined} className={index === i ? "active" : ""} onClick={() => goTo(i)} />)}
      </div>
      <p className="gallery-counter" aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
    </section>
  );
}
