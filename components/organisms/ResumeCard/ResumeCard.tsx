import { Card, DownloadButton, ShareButton } from '@/components/atoms';
import { ResumeView } from '../ResumeView';
import { useTranslations } from 'next-intl';

export function ResumeCard(){
    const t = useTranslations('pages.resume');
    
    return (      
         <Card variant="default" className='mt-8 mb-8 py-10 px-6 xl:py-14 xl:px-14 animate-fade-pop-in relative flex flex-col gap-8'>
            <ShareButton className='absolute -top-6 right-4' />

            <ResumeView  />

            <DownloadButton href={t('resumeUrl')} filename={t('resumeFileName')} rounded variant="outline"> 
              {t('downloadResume')}
            </DownloadButton>
        </Card>
    );
};
