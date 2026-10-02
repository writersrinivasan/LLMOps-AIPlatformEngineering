import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLMOps & AI Platform Engineering",
  description: "5-Hour Advanced Technical Session — Interactive Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        backgroundColor: "#0a0a1a",
        color: "#e2e8f0",
        colorScheme: "dark",
      }}
    >
      <body
        style={{
          backgroundColor: "#0a0a1a",
          color: "#e2e8f0",
          minHeight: "100vh",
          fontFamily: "'Inter', system-ui, sans-serif",
          backgroundImage:
            "linear-gradient(-45deg, #0a0a1a, #0f0f2e, #1a0a2e, #0a1a2e), radial-gradient(rgba(99,102,241,0.18) 1px, transparent 1px)",
          backgroundSize: "400% 400%, 30px 30px",
          backgroundBlendMode: "normal",
        }}
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
