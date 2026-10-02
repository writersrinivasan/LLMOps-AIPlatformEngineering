interface InfoCardProps {
  icon: string;
  title: string;
  items: string[];
  color: string;
  bgColor: string;
}

export default function InfoCard({ icon, title, items, color, bgColor }: InfoCardProps) {
  return (
    <div
      className="rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: bgColor,
        borderColor: `${color}30`,
        boxShadow: `0 4px 20px ${color}15`,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
        >
          {icon}
        </div>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span style={{ color }} className="mt-0.5 shrink-0">▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
