export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl animate-pulse-slow">
        🧠
      </div>
      <div className="text-slate-400 text-sm animate-pulse">Loading module...</div>
      {/* Skeleton bars */}
      <div className="w-80 space-y-3 mt-4">
        {[100, 75, 90, 60].map((w, i) => (
          <div key={i} className="h-3 rounded-full bg-white/10 animate-pulse" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
