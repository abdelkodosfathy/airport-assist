"use client";

import { useAuthGuard } from "@/lib/hooks/useAuthGuard";

export function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checking } = useAuthGuard();

  if (checking) {
    return (
      <main className="min-h-screen bg-[#f9f7f5] p-8">
        <div className="flex gap-4">
          <div className="w-72 h-[600px] rounded-2xl bg-gray-200 animate-pulse" />
          <div className="flex-1 h-[600px] rounded-2xl bg-gray-200 animate-pulse" />
        </div>
      </main>
    );
  }

  return <>{children}</>;
}