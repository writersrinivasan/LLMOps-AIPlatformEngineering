import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-7xl mb-6">🤖</div>
      <h1 className="text-4xl font-black text-white mb-3">404 — Module Not Found</h1>
      <p className="text-slate-400 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist. Head back to the course overview.
      </p>
      <Link href="/">
        <button className="btn-primary px-8 py-4 text-base">
          ← Back to Overview
        </button>
      </Link>
    </div>
  );
}
