import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Move, MapPin, ChevronLeft, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import PhotoLightbox from "@/components/PhotoLightbox";
import { photoUrl } from "@/lib/photos";
import listingsData from "@/data/active-listings.json";

export async function generateStaticParams() {
  return listingsData.map((l) => ({ id: l.id }));
}

function formatPrice(price: number) {
  if (!price) return "Price TBD";
  return price >= 1000000
    ? `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 2)}M`
    : `$${price.toLocaleString()}`;
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = listingsData.find((l) => l.id === id);
  if (!listing) notFound();

  const allPhotos: string[] = listing.photos ?? [];
  const floorPlans = allPhotos.filter((p) => /floor\s*plan|\.PNG$/i.test(p));
  const photos = allPhotos.filter((p) => !/floor\s*plan/i.test(p));
  const videoUrl: string = (listing as { videoUrl?: string }).videoUrl ?? "";
  const features: string[] = listing.features ?? [];
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`)}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero photo */}
      <div className="pt-20">
        {photos.length > 0 ? (
          <div className="relative h-[55vh] md:h-[65vh] w-full bg-gray-100">
            <Image
              src={photoUrl(listing.id, photos[0])}
              alt={listing.address}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Price overlay */}
            <div className="absolute bottom-6 left-6 md:left-10">
              <p className="text-white text-4xl md:text-5xl font-bold">{formatPrice(listing.price)}</p>
              <p className="text-white/80 text-lg mt-1">{listing.address}, {listing.city}, {listing.state} {listing.zip}</p>
            </div>
            {/* Red bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#CC0000]" />
          </div>
        ) : (
          <div className="h-48 bg-black flex items-end px-10 pb-6">
            <div>
              <p className="text-white text-4xl font-bold">{formatPrice(listing.price)}</p>
              <p className="text-white/70 text-lg">{listing.address}, {listing.city}, {listing.state} {listing.zip}</p>
            </div>
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
        <Link href="/#listings" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-black transition-colors font-medium">
          <ChevronLeft size={16} />
          All Listings
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Left – details */}
          <div className="lg:col-span-2 space-y-10">

            {/* Stats */}
            <div>
              {listing.neighborhood && (
                <p className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase mb-2">{listing.neighborhood}</p>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">{listing.address}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 text-base">
                {listing.bedrooms > 0 && (
                  <span className="flex items-center gap-2">
                    <Bed size={18} className="text-[#CC0000]" />
                    <strong className="text-black text-xl">{listing.bedrooms}</strong>
                    <span className="text-gray-400">Bedrooms</span>
                  </span>
                )}
                {listing.bathrooms > 0 && (
                  <span className="flex items-center gap-2">
                    <Bath size={18} className="text-[#CC0000]" />
                    <strong className="text-black text-xl">{listing.bathrooms}</strong>
                    <span className="text-gray-400">Bathrooms</span>
                  </span>
                )}
                {listing.sqft && (
                  <span className="flex items-center gap-2">
                    <Move size={18} className="text-[#CC0000]" />
                    <strong className="text-black text-xl">{listing.sqft.toLocaleString()}</strong>
                    <span className="text-gray-400">Sqft</span>
                  </span>
                )}
                {listing.lotSize && (
                  <span className="flex items-center gap-2">
                    <Move size={18} className="text-[#CC0000]" />
                    <strong className="text-black text-xl">{listing.lotSize}</strong>
                    <span className="text-gray-400">Lot</span>
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div>
                <h2 className="text-xl font-bold text-black mb-3 pb-3 border-b-2 border-black">About This Home</h2>
                <p className="text-gray-600 leading-relaxed text-base">{listing.description}</p>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-black mb-4 pb-3 border-b-2 border-black">Features & Highlights</h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((f) => (
                    <span key={f} className="px-4 py-2 border border-gray-200 text-sm font-semibold text-gray-700 bg-gray-50">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {videoUrl && (
              <div>
                <h2 className="text-xl font-bold text-black mb-4 pb-3 border-b-2 border-black">Property Video Tour</h2>
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={videoUrl}
                    title="Property video tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Photo gallery */}
            {photos.length > 1 && (
              <div>
                <h2 className="text-xl font-bold text-black mb-4 pb-3 border-b-2 border-black">
                  All Photos <span className="text-gray-400 font-normal text-base">({photos.length})</span>
                </h2>
                <PhotoLightbox photos={photos} listingId={listing.id} address={listing.address} />
              </div>
            )}

            {/* Floor Plans */}
            {floorPlans.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-black mb-4 pb-3 border-b-2 border-black">Floor Plans</h2>
                <PhotoLightbox photos={floorPlans} listingId={listing.id} address={listing.address} />
              </div>
            )}
          </div>

          {/* Right – sidebar */}
          <div className="space-y-4">
            <div className="bg-black p-6 sticky top-24">
              <p className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase mb-1">List Price</p>
              <p className="text-white text-4xl font-bold mb-5">{formatPrice(listing.price)}</p>
              <div className="border-t border-white/10 pt-5 space-y-3">
                <a
                  href="tel:+14804594998"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#CC0000] text-white font-bold text-sm tracking-wide hover:bg-[#aa0000] transition-colors"
                >
                  <Phone size={16} />
                  (480) 459-4998
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-white/20 text-white font-semibold text-sm hover:border-white/50 transition-colors"
                >
                  <MapPin size={16} />
                  Get Directions
                </a>
                <Link
                  href="/#contact"
                  className="flex items-center justify-center w-full py-3.5 border border-white/20 text-white font-semibold text-sm hover:border-white/50 transition-colors"
                >
                  Request a Showing
                </Link>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10">
                {(listing as any).listingAgent && (
                  <div className="mb-3">
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">Listing Agent</p>
                    <p className="text-white font-bold text-sm">{(listing as any).listingAgent}</p>
                    {(listing as any).listingAgentPhone && (
                      <a href={`tel:+1${(listing as any).listingAgentPhone.replace(/\D/g,'')}`} className="text-[#CC0000] text-xs hover:underline">
                        {(listing as any).listingAgentPhone}
                      </a>
                    )}
                  </div>
                )}
                <p className="text-white font-bold text-sm">The Home Selling Team</p>
                <p className="text-white/50 text-xs mt-0.5">Keller Williams Integrity First Realty</p>
                {listing.mlsNumber && (
                  <p className="text-white/30 text-xs mt-2">MLS# {listing.mlsNumber}</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-10 px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold tracking-widest uppercase text-sm">The Home Selling Team</p>
            <p className="text-[#CC0000] text-[10px] font-semibold tracking-[0.25em] uppercase mt-0.5">Keller Williams Integrity First Realty</p>
          </div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} The Home Selling Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
