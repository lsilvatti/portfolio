'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MailCheck, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, Link, Typography } from '@/components/atoms';
import { ConnectCard } from '../ConnectCard/ConnectCard';
import { ContactForm } from '../ContactForm/ContactForm';

type ConnectView = 'links' | 'form' | 'success';

interface SuccessCardProps {
    onGoBack: () => void;
    onSendAnother: () => void;
}

interface ConnectViewProps {
    className?: string;
    style?: React.CSSProperties;
}

function SuccessCard({ onGoBack, onSendAnother }: SuccessCardProps) {
    const t = useTranslations('pages.connect.form');

    return (
        <Card className="opacity-0 flex flex-col items-center gap-6 w-full max-w-xl overflow-hidden px-4 py-10 sm:px-6 sm:py-12 animate-fade-pop-in text-center" style={{ animationDelay: '0.05s' }}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-light">
                <MailCheck size={32} className="text-primary" />
            </div>
            <div className="flex flex-col gap-2 min-w-0">
                <Typography variant="h2" className="wrap-break-word">{t('success.title')}</Typography>
                <Typography variant="body" className="wrap-break-word">{t('success.description')}</Typography>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
                <Typography 
                    variant="body" 
                    className="text-muted">
                        {t.rich('success.nextSteps', {
                            goBack: (chunks) => <Link onClick={onGoBack} href={''}>{chunks}</Link>,
                            sendAnother: (chunks) => <Link onClick={onSendAnother} href={''}>{chunks}</Link>
                        })}
                </Typography>
            </div>
        </Card>
    );
}

export function ConnectView({ className, style }: ConnectViewProps) {
    const [view, setView] = useState<ConnectView>('links');

    return (
        <div className={`grid w-full max-w-xl mx-auto ${className}`} style={style}>
            
            <div
                className={cn(
                    'col-start-1 row-start-1 w-full min-w-0 transition-all duration-300 ease-in-out md:mt-20',
                    view === 'links'
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-[0.98] pointer-events-none h-0 overflow-hidden'
                )}
            >
                <ConnectCard onShowForm={() => setView('form')} />
            </div>

            <div
                className={cn(
                    'col-start-1 row-start-1 w-full min-w-0 transition-all duration-300 ease-in-out',
                    view === 'form'
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-[0.98] pointer-events-none h-0 overflow-hidden'
                )}
            >
                <ContactForm
                    onShowLinks={() => setView('links')}
                    onSuccess={() => setView('success')}
                />
            </div>

            <div
                className={cn(
                    'col-start-1 row-start-1 w-full min-w-0 transition-all duration-300 ease-in-out',
                    view === 'success'
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-[0.98] pointer-events-none h-0 overflow-hidden'
                )}
            >
                <SuccessCard
                    onGoBack={() => setView('links')}
                    onSendAnother={() => setView('form')}
                />
            </div>
        </div>
    );
}