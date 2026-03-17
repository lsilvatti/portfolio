'use client';

import { useMemo, useState } from 'react';
import { Button, Toast } from "@/components/atoms";
import { Play, CircleAlert, RefreshCw } from 'lucide-react';
import { GithubIcon } from "@/components/atoms/Icon";
import { useToast } from "@/hooks";
import { get } from 'http';
import { useTranslations } from 'next-intl';

interface ProjectActionButtonsProps {
    repoUrl: string;
    homepageUrl?: string | null;
    isPortfolio: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export function ProjectActionButtons({ repoUrl, homepageUrl, isPortfolio, className, style }: ProjectActionButtonsProps) {
    const t = useTranslations('pages.projects');
    
    const { message, show } = useToast();
    const [clickCount, setClickCount] = useState(0);

    const easterEggButtonLabelAndIcon = useMemo(() => {
        if (clickCount === 0) return { label: t('liveDemo'), icon: Play };
        if (clickCount === 1) return { label: t('warningAlreadyInProject'), icon: CircleAlert };
        if (clickCount === 2) return { label: t('collapseImminent'), icon: CircleAlert };
        return { label: t('inceptionModeBoom'), icon: CircleAlert };
    }, [clickCount]);
    
    const handleEasterEgg = (e: React.MouseEvent) => {
        e.preventDefault();
        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount === 1) {
            show({ title: t('inceptionModeActivated'), description: t('alreadyInProject'), variant: "warning" });
        } else if (newCount === 2) {
            show({ title: t('warning'), description: t('spaceTimeWarning'), variant: "error" });
        } else {
            show({ title: t('boom'), description: t('universeCollapsed'), variant: "primary" });

            document.body.style.transition = "transform 1s ease-in-out";
            document.body.style.transform = "rotate(360deg)";

            setTimeout(() => {
                document.body.style.transition = "none";
                document.body.style.transform = "none";
                setClickCount(0);
            }, 1000);
        }
    };

    return (
        <div className={`flex items-center gap-4 mt-4 ${className}`} style={style}>
            <Button rounded size="md" iconLeft={GithubIcon} href={repoUrl}
                target="_blank" className="bg-[#24292F] hover:bg-[#1a1e23] text-white opacity-0 animate-fade-pop-in" style={{ animationDelay: '0.25s' }}>
                {t('viewOnGitHub')}
            </Button>

            {(homepageUrl && !isPortfolio) && (
                <Button rounded variant="primary" size="md" iconLeft={Play} href={homepageUrl}
                    target="_blank" className="text-white opacity-0 animate-fade-pop-in" style={{ animationDelay: '0.30s' }}>
                    {t('liveDemo')}
                </Button>
            )}

            {(homepageUrl && isPortfolio) && (
                <Button 
                    rounded 
                    size="md" 
                    onClick={handleEasterEgg}
                    className="bg-[#ff00e6] hover:bg-[#ff2eee] text-white opacity-0 animate-fade-pop-in flex items-center gap-2" 
                    style={{ animationDelay: '0.30s' }}
                    iconLeft={easterEggButtonLabelAndIcon.icon}
                >
                    {easterEggButtonLabelAndIcon.label}
                </Button>
            )}
            <Toast message={message}/>
        </div>
    );
}