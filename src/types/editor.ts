export type ViewportDevice = 'desktop' | 'tablet' | 'mobile';
export type EditorMode = 'design' | 'code' | 'preview';

export interface SourceMapInfo {
  file: string;
  line?: number;
  column?: number;
  codeSnippet?: string;
}

export interface ElementStyles {
  // Dimensions
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  
  // Flex & Grid layout
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  flexWrap?: string;
  gap?: string;
  flex?: string;
  gridTemplateColumns?: string;

  // Spacing
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;

  // Typography
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;

  // Appearance & Glassmorphism
  backgroundColor?: string;
  background?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderBottomWidth?: string;
  borderTopWidth?: string;
  borderLeftWidth?: string;
  borderRightWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  opacity?: string;
  boxShadow?: string;
  backdropFilter?: string;
  overflow?: string;
  cursor?: string;

  // Positioning
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: string;
}

export interface EditorElement {
  id: string;
  type: string; // e.g. 'div', 'h1', 'h2', 'h3', 'p', 'button', 'section', 'nav', 'img', 'span'
  name: string;
  source?: SourceMapInfo;
  styles: {
    desktop: ElementStyles;
    tablet: ElementStyles;
    mobile: ElementStyles;
  };
  props: Record<string, any>;
  children?: string[]; // IDs of child elements
  parentId?: string; // pointer to parent element
  isLocked?: boolean;
  isVisible?: boolean;
}

export interface HistoryItem {
  elements: Record<string, EditorElement>;
  description: string;
}

export interface HistoryState {
  past: HistoryItem[];
  future: HistoryItem[];
}

