"use client";

import Link from "next/link";
import Navbar from "./Navbar";

interface ModuleLayoutProps {
  children: React.ReactNode;
  moduleNumber: number;
  title: string;
  duration: string;
  gradient: string;
  description: string;
  prevHref?: string;
  nextHref?: string;
  prevLabel?: string;
  nextLabel?: string;
}

export default function ModuleLayout({
  children,
  moduleNumber,
  title,
  duration,
  gradient,
  description,
  prevHref,
  nextHref,
  prevLabel,
  nextLabel,
}: ModuleLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
        {/* Hero banner */}
        <div
          className="relative overflow-hidden"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-16">
            <div className="flex items-start gap-4">
              <div className="glass rounded-2xl px-4 py-2 text-sm font-bold text-white shrink-0">
                Module {moduleNumber}
              </div>
              <div className="glass rounded-2xl px-4 py-2 text-sm text-white/80 flex items-center gap-2 shrink-0">
                ⏱️ {duration}
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 mb-3 leading-tight">
              {title}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          {children}
        </div>

        {/* Module navigation */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex justify-between items-center pt-8 border-t border-white/10">
            {prevHref ? (
              <Link href={prevHref}>
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-slate-300">
                  ← {prevLabel}
                </button>
              </Link>
            ) : (
              <div />
            )}
            <Link href="/">
              <button className="px-5 py-3 rounded-xl glass glass-hover text-slate-400 text-sm">
                📋 All Modules
              </button>
            </Link>
            {nextHref ? (
              <Link href={nextHref}>
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold"
                  style={{ background: gradient }}
                >
                  {nextLabel} →
                </button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
