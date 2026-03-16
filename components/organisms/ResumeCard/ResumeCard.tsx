import { Button, Card, ShareButton } from '@/components/atoms';
import { ResumeView } from '../ResumeView';
import { useTranslations } from 'next-intl';

export function ResumeCard(){
    const t = useTranslations('pages.resume');
    
    return (      
         <Card variant="default" className='mt-8 mb-8 p-6 pt-10 pb-10 xl:p-16 animate-fade-pop-in relative'>
            <ShareButton className='absolute -top-6 right-4' />
            <ResumeView  />
        </Card>
    );
};
