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
                    show(t('failed'));
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                show(t('copied'));
            } catch {
                show(t('failed'));
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
