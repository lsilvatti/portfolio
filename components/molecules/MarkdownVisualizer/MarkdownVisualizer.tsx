import { Divider, Link, Typography, BlockQuote, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, CodeBlock } from '@/components/atoms'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

const mdxComponents = {
    h1: ({ node, ...props }: any) => <Typography variant="h1" className='mb-4' {...props} />,
    h2: ({ node, ...props }: any) => (
        <>
            <Typography variant="h2" className='mt-8 mb-2' {...props} />
            <Divider className='mb-5' />
        </>
    ),
    h3: ({ node, ...props }: any) => <Typography variant="h3" className='mb-2 font-bold' {...props} />,
    h4: ({ node, ...props }: any) => <Typography variant="h4" className='mb-1 text-secondary-hover' {...props} />,
    p:  ({ node, ...props }: any) => <Typography variant="body" className='mb-2' {...props} />,
    a:  ({ node, ...props }: any) => <Link variant="primary" target={props.href.charAt(0) === '#' ? '_self' : '_blank'} rel='noopener noreferrer' {...props} className='wrap-break-word'/>,
    ul: ({ node, ...props }: any) => <Typography variant="ul" className='mb-2 ml-4 list-disc' {...props} />,
    ol: ({ node, ...props }: any) => <Typography variant="ol" className='mb-2 ml-4 list-decimal' {...props} />,
    li: ({ node, ...props }: any) => <Typography variant="li" className='mb-1' {...props} />,

    blockquote: ({ node, ...props }: any) => <BlockQuote {...props} />,
    
    table: ({ node, ...props }: any) => <Table {...props} />,
    thead: ({ node, ...props }: any) => <TableHeader {...props} />,
    tbody: ({ node, ...props }: any) => <TableBody {...props} />,
    tr: ({ node, ...props }: any) => <TableRow {...props} />,
    th: ({ node, ...props }: any) => <TableHead {...props} />,
    td: ({ node, ...props }: any) => <TableCell {...props} />,

    code: ({ node, inline, className, children, ...props }: any) => (
        <CodeBlock inline={inline} className={`wrap-break-word ${className}`} {...props}>
            {children}
        </CodeBlock>
    ),

    pre: ({ node, children, ...props }: any) => <>{children}</>,
};

export interface MarkdownVisualizerProps {
    markdown: string | any;
}

export async function MarkdownVisualizer({ markdown }: MarkdownVisualizerProps) {
    if(typeof markdown === 'string') {
        return (
            <div className="max-w-none">
                <ReactMarkdown 
                    components={mdxComponents} 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug]}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        );
    }

    let MDXComponent = markdown.default || markdown;

    return (
        <div className="max-w-none">
            <MDXComponent components={mdxComponents} />
        </div>
    );
}