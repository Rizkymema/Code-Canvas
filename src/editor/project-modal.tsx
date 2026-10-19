'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../core/editor-state';
import { 
  FolderOpen, 
  Upload, 
  Download, 
  FileJson, 
  Sparkles, 
  X, 
  Check, 
  Copy, 
  Laptop, 
  ShoppingBag, 
  User, 
  Code2,
  FileCode2,
  ArrowRight
} from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const { elements, importProjectElements, loadPresetProject } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'presets' | 'import' | 'export'>('presets');
  
  const [jsonInput, setJsonInput] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle loading JSON string into store
  const handleImportJSON = () => {
    try {
      setErrorMsg(null);
      if (!jsonInput.trim()) {
        setErrorMsg('Please paste a valid JSON string.');
        return;
      }
      const parsed = JSON.parse(jsonInput);
      if (typeof parsed !== 'object' || !parsed['page-root']) {
        setErrorMsg('Invalid project structure. Root element "page-root" is missing.');
        return;
      }
      importProjectElements(parsed);
      setSuccessMsg('Project imported successfully!');
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1200);
    } catch (err) {
      setErrorMsg('Failed to parse JSON string. Check syntax.');
    }
  };

  // Handle File Upload (.json)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setJsonInput(content);
        const parsed = JSON.parse(content);
        if (parsed['page-root']) {
          importProjectElements(parsed);
          setSuccessMsg(`Project "${file.name}" loaded successfully!`);
          setTimeout(() => {
            setSuccessMsg(null);
            onClose();
          }, 1200);
        } else {
          setErrorMsg('File does not contain valid CodeCanvas project structure.');
        }
      } catch (err) {
        setErrorMsg('Failed to read file JSON contents.');
      }
    };
    reader.readAsText(file);
  };

  // Export current elements as downloadable file
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elements, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `codecanvas-project-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(elements, null, 2));
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const handleSelectPreset = (preset: 'saas' | 'portfolio' | 'ecommerce') => {
    loadPresetProject(preset);
    setSuccessMsg(`Preset template "${preset.toUpperCase()}" loaded!`);
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1f1f23] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Project Manager & Input System</h3>
              <p className="text-xs text-zinc-400">Load existing projects, import JSON/code, or start with templates</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#09090b] border border-[#1f1f23] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'presets' ? 'bg-[#1f1f23] text-purple-400 shadow' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Project Templates</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'import' ? 'bg-[#1f1f23] text-purple-400 shadow' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Import Project</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'export' ? 'bg-[#1f1f23] text-purple-400 shadow' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export / Save</span>
          </button>
        </div>

        {/* Success / Error Feedback Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab 1: Starter Presets */}
        {activeTab === 'presets' && (
          <div className="space-y-3">
            <div className="text-xs text-zinc-400">Select a pre-configured project to load into your workspace:</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Preset 1 */}
              <button
                onClick={() => handleSelectPreset('saas')}
                className="bg-[#09090b] border border-[#1f1f23] hover:border-purple-500/50 p-4 rounded-xl text-left transition-all hover:scale-[1.02] group flex flex-col justify-between h-36"
              >
                <div>
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 w-fit mb-2">
                    <Laptop className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">SaaS Landing Page</div>
                  <div className="text-[10px] text-zinc-500 mt-1">Hero, Features, Pricing table & Footer</div>
                </div>
                <div className="text-[10px] text-purple-400 font-bold flex items-center gap-1">
                  <span>Load Starter</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>

              {/* Preset 2 */}
              <button
                onClick={() => handleSelectPreset('portfolio')}
                className="bg-[#09090b] border border-[#1f1f23] hover:border-purple-500/50 p-4 rounded-xl text-left transition-all hover:scale-[1.02] group flex flex-col justify-between h-36"
              >
                <div>
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 w-fit mb-2">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">Developer Portfolio</div>
                  <div className="text-[10px] text-zinc-500 mt-1">Bio, Skill Badges, Showcase Grid</div>
                </div>
                <div className="text-[10px] text-indigo-400 font-bold flex items-center gap-1">
                  <span>Load Portfolio</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>

              {/* Preset 3 */}
              <button
                onClick={() => handleSelectPreset('ecommerce')}
                className="bg-[#09090b] border border-[#1f1f23] hover:border-purple-500/50 p-4 rounded-xl text-left transition-all hover:scale-[1.02] group flex flex-col justify-between h-36"
              >
                <div>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-2">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">E-Commerce Store</div>
                  <div className="text-[10px] text-zinc-500 mt-1">Promo Banner, Product Cards, Cart</div>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span>Load Store</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Import Project JSON or Code */}
        {activeTab === 'import' && (
          <div className="space-y-4">
            {/* File Upload Option */}
            <div className="border-2 border-dashed border-[#1f1f23] hover:border-purple-500/50 rounded-xl p-4 text-center cursor-pointer transition-all bg-[#09090b] relative">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="h-6 w-6 text-purple-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Upload CodeCanvas Project File (.json)</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Click or drag & drop project file here</div>
            </div>

            {/* Paste JSON Option */}
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                Or Paste Project JSON Structure
              </label>
              <textarea
                rows={5}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Paste project JSON structure (e.g. {"page-root": {...}})'
                className="w-full bg-[#09090b] border border-[#1f1f23] rounded-xl p-3 text-xs font-mono text-zinc-300 outline-none focus:border-purple-500 resize-none"
              />
              <button
                onClick={handleImportJSON}
                className="mt-2 w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Import JSON Project
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Export & Save */}
        {activeTab === 'export' && (
          <div className="space-y-4">
            <div className="text-xs text-zinc-400">Download or copy your current canvas project structure:</div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDownloadJSON}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Save Project (.json)</span>
              </button>

              <button
                onClick={handleCopyJSON}
                className="flex-1 py-2.5 bg-[#09090b] border border-[#1f1f23] hover:bg-zinc-800 text-zinc-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {copiedStatus ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-zinc-400" />}
                <span>{copiedStatus ? 'Copied to Clipboard!' : 'Copy Raw JSON'}</span>
              </button>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Raw Project JSON View</label>
              <pre className="bg-[#09090b] border border-[#1f1f23] rounded-xl p-3 text-[11px] font-mono text-zinc-400 max-h-48 overflow-y-auto custom-scrollbar">
                {JSON.stringify(elements, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end pt-2 border-t border-[#1f1f23]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
