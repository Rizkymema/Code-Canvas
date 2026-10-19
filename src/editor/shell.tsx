'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../core/editor-state';
import { TopToolbar } from './toolbar';
import { LayersSidebar } from './layers';
import { CanvasContainer } from './canvas';
import { InspectorSidebar } from './inspector';
import { CodeModePanel } from './code';
import { 
  Sparkles, 
  Play, 
  Layers, 
  Sliders, 
  Command, 
  HelpCircle, 
  X, 
  Monitor, 
  CheckCircle2, 
  ChevronRight,
  Code2
} from 'lucide-react';

import { EditorElement } from '../types/editor';

export const EditorShell: React.FC = () => {
  const { mode, selectedElementId, elements, viewportDevice } = useEditorStore();
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  const selectedElement = selectedElementId ? elements[selectedElementId] : null;

  // Build breadcrumb path for selected element
  const getBreadcrumbs = () => {
    if (!selectedElementId) return [];
    const crumbs: { id: string; name: string; type: string }[] = [];
    let currentId: string | undefined = selectedElementId;
    while (currentId && elements[currentId]) {
      const el: EditorElement = elements[currentId];
      crumbs.unshift({ id: el.id, name: el.name, type: el.type });
      currentId = el.parentId;
    }
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div id="editor-shell" className="h-screen w-screen flex flex-col bg-[#09090b] text-zinc-100 overflow-hidden font-sans select-none antialiased">
      {/* Top Toolbar */}
      <TopToolbar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {mode === 'design' && (
          <>
            {/* Left Layer List & Component Library */}
            <LayersSidebar />

            {/* Central Canvas Workspace */}
            <CanvasContainer />

            {/* Right Property Inspector Panel */}
            <InspectorSidebar />
          </>
        )}

        {mode === 'code' && (
          <>
            {/* Left Code Editor View */}
            <div className="w-1/2 flex flex-col h-full border-r border-[#1f1f23] bg-[#0c0c0e]">
              <CodeModePanel />
            </div>

            {/* Right Synchronized Live Canvas Preview */}
            <div className="w-1/2 flex flex-col h-full relative bg-[#09090b]">
              <div className="absolute top-4 right-4 bg-[#121214]/90 backdrop-blur-md border border-[#1f1f23] rounded-lg px-3 py-1.5 text-[11px] font-bold text-zinc-300 z-50 flex items-center gap-2 shadow-2xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="tracking-wide">Live Next.js Preview</span>
              </div>
              <CanvasContainer />
            </div>
          </>
        )}

        {mode === 'preview' && (
          <>
            {/* Full-width clean preview view */}
            <div className="flex-1 relative">
              <CanvasContainer />
            </div>
          </>
        )}
      </div>

      {/* Bottom Professional Status Bar */}
      <div id="status-bar" className="h-8 border-t border-[#1f1f23] bg-[#09090b] px-4 flex items-center justify-between text-[11px] text-zinc-400 font-medium select-none z-50">
        {/* Left: Breadcrumbs & Node Selection Status */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="font-bold text-zinc-200">CodeCanvas Engine</span>
          </div>

          <div className="h-3 w.5 bg-[#1f1f23]"></div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar whitespace-nowrap text-zinc-500">
            {breadcrumbs.length > 0 ? (
              breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.id}>
                  {idx > 0 && <ChevronRight className="h-3 w-3 text-zinc-700 shrink-0" />}
                  <span 
                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      idx === breadcrumbs.length - 1
                        ? 'bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    &lt;{crumb.type}&gt; {crumb.name}
                  </span>
                </React.Fragment>
              ))
            ) : (
              <span className="text-zinc-500">No element selected — Click element on canvas</span>
            )}
          </div>
        </div>

        {/* Right: Resolution & Shortcuts Trigger */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-2 text-[10px] text-zinc-500">
            <Monitor className="h-3 w-3 text-zinc-400" />
            <span className="uppercase tracking-wider font-semibold text-zinc-400">{viewportDevice} Mode</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">
            <CheckCircle2 className="h-3 w-3" />
            <span>Next.js 15 SSR Ready</span>
          </div>

          <button
            onClick={() => setShowShortcutsModal(true)}
            className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 bg-[#121214] border border-[#1f1f23] px-2 py-0.5 rounded text-[10px] font-bold transition-all hover:border-zinc-700"
          >
            <Command className="h-3 w-3 text-purple-400" />
            <span>Shortcuts</span>
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-[#1f1f23] rounded-xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f1f23] pb-3">
              <div className="flex items-center gap-2">
                <Command className="h-4 w-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Keyboard Shortcuts</h3>
              </div>
              <button 
                onClick={() => setShowShortcutsModal(false)}
                className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex justify-between items-center py-1 border-b border-[#1f1f23]">
                <span className="text-zinc-400">Undo Action</span>
                <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-zinc-300">Ctrl + Z</kbd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1f1f23]">
                <span className="text-zinc-400">Redo Action</span>
                <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-zinc-300">Ctrl + Y</kbd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1f1f23]">
                <span className="text-zinc-400">Delete Selected Element</span>
                <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-zinc-300">Delete / Backspace</kbd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1f1f23]">
                <span className="text-zinc-400">Duplicate Selected Element</span>
                <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-zinc-300">Ctrl + D</kbd>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Deseclect Element</span>
                <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px] text-zinc-300">Escape</kbd>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-all"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorShell;
