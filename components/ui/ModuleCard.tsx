"use client";

import Link from "next/link";
import ProgressBar from "./ProgressBar";

interface ModuleCardProps {
  number: number;
  title: string;
  duration: string;
  description: string;
  gradient: string;
  glowColor: string;
  progress: number;
  href: string;
  icon: string;
  topics: string[];
  isActive?: boolean;
}

export default function ModuleCard({
  number,
  title,
  duration,
  description,
  gradient,
  glowColor,
  progress,
  href,
  icon,
  topics,
  isActive = false,
}: ModuleCardProps) {
  return (
    <Link href={href}>
      <div
        className={`module-card group relative overflow-hidden ${
          isActive ? "ring-2 ring-indigo-500/50" : ""
        }`}
        style={{
          boxShadow: progress > 0
            ? `0 0 30px ${glowColor}30, 0 4px 24px rgba(0,0,0,0.4)`
            : "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Background gradient accent */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ background: gradient }}
        />

        {/* Module number badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg"
            style={{ background: gradient }}
          >
            {icon}
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              Module {number}
            </div>
            <div
              className="text-xs font-semibold mt-0.5 px-2 py-0.5 rounded-full"
              style={{ background: `${glowColor}20`, color: glowColor }}
            >
              {duration}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 mb-4 leading-relaxed">{description}</p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10"
            >
              {topic}
            </span>
          ))}
          {topics.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-500">
              +{topics.length - 3} more
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500">Progress</span>
            <span style={{ color: glowColor }} className="font-semibold">
              {progress}%
            </span>
          </div>
          <ProgressBar value={progress} />
        </div>

        {/* Status indicator */}
        {progress === 100 && (
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-400 glow-green pulse-dot" />
        )}
        {progress > 0 && progress < 100 && (
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-yellow-400 pulse-dot" />
        )}
      </div>
    </Link>
  );
}
