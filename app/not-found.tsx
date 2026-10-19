import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-400 gap-4">
      <h2 className="text-2xl font-bold text-white">404 — Page Not Found</h2>
      <p className="text-sm text-zinc-500">The requested canvas page could not be located.</p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl transition-all"
      >
        Return to CodeCanvas Studio
      </Link>
    </div>
  );
}
