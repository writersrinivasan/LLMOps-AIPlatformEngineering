"use client";

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  showLabel?: boolean;
  height?: string;
}

export default function ProgressBar({
  value,
  color = "from-indigo-500 to-purple-500",
  showLabel = false,
  height = "h-2",
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className={`progress-bar ${height}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-slate-400 mt-1">{value}%</span>
      )}
    </div>
  );
}
