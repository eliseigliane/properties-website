import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Move } from "lucide-react";

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  status: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  photos: string[];
  daysOnMarket: number;
}

const statusColors: Record<string, string> = {
  "For Sale": "bg-emerald-500",
  Pending: "bg-amber-500",
  Sold: "bg-slate-500",
};

export default function PropertyCard({
  property,
  index,
}: {
  property: Property;
  index: number;
}) {
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

  return (
    <Link
      href={`/properties/${property.id}`}
      className={`group block bg-white rounded-xl overflow-hidden card-lift shadow-sm shadow-navy/8 fade-in-up ${staggerClass}`}
    >
      {/* Image */}
      <div className="relative h-64 img-zoom overflow-hidden">
        <Image
          src={property.photos[0]}
          alt={property.address}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`${statusColors[property.status] ?? "bg-slate-500"} text-white text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase`}
          >
            {property.status}
          </span>
        </div>
        {/* Photo count */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
          {property.photos.length} photos
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <p className="text-2xl font-bold text-navy mb-1">
          ${property.price.toLocaleString()}
        </p>

        {/* Address */}
        <p className="text-navy font-medium text-sm leading-snug">
          {property.address}
        </p>
        <p className="text-navy/50 text-sm mt-0.5">
          {property.city}, {property.state}
        </p>

        {/* Divider */}
        <div className="my-4 border-t border-navy/8" />

        {/* Stats */}
        <div className="flex items-center gap-5 text-navy/70 text-sm">
          <span className="flex items-center gap-1.5">
            <Bed size={15} className="text-gold" />
            <span className="font-medium">{property.bedrooms}</span>
            <span className="text-navy/40">bd</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={15} className="text-gold" />
            <span className="font-medium">{property.bathrooms}</span>
            <span className="text-navy/40">ba</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Move size={15} className="text-gold" />
            <span className="font-medium">{property.sqft.toLocaleString()}</span>
            <span className="text-navy/40">sqft</span>
          </span>
        </div>

        {/* Type & days on market */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-navy/40 font-medium uppercase tracking-wide">
            {property.type}
          </span>
          {property.status !== "Sold" && property.daysOnMarket > 0 && (
            <span className="text-xs text-navy/40">
              {property.daysOnMarket}d on market
            </span>
          )}
        </div>
      </div>

      {/* Bottom bar on hover */}
      <div className="h-0.5 w-0 group-hover:w-full bg-gold transition-all duration-500 ease-out" />
    </Link>
  );
}
