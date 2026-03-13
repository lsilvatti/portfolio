'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ConnectCard } from '../ConnectCard/ConnectCard';
import { ContactForm } from '../ContactForm/ContactForm';
import type { ContactFormData } from '../ContactForm/ContactForm';

type ConnectView = 'links' | 'form';

interface ConnectViewProps {
    /** Stub — implement sending logic when ready. */
    onFormSubmit?: (data: ContactFormData) => void | Promise<void>;
}

export function ConnectView({ onFormSubmit }: ConnectViewProps) {
    const [view, setView] = useState<ConnectView>('links');

    return (
        <div className="grid w-full max-w-xl">
            <div
                className={cn(
                    'col-start-1 row-start-1 w-full transition-all duration-300 ease-in-out',
                    view === 'links'
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-[0.98] pointer-events-none h-0 overflow-hidden'
                )}
            >
                <ConnectCard onShowForm={() => setView('form')} />
            </div>

            <div
                className={cn(
                    'col-start-1 row-start-1 w-full transition-all duration-300 ease-in-out',
                    view === 'form'
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-[0.98] pointer-events-none h-0 overflow-hidden'
                )}
            >
                <ContactForm
                    onShowLinks={() => setView('links')}
                    onSubmit={onFormSubmit}
                />
            </div>
        </div>
    );
}
