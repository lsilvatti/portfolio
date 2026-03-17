import React from 'react';

type HighlighterProps = {
  children?: React.ReactNode;
  language?: string;
  style?: Record<string, unknown>;
  PreTag?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  customStyle?: React.CSSProperties;
  className?: string;
};

const Highlighter = ({ children, PreTag = 'pre' as any }: HighlighterProps) => {
  return React.createElement(PreTag, { className: 'mock-syntax-highlighter' }, React.createElement('code', null, children));
};

// Export several common names used by the library
export const Prism = Highlighter;
export const Light = Highlighter;
export const PrismLight = Highlighter;
export const DefaultHighlighter = Highlighter;

export default Highlighter;

// Common style exports (empty placeholders) so imports don't fail
export const dracula = {};
export const vs = {};
export const atomOneDark = {};

// No-op helpers that some consumers might use
export const registerLanguage = () => {};
export const createElement = React.createElement;
