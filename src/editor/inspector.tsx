'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../core/editor-state';
import { ElementStyles } from '../types/editor';
import { 
  Sliders, 
  Type, 
  Paintbrush, 
  Layout, 
  Info,
  Sparkles,
  Layers,
  FileText,
  Copy,
  Trash2,
  Lock,
  Eye,
  Box,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sun
} from 'lucide-react';

export const InspectorSidebar: React.FC = () => {
  const {
    elements,
    selectedElementId,
    viewportDevice,
    updateElementStyle,
    updateElementProp,
    deleteElement,
    duplicateElement,
    pushHistory
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState<'layout' | 'typography' | 'appearance' | 'props' | 'ai'>('layout');

  const selectedElement = selectedElementId ? elements[selectedElementId] : null;

  const getStyleValue = (property: keyof ElementStyles): string => {
    if (!selectedElement) return '';
    const currentStyles = selectedElement.styles[viewportDevice] || {};
    return currentStyles[property] || '';
  };

  const handleStyleChange = (property: keyof ElementStyles, value: string) => {
    if (!selectedElementId) return;
    updateElementStyle(selectedElementId, property, value);
  };

  const handlePropChange = (propName: string, value: any) => {
    if (!selectedElementId) return;
    updateElementProp(selectedElementId, propName, value);
  };

  // AI Style Quick Presets
  const applyAIPreset = (preset: 'glass' | 'glow' | 'gradient' | 'card') => {
    if (!selectedElementId) return;
    switch (preset) {
      case 'glass':
        updateElementStyle(selectedElementId, 'backgroundColor', 'rgba(18, 18, 20, 0.75)');
        updateElementStyle(selectedElementId, 'backdropFilter', 'blur(16px)');
        updateElementStyle(selectedElementId, 'borderColor', '#27272a');
        updateElementStyle(selectedElementId, 'borderWidth', '1px');
        updateElementStyle(selectedElementId, 'borderRadius', '16px');
        break;
      case 'glow':
        updateElementStyle(selectedElementId, 'boxShadow', '0 0 30px -5px rgba(168, 85, 247, 0.4)');
        updateElementStyle(selectedElementId, 'borderColor', '#a855f7');
        break;
      case 'gradient':
        updateElementStyle(selectedElementId, 'color', '#a855f7');
        updateElementStyle(selectedElementId, 'fontWeight', '800');
        break;
      case 'card':
        updateElementStyle(selectedElementId, 'backgroundColor', '#121214');
        updateElementStyle(selectedElementId, 'paddingTop', '24px');
        updateElementStyle(selectedElementId, 'paddingBottom', '24px');
        updateElementStyle(selectedElementId, 'paddingLeft', '24px');
        updateElementStyle(selectedElementId, 'paddingRight', '24px');
        updateElementStyle(selectedElementId, 'borderRadius', '12px');
        updateElementStyle(selectedElementId, 'borderColor', '#1f1f23');
        updateElementStyle(selectedElementId, 'borderWidth', '1px');
        break;
    }
    pushHistory(`Apply AI Preset ${preset}`);
  };

  const displayOptions = ['block', 'flex', 'grid', 'none'];
  const directionOptions = ['row', 'column'];
  const alignOptions = ['stretch', 'center', 'flex-start', 'flex-end'];
  const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between'];

  return (
    <aside id="inspector-panel" className="w-72 border-l border-[#1f1f23] bg-[#09090b] h-full flex flex-col text-zinc-300 overflow-hidden select-none z-10">
      {/* Header section */}
      <div className="h-11 border-b border-[#1f1f23] px-3 flex items-center justify-between bg-zinc-950/40">
        <div className="flex items-center gap-2">
          <Sliders className="h-3.5 w-3.5 text-purple-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">Inspector</span>
        </div>

        {selectedElement && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => duplicateElement(selectedElement.id)}
              className="p-1 hover:text-white rounded text-zinc-500 hover:bg-zinc-800"
              title="Duplicate"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="p-1 hover:text-red-400 rounded text-zinc-500 hover:bg-zinc-800"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {!selectedElement ? (
        /* Empty State */
        <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-[#121214] border border-[#1f1f23] flex items-center justify-center text-purple-400 shadow-xl">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-200">No Element Selected</h3>
            <p className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed max-w-[200px] mx-auto">
              Select any component on the canvas or layers tree to configure styles, layout, and content.
            </p>
          </div>
        </div>
      ) : (
        /* Active Element Properties */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Active Element Title & Tag Badge */}
          <div className="p-3 border-b border-[#1f1f23] bg-[#121214]/50 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white truncate max-w-[170px]">
                {selectedElement.name}
              </div>
              <div className="text-[10px] text-purple-400 font-mono font-bold mt-0.5">
                &lt;{selectedElement.type}&gt;
              </div>
            </div>
            <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              {viewportDevice}
            </span>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center border-b border-[#1f1f23] bg-zinc-950/60 p-1 gap-0.5">
            <button
              onClick={() => setActiveTab('layout')}
              className={`flex-1 py-1 text-[11px] font-bold rounded transition-colors ${
                activeTab === 'layout' ? 'bg-[#1f1f23] text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Layout
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`flex-1 py-1 text-[11px] font-bold rounded transition-colors ${
                activeTab === 'typography' ? 'bg-[#1f1f23] text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex-1 py-1 text-[11px] font-bold rounded transition-colors ${
                activeTab === 'appearance' ? 'bg-[#1f1f23] text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Style
            </button>
            <button
              onClick={() => setActiveTab('props')}
              className={`flex-1 py-1 text-[11px] font-bold rounded transition-colors ${
                activeTab === 'props' ? 'bg-[#1f1f23] text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Props
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`py-1 px-1.5 text-[11px] font-bold rounded transition-colors ${
                activeTab === 'ai' ? 'bg-purple-600 text-white' : 'text-purple-400 hover:bg-purple-500/10'
              }`}
              title="AI Style Presets"
            >
              <Sparkles className="h-3 w-3" />
            </button>
          </div>

          {/* Property Form Panels */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
            {/* Tab 1: Layout */}
            {activeTab === 'layout' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Display</label>
                  <select
                    value={getStyleValue('display')}
                    onChange={(e) => handleStyleChange('display', e.target.value)}
                    className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
                  >
                    {displayOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Direction</label>
                    <select
                      value={getStyleValue('flexDirection')}
                      onChange={(e) => handleStyleChange('flexDirection', e.target.value)}
                      className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2 py-1.5 text-xs text-zinc-200 outline-none"
                    >
                      {directionOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Gap</label>
                    <input
                      type="text"
                      placeholder="16px"
                      value={getStyleValue('gap')}
                      onChange={(e) => handleStyleChange('gap', e.target.value)}
                      className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Width</label>
                    <input
                      type="text"
                      placeholder="auto"
                      value={getStyleValue('width')}
                      onChange={(e) => handleStyleChange('width', e.target.value)}
                      className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Height</label>
                    <input
                      type="text"
                      placeholder="auto"
                      value={getStyleValue('height')}
                      onChange={(e) => handleStyleChange('height', e.target.value)}
                      className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Padding</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Top: 16px"
                      value={getStyleValue('paddingTop')}
                      onChange={(e) => handleStyleChange('paddingTop', e.target.value)}
                      className="bg-[#121214] border border-[#1f1f23] rounded-lg px-2 py-1 text-xs text-zinc-200 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Bottom: 16px"
                      value={getStyleValue('paddingBottom')}
                      onChange={(e) => handleStyleChange('paddingBottom', e.target.value)}
                      className="bg-[#121214] border border-[#1f1f23] rounded-lg px-2 py-1 text-xs text-zinc-200 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Typography */}
            {activeTab === 'typography' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Font Family</label>
                  <select
                    value={getStyleValue('fontFamily')}
                    onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                    className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none cursor-pointer"
                  >
                    <option value="Inter, sans-serif">Inter (Clean Modern)</option>
                    <option value="Outfit, sans-serif">Outfit (Display Heading)</option>
                    <option value="Satoshi, sans-serif">Satoshi (Sleek UI)</option>
                    <option value="var(--font-mono), monospace">JetBrains Mono (Code)</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Font Size</label>
                  <input
                    type="text"
                    placeholder="16px"
                    value={getStyleValue('fontSize')}
                    onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                    className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Font Weight</label>
                  <select
                    value={getStyleValue('fontWeight')}
                    onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                    className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
                  >
                    {['400', '500', '600', '700', '800'].map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Text Color</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="color"
                      value={getStyleValue('color') || '#ffffff'}
                      onChange={(e) => handleStyleChange('color', e.target.value)}
                      className="h-8 w-8 rounded bg-transparent cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      placeholder="#ffffff"
                      value={getStyleValue('color')}
                      onChange={(e) => handleStyleChange('color', e.target.value)}
                      className="flex-1 bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1 text-xs text-zinc-200 outline-none"
                    />
                  </div>

                  {/* Palette Swatches */}
                  <div className="flex items-center gap-1.5">
                    {['#ffffff', '#a1a1aa', '#a855f7', '#6366f1', '#10b981', '#06b6d4', '#f59e0b'].map((hex) => (
                      <button
                        key={hex}
                        onClick={() => handleStyleChange('color', hex)}
                        style={{ backgroundColor: hex }}
                        className="h-4 w-4 rounded-full border border-white/20 hover:scale-125 transition-transform"
                        title={`Apply ${hex}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={getStyleValue('backgroundColor') || '#09090b'}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      className="h-8 w-8 rounded bg-transparent cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      placeholder="#09090b"
                      value={getStyleValue('backgroundColor')}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      className="flex-1 bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1 text-xs text-zinc-200 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Border Radius</label>
                    <input
                      type="text"
                      placeholder="8px"
                      value={getStyleValue('borderRadius')}
                      onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                      className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Border Width</label>
                    <input
                      type="text"
                      placeholder="1px"
                      value={getStyleValue('borderWidth')}
                      onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
                      className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Props / Text Content */}
            {activeTab === 'props' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Text Content</label>
                  <textarea
                    rows={4}
                    value={selectedElement.props?.textContent || ''}
                    onChange={(e) => handlePropChange('textContent', e.target.value)}
                    placeholder="Enter element text..."
                    className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg p-2.5 text-xs text-zinc-200 outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* Tab 5: AI Assistant Presets */}
            {activeTab === 'ai' && (
              <div className="space-y-2.5 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Instant AI Style Actions</span>
                </div>

                <button
                  onClick={() => applyAIPreset('glass')}
                  className="w-full bg-[#121214] border border-[#1f1f23] hover:border-purple-500/50 p-2.5 rounded-xl text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-zinc-200 group-hover:text-purple-300">Glassmorphism Card</div>
                    <div className="text-[10px] text-zinc-500">Translucent backdrop blur & subtle border</div>
                  </div>
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </button>

                <button
                  onClick={() => applyAIPreset('glow')}
                  className="w-full bg-[#121214] border border-[#1f1f23] hover:border-purple-500/50 p-2.5 rounded-xl text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-zinc-200 group-hover:text-purple-300">Neon Purple Glow</div>
                    <div className="text-[10px] text-zinc-500">Glowing box-shadow accent</div>
                  </div>
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </button>

                <button
                  onClick={() => applyAIPreset('card')}
                  className="w-full bg-[#121214] border border-[#1f1f23] hover:border-purple-500/50 p-2.5 rounded-xl text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-zinc-200 group-hover:text-purple-300">Dark Modern Card</div>
                    <div className="text-[10px] text-zinc-500">Padded container with rounded border</div>
                  </div>
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default InspectorSidebar;
