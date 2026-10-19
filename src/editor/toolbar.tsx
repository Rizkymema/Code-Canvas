'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../core/editor-state';
import { ProjectModal } from './project-modal';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo2, 
  Redo2, 
  RefreshCw, 
  Eye, 
  Code2, 
  Paintbrush,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  X,
  Share2,
  FolderOpen
} from 'lucide-react';

export const TopToolbar: React.FC = () => {
  const {
    mode,
    zoom,
    viewportDevice,
    history,
    setMode,
    setZoom,
    setViewportDevice,
    undo,
    redo,
    resetToInitial,
    selectedElementId,
    elements
  } = useEditorStore();

  const [showExportModal, setShowExportModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedElement = selectedElementId ? elements[selectedElementId] : null;

  // Simple HTML export generator for modal demo
  const generateExportCode = () => {
    return `'use client';

import React from 'react';

export default function GeneratedCanvasPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans">
      {/* CodeCanvas Exported Next.js 15 Component */}
      <header className="border-b border-zinc-800 py-4 px-8 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
          <span className="h-6 w-6 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-md"></span>
          <span>CodeCanvas</span>
        </div>
        <nav className="flex items-center gap-6 text-zinc-400 text-sm font-medium">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#docs" className="hover:text-white">Docs</a>
        </nav>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
          Get Started
        </button>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center gap-6">
        <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase tracking-widest">
          ✨ Next.js App Router Visual Engine
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Build sleek Next.js interfaces visually
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Manipulate layouts, spacing, and styling in real-time. Export production-ready React 19 components with Tailwind CSS.
        </p>
      </main>
    </div>
  );
}`;
  };

  const handleCopyExportCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <header id="top-toolbar" className="h-14 border-b border-[#1f1f23] bg-[#09090b]/90 backdrop-blur-xl px-4 flex items-center justify-between text-zinc-100 z-50 select-none">
      {/* Left: Brand Identity & Status */}
      <div className="flex items-center gap-3">
        <div className="relative group cursor-pointer">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-purple-950/40">
            <div className="h-full w-full bg-[#09090b] rounded-[11px] flex items-center justify-center font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              CC
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-sm text-zinc-100 font-sans">
              CodeCanvas
            </span>
            <span className="text-[9px] bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
              Next.js 15
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></span>
            <span className="text-[10px] text-zinc-500 font-medium tracking-tight">Studio Active • App Router</span>
          </div>
        </div>
      </div>

      {/* Center: Modes & Viewport Switcher */}
      <div className="flex items-center gap-5">
        {/* Editor Modes Segmented Pills */}
        <div className="bg-[#121214] border border-[#1f1f23] rounded-xl p-1 flex items-center shadow-inner">
          <button
            onClick={() => setMode('design')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'design' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Paintbrush className="h-3.5 w-3.5" />
            <span>Design</span>
          </button>

          <button
            onClick={() => setMode('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'code' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Code</span>
          </button>

          <button
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'preview' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Viewport Device Controls */}
        {mode !== 'code' && (
          <div className="hidden md:flex items-center bg-[#121214] border border-[#1f1f23] rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setViewportDevice('desktop')}
              title="Desktop view (1200px)"
              className={`p-1.5 rounded-lg transition-all ${
                viewportDevice === 'desktop'
                  ? 'bg-[#1f1f23] text-purple-400 shadow'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Monitor className="h-4 w-4" />
            </button>

            <button
              onClick={() => setViewportDevice('tablet')}
              title="Tablet view (768px)"
              className={`p-1.5 rounded-lg transition-all ${
                viewportDevice === 'tablet'
                  ? 'bg-[#1f1f23] text-purple-400 shadow'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Tablet className="h-4 w-4" />
            </button>

            <button
              onClick={() => setViewportDevice('mobile')}
              title="Mobile view (375px)"
              className={`p-1.5 rounded-lg transition-all ${
                viewportDevice === 'mobile'
                  ? 'bg-[#1f1f23] text-purple-400 shadow'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Zoom Selector */}
        {mode !== 'code' && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Zoom</span>
            <select
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1 text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500/50 cursor-pointer"
            >
              <option value={50}>50%</option>
              <option value={75}>75%</option>
              <option value={100}>100%</option>
              <option value={125}>125%</option>
              <option value={150}>150%</option>
            </select>
          </div>
        )}
      </div>

      {/* Right: Actions (Undo, Redo, Reset, Export) */}
      <div className="flex items-center gap-2.5">
        {/* Undo / Redo */}
        <div className="flex items-center bg-[#121214] border border-[#1f1f23] rounded-xl p-0.5">
          <button
            onClick={undo}
            disabled={history.past.length === 0}
            title="Undo (Ctrl+Z)"
            className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-25 transition-colors"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <div className="h-4 w-[1px] bg-[#1f1f23]"></div>
          <button
            onClick={redo}
            disabled={history.future.length === 0}
            title="Redo (Ctrl+Y)"
            className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-25 transition-colors"
          >
            <Redo2 className="h-4 w-4" />
          </button>
        </div>

        {/* Project Manager Modal Trigger */}
        <button
          onClick={() => setShowProjectModal(true)}
          title="Open Project Manager / Import & Save Projects"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121214] border border-purple-500/30 hover:bg-purple-950/30 text-purple-300 hover:text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          <FolderOpen className="h-3.5 w-3.5 text-purple-400" />
          <span>Project</span>
        </button>

        {/* Reset Canvas */}
        <button
          onClick={resetToInitial}
          title="Reset canvas back to initial template"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#121214] border border-[#1f1f23] hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
        >
          <RefreshCw className="h-3.5 w-3.5 text-zinc-400" />
          <span>Reset</span>
        </button>

        {/* Export Code Modal Trigger */}
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-purple-950/40"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export Code</span>
        </button>
      </div>

      {/* Project Manager Modal */}
      <ProjectModal isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} />

      {/* Export Code Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f1f23] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Export Next.js Component</h3>
                  <p className="text-xs text-zinc-400">Production-ready React 19 JSX & Tailwind CSS</p>
                </div>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative">
              <pre className="bg-[#09090b] border border-[#1f1f23] rounded-xl p-4 text-xs font-mono text-zinc-300 max-h-80 overflow-y-auto custom-scrollbar leading-relaxed">
                {generateExportCode()}
              </pre>
              <button
                onClick={handleCopyExportCode}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-md transition-all"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-500">Supports Next.js 14/15 App Router & React Server/Client Components</span>
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopToolbar;
