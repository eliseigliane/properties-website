"use client";

import Image from "next/image";
import Link from "next/link";
import { photoUrl } from "@/lib/photos";
import { Bed, Bath, Move, Clock, Calendar, Copy, Check, MapPin } from "lucide-react";
import { useState } from "react";

interface OpenHouse {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number | null;
  lotSize: string | null;
  description: string;
  features: string[];
  photos: string[];
  mlsNumber: string;
  openHouseDate: string;
  openHouseTime: string;
  listingAgent?: string;
  agent: { name: string; phone: string };
}

function formatPrice(price: number) {
  return price >= 1000000
    ? `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 2)}M`
    : `$${price.toLocaleString()}`;
}

function StatsRow({ house }: { house: OpenHouse }) {
  const hasStats = house.bedrooms > 0 || house.bathrooms > 0 || !!house.sqft || !!house.lotSize;
  if (!hasStats) return null;
  return (
    <div className="flex items-center gap-5 text-sm text-gray-600 mb-4">
      {house.bedrooms > 0 && (
        <span className="flex items-center gap-1.5">
          <Bed size={15} className="text-[#CC0000]" />
          <strong className="text-black">{house.bedrooms}</strong>
          <span className="text-gray-400">bd</span>
        </span>
      )}
      {house.bathrooms > 0 && (
        <span className="flex items-center gap-1.5">
          <Bath size={15} className="text-[#CC0000]" />
          <strong className="text-black">{house.bathrooms}</strong>
          <span className="text-gray-400">ba</span>
        </span>
      )}
      {house.sqft && (
        <span className="flex items-center gap-1.5">
          <Move size={15} className="text-[#CC0000]" />
          <strong className="text-black">{house.sqft.toLocaleString()}</strong>
          <span className="text-gray-400">sqft</span>
        </span>
      )}
      {house.lotSize && (
        <span className="flex items-center gap-1.5">
          <Move size={15} className="text-[#CC0000]" />
          <strong className="text-black">{house.lotSize}</strong>
        </span>
      )}
    </div>
  );
}

export default function OpenHouseCard({ house, index }: { house: OpenHouse; index: number }) {
  const [copied, setCopied] = useState(false);
  const fullAddress = `${house.address}${house.city ? ", " + house.city : ""}${house.state ? ", " + house.state : ""} ${house.zip}`.trim();
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  }

  const hasPhoto = house.photos.length > 0;
  const photoSrc = hasPhoto ? photoUrl(house.id, house.photos[0]) : null;

  return (
    <div className={`group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 fade-in-up ${staggerClass} overflow-hidden`}>
      {/* Clickable photo area */}
      <Link href={`/listings/${house.id}`} className="block">
      <div className="relative h-64 bg-gray-100 overflow-hidden img-zoom">
        {photoSrc ? (
          <Image src={photoSrc} alt={house.address} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-2 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Move size={24} className="text-gray-300" />
              </div>
              <p className="text-xs font-medium">Photos coming soon</p>
            </div>
          </div>
        )}
        <div className="absolute top-0 left-0 bg-[#CC0000] text-white px-4 py-2">
          <p className="text-xs font-bold tracking-widest uppercase">Open House</p>
        </div>
        {house.price > 0 && (
          <div className="absolute bottom-0 right-0 bg-black/80 text-white px-4 py-2">
            <p className="text-lg font-bold">{formatPrice(house.price)}</p>
          </div>
        )}
      </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Date / time */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-[#CC0000]">
            <Calendar size={15} />
            <span className="text-sm font-semibold">{house.openHouseDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={14} />
            <span className="text-sm">{house.openHouseTime}</span>
          </div>
        </div>

        {/* Address row */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link href={`/listings/${house.id}`} className="hover:text-[#CC0000] transition-colors">
              <p className="text-xl font-bold text-black leading-tight">{house.address}</p>
              </Link>
              {(house.city || house.zip) && (
                <p className="text-gray-500 text-sm mt-0.5">
                  {house.city}{house.city && house.state ? ", " : ""}{house.state} {house.zip}
                </p>
              )}
              {house.neighborhood && (
                <p className="text-xs text-[#CC0000] font-semibold tracking-wide uppercase mt-1">{house.neighborhood}</p>
              )}
            </div>
            <button
              onClick={copyAddress}
              title="Copy address"
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 border text-xs font-semibold transition-all duration-200 ${
                copied
                  ? "border-green-500 text-green-600 bg-green-50"
                  : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <StatsRow house={house} />

        {house.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4">{house.description}</p>
        )}

        {house.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {house.features.map((f) => (
              <span key={f} className="text-xs px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 font-medium">{f}</span>
            ))}
          </div>
        )}

        {/* Agent info */}
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3 mb-3">
          <div>
            <span className="font-semibold text-gray-600">{house.agent.name}</span>
            {house.listingAgent && house.listingAgent !== house.agent.name && (
              <span className="ml-1 text-gray-400">· Listed by {house.listingAgent}</span>
            )}
          </div>
          <span>{house.agent.phone}</span>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white text-sm font-semibold tracking-wide hover:bg-[#CC0000] transition-colors duration-200"
        >
          <MapPin size={15} />
          Get Directions
        </a>
      </div>
    </div>
  );
}
