// src/components/RootLayout.tsx
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Možeš dodati Header, Footer, itd. */}
      {children}
    </div>
  );
}