declare module '*.md' {
  import type { ComponentType, ReactNode } from 'react';

  export interface MDXProps {
    children?: ReactNode;
    components?: Record<string, ComponentType<any> | string>;
  }

  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}

declare module '*.mdx' {
  import type { ComponentType, ReactNode } from 'react';

  export interface MDXProps {
    children?: ReactNode;
    components?: Record<string, ComponentType<any> | string>;
  }

  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}