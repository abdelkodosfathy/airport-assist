// components/ProtectedPage.tsx
"use client";

import { useAuthGuard } from "@/lib/hooks/useAuthGuard";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { checking } = useAuthGuard();

  if (checking) {
    return (
      <main className="bg-[#1A1A1A] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
