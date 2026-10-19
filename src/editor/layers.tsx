'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../core/editor-state';
import { 
  ChevronRight, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Trash2, 
  Copy, 
  Plus, 
  Type, 
  Square, 
  Layout, 
  Grid, 
  Compass, 
  Search,
  Layers as LayersIcon,
  Component,
  Sparkles,
  LayoutTemplate
} from 'lucide-react';

export const LayersSidebar: React.FC = () => {
  const {
    elements,
    rootElementId,
    selectedElementId,
    hoveredElementId,
    collapsedNodes,
    setSelectedElementId,
    setHoveredElementId,
    toggleNodeCollapse,
    toggleElementVisibility,
    toggleElementLock,
    renameElement,
    addElement,
    deleteElement,
    duplicateElement
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState<'layers' | 'components' | 'templates'>('layers');
  const [filterText, setFilterText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');

  // Icon picker for layer node types
  const getIcon = (type: string) => {
    switch (type) {
      case 'nav':
        return <Compass className="h-3.5 w-3.5 text-blue-400" />;
      case 'section':
        return <Layout className="h-3.5 w-3.5 text-indigo-400" />;
      case 'div':
        return <Grid className="h-3.5 w-3.5 text-zinc-400" />;
      case 'button':
        return <Square className="h-3.5 w-3.5 text-emerald-400" />;
      case 'h1':
      case 'h2':
      case 'h3':
        return <Type className="h-3.5 w-3.5 text-purple-400 font-bold" />;
      case 'p':
      case 'span':
        return <Type className="h-3.5 w-3.5 text-amber-400" />;
      default:
        return <Square className="h-3.5 w-3.5 text-zinc-500" />;
    }
  };

  const handleStartRename = (id: string, currentName: string) => {
    setEditingId(id);
    setTempName(currentName);
  };

  const handleFinishRename = (id: string) => {
    if (tempName.trim()) {
      renameElement(id, tempName.trim());
    }
    setEditingId(null);
  };

  // Add Component Presets
  const addableComponents = [
    { type: 'div', name: 'Div Container', desc: 'Flexbox / Grid layout container' },
    { type: 'h2', name: 'Heading H2', desc: 'Bold title text header' },
    { type: 'p', name: 'Paragraph', desc: 'Description or text block' },
    { type: 'button', name: 'Action Button', desc: 'Interactive click button' },
    { type: 'section', name: 'Section Block', desc: 'Full-width layout section' },
    { type: 'span', name: 'Badge Pill', desc: 'Eyebrow text badge' },
  ];

  const handleAddComponent = (type: string, name: string) => {
    const parentId = selectedElementId || rootElementId;
    addElement(parentId, type, name);
  };

  // Recursive Tree Node Renderer
  const renderLayerNode = (id: string, depth = 0): React.ReactNode => {
    const element = elements[id];
    if (!element) return null;

    if (filterText && !element.name.toLowerCase().includes(filterText.toLowerCase()) && !element.type.toLowerCase().includes(filterText.toLowerCase())) {
      // If filtering, render children matching filter
      if (element.children) {
        return element.children.map((childId) => renderLayerNode(childId, depth));
      }
      return null;
    }

    const hasChildren = element.children && element.children.length > 0;
    const isCollapsed = collapsedNodes[id] || false;
    const isSelected = selectedElementId === id;
    const isHovered = hoveredElementId === id;

    return (
      <div key={id} className="select-none">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElementId(id);
          }}
          onMouseEnter={() => setHoveredElementId(id)}
          onMouseLeave={() => setHoveredElementId(null)}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
          className={`h-8 border-b border-[#1f1f23]/30 flex items-center justify-between pr-2 text-xs font-medium cursor-pointer transition-colors group ${
            isSelected
              ? 'bg-purple-600/20 text-purple-200 border-l-2 border-l-purple-500'
              : isHovered
              ? 'bg-zinc-800/40 text-zinc-200'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {/* Left: Expand Arrow & Name */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNodeCollapse(id);
                }}
                className="text-zinc-500 hover:text-white p-0.5 rounded"
              >
                {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            ) : (
              <span className="w-4" />
            )}

            {getIcon(element.type)}

            {editingId === id ? (
              <input
                autoFocus
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={() => handleFinishRename(id)}
                onKeyDown={(e) => e.key === 'Enter' && handleFinishRename(id)}
                className="bg-zinc-900 border border-purple-500 rounded px-1 text-xs text-white outline-none w-28"
              />
            ) : (
              <span 
                onDoubleClick={() => handleStartRename(id, element.name)}
                className="truncate text-[11px]"
              >
                {element.name}
              </span>
            )}
          </div>

          {/* Right Actions: Lock, Eye, Duplicate, Delete */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleElementVisibility(id);
              }}
              className="text-zinc-500 hover:text-white p-0.5 rounded"
              title={element.isVisible ? "Hide element" : "Show element"}
            >
              {element.isVisible !== false ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3 text-red-400" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleElementLock(id);
              }}
              className="text-zinc-500 hover:text-white p-0.5 rounded"
              title={element.isLocked ? "Unlock" : "Lock"}
            >
              {element.isLocked ? <Lock className="h-3 w-3 text-amber-400" /> : <Unlock className="h-3 w-3" />}
            </button>

            {id !== rootElementId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteElement(id);
                }}
                className="text-zinc-500 hover:text-red-400 p-0.5 rounded"
                title="Delete"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Recursive Children */}
        {hasChildren && !isCollapsed && (
          <div>{element.children!.map((childId) => renderLayerNode(childId, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <aside id="layers-panel" className="w-64 border-r border-[#1f1f23] bg-[#09090b] h-full flex flex-col select-none z-10">
      {/* Header Tabs */}
      <div className="h-11 border-b border-[#1f1f23] px-2 flex items-center gap-1 bg-zinc-950/40">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'layers'
              ? 'bg-[#1f1f23] text-purple-400 shadow'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <LayersIcon className="h-3.5 w-3.5" />
          <span>Layers</span>
        </button>

        <button
          onClick={() => setActiveTab('components')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'components'
              ? 'bg-[#1f1f23] text-purple-400 shadow'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Component className="h-3.5 w-3.5" />
          <span>Add</span>
        </button>
      </div>

      {/* Tab 1: Layers Tree View */}
      {activeTab === 'layers' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <div className="p-2.5 border-b border-[#1f1f23]">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Filter layers..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full bg-[#121214] border border-[#1f1f23] rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              />
            </div>
          </div>

          {/* Tree View List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {rootElementId ? renderLayerNode(rootElementId) : null}
          </div>
        </div>
      )}

      {/* Tab 2: Add Component Library */}
      {activeTab === 'components' && (
        <div className="flex-1 p-3 overflow-y-auto custom-scrollbar space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-1">
            Element Palette
          </div>
          <div className="grid grid-cols-1 gap-2">
            {addableComponents.map((comp) => (
              <button
                key={comp.name}
                onClick={() => handleAddComponent(comp.type, comp.name)}
                className="w-full bg-[#121214] border border-[#1f1f23] hover:border-purple-500/50 p-2.5 rounded-xl text-left transition-all hover:scale-[1.01] group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-zinc-200 group-hover:text-purple-300">
                    {comp.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{comp.desc}</div>
                </div>
                <Plus className="h-4 w-4 text-zinc-600 group-hover:text-purple-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default LayersSidebar;
