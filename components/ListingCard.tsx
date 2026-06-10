import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Move } from "lucide-react";
import { photoUrl } from "@/lib/photos";

interface Listing {
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
  photos: string[];
  status: string;
  features: string[];
}

function formatPrice(price: number) {
  if (!price) return "Price TBD";
  return price >= 1000000
    ? `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 2)}M`
    : `$${price.toLocaleString()}`;
}

const statusBadge: Record<string, string> = {
  "Under Contract": "bg-amber-500",
  "Coming Soon": "bg-blue-600",
};

export default function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;
  const hasPhoto = listing.photos.length > 0;
  const photoSrc = hasPhoto ? photoUrl(listing.id, listing.photos[0]) : null;
  const badge = statusBadge[listing.status];

  return (
    <Link
      href={`/listings/${listing.id}`}
      className={`group block bg-white border border-gray-100 shadow-sm card-lift fade-in-up ${staggerClass} overflow-hidden`}
    >
      {/* Photo */}
      <div className="relative h-52 bg-gray-50 overflow-hidden img-zoom">
        {photoSrc ? (
          <Image src={photoSrc} alt={listing.address} fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-300">
              <Move size={28} className="mx-auto mb-2" />
              <p className="text-xs font-medium">Photos coming soon</p>
            </div>
          </div>
        )}
        {/* Red top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#CC0000]" />
        {/* Status badge (only non-Active) */}
        {badge && (
          <div className={`absolute top-3 right-3 ${badge} text-white text-xs font-bold px-2.5 py-1 tracking-wide uppercase`}>
            {listing.status}
          </div>
        )}
        {/* Neighborhood */}
        {listing.neighborhood && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 tracking-wide uppercase">
            {listing.neighborhood}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-2xl font-bold text-black mb-1">{formatPrice(listing.price)}</p>
        <p className="text-black font-medium text-sm leading-snug">{listing.address}</p>
        <p className="text-gray-400 text-xs mt-0.5">{listing.city}, {listing.state} {listing.zip}</p>

        <div className="my-3 border-t border-gray-100" />

        <div className="flex items-center gap-4 text-sm text-gray-600">
          {listing.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bed size={14} className="text-[#CC0000]" />
              <strong className="text-black">{listing.bedrooms}</strong>
              <span className="text-gray-400">bd</span>
            </span>
          )}
          {listing.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath size={14} className="text-[#CC0000]" />
              <strong className="text-black">{listing.bathrooms}</strong>
              <span className="text-gray-400">ba</span>
            </span>
          )}
          {listing.sqft && (
            <span className="flex items-center gap-1.5">
              <Move size={14} className="text-[#CC0000]" />
              <strong className="text-black">{listing.sqft.toLocaleString()}</strong>
              <span className="text-gray-400">sqft</span>
            </span>
          )}
          {!listing.sqft && listing.lotSize && (
            <span className="flex items-center gap-1.5">
              <Move size={14} className="text-[#CC0000]" />
              <strong className="text-black">{listing.lotSize}</strong>
            </span>
          )}
        </div>

        {listing.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {listing.features.slice(0, 3).map((f) => (
              <span key={f} className="text-[10px] px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-500 font-medium uppercase tracking-wide">{f}</span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom hover bar */}
      <div className="h-0.5 w-0 group-hover:w-full bg-[#CC0000] transition-all duration-500 ease-out" />
    </Link>
  );
}
