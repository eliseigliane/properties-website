import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import OpenHouseCard from "@/components/OpenHouseCard";
import ListingCard from "@/components/ListingCard";
import openHousesData from "@/data/open-houses.json";
import listingsData from "@/data/active-listings.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="bg-black pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-[#CC0000] text-xs font-bold tracking-[0.35em] uppercase mb-4">
              Gilbert · Queen Creek · San Tan Valley · Chandler · Mesa
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
              What&apos;s on<br />
              <span className="text-[#CC0000]">the Market?</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-10">
              The Home Selling Team specializes in the East Valley. Browse our open houses this weekend and all active listings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#open-houses"
                className="px-8 py-4 bg-[#CC0000] text-white font-semibold tracking-wide hover:bg-[#aa0000] transition-colors text-sm flex items-center justify-center gap-2"
              >
                View Open Houses
                <ArrowRight size={15} />
              </Link>
              <Link
                href="#listings"
                className="px-8 py-4 border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/40 transition-all text-sm flex items-center justify-center gap-2"
              >
                Active Listings
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom accent */}
        <div className="h-1 bg-[#CC0000]" />
      </section>

      {/* ─── Open Houses ─── */}
      <section id="open-houses" className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12 pb-6 border-b-2 border-black">
            <div>
              <p className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                This Weekend
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Open Houses
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-gray-400 text-sm">Tap an address to copy it</p>
              <p className="text-gray-400 text-sm">for easy navigation</p>
            </div>
          </div>

          {openHousesData.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-gray-200">
              <p className="text-gray-400 text-lg font-medium">Open houses will be posted soon.</p>
              <p className="text-gray-300 text-sm mt-2">Check back this week!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {openHousesData.map((house, i) => (
                // @ts-expect-error json shape matches
                <OpenHouseCard key={house.id} house={house} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="h-1 bg-[#CC0000]" />

      {/* ─── Active Listings ─── */}
      <section id="listings" className="py-20 px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12 pb-6 border-b-2 border-black">
            <div>
              <p className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                On The Market Now
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Active Listings
              </h2>
            </div>
            <span className="hidden md:block text-gray-400 text-sm font-medium">
              {listingsData.length} properties
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listingsData.map((listing, i) => (
              // @ts-expect-error json shape matches
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="bg-black py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#CC0000] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Buy or Sell?
            </h2>
            <p className="text-white/50 text-lg">
              The Home Selling Team is here to help you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <a
              href="tel:+14804594998"
              className="flex items-center gap-4 p-6 border border-white/10 hover:border-[#CC0000] transition-colors group"
            >
              <div className="w-12 h-12 bg-[#CC0000] flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wide mb-0.5">Call Us</p>
                <p className="text-white font-bold text-lg">(480) 459-4998</p>
              </div>
            </a>
            <a
              href="mailto:info@thehomesellingteamaz.com"
              className="flex items-center gap-4 p-6 border border-white/10 hover:border-[#CC0000] transition-colors group"
            >
              <div className="w-12 h-12 bg-[#CC0000] flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wide mb-0.5">Email Us</p>
                <p className="text-white font-bold text-sm break-all">info@thehomesellingteamaz.com</p>
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-black border-t border-white/5 py-10 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold tracking-widest uppercase text-sm">The Home Selling Team</p>
            <p className="text-[#CC0000] text-[10px] font-semibold tracking-[0.25em] uppercase mt-0.5">
              Keller Williams Integrity First Realty
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-white/30 text-sm">
            <MapPin size={12} className="text-[#CC0000]/60" />
            <span>Gilbert, AZ · Queen Creek, AZ · San Tan Valley, AZ</span>
          </div>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} The Home Selling Team. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
