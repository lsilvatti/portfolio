'use client';

import { ClipboardCopy } from 'lucide-react';
import { IconButton, Toast } from '@/components/atoms';
import { useToast } from '@/hooks';
import { useTranslations } from 'next-intl';

export interface CopyButtonProps {
    value: string;
    className?: string;
    style?: React.CSSProperties;
}

export function CopyButton({ value, className, style }: CopyButtonProps) {
    const t = useTranslations('common.copyButton');
    const { message, show } = useToast();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            show({ title: t('copied'), variant: 'success' });
        } catch {
            show({ title: t('failed'), variant: 'error' });
        }
    };

    return (
        <>
            <IconButton
                icon={ClipboardCopy}
                label={t('label')}
                variant="ghost"
                className={className}
                tooltip={<span>{t('tooltip')}</span>}
                style={style}
                onClick={handleCopy}
            />
            <Toast message={message} />
        </>
    );
}
