'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#09090b] text-zinc-100 font-sans">
        <div className="h-screen w-screen flex flex-col items-center justify-center text-zinc-400 gap-4">
          <h2 className="text-xl font-bold text-red-400">Application Global Error</h2>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-purple-600 text-white font-semibold text-xs rounded-xl"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
