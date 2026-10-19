import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import type { ComponentType } from 'react';
import { markdownComponents } from './markdownComponents';

export interface MarkdownVisualizerProps {
    markdown: string | unknown;
}

export async function MarkdownVisualizer({ markdown }: MarkdownVisualizerProps) {
    if(typeof markdown === 'string') {
        return (
            <div className="max-w-none">
                <ReactMarkdown
                    components={markdownComponents}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug]}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        );
    }

    const mdxSource =
      typeof markdown === 'object' && markdown !== null && 'default' in markdown
        ? (markdown as { default?: unknown }).default ?? markdown
        : markdown;
    const MDXComponent = mdxSource as ComponentType<{ components: typeof markdownComponents }>;

    return (
        <div className="max-w-none">
            <MDXComponent components={markdownComponents} />
        </div>
    );
}