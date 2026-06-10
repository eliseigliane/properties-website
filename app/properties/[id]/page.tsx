import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Bed,
  Bath,
  Move,
  Calendar,
  Car,
  MapPin,
  Check,
  ChevronLeft,
  Droplets,
  Trees,
  Building2,
  Hash,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PhotoGallery from "@/components/PhotoGallery";
import VideoSection from "@/components/VideoSection";
import ContactForm from "@/components/ContactForm";
import PropertyCard from "@/components/PropertyCard";
import propertiesData from "@/data/properties.json";

const statusColors: Record<string, string> = {
  "For Sale": "bg-emerald-500/15 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-500/15 text-amber-700 border-amber-200",
  Sold: "bg-slate-500/15 text-slate-600 border-slate-200",
};

export async function generateStaticParams() {
  return propertiesData.map((p) => ({ id: p.id }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = propertiesData.find((p) => p.id === id);

  if (!property) notFound();

  const similar = propertiesData
    .filter((p) => p.id !== id && p.status !== "Sold")
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Photo gallery — full bleed, no top padding (navbar overlaps) */}
      <div className="pt-20">
        <PhotoGallery photos={property.photos} address={property.address} />
      </div>

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
        <Link
          href="/#properties"
          className="inline-flex items-center gap-1.5 text-sm text-navy/60 hover:text-navy transition-colors font-medium"
        >
          <ChevronLeft size={16} />
          All Properties
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ── Left / Main content ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[property.status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
                >
                  {property.status}
                </span>
                <span className="text-xs text-navy/40 font-medium uppercase tracking-wide">
                  {property.type}
                </span>
                {property.mlsNumber && (
                  <span className="text-xs text-navy/30">
                    MLS# {property.mlsNumber}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-1">
                {property.address}
              </h1>
              <div className="flex items-center gap-1.5 text-navy/50 text-base mb-4">
                <MapPin size={14} />
                <span>
                  {property.city}, {property.state} {property.zip}
                </span>
              </div>

              <p className="text-4xl md:text-5xl font-bold text-navy">
                ${property.price.toLocaleString()}
              </p>
              {property.status === "Sold" && (
                <p className="text-sm text-slate-500 mt-1">Sold Price</p>
              )}
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                {
                  icon: <Bed size={20} className="text-gold" />,
                  value: property.bedrooms,
                  label: "Bedrooms",
                },
                {
                  icon: <Bath size={20} className="text-gold" />,
                  value: property.bathrooms,
                  label: "Bathrooms",
                },
                {
                  icon: <Move size={20} className="text-gold" />,
                  value: `${property.sqft.toLocaleString()}`,
                  label: "Sq Ft",
                },
                {
                  icon: <Car size={20} className="text-gold" />,
                  value: property.garage,
                  label: "Garage",
                },
                {
                  icon: <Calendar size={20} className="text-gold" />,
                  value: property.yearBuilt,
                  label: "Year Built",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 flex flex-col items-center text-center border border-navy/6"
                >
                  {stat.icon}
                  <span className="text-xl font-bold text-navy mt-2">
                    {stat.value}
                  </span>
                  <span className="text-xs text-navy/45 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-navy/6">
              <h2 className="text-xl font-bold text-navy mb-5">
                About This Property
              </h2>
              <div className="space-y-4">
                {property.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-navy/65 leading-relaxed text-base">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 md:p-8 border border-navy/6">
                <h2 className="text-xl font-bold text-navy mb-5">
                  Features &amp; Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-navy/70 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-gold-muted" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-navy/6">
              <h2 className="text-xl font-bold text-navy mb-5">
                Property Tour
              </h2>
              <VideoSection
                videoUrl={property.videoUrl}
                thumbnail={property.photos[1] ?? property.photos[0]}
                address={property.address}
              />
            </div>

            {/* Property details table */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-navy/6">
              <h2 className="text-xl font-bold text-navy mb-5">
                Property Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {[
                  {
                    icon: <DollarSign size={15} className="text-gold" />,
                    label: "Price",
                    value: `$${property.price.toLocaleString()}`,
                  },
                  {
                    icon: <Building2 size={15} className="text-gold" />,
                    label: "Property Type",
                    value: property.type,
                  },
                  {
                    icon: <Bed size={15} className="text-gold" />,
                    label: "Bedrooms",
                    value: property.bedrooms,
                  },
                  {
                    icon: <Bath size={15} className="text-gold" />,
                    label: "Bathrooms",
                    value: property.bathrooms,
                  },
                  {
                    icon: <Move size={15} className="text-gold" />,
                    label: "Living Area",
                    value: `${property.sqft.toLocaleString()} sqft`,
                  },
                  {
                    icon: <Trees size={15} className="text-gold" />,
                    label: "Lot Size",
                    value:
                      property.lotSize > 0
                        ? `${property.lotSize} acres`
                        : "N/A",
                  },
                  {
                    icon: <Car size={15} className="text-gold" />,
                    label: "Garage",
                    value: `${property.garage}-car`,
                  },
                  {
                    icon: <Droplets size={15} className="text-gold" />,
                    label: "Pool",
                    value: property.pool ? "Yes" : "No",
                  },
                  {
                    icon: <Calendar size={15} className="text-gold" />,
                    label: "Year Built",
                    value: property.yearBuilt,
                  },
                  {
                    icon: <Hash size={15} className="text-gold" />,
                    label: "MLS Number",
                    value: property.mlsNumber ?? "—",
                  },
                  ...(property.hoa > 0
                    ? [
                        {
                          icon: (
                            <TrendingUp size={15} className="text-gold" />
                          ),
                          label: "HOA / Month",
                          value: `$${property.hoa.toLocaleString()}`,
                        },
                      ]
                    : []),
                  ...(property.taxes > 0
                    ? [
                        {
                          icon: (
                            <DollarSign size={15} className="text-gold" />
                          ),
                          label: "Est. Taxes / Year",
                          value: `$${property.taxes.toLocaleString()}`,
                        },
                      ]
                    : []),
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3 border-b border-navy/6 last:border-0"
                  >
                    <div className="flex items-center gap-2 text-navy/50 text-sm">
                      {row.icon}
                      {row.label}
                    </div>
                    <span className="text-sm font-medium text-navy">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right / Sidebar ── */}
          <div className="space-y-6">
            {/* Sticky wrapper */}
            <div className="sticky top-24">
              <ContactForm
                agent={property.agent}
                propertyAddress={property.address}
              />

              {/* Quick facts */}
              <div className="mt-6 bg-white rounded-xl p-5 border border-navy/6">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-4">
                  At a Glance
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Status", value: property.status },
                    { label: "Type", value: property.type },
                    {
                      label: "Price / Sqft",
                      value: `$${Math.round(property.price / property.sqft).toLocaleString()}`,
                    },
                    ...(property.daysOnMarket > 0 && property.status !== "Sold"
                      ? [
                          {
                            label: "Days on Market",
                            value: `${property.daysOnMarket} days`,
                          },
                        ]
                      : []),
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-navy/50">{row.label}</span>
                      <span className="font-medium text-navy">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-navy">
                Similar Properties
              </h2>
              <Link
                href="/#properties"
                className="text-sm text-gold hover:text-gold-muted font-medium flex items-center gap-1"
              >
                View all
                <ChevronLeft size={14} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-navy mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-sm bg-gold flex items-center justify-center">
                <span className="text-navy font-bold text-xs">PG</span>
              </div>
              <span className="text-white font-semibold tracking-wide">
                Property<span className="text-gold">Group</span>
              </span>
            </div>
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} Property Group. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
