import { getLocale } from 'next-intl/server';
import { MarkdownVisualizer } from '@/components/molecules';

export async function ResumeView() {
    const locale = await getLocale();

    let resume = await import('@/app/data/cv-ptbr.md');

    if (locale === "en") {
        resume = await import('@/app/data/cv.md');
    }

    return (
        <div className="max-w-none">
            <MarkdownVisualizer markdown={resume} />
        </div>
    );
}