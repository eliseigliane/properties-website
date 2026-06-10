"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export default function PhotoGallery({ photos, address }: { photos: string[]; address: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1));
  }, [photos.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1));
  }, [photos.length]);

  return (
    <>
      {/* Main gallery */}
      <div className="relative bg-navy">
        {/* Primary image */}
        <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
          <Image
            src={photos[current]}
            alt={`${address} - photo ${current + 1}`}
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover"
          />

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/60 to-transparent" />

          {/* Counter */}
          <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
            {current + 1} / {photos.length}
          </div>

          {/* Zoom button */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute bottom-5 left-5 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 hover:bg-black/70 transition-colors"
          >
            <ZoomIn size={14} />
            View all
          </button>

          {/* Nav arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-navy flex items-center justify-center shadow-lg transition-all hover:scale-110"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-navy flex items-center justify-center shadow-lg transition-all hover:scale-110"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide bg-navy/95">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 relative w-20 h-14 rounded-md overflow-hidden transition-all duration-200 ${
                i === current
                  ? "ring-2 ring-gold scale-105"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={photo}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[current]}
              alt={`${address} - photo ${current + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[85vh] rounded-lg"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Lightbox thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-gold w-5" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
