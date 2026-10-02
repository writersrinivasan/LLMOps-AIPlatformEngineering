interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  gradient: string;
}

export default function SectionHeader({ number, title, subtitle, gradient }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
          style={{ background: gradient }}
        >
          {number}
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Section {number}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      {subtitle && <p className="text-slate-400 text-sm leading-relaxed">{subtitle}</p>}
    </div>
  );
}
