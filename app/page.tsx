'use client';

import React, { useState, useEffect } from 'react';
import EditorShell from '../src/editor/shell';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-400 gap-4">
        <div className="relative flex items-center justify-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 animate-spin opacity-75"></div>
          <div className="absolute h-8 w-8 rounded-lg bg-[#09090b] flex items-center justify-center font-black text-white text-xs">
            CC
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-bold text-zinc-200 tracking-wide">Initializing CodeCanvas Next.js Studio</p>
          <p className="text-xs text-zinc-600">Loading visual canvas engine & workspace components...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#09090b]">
      <EditorShell />
    </main>
  );
}
