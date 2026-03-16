import { getLocale } from 'next-intl/server';
import { Divider, Link, Typography } from '@/components/atoms'; 

const mdxComponents = {
    h1: (props: any) => <Typography variant="h1" className='mb-4' {...props} />,
    h2: (props: any) => <><Typography variant="h2" className='mt-8 mb-2' {...props} /><Divider className='mb-5' /></>,
    h3: (props: any) => <Typography variant="h3" className='mb-2 font-bold' {...props} />,
    h4: (props: any) => <Typography variant="h4" className='mb-1 text-secondary-hover' {...props} />,
    p:  (props: any) => <Typography variant="body" className='mb-2' {...props} />,
    a:  (props: any) => <Link variant="primary" target='_blank' rel='noopener noreferrer' {...props} />,
    ul: (props: any) => <Typography variant="ul" className='mb-2' {...props} />,
    ol: (props: any) => <Typography variant="ol" className='mb-2' {...props} />,
    li: (props: any) => <Typography variant="li" className='mb-1' {...props} />,
};

export async function ResumeView() {
    const locale = await getLocale();
    let CvComponent;

    if (locale === "en") {
        const file = await import('@/app/data/cv.md'); 
        CvComponent = file.default;
    } else {
        const file = await import('@/app/data/cv-ptbr.md');
        CvComponent = file.default;
    }

    return (
        <div className="max-w-none">
            <CvComponent components={mdxComponents} />
        </div>
    );
}