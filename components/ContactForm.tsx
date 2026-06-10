"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, Send, CheckCircle } from "lucide-react";

interface Agent {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export default function ContactForm({
  agent,
  propertyAddress,
}: {
  agent: Agent;
  propertyAddress: string;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${propertyAddress}. Please contact me with more information.`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-white rounded-xl border border-navy/8 overflow-hidden">
      {/* Agent */}
      <div className="p-6 bg-navy text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
          Listing Agent
        </p>
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold/40">
            <Image
              src={agent.photo}
              alt={agent.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-lg">{agent.name}</p>
            <p className="text-white/60 text-sm">Property Group</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5 pt-5 border-t border-white/10">
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Phone size={14} className="text-gold" />
            {agent.phone}
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Mail size={14} className="text-gold" />
            {agent.email}
          </a>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <p className="font-semibold text-navy mb-4">Request Information</p>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={24} className="text-emerald-500" />
            </div>
            <p className="font-semibold text-navy">Message sent!</p>
            <p className="text-sm text-navy/50">
              {agent.name} will be in touch shortly.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-gold hover:text-gold-muted underline underline-offset-2 mt-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-navy/15 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            />
            <input
              type="email"
              placeholder="Email address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-navy/15 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            />
            <input
              type="tel"
              placeholder="Phone number (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-navy/15 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            />
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-navy/15 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-navy text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-navy-mid transition-colors"
            >
              <Send size={15} />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
