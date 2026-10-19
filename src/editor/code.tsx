'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../core/editor-state';
import { FileCode, Terminal, Sparkles, Copy, Check, CheckSquare } from 'lucide-react';

interface MockFileCode {
  filename: string;
  path: string;
  code: string[];
  hlLines: number[];
}

export const CodeModePanel: React.FC = () => {
  const { selectedElementId, elements } = useEditorStore();
  const selectedElement = selectedElementId ? elements[selectedElementId] : null;

  const [copied, setCopied] = useState(false);
  const [activeFile, setActiveFile] = useState<string>('app/page.tsx');

  const projectFiles: Record<string, MockFileCode> = {
    'app/page.tsx': {
      filename: 'page.tsx',
      path: 'app/page.tsx',
      hlLines: [1, 5, 8, 12],
      code: [
        'import React from "react";',
        'import { Navbar } from "@/components/Navbar";',
        'import { Hero } from "@/components/Hero";',
        'import { Features } from "@/components/Features";',
        'import { Footer } from "@/components/Footer";',
        '',
        'export default function Page() {',
        '  return (',
        '    <main className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex flex-col">',
        '      <Navbar />',
        '      <Hero />',
        '      <Features />',
        '      <Footer />',
        '    </main>',
        '  );',
        '}',
      ]
    },
    'src/components/Navbar.tsx': {
      filename: 'Navbar.tsx',
      path: 'src/components/Navbar.tsx',
      hlLines: [5, 7, 12],
      code: [
        'import React from "react";',
        '',
        'export const Navbar: React.FC = () => {',
        '  return (',
        '    <nav className="border-b border-zinc-800 py-4 px-8 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">',
        '      <div className="text-xl font-bold tracking-wider text-white flex items-center gap-2">',
        '        <span className="h-6 w-6 bg-purple-600 rounded"></span>',
        '        <span>CodeCanvas</span>',
        '      </div>',
        '      <div className="flex items-center gap-8 text-zinc-400 text-sm">',
        '        <button className="hover:text-white">Features</button>',
        '        <button className="hover:text-white">Pricing</button>',
        '        <button className="hover:text-white">Documentation</button>',
        '      </div>',
        '      <button className="bg-white text-black px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-zinc-200">',
        '        Join Beta',
        '      </button>',
        '    </nav>',
        '  );',
        '};',
      ]
    },
    'src/components/Hero.tsx': {
      filename: 'Hero.tsx',
      path: 'src/components/Hero.tsx',
      hlLines: [5, 8, 12],
      code: [
        'import React from "react";',
        '',
        'export const Hero: React.FC = () => {',
        '  return (',
        '    <div className="max-w-4xl mx-auto text-center pt-24 pb-16 px-6 flex flex-col items-center gap-6">',
        '      <span className="text-xs bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-bold">',
        '        ✨ Next.js App Router Visualizer',
        '      </span>',
        '      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">',
        '        Figma for Code: Design visually, ship real Next.js code',
        '      </h1>',
        '      <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">',
        '        Select components in your browser, adjust spacing, edit properties visually, and export production-ready React 19 source code.',
        '      </p>',
        '    </div>',
        '  );',
        '};',
      ]
    }
  };

  const currentFile = projectFiles[activeFile] || projectFiles['app/page.tsx'];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0c0c0e] text-zinc-300 font-mono text-xs select-text">
      {/* Code Editor Header & File Tabs */}
      <div className="h-11 border-b border-[#1f1f23] px-3 bg-[#09090b] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {Object.keys(projectFiles).map((filepath) => {
            const file = projectFiles[filepath];
            const isActive = activeFile === filepath;
            return (
              <button
                key={filepath}
                onClick={() => setActiveFile(filepath)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-sans font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1f1f23] text-purple-300 border border-purple-500/30'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>{file.filename}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#121214] hover:bg-zinc-800 border border-[#1f1f23] text-zinc-200 text-xs font-sans font-semibold rounded-lg transition-all"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Viewer Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 font-mono text-xs leading-relaxed bg-[#0c0c0e]">
        {currentFile.code.map((line, idx) => {
          const lineNum = idx + 1;
          const isHighlighted = currentFile.hlLines.includes(lineNum);
          return (
            <div
              key={idx}
              className={`flex items-center gap-4 px-2 py-0.5 rounded transition-colors ${
                isHighlighted ? 'bg-purple-900/20 border-l-2 border-purple-500 text-purple-200 font-bold' : 'hover:bg-zinc-900/50'
              }`}
            >
              <span className="w-6 text-right text-zinc-600 select-none font-mono text-[11px]">
                {lineNum}
              </span>
              <span className="whitespace-pre">{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CodeModePanel;
