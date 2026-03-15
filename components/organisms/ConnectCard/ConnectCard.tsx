import { Avatar, Button, Card, CopyButton, ShareButton, Typography } from "@/components/atoms";
import { LinkedinIcon, GithubIcon, EmailIcon, ExternalIcon } from "@/components/atoms/Icon";
import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import { LINK_CALENDLY, LINK_EMAIL, LINK_GITHUB, LINK_LINKEDIN } from "@/constants/contact";

interface ConnectCardProps {
    onShowForm?: () => void;
}

export const ConnectCard = ({ onShowForm }: ConnectCardProps) => {
    const t = useTranslations('connect');
    
    return (
        <Card className="mt-20 opacity-0 flex flex-col items-center gap-3 sm:gap-4 relative w-full max-w-xl px-4 sm:mt-0 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8 animate-fade-pop-in" style={{ animationDelay: '0.1s' }}>
            <Avatar border="primary" size="lg" alt="Profile Picture" className="absolute -top-16 animate-fade-pop-in" src="/profile.jpeg" />
            
            <ShareButton
                className="absolute -top-6 right-4 sm:right-6 animate-fade-pop-in"
                style={{ animationDelay: '0.1s' }}
            />

            <Typography variant="h2" className="text-center pt-8 sm:pt-12 opacity-0 animate-fade-pop-in" style={{ animationDelay: '0.2s' }}>
                {t('letsConnect')}
            </Typography>
            
            <Typography variant="body" className="text-center px-2 opacity-0 animate-fade-pop-in" style={{ animationDelay: '0.3s' }}>
                {t('description')}
            </Typography>
            
            <nav aria-label={t('letsConnect')} className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 w-full max-w-md">
                <div className="flex gap-2">
                    <Button
                        fullWidth
                        href={LINK_LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        iconLeft={LinkedinIcon}
                        className="bg-[#0A66C2] hover:bg-[#004182] text-white opacity-0 animate-fade-pop-in"
                        style={{ animationDelay: '0.4s' }}
                    >
                        {t('linkedin')}
                    </Button>

                    <CopyButton
                        value={LINK_LINKEDIN}
                        className="animate-fade-pop-in shrink-0"
                        style={{ animationDelay: '0.4s' }}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        fullWidth
                        href={LINK_GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        iconLeft={GithubIcon}
                        className="bg-[#24292F] hover:bg-[#1a1e23] text-white opacity-0 animate-fade-pop-in"
                        style={{ animationDelay: '0.5s' }}
                    >
                        {t('github')}
                    </Button>

                    <CopyButton
                        value={LINK_GITHUB}
                        className="animate-fade-pop-in shrink-0"
                        style={{ animationDelay: '0.5s' }}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        fullWidth
                        href={`mailto:${LINK_EMAIL}`}
                        iconLeft={EmailIcon}
                        className="bg-[#EA4335] hover:bg-[#c5221f] text-white opacity-0 animate-fade-pop-in"
                        style={{ animationDelay: '0.6s' }}
                    >
                        {t('email')}
                    </Button>

                    <CopyButton
                        value={LINK_EMAIL}
                        className="animate-fade-pop-in shrink-0"
                        style={{ animationDelay: '0.6s' }}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        fullWidth
                        href={LINK_CALENDLY}
                        target="_blank"
                        rel="noopener noreferrer"
                        iconLeft={ExternalIcon}
                        className="bg-[#006BFF] hover:bg-[#0054cc] text-white opacity-0 animate-fade-pop-in"
                        style={{ animationDelay: '0.7s' }}
                    >
                        {t('calendly')}
                    </Button>

                    <CopyButton
                        value={LINK_CALENDLY}
                        className="animate-fade-pop-in shrink-0"
                        style={{ animationDelay: '0.7s' }}
                    />
                </div>
            </nav>

            <button
                type="button"
                onClick={onShowForm}
                aria-label={t('sendMessage')}
                className="mt-4 flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors duration-200 opacity-0 animate-fade-pop-in"
                style={{ animationDelay: '0.8s' }}
            >
                <MessageSquare size={14} aria-hidden="true" />
                {t('sendMessage')}
            </button>
        </Card>
    );
};