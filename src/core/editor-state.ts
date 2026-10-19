import { create } from 'zustand';
import { EditorElement, ElementStyles, ViewportDevice, HistoryItem, HistoryState } from '../types/editor';

// Utility helper to copy style objects
const cloneStyles = (styles: any) => JSON.parse(JSON.stringify(styles));

// Initial mock data structure
const initialElements: Record<string, EditorElement> = {
  'page-root': {
    id: 'page-root',
    type: 'section',
    name: 'Page Wrapper',
    styles: {
      desktop: {
        backgroundColor: '#09090b',
        color: '#f4f4f5',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: '0px',
        paddingBottom: '64px',
        fontFamily: 'Satoshi, sans-serif',
      },
      tablet: {
        minHeight: '100vh',
      },
      mobile: {
        minHeight: '100vh',
      },
    },
    props: {},
    children: ['navbar', 'hero-section', 'features-section', 'footer'],
    isVisible: true,
    isLocked: false,
  },
  'navbar': {
    id: 'navbar',
    type: 'nav',
    name: 'Navbar',
    parentId: 'page-root',
    source: {
      file: 'src/components/Navbar.tsx',
      line: 12,
      column: 4,
      codeSnippet: '<nav className="border-b border-zinc-800 py-4 px-8 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">...</nav>',
    },
    styles: {
      desktop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '16px',
        paddingBottom: '16px',
        paddingLeft: '32px',
        paddingRight: '32px',
        backgroundColor: '#09090b',
        borderBottomWidth: '1px',
        borderColor: '#27272a',
        borderStyle: 'solid',
        position: 'sticky',
        top: '0px',
      },
      tablet: {
        paddingLeft: '24px',
        paddingRight: '24px',
      },
      mobile: {
        paddingLeft: '16px',
        paddingRight: '16px',
        flexDirection: 'row',
      },
    },
    props: {},
    children: ['nav-logo', 'nav-links-container', 'nav-actions'],
    isVisible: true,
    isLocked: false,
  },
  'nav-logo': {
    id: 'nav-logo',
    type: 'div',
    name: 'Logo Text',
    parentId: 'navbar',
    source: {
      file: 'src/components/Navbar.tsx',
      line: 14,
      column: 8,
      codeSnippet: '<span className="text-xl font-bold tracking-wider text-white">CodeCanvas</span>',
    },
    styles: {
      desktop: {
        fontSize: '20px',
        fontWeight: '800',
        letterSpacing: '1px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      },
      tablet: {},
      mobile: {
        fontSize: '18px',
      },
    },
    props: {
      textContent: 'CodeCanvas',
    },
    isVisible: true,
    isLocked: false,
  },
  'nav-links-container': {
    id: 'nav-links-container',
    type: 'div',
    name: 'Nav Menu Links',
    parentId: 'navbar',
    styles: {
      desktop: {
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        alignItems: 'center',
      },
      tablet: {
        gap: '20px',
      },
      mobile: {
        display: 'none', // Hide menu links on mobile mock
      },
    },
    props: {},
    children: ['nav-link-features', 'nav-link-pricing', 'nav-link-docs'],
    isVisible: true,
    isLocked: false,
  },
  'nav-link-features': {
    id: 'nav-link-features',
    type: 'button',
    name: 'Link Features',
    parentId: 'nav-links-container',
    styles: {
      desktop: {
        color: '#a1a1aa',
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: 'transparent',
        borderWidth: '0px',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Features',
    },
    isVisible: true,
    isLocked: false,
  },
  'nav-link-pricing': {
    id: 'nav-link-pricing',
    type: 'button',
    name: 'Link Pricing',
    parentId: 'nav-links-container',
    styles: {
      desktop: {
        color: '#a1a1aa',
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: 'transparent',
        borderWidth: '0px',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Pricing',
    },
    isVisible: true,
    isLocked: false,
  },
  'nav-link-docs': {
    id: 'nav-link-docs',
    type: 'button',
    name: 'Link Docs',
    parentId: 'nav-links-container',
    styles: {
      desktop: {
        color: '#a1a1aa',
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: 'transparent',
        borderWidth: '0px',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Documentation',
    },
    isVisible: true,
    isLocked: false,
  },
  'nav-actions': {
    id: 'nav-actions',
    type: 'div',
    name: 'Nav CTA Button Container',
    parentId: 'navbar',
    styles: {
      desktop: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      },
      tablet: {},
      mobile: {},
    },
    props: {},
    children: ['nav-cta-btn'],
    isVisible: true,
    isLocked: false,
  },
  'nav-cta-btn': {
    id: 'nav-cta-btn',
    type: 'button',
    name: 'Navbar Button',
    parentId: 'nav-actions',
    source: {
      file: 'src/components/Navbar.tsx',
      line: 25,
      column: 10,
      codeSnippet: '<button className="bg-white text-black px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-zinc-200">Join Beta</button>',
    },
    styles: {
      desktop: {
        backgroundColor: '#ffffff',
        color: '#000000',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        borderWidth: '0px',
      },
      tablet: {},
      mobile: {
        paddingTop: '6px',
        paddingBottom: '6px',
        paddingLeft: '12px',
        paddingRight: '12px',
        fontSize: '13px',
      },
    },
    props: {
      textContent: 'Join Beta',
    },
    isVisible: true,
    isLocked: false,
  },
  'hero-section': {
    id: 'hero-section',
    type: 'div',
    name: 'Hero Section',
    parentId: 'page-root',
    source: {
      file: 'src/components/Hero.tsx',
      line: 8,
      column: 2,
      codeSnippet: '<div className="max-w-4xl mx-auto text-center pt-24 px-6 flex flex-col items-center gap-6">...</div>',
    },
    styles: {
      desktop: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '96px',
        paddingBottom: '64px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '896px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
      },
      tablet: {
        paddingTop: '64px',
        paddingBottom: '48px',
      },
      mobile: {
        paddingTop: '48px',
        paddingBottom: '32px',
      },
    },
    props: {},
    children: ['hero-badge', 'hero-title', 'hero-desc', 'hero-btns-container'],
    isVisible: true,
    isLocked: false,
  },
  'hero-badge': {
    id: 'hero-badge',
    type: 'span',
    name: 'Hero Eyebrow Badge',
    parentId: 'hero-section',
    source: {
      file: 'src/components/Hero.tsx',
      line: 10,
      column: 4,
      codeSnippet: '<span className="text-xs bg-zinc-900 border border-zinc-800 text-purple-400 px-3 py-1 rounded-full">✨ New: CodeCanvas Beta</span>',
    },
    styles: {
      desktop: {
        backgroundColor: '#18181b',
        color: '#c084fc',
        borderWidth: '1px',
        borderColor: '#27272a',
        borderStyle: 'solid',
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '12px',
        paddingRight: '12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '500',
        marginBottom: '16px',
      },
      tablet: {},
      mobile: {
        fontSize: '11px',
      },
    },
    props: {
      textContent: '✨ New: CodeCanvas Beta',
    },
    isVisible: true,
    isLocked: false,
  },
  'hero-title': {
    id: 'hero-title',
    type: 'h1',
    name: 'Hero Heading H1',
    parentId: 'hero-section',
    source: {
      file: 'src/components/Hero.tsx',
      line: 13,
      column: 4,
      codeSnippet: '<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">Figma for Code: Build visually, ship real code</h1>',
    },
    styles: {
      desktop: {
        fontSize: '56px',
        fontWeight: '800',
        color: '#ffffff',
        lineHeight: '1.15',
        letterSpacing: '-1.5px',
        marginBottom: '24px',
        maxWidth: '800px',
      },
      tablet: {
        fontSize: '44px',
      },
      mobile: {
        fontSize: '32px',
        letterSpacing: '-0.75px',
      },
    },
    props: {
      textContent: 'Figma for Code: Design visually, ship real code',
    },
    isVisible: true,
    isLocked: false,
  },
  'hero-desc': {
    id: 'hero-desc',
    type: 'p',
    name: 'Hero Subtitle',
    parentId: 'hero-section',
    source: {
      file: 'src/components/Hero.tsx',
      line: 18,
      column: 4,
      codeSnippet: '<p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">...</p>',
    },
    styles: {
      desktop: {
        fontSize: '18px',
        lineHeight: '1.6',
        color: '#a1a1aa',
        maxWidth: '672px',
        marginBottom: '32px',
      },
      tablet: {
        fontSize: '16px',
      },
      mobile: {
        fontSize: '15px',
      },
    },
    props: {
      textContent: 'Select components in your browser, drag spacing, edit properties visually, and have changes saved directly back into clean React/Tailwind source code.',
    },
    isVisible: true,
    isLocked: false,
  },
  'hero-btns-container': {
    id: 'hero-btns-container',
    type: 'div',
    name: 'Hero Button Wrapper',
    parentId: 'hero-section',
    styles: {
      desktop: {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
      },
      tablet: {},
      mobile: {
        flexDirection: 'column',
        width: '100%',
        gap: '10px',
      },
    },
    props: {},
    children: ['hero-btn-primary', 'hero-btn-secondary'],
    isVisible: true,
    isLocked: false,
  },
  'hero-btn-primary': {
    id: 'hero-btn-primary',
    type: 'button',
    name: 'Primary Button',
    parentId: 'hero-btns-container',
    source: {
      file: 'src/components/Hero.tsx',
      line: 23,
      column: 6,
      codeSnippet: '<button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium">Start Designing</button>',
    },
    styles: {
      desktop: {
        backgroundColor: '#9333ea',
        color: '#ffffff',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '24px',
        paddingRight: '24px',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        borderWidth: '0px',
      },
      tablet: {},
      mobile: {
        width: '100%',
      },
    },
    props: {
      textContent: 'Start Designing',
    },
    isVisible: true,
    isLocked: false,
  },
  'hero-btn-secondary': {
    id: 'hero-btn-secondary',
    type: 'button',
    name: 'Secondary Button',
    parentId: 'hero-btns-container',
    source: {
      file: 'src/components/Hero.tsx',
      line: 27,
      column: 6,
      codeSnippet: '<button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-6 py-3 rounded-lg font-medium">Watch Demo</button>',
    },
    styles: {
      desktop: {
        backgroundColor: '#18181b',
        color: '#ffffff',
        borderWidth: '1px',
        borderColor: '#27272a',
        borderStyle: 'solid',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '24px',
        paddingRight: '24px',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
      },
      tablet: {},
      mobile: {
        width: '100%',
      },
    },
    props: {
      textContent: 'Watch Demo',
    },
    isVisible: true,
    isLocked: false,
  },
  'features-section': {
    id: 'features-section',
    type: 'div',
    name: 'Features Bento Grid',
    parentId: 'page-root',
    source: {
      file: 'src/components/Features.tsx',
      line: 6,
      column: 2,
      codeSnippet: '<section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">...</section>',
    },
    styles: {
      desktop: {
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '48px',
        paddingBottom: '48px',
        maxWidth: '1152px',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      tablet: {
        flexDirection: 'column',
      },
      mobile: {
        flexDirection: 'column',
        paddingTop: '24px',
        paddingBottom: '24px',
      },
    },
    props: {},
    children: ['bento-card-1', 'bento-card-2', 'bento-card-3'],
    isVisible: true,
    isLocked: false,
  },
  'bento-card-1': {
    id: 'bento-card-1',
    type: 'div',
    name: 'Bento Card 1',
    parentId: 'features-section',
    source: {
      file: 'src/components/Features.tsx',
      line: 12,
      column: 4,
      codeSnippet: '<div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-3">...</div>',
    },
    styles: {
      desktop: {
        backgroundColor: '#09090b',
        borderWidth: '1px',
        borderColor: '#27272a',
        borderStyle: 'solid',
        borderRadius: '16px',
        paddingTop: '24px',
        paddingBottom: '24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
      },
      tablet: {},
      mobile: {},
    },
    props: {},
    children: ['card-icon-1', 'card-title-1', 'card-desc-1'],
    isVisible: true,
    isLocked: false,
  },
  'card-icon-1': {
    id: 'card-icon-1',
    type: 'span',
    name: 'Bento Icon 1',
    parentId: 'bento-card-1',
    styles: {
      desktop: {
        fontSize: '24px',
        marginBottom: '16px',
        color: '#c084fc',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: '🎨',
    },
    isVisible: true,
    isLocked: false,
  },
  'card-title-1': {
    id: 'card-title-1',
    type: 'h3',
    name: 'Bento Title 1',
    parentId: 'bento-card-1',
    styles: {
      desktop: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '8px',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Visual Inspector',
    },
    isVisible: true,
    isLocked: false,
  },
  'card-desc-1': {
    id: 'card-desc-1',
    type: 'p',
    name: 'Bento Desc 1',
    parentId: 'bento-card-1',
    styles: {
      desktop: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#a1a1aa',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Edit dimensions, colors, typography, margins, and flex-layouts directly using intuitive custom visual widgets.',
    },
    isVisible: true,
    isLocked: false,
  },
  'bento-card-2': {
    id: 'bento-card-2',
    type: 'div',
    name: 'Bento Card 2',
    parentId: 'features-section',
    source: {
      file: 'src/components/Features.tsx',
      line: 25,
      column: 4,
      codeSnippet: '<div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-3">...</div>',
    },
    styles: {
      desktop: {
        backgroundColor: '#09090b',
        borderWidth: '1px',
        borderColor: '#27272a',
        borderStyle: 'solid',
        borderRadius: '16px',
        paddingTop: '24px',
        paddingBottom: '24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
      },
      tablet: {},
      mobile: {},
    },
    props: {},
    children: ['card-icon-2', 'card-title-2', 'card-desc-2'],
    isVisible: true,
    isLocked: false,
  },
  'card-icon-2': {
    id: 'card-icon-2',
    type: 'span',
    name: 'Bento Icon 2',
    parentId: 'bento-card-2',
    styles: {
      desktop: {
        fontSize: '24px',
        marginBottom: '16px',
        color: '#60a5fa',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: '🗺️',
    },
    isVisible: true,
    isLocked: false,
  },
  'card-title-2': {
    id: 'card-title-2',
    type: 'h3',
    name: 'Bento Title 2',
    parentId: 'bento-card-2',
    styles: {
      desktop: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '8px',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Source Mapping',
    },
    isVisible: true,
    isLocked: false,
  },
  'card-desc-2': {
    id: 'card-desc-2',
    type: 'p',
    name: 'Bento Desc 2',
    parentId: 'bento-card-2',
    styles: {
      desktop: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#a1a1aa',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Double click any preview component to instantly highlight and locate its exact code line inside your project files.',
    },
    isVisible: true,
    isLocked: false,
  },
  'bento-card-3': {
    id: 'bento-card-3',
    type: 'div',
    name: 'Bento Card 3',
    parentId: 'features-section',
    source: {
      file: 'src/components/Features.tsx',
      line: 38,
      column: 4,
      codeSnippet: '<div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-3">...</div>',
    },
    styles: {
      desktop: {
        backgroundColor: '#09090b',
        borderWidth: '1px',
        borderColor: '#27272a',
        borderStyle: 'solid',
        borderRadius: '16px',
        paddingTop: '24px',
        paddingBottom: '24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
      },
      tablet: {},
      mobile: {},
    },
    props: {},
    children: ['card-icon-3', 'card-title-3', 'card-desc-3'],
    isVisible: true,
    isLocked: false,
  },
  'card-icon-3': {
    id: 'card-icon-3',
    type: 'span',
    name: 'Bento Icon 3',
    parentId: 'bento-card-3',
    styles: {
      desktop: {
        fontSize: '24px',
        marginBottom: '16px',
        color: '#34d399',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: '⚡',
    },
    isVisible: true,
    isLocked: false,
  },
  'card-title-3': {
    id: 'card-title-3',
    type: 'h3',
    name: 'Bento Title 3',
    parentId: 'bento-card-3',
    styles: {
      desktop: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '8px',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'AST Transformations',
    },
    isVisible: true,
    isLocked: false,
  },
  'card-desc-3': {
    id: 'card-desc-3',
    type: 'p',
    name: 'Bento Desc 3',
    parentId: 'bento-card-3',
    styles: {
      desktop: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#a1a1aa',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Changes compile instantly to clean Tailwind utility classes written straight to your component source code.',
    },
    isVisible: true,
    isLocked: false,
  },
  'footer': {
    id: 'footer',
    type: 'footer',
    name: 'Footer Wrapper',
    parentId: 'page-root',
    source: {
      file: 'src/components/Footer.tsx',
      line: 4,
      column: 2,
      codeSnippet: '<footer className="border-t border-zinc-800 text-center py-12 text-zinc-500">...</footer>',
    },
    styles: {
      desktop: {
        borderTopWidth: '1px',
        borderColor: '#27272a',
        borderStyle: 'solid',
        paddingTop: '32px',
        paddingBottom: '32px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1152px',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      tablet: {},
      mobile: {
        flexDirection: 'column',
        gap: '16px',
        paddingTop: '24px',
        paddingBottom: '24px',
      },
    },
    props: {},
    children: ['footer-text', 'footer-links'],
    isVisible: true,
    isLocked: false,
  },
  'footer-text': {
    id: 'footer-text',
    type: 'span',
    name: 'Footer Attribution',
    parentId: 'footer',
    styles: {
      desktop: {
        fontSize: '13px',
        color: '#71717a',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: '© 2026 CodeCanvas Inc. Built with absolute love for web craftsmanship.',
    },
    isVisible: true,
    isLocked: false,
  },
  'footer-links': {
    id: 'footer-links',
    type: 'div',
    name: 'Footer Links',
    parentId: 'footer',
    styles: {
      desktop: {
        display: 'flex',
        gap: '24px',
      },
      tablet: {},
      mobile: {},
    },
    props: {},
    children: ['footer-link-privacy', 'footer-link-terms'],
    isVisible: true,
    isLocked: false,
  },
  'footer-link-privacy': {
    id: 'footer-link-privacy',
    type: 'span',
    name: 'Privacy Link',
    parentId: 'footer-links',
    styles: {
      desktop: {
        fontSize: '13px',
        color: '#a1a1aa',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Privacy',
    },
    isVisible: true,
    isLocked: false,
  },
  'footer-link-terms': {
    id: 'footer-link-terms',
    type: 'span',
    name: 'Terms Link',
    parentId: 'footer-links',
    styles: {
      desktop: {
        fontSize: '13px',
        color: '#a1a1aa',
      },
      tablet: {},
      mobile: {},
    },
    props: {
      textContent: 'Terms of Service',
    },
    isVisible: true,
    isLocked: false,
  },
};

interface EditorState {
  // UI Options
  mode: 'design' | 'code' | 'preview';
  zoom: number;
  viewportDevice: ViewportDevice;
  
  // Elements state
  elements: Record<string, EditorElement>;
  rootElementId: string;
  
  // Selection/Hover state
  selectedElementId: string | null;
  hoveredElementId: string | null;
  
  // Collapsed layer tree nodes
  collapsedNodes: Record<string, boolean>;
  
  // History state
  history: HistoryState;

  // Actions
  setMode: (mode: 'design' | 'code' | 'preview') => void;
  setZoom: (zoom: number) => void;
  setViewportDevice: (device: ViewportDevice) => void;
  setHoveredElementId: (id: string | null) => void;
  setSelectedElementId: (id: string | null) => void;
  toggleNodeCollapse: (id: string) => void;
  
  // Property modifiers
  updateElementStyle: (elementId: string, property: keyof ElementStyles, value: string) => void;
  updateElementProp: (elementId: string, propName: string, value: any) => void;
  renameElement: (elementId: string, newName: string) => void;
  toggleElementVisibility: (elementId: string) => void;
  toggleElementLock: (elementId: string) => void;
  
  // Element manipulation (Addition, Duplication, Deletion)
  addElement: (parentId: string, type: string, name: string) => void;
  deleteElement: (elementId: string) => void;
  duplicateElement: (elementId: string) => void;
  
  // History Actions
  pushHistory: (description: string) => void;
  undo: () => void;
  redo: () => void;
  resetToInitial: () => void;

  // Project Import & Presets
  importProjectElements: (newElements: Record<string, EditorElement>) => void;
  loadPresetProject: (preset: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  mode: 'design',
  zoom: 100,
  viewportDevice: 'desktop',
  elements: JSON.parse(JSON.stringify(initialElements)),
  rootElementId: 'page-root',
  selectedElementId: null,
  hoveredElementId: null,
  collapsedNodes: {},
  history: {
    past: [],
    future: [],
  },

  setMode: (mode) => set({ mode, selectedElementId: mode === 'preview' ? null : get().selectedElementId }),
  setZoom: (zoom) => set({ zoom }),
  setViewportDevice: (viewportDevice) => set({ viewportDevice }),
  setHoveredElementId: (hoveredElementId) => set({ hoveredElementId }),
  setSelectedElementId: (selectedElementId) => set({ selectedElementId }),
  
  toggleNodeCollapse: (id) => set((state) => ({
    collapsedNodes: {
      ...state.collapsedNodes,
      [id]: !state.collapsedNodes[id],
    }
  })),

  pushHistory: (description) => {
    const { elements, history } = get();
    const newItem: HistoryItem = {
      elements: JSON.parse(JSON.stringify(elements)),
      description,
    };
    set({
      history: {
        past: [...history.past, newItem].slice(-30), // Limit history size
        future: [],
      }
    });
  },

  undo: () => {
    const { history, elements } = get();
    if (history.past.length === 0) return;
    
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    const currentSnapshot: HistoryItem = {
      elements: JSON.parse(JSON.stringify(elements)),
      description: previous.description,
    };

    set({
      elements: previous.elements,
      history: {
        past: newPast,
        future: [currentSnapshot, ...history.future],
      },
      selectedElementId: previous.elements[get().selectedElementId || ''] ? get().selectedElementId : null
    });
  },

  redo: () => {
    const { history, elements } = get();
    if (history.future.length === 0) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);
    const currentSnapshot: HistoryItem = {
      elements: JSON.parse(JSON.stringify(elements)),
      description: next.description,
    };

    set({
      elements: next.elements,
      history: {
        past: [...history.past, currentSnapshot],
        future: newFuture,
      },
      selectedElementId: next.elements[get().selectedElementId || ''] ? get().selectedElementId : null
    });
  },

  updateElementStyle: (elementId, property, value) => {
    const { elements, viewportDevice } = get();
    const element = elements[elementId];
    if (!element) return;

    get().pushHistory(`Update style ${String(property)} of ${element.name}`);

    const updatedElements = { ...elements };
    const stylesClone = JSON.parse(JSON.stringify(element.styles));
    
    // Set style value for current active viewport device
    stylesClone[viewportDevice] = {
      ...stylesClone[viewportDevice],
      [property]: value === '' ? undefined : value,
    };

    // Clean up undefined properties
    if (value === '') {
      delete stylesClone[viewportDevice][property];
    }

    updatedElements[elementId] = {
      ...element,
      styles: stylesClone,
    };

    set({ elements: updatedElements });
  },

  updateElementProp: (elementId, propName, value) => {
    const { elements } = get();
    const element = elements[elementId];
    if (!element) return;

    get().pushHistory(`Update property ${propName} of ${element.name}`);

    const updatedElements = { ...elements };
    updatedElements[elementId] = {
      ...element,
      props: {
        ...element.props,
        [propName]: value,
      }
    };

    set({ elements: updatedElements });
  },

  renameElement: (elementId, newName) => {
    const { elements } = get();
    const element = elements[elementId];
    if (!element) return;

    get().pushHistory(`Rename ${element.name} to ${newName}`);

    const updatedElements = { ...elements };
    updatedElements[elementId] = {
      ...element,
      name: newName,
    };

    set({ elements: updatedElements });
  },

  toggleElementVisibility: (elementId) => {
    const { elements } = get();
    const element = elements[elementId];
    if (!element) return;

    get().pushHistory(`Toggle visibility of ${element.name}`);

    const updatedElements = { ...elements };
    updatedElements[elementId] = {
      ...element,
      isVisible: element.isVisible === false ? true : false,
    };

    set({ elements: updatedElements });
  },

  toggleElementLock: (elementId) => {
    const { elements } = get();
    const element = elements[elementId];
    if (!element) return;

    get().pushHistory(`Toggle lock of ${element.name}`);

    const updatedElements = { ...elements };
    updatedElements[elementId] = {
      ...element,
      isLocked: !element.isLocked,
    };

    set({ elements: updatedElements });
  },

  addElement: (parentId, type, name) => {
    const { elements } = get();
    const parent = elements[parentId];
    if (!parent) return;

    get().pushHistory(`Add new ${type} under ${parent.name}`);

    const newId = `element-${Date.now()}`;
    const newElement: EditorElement = {
      id: newId,
      type,
      name,
      parentId,
      styles: {
        desktop: {
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '16px',
          paddingRight: '16px',
          borderRadius: '4px',
          backgroundColor: '#27272a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tablet: {},
        mobile: {},
      },
      props: {
        textContent: `New ${name}`,
      },
      children: type === 'div' || type === 'section' || type === 'nav' ? [] : undefined,
      isVisible: true,
      isLocked: false,
    };

    const updatedElements = { ...elements };
    updatedElements[newId] = newElement;
    
    const parentChildren = parent.children ? [...parent.children, newId] : [newId];
    updatedElements[parentId] = {
      ...parent,
      children: parentChildren,
    };

    set({ elements: updatedElements, selectedElementId: newId });
  },

  deleteElement: (elementId) => {
    const { elements, rootElementId, selectedElementId, hoveredElementId } = get();
    if (elementId === rootElementId) return; // Cannot delete root page

    const element = elements[elementId];
    if (!element) return;

    get().pushHistory(`Delete element ${element.name}`);

    const updatedElements = { ...elements };
    
    // Remove pointer in parent's children array
    if (element.parentId && updatedElements[element.parentId]) {
      const parent = updatedElements[element.parentId];
      updatedElements[element.parentId] = {
        ...parent,
        children: parent.children ? parent.children.filter((cid) => cid !== elementId) : [],
      };
    }

    // Recursive helper to remove node and all nested children
    const removeNodeRecursive = (id: string) => {
      const node = updatedElements[id];
      if (!node) return;
      if (node.children) {
        node.children.forEach((childId) => removeNodeRecursive(childId));
      }
      delete updatedElements[id];
    };

    removeNodeRecursive(elementId);

    set({
      elements: updatedElements,
      selectedElementId: selectedElementId === elementId ? null : selectedElementId,
      hoveredElementId: hoveredElementId === elementId ? null : hoveredElementId,
    });
  },

  duplicateElement: (elementId) => {
    const { elements, rootElementId } = get();
    if (elementId === rootElementId) return;

    const sourceElement = elements[elementId];
    if (!sourceElement || !sourceElement.parentId) return;

    get().pushHistory(`Duplicate element ${sourceElement.name}`);

    const updatedElements = { ...elements };
    const parentId = sourceElement.parentId;
    const parent = updatedElements[parentId];
    if (!parent) return;

    // Helper to deeply copy elements with new generated IDs
    const duplicateNode = (targetId: string, newParentId: string): string => {
      const original = elements[targetId];
      if (!original) return '';

      const cloneId = `${original.id}-copy-${Date.now().toString().slice(-4)}`;
      const clonedChildren: string[] = [];

      const clone: EditorElement = {
        ...original,
        id: cloneId,
        parentId: newParentId,
        name: `${original.name} (Copy)`,
        styles: JSON.parse(JSON.stringify(original.styles)),
        props: JSON.parse(JSON.stringify(original.props)),
        children: original.children ? [] : undefined,
      };

      updatedElements[cloneId] = clone;

      if (original.children) {
        original.children.forEach((childId) => {
          const newChildId = duplicateNode(childId, cloneId);
          if (newChildId) {
            clonedChildren.push(newChildId);
          }
        });
        clone.children = clonedChildren;
      }

      return cloneId;
    };

    const topClonedId = duplicateNode(elementId, parentId);
    
    if (topClonedId) {
      // Insert duplicate immediately after the original element in parent's children
      const originalIndex = parent.children ? parent.children.indexOf(elementId) : -1;
      const newChildren = parent.children ? [...parent.children] : [];
      if (originalIndex !== -1) {
        newChildren.splice(originalIndex + 1, 0, topClonedId);
      } else {
        newChildren.push(topClonedId);
      }

      updatedElements[parentId] = {
        ...parent,
        children: newChildren,
      };

      set({
        elements: updatedElements,
        selectedElementId: topClonedId,
      });
    }
  },

  resetToInitial: () => {
    set({
      elements: JSON.parse(JSON.stringify(initialElements)),
      selectedElementId: null,
      hoveredElementId: null,
      zoom: 100,
      viewportDevice: 'desktop',
      mode: 'design',
      history: {
        past: [],
        future: [],
      }
    });
  },

  importProjectElements: (newElements: Record<string, EditorElement>) => {
    get().pushHistory('Import custom project elements');
    set({
      elements: newElements,
      selectedElementId: null,
      hoveredElementId: null,
    });
  },

  loadPresetProject: (preset: string) => {
    get().pushHistory(`Load preset project: ${preset}`);
    if (preset === 'portfolio') {
      const portfolioElements: Record<string, EditorElement> = {
        'page-root': {
          id: 'page-root',
          type: 'section',
          name: 'Portfolio Wrapper',
          styles: {
            desktop: {
              backgroundColor: '#09090b',
              color: '#f4f4f5',
              width: '100%',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '0px',
              paddingBottom: '48px',
              fontFamily: 'Inter, sans-serif',
            },
            tablet: {}, mobile: {}
          },
          props: {},
          children: ['pf-nav', 'pf-hero', 'pf-projects-grid', 'pf-footer'],
          isVisible: true, isLocked: false
        },
        'pf-nav': {
          id: 'pf-nav', type: 'nav', name: 'Navbar', parentId: 'page-root',
          styles: {
            desktop: {
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: '20px', paddingBottom: '20px', paddingLeft: '40px', paddingRight: '40px',
              borderBottomWidth: '1px', borderColor: '#27272a', backgroundColor: '#09090b'
            }, tablet: {}, mobile: {}
          },
          props: {}, children: ['pf-logo', 'pf-cta-btn'], isVisible: true, isLocked: false
        },
        'pf-logo': {
          id: 'pf-logo', type: 'div', name: 'Developer Name', parentId: 'pf-nav',
          styles: { desktop: { fontSize: '18px', fontWeight: '800', color: '#ffffff' }, tablet: {}, mobile: {} },
          props: { textContent: 'Alex Rivera — Fullstack Eng' }, isVisible: true, isLocked: false
        },
        'pf-cta-btn': {
          id: 'pf-cta-btn', type: 'button', name: 'Contact Button', parentId: 'pf-nav',
          styles: {
            desktop: {
              backgroundColor: '#a855f7', color: '#ffffff', paddingTop: '8px', paddingBottom: '8px',
              paddingLeft: '18px', paddingRight: '18px', borderRadius: '8px', fontWeight: '600', fontSize: '13px'
            }, tablet: {}, mobile: {}
          },
          props: { textContent: 'Get In Touch' }, isVisible: true, isLocked: false
        },
        'pf-hero': {
          id: 'pf-hero', type: 'section', name: 'Hero Banner', parentId: 'page-root',
          styles: {
            desktop: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              paddingTop: '80px', paddingBottom: '60px', paddingLeft: '24px', paddingRight: '24px', gap: '16px'
            }, tablet: {}, mobile: {}
          },
          props: {}, children: ['pf-badge', 'pf-title', 'pf-subtitle'], isVisible: true, isLocked: false
        },
        'pf-badge': {
          id: 'pf-badge', type: 'span', name: 'Badge Pill', parentId: 'pf-hero',
          styles: {
            desktop: {
              backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', borderWidth: '1px', borderColor: 'rgba(168, 85, 247, 0.3)',
              paddingTop: '4px', paddingBottom: '4px', paddingLeft: '12px', paddingRight: '12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700'
            }, tablet: {}, mobile: {}
          },
          props: { textContent: '🚀 Available for Freelance & Senior Roles' }, isVisible: true, isLocked: false
        },
        'pf-title': {
          id: 'pf-title', type: 'h1', name: 'Main Heading', parentId: 'pf-hero',
          styles: { desktop: { fontSize: '48px', fontWeight: '800', color: '#ffffff', maxWidth: '800px', lineHeight: '1.2' }, tablet: {}, mobile: {} },
          props: { textContent: 'Crafting Next-Gen Web Apps with Next.js & React 19' }, isVisible: true, isLocked: false
        },
        'pf-subtitle': {
          id: 'pf-subtitle', type: 'p', name: 'Subheading', parentId: 'pf-hero',
          styles: { desktop: { fontSize: '16px', color: '#a1a1aa', maxWidth: '600px', lineHeight: '1.6' }, tablet: {}, mobile: {} },
          props: { textContent: 'Passionate software engineer specializing in modern frontend architecture, visual builder tools, and scalable design systems.' }, isVisible: true, isLocked: false
        },
        'pf-projects-grid': {
          id: 'pf-projects-grid', type: 'div', name: 'Featured Projects Section', parentId: 'page-root',
          styles: {
            desktop: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', paddingBottom: '60px',
              paddingLeft: '32px', paddingRight: '32px', gap: '32px'
            }, tablet: {}, mobile: {}
          },
          props: {}, children: ['pf-grid-title', 'pf-card-1'], isVisible: true, isLocked: false
        },
        'pf-grid-title': {
          id: 'pf-grid-title', type: 'h2', name: 'Section Title', parentId: 'pf-projects-grid',
          styles: { desktop: { fontSize: '28px', fontWeight: '800', color: '#ffffff' }, tablet: {}, mobile: {} },
          props: { textContent: 'Featured Showcase' }, isVisible: true, isLocked: false
        },
        'pf-card-1': {
          id: 'pf-card-1', type: 'div', name: 'Project Card 1', parentId: 'pf-projects-grid',
          styles: {
            desktop: {
              backgroundColor: '#121214', borderWidth: '1px', borderColor: '#27272a', borderRadius: '16px',
              paddingTop: '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px', width: '100%', maxWidth: '700px',
              display: 'flex', flexDirection: 'column', gap: '12px'
            }, tablet: {}, mobile: {}
          },
          props: {}, children: ['pf-card-head', 'pf-card-desc'], isVisible: true, isLocked: false
        },
        'pf-card-head': {
          id: 'pf-card-head', type: 'h3', name: 'Project Name', parentId: 'pf-card-1',
          styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#ffffff' }, tablet: {}, mobile: {} },
          props: { textContent: '⚡ CodeCanvas Next.js Visual Studio' }, isVisible: true, isLocked: false
        },
        'pf-card-desc': {
          id: 'pf-card-desc', type: 'p', name: 'Project Description', parentId: 'pf-card-1',
          styles: { desktop: { fontSize: '14px', color: '#a1a1aa', lineHeight: '1.5' }, tablet: {}, mobile: {} },
          props: { textContent: 'A high-performance visual website builder built with Next.js App Router, Tailwind CSS, and Zustand state management.' }, isVisible: true, isLocked: false
        },
        'pf-footer': {
          id: 'pf-footer', type: 'div', name: 'Footer', parentId: 'page-root',
          styles: {
            desktop: {
              display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '32px', borderTopWidth: '1px', borderColor: '#27272a',
              color: '#71717a', fontSize: '12px'
            }, tablet: {}, mobile: {}
          },
          props: { textContent: '© 2026 Alex Rivera. All rights reserved.' }, isVisible: true, isLocked: false
        }
      };
      set({ elements: portfolioElements, selectedElementId: null });
    } else if (preset === 'ecommerce') {
      const ecomElements: Record<string, EditorElement> = {
        'page-root': {
          id: 'page-root', type: 'section', name: 'E-Commerce Store Wrapper',
          styles: {
            desktop: { backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Outfit, sans-serif' },
            tablet: {}, mobile: {}
          },
          props: {}, children: ['ec-nav', 'ec-hero', 'ec-products', 'ec-footer'], isVisible: true, isLocked: false
        },
        'ec-nav': {
          id: 'ec-nav', type: 'nav', name: 'Store Navbar', parentId: 'page-root',
          styles: {
            desktop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '18px', paddingBottom: '18px', paddingLeft: '32px', paddingRight: '32px', borderBottomWidth: '1px', borderColor: '#27272a', backgroundColor: '#09090b' },
            tablet: {}, mobile: {}
          },
          props: {}, children: ['ec-logo', 'ec-cart-btn'], isVisible: true, isLocked: false
        },
        'ec-logo': {
          id: 'ec-logo', type: 'div', name: 'Brand Name', parentId: 'ec-nav',
          styles: { desktop: { fontSize: '20px', fontWeight: '800', color: '#ffffff' }, tablet: {}, mobile: {} },
          props: { textContent: 'AURORA — Modern Goods' }, isVisible: true, isLocked: false
        },
        'ec-cart-btn': {
          id: 'ec-cart-btn', type: 'button', name: 'Cart Button', parentId: 'ec-nav',
          styles: { desktop: { backgroundColor: '#10b981', color: '#ffffff', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px', borderRadius: '8px', fontWeight: '700', fontSize: '13px' }, tablet: {}, mobile: {} },
          props: { textContent: 'Cart (0)' }, isVisible: true, isLocked: false
        },
        'ec-hero': {
          id: 'ec-hero', type: 'section', name: 'Promo Banner', parentId: 'page-root',
          styles: {
            desktop: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '70px', paddingBottom: '50px', gap: '16px', backgroundColor: '#121214', borderBottomWidth: '1px', borderColor: '#27272a' },
            tablet: {}, mobile: {}
          },
          props: {}, children: ['ec-hero-title', 'ec-hero-sub', 'ec-shop-btn'], isVisible: true, isLocked: false
        },
        'ec-hero-title': {
          id: 'ec-hero-title', type: 'h1', name: 'Hero Title', parentId: 'ec-hero',
          styles: { desktop: { fontSize: '44px', fontWeight: '800', color: '#ffffff' }, tablet: {}, mobile: {} },
          props: { textContent: 'Minimalist Tech Accessories' }, isVisible: true, isLocked: false
        },
        'ec-hero-sub': {
          id: 'ec-hero-sub', type: 'p', name: 'Hero Subtitle', parentId: 'ec-hero',
          styles: { desktop: { fontSize: '16px', color: '#a1a1aa' }, tablet: {}, mobile: {} },
          props: { textContent: 'Premium aluminum stands, mechanical keyboards, and studio gear.' }, isVisible: true, isLocked: false
        },
        'ec-shop-btn': {
          id: 'ec-shop-btn', type: 'button', name: 'Shop Now Button', parentId: 'ec-hero',
          styles: { desktop: { backgroundColor: '#ffffff', color: '#000000', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '24px', paddingRight: '24px', borderRadius: '8px', fontWeight: '700', fontSize: '14px' }, tablet: {}, mobile: {} },
          props: { textContent: 'Explore Catalog' }, isVisible: true, isLocked: false
        },
        'ec-products': {
          id: 'ec-products', type: 'div', name: 'Products Grid Wrapper', parentId: 'page-root',
          styles: { desktop: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', paddingBottom: '60px', gap: '24px' }, tablet: {}, mobile: {} },
          props: {}, children: ['ec-prod-title', 'ec-card-1'], isVisible: true, isLocked: false
        },
        'ec-prod-title': {
          id: 'ec-prod-title', type: 'h2', name: 'Featured Header', parentId: 'ec-products',
          styles: { desktop: { fontSize: '24px', fontWeight: '800', color: '#ffffff' }, tablet: {}, mobile: {} },
          props: { textContent: 'Featured Collection' }, isVisible: true, isLocked: false
        },
        'ec-card-1': {
          id: 'ec-card-1', type: 'div', name: 'Product Card 1', parentId: 'ec-products',
          styles: { desktop: { backgroundColor: '#121214', borderWidth: '1px', borderColor: '#27272a', borderRadius: '16px', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px', width: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }, tablet: {}, mobile: {} },
          props: {}, children: ['ec-p1-name', 'ec-p1-price'], isVisible: true, isLocked: false
        },
        'ec-p1-name': {
          id: 'ec-p1-name', type: 'h3', name: 'Product Title', parentId: 'ec-card-1',
          styles: { desktop: { fontSize: '16px', fontWeight: '700', color: '#ffffff' }, tablet: {}, mobile: {} },
          props: { textContent: 'Studio Aluminium Stand' }, isVisible: true, isLocked: false
        },
        'ec-p1-price': {
          id: 'ec-p1-price', type: 'p', name: 'Price Text', parentId: 'ec-card-1',
          styles: { desktop: { fontSize: '14px', fontWeight: '800', color: '#10b981' }, tablet: {}, mobile: {} },
          props: { textContent: '$89.00 USD' }, isVisible: true, isLocked: false
        },
        'ec-footer': {
          id: 'ec-footer', type: 'div', name: 'Store Footer', parentId: 'page-root',
          styles: { desktop: { display: 'flex', justifyContent: 'center', paddingTop: '24px', color: '#71717a', fontSize: '12px' }, tablet: {}, mobile: {} },
          props: { textContent: '© 2026 AURORA Goods Inc. All rights reserved.' }, isVisible: true, isLocked: false
        }
      };
      set({ elements: ecomElements, selectedElementId: null });
    } else {
      set({ elements: JSON.parse(JSON.stringify(initialElements)), selectedElementId: null });
    }
  }
}));

