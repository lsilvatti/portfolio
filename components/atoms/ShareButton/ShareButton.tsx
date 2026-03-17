'use client';

import { Share2 } from 'lucide-react';
import { IconButton, Toast } from '@/components/atoms';
import { useToast } from '@/hooks';
import { useTranslations } from 'next-intl';

export interface ShareButtonProps {
    title?: string;
    text?: string;
    url?: string;
    className?: string;
    style?: React.CSSProperties;
}

export function ShareButton({ title, text, url, className, style }: ShareButtonProps) {
    const t = useTranslations('common.shareButton');
    const { message, show } = useToast();

    const handleShare = async () => {
        const shareUrl = url ?? window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url: shareUrl });
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    show({ title: t('failed'), variant: 'error' });
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                show({ title: t('copied'), variant: 'success' });
            } catch {
                show({ title: t('failed'), variant: 'error' });
            }
        }
    };

    return (
        <>
            <IconButton
                icon={Share2}
                label={t('label')}
                variant="primary"
                className={className}
                size="lg"
                tooltip={<span>{t('tooltip')}</span>}
                style={style}
                onClick={handleShare}
            />
            <Toast message={message} />
        </>
    );
}
