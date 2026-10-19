'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Error:', error);
  }, [error]);

  return (
    <div className="h-screen w-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-400 gap-4">
      <h2 className="text-xl font-bold text-red-400">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl transition-all"
      >
        Try again
      </button>
    </div>
  );
}
