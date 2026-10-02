interface BadgeProps {
  children: React.ReactNode;
  variant?: "indigo" | "purple" | "blue" | "green" | "pink" | "orange" | "cyan" | "yellow";
}

const variantStyles: Record<string, string> = {
  indigo: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  purple: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  blue: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  green: "bg-green-500/20 text-green-300 border border-green-500/30",
  pink: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  orange: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  yellow: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
};

export default function Badge({ children, variant = "indigo" }: BadgeProps) {
  return (
    <span className={`badge ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
