import type { ComponentPropsWithoutRef } from 'react';
import type { Components } from 'react-markdown';
import {
  BlockQuote,
  CodeBlock,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from '@/components/atoms';

type CodeProps = ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
};

export const markdownComponents: Components = {
  h1: (props) => <Typography variant="h1" className="mb-4" {...props} />,
  h2: (props) => (
    <>
      <Typography variant="h2" className="mt-14 mb-2 tracking-wide" {...props} />
      <Divider className="mb-5" />
    </>
  ),
  h3: (props) => <Typography variant="h3" className="mb-8 font-bold" {...props} />,
  h4: (props) => <Typography variant="h4" className="mb-6 text-secondary-hover" {...props} />,
  p: (props) => <Typography variant="body" className="mb-4" {...props} />,
  a: ({ href, children, ...props }) => (
    <a
      {...props}
      href={href ?? '#'}
      target={href?.charAt(0) === '#' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="wrap-break-word text-primary hover:text-primary-hover"
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="mb-3 ml-4 list-disc space-y-1 text-base">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="mb-3 ml-4 list-decimal space-y-1 text-base">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="mb-2 text-base">
      {children}
    </li>
  ),
  blockquote: (props) => <BlockQuote {...props} />,
  table: (props) => <Table {...props} />,
  thead: (props) => <TableHeader {...props} />,
  tbody: (props) => <TableBody {...props} />,
  tr: (props) => <TableRow {...props} />,
  th: (props) => <TableHead {...props} />,
  td: (props) => <TableCell {...props} />,
  code: ({ inline, className, children, ...props }: CodeProps) => (
    <CodeBlock inline={inline} className={`wrap-break-word ${className ?? ''}`} {...props}>
      {children}
    </CodeBlock>
  ),
  pre: ({ children }) => <>{children}</>,
};
