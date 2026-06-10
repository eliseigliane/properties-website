"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-white font-bold text-base tracking-widest uppercase">
              The Home Selling Team
            </span>
            <span className="text-[#CC0000] text-[10px] font-semibold tracking-[0.25em] uppercase">
              Keller Williams Integrity First Realty
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/#open-houses", label: "Open Houses" },
              { href: "/#listings", label: "Active Listings" },
              { href: "/#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
            <a
              href="tel:+14804594998"
              className="ml-2 px-5 py-2.5 bg-[#CC0000] text-white text-sm font-semibold tracking-wide hover:bg-[#aa0000] transition-colors duration-200"
            >
              Call Us
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {[
              { href: "/#open-houses", label: "Open Houses" },
              { href: "/#listings", label: "Active Listings" },
              { href: "/#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white text-base font-medium py-1"
              >
                {label}
              </Link>
            ))}
            <a
              href="tel:+14804594998"
              className="mt-2 px-5 py-3 bg-[#CC0000] text-white text-sm font-semibold text-center tracking-wide"
            >
              Call Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
