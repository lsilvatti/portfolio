'use client';

import { ClipboardCopy } from 'lucide-react';
import { IconButton } from '@/components/atoms/IconButton';
import { Toast } from '@/components/atoms/Toast/Toast';
import { useToast } from '@/components/atoms/Toast/useToast';
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
            show(t('copied'));
        } catch {
            show(t('failed'));
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
