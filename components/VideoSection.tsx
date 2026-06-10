"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";

export default function VideoSection({
  videoUrl,
  thumbnail,
  address,
}: {
  videoUrl: string;
  thumbnail: string;
  address: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden">
      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          className="relative w-full group"
          aria-label="Play listing video"
        >
          <div className="relative aspect-video">
            <Image
              src={thumbnail}
              alt={`${address} listing video`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/50 transition-colors" />

            {/* Play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-18 h-18 rounded-full bg-gold group-hover:bg-gold-light transition-colors flex items-center justify-center shadow-2xl shadow-navy/40">
                <Play size={32} className="text-navy ml-1" fill="currentColor" />
              </div>
              <span className="text-white font-semibold text-lg tracking-wide">
                Watch Property Tour
              </span>
            </div>
          </div>
        </button>
      ) : (
        <div className="relative aspect-video bg-black">
          <iframe
            src={`${videoUrl}?autoplay=1&rel=0`}
            title={`${address} listing video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full absolute inset-0"
          />
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
