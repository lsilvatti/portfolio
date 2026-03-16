'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/atoms/IconButton';

const SCROLL_THRESHOLD = 200;

export function GoToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div
            className={cn(
                'fixed bottom-6 right-6 z-50 transition-all duration-300',
                visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none',
            )}
        >
            <IconButton
                icon={ArrowUp}
                label="Go to top"
                variant="secondary"
                size="md"
                onClick={scrollToTop}
                aria-hidden={!visible}
            />
        </div>
    );
}
