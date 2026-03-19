import { Card, DownloadButton, ShareButton } from '@/components/atoms';
import { ResumeView } from '../ResumeView';
import { useTranslations } from 'next-intl';

export interface ResumeCardProps {
    style?: React.CSSProperties;
    className?: string;
}

export function ResumeCard({ style, className }: ResumeCardProps){
    const t = useTranslations('pages.resume');
    
    return (      
         <Card variant="default" className={`py-10 px-6 xl:py-14 xl:px-14 relative flex flex-col gap-8 ${className}`} style={style}>
            <ShareButton className='absolute -top-6 right-4' />

            <ResumeView  />

            <DownloadButton href={t('resumeUrl')} filename={t('resumeFileName')} rounded variant="outline"> 
              {t('downloadResume')}
            </DownloadButton>
        </Card>
    );
};
