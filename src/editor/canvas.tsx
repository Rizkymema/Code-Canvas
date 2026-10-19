'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useEditorStore } from '../core/editor-state';
import { ElementStyles, ViewportDevice } from '../types/editor';
import { 
  Lock, 
  Unlock,
  Sliders, 
  Move, 
  Trash2, 
  Copy, 
  Code2, 
  Sparkles, 
  Eye, 
  Maximize2 
} from 'lucide-react';

export const CanvasContainer: React.FC = () => {
  const {
    elements,
    rootElementId,
    selectedElementId,
    hoveredElementId,
    viewportDevice,
    zoom,
    mode,
    setSelectedElementId,
    setHoveredElementId,
    updateElementStyle,
    pushHistory,
    toggleElementLock,
    deleteElement,
    duplicateElement,
    setMode
  } = useEditorStore();

  const canvasRef = useRef<HTMLDivElement>(null);

  // Resize and Drag state
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; width: number; height: number; left: number; top: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    top: 0
  });

  const getDeviceWidth = (device: ViewportDevice) => {
    switch (device) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': default: return '1200px';
    }
  };

  const parsePx = (val?: string): number => {
    if (!val) return 0;
    const match = val.match(/^(\d+)(px)?$/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Resize handler start
  const handleResizeStart = (e: React.MouseEvent, handle: string, elementId: string) => {
    if (mode !== 'design') return;
    const element = elements[elementId];
    if (!element || element.isLocked) return;

    e.stopPropagation();
    e.preventDefault();

    const domEl = document.getElementById(`preview-el-${elementId}`);
    if (!domEl) return;

    const rect = domEl.getBoundingClientRect();
    const style = element.styles[viewportDevice] || {};

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
      left: parsePx(style.left),
      top: parsePx(style.top),
    };

    setIsResizing(handle);
  };

  // Handle mouse move for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !selectedElementId) return;

      const element = elements[selectedElementId];
      if (!element) return;

      const scale = zoom / 100;
      const dx = (e.clientX - dragStartRef.current.x) / scale;
      const dy = (e.clientY - dragStartRef.current.y) / scale;

      let newWidth = dragStartRef.current.width;
      let newHeight = dragStartRef.current.height;

      if (isResizing.includes('r')) newWidth = Math.max(30, dragStartRef.current.width + dx);
      if (isResizing.includes('b')) newHeight = Math.max(20, dragStartRef.current.height + dy);

      updateElementStyle(selectedElementId, 'width', `${Math.round(newWidth)}px`);
      if (isResizing.includes('b')) {
        updateElementStyle(selectedElementId, 'height', `${Math.round(newHeight)}px`);
      }
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(null);
        pushHistory('Resize element');
      }
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, selectedElementId, zoom, elements, updateElementStyle, pushHistory]);

  // Click on background canvas clears selection
  const handleCanvasBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).id === 'viewport-frame-wrapper') {
      setSelectedElementId(null);
    }
  };

  // Convert element style object to CSS inline style properties
  const buildCssStyles = (elementStyles?: ElementStyles): React.CSSProperties => {
    if (!elementStyles) return {};
    const css: React.CSSProperties = {};

    Object.entries(elementStyles).forEach(([key, val]) => {
      if (val !== undefined && val !== '') {
        (css as any)[key] = val;
      }
    });

    return css;
  };

  // Render individual element recursively
  const renderElement = (elementId: string): React.ReactNode => {
    const element = elements[elementId];
    if (!element || element.isVisible === false) return null;

    const isSelected = selectedElementId === elementId;
    const isHovered = hoveredElementId === elementId;
    const currentDeviceStyles = element.styles[viewportDevice] || {};
    const combinedStyles = buildCssStyles(currentDeviceStyles);

    const isTextComponent = ['h1', 'h2', 'h3', 'p', 'span', 'button'].includes(element.type);
    const hasChildren = element.children && element.children.length > 0;

    const ComponentTag = (element.type || 'div') as any;

    return (
      <div
        key={element.id}
        id={`preview-el-${element.id}`}
        style={combinedStyles}
        onClick={(e) => {
          if (mode !== 'design') return;
          e.stopPropagation();
          setSelectedElementId(element.id);
        }}
        onMouseEnter={(e) => {
          if (mode !== 'design') return;
          e.stopPropagation();
          setHoveredElementId(element.id);
        }}
        onMouseLeave={(e) => {
          if (mode !== 'design') return;
          e.stopPropagation();
          setHoveredElementId(null);
        }}
        className={`relative transition-all duration-75 ${
          mode === 'design' ? 'cursor-pointer' : ''
        } ${
          isSelected && mode === 'design'
            ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-950/30 z-20'
            : isHovered && mode === 'design'
            ? 'ring-1 ring-purple-400/60 z-10'
            : ''
        }`}
      >
        {/* Hover Pill Tag Badge */}
        {isHovered && !isSelected && mode === 'design' && (
          <div key={`hover-badge-${element.id}`} className="absolute -top-5 left-0 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow z-30 pointer-events-none uppercase tracking-wider">
            &lt;{element.type}&gt; {element.name}
          </div>
        )}

        {/* Selected Element Floating Context Bar & Handles */}
        {isSelected && mode === 'design' && (
          <React.Fragment key={`selection-overlay-${element.id}`}>
            {/* Top Quick Actions Floating Bar */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute -top-9 left-0 bg-[#121214] border border-[#1f1f23] rounded-lg px-2 py-1 flex items-center gap-1.5 shadow-2xl z-40 text-xs text-zinc-300 select-none"
            >
              <span className="font-bold text-purple-400 text-[10px] uppercase tracking-wide px-1">
                &lt;{element.type}&gt;
              </span>
              <div className="h-3 w-[1px] bg-[#1f1f23]"></div>
              
              <button
                onClick={() => toggleElementLock(element.id)}
                title={element.isLocked ? "Unlock element" : "Lock element"}
                className="p-1 hover:text-white rounded hover:bg-zinc-800 text-zinc-400"
              >
                {element.isLocked ? <Lock className="h-3 w-3 text-amber-400" /> : <Unlock className="h-3 w-3" />}
              </button>

              <button
                onClick={() => duplicateElement(element.id)}
                title="Duplicate element"
                className="p-1 hover:text-white rounded hover:bg-zinc-800 text-zinc-400"
              >
                <Copy className="h-3 w-3" />
              </button>

              <button
                onClick={() => setMode('code')}
                title="Inspect source code"
                className="p-1 hover:text-white rounded hover:bg-zinc-800 text-zinc-400"
              >
                <Code2 className="h-3 w-3 text-indigo-400" />
              </button>

              <button
                onClick={() => deleteElement(element.id)}
                title="Delete element"
                className="p-1 hover:text-red-400 rounded hover:bg-zinc-800 text-zinc-400"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>

            {/* Corner Resize Handles */}
            {!element.isLocked && (
              <React.Fragment key={`resize-handles-${element.id}`}>
                <div
                  onMouseDown={(e) => handleResizeStart(e, 'r', element.id)}
                  className="absolute top-1/2 -right-1.5 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-ew-resize -translate-y-1/2 z-30 shadow"
                />
                <div
                  onMouseDown={(e) => handleResizeStart(e, 'b', element.id)}
                  className="absolute -bottom-1.5 left-1/2 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-ns-resize -translate-x-1/2 z-30 shadow"
                />
                <div
                  onMouseDown={(e) => handleResizeStart(e, 'br', element.id)}
                  className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-purple-500 border border-white rounded-full cursor-nwse-resize z-30 shadow"
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}

        {/* Text Content Rendering */}
        {element.props?.textContent ? (
          <React.Fragment key={`text-node-${element.id}`}>
            {element.props.textContent}
          </React.Fragment>
        ) : null}

        {/* Child Elements Recursive Rendering */}
        {hasChildren ? (
          <React.Fragment key={`children-nodes-${element.id}`}>
            {element.children!.map((childId) => renderElement(childId))}
          </React.Fragment>
        ) : null}
      </div>
    );
  };

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasBackgroundClick}
      className="flex-1 h-full overflow-auto custom-scrollbar canvas-grid-bg flex items-center justify-center p-8 relative select-none"
    >
      {/* Viewport Frame Container */}
      <div
        id="viewport-frame-wrapper"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out',
        }}
        className="flex flex-col items-center shadow-2xl rounded-2xl border border-[#1f1f23] bg-[#09090b] overflow-hidden"
      >
        {/* Device Frame Header */}
        <div className="w-full bg-[#121214] border-b border-[#1f1f23] px-4 py-2 flex items-center justify-between text-[11px] text-zinc-500 font-semibold select-none">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#1f1f23] px-3 py-0.5 rounded-full text-zinc-400 text-[10px]">
            <span className="capitalize font-bold text-zinc-300">{viewportDevice} Viewport</span>
            <span>•</span>
            <span className="text-purple-400 font-bold">{getDeviceWidth(viewportDevice)}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600">
            <span>{zoom}%</span>
          </div>
        </div>

        {/* Main Render Canvas Body */}
        <div
          style={{ width: getDeviceWidth(viewportDevice) }}
          className="min-h-[85vh] bg-[#09090b] transition-all duration-200 relative overflow-x-hidden"
        >
          {rootElementId && renderElement(rootElementId)}
        </div>
      </div>
    </div>
  );
};

export default CanvasContainer;
