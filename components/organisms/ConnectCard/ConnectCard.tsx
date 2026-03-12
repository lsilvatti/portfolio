'use client';

import { Avatar, Button, Card, IconButton, Typography } from "@/components/atoms";
import { LinkedinIcon, GithubIcon, EmailIcon, ExternalIcon, Icon } from "@/components/atoms/Icon";
import { ClipboardCopy, Share2 } from "lucide-react";

export const ConnectCard = () => {
    return (
        <Card className="opacity-0 flex flex-col items-center gap-4 relative max-w-xl pt-12 pb-12 animate-fade-pop-in" style={{ animationDelay: '0.1s' }}>
            <Avatar border="primary" size="lg" alt="Profile Picture" className="absolute -top-16 animate-fade-pop-in" src="/profile.jpeg" />
            
            <IconButton
                icon={Share2}
                label="share-this-page"
                variant="primary"
                className="absolute -top-6 right-6 animate-fade-pop-in"
                size="lg"
                tooltip={<span>Share this page</span>}
                style={{ animationDelay: '0.1s' }}
            />

            <Typography variant="h2" className="text-center pt-12 opacity-0 animate-fade-pop-in" style={{ animationDelay: '0.2s' }}>
                Let's Connect!
            </Typography>
            
            <Typography variant="body" className="text-center opacity-0 animate-fade-pop-in" style={{ animationDelay: '0.3s' }}>
                I'm always open to new opportunities and collaborations. Feel free to reach out to me through any of the platforms below!
            </Typography>
            
            <div className="flex flex-col gap-6 mt-6 w-full max-w-md">
                <div className="flex gap-2">
                    <Button
                        fullWidth
                        iconLeft={LinkedinIcon}
                        className="bg-[#0A66C2] hover:bg-[#004182] text-white opacity-0 animate-fade-pop-in"
                        style={{ animationDelay: '0.4s' }}
                    >
                        LinkedIn
                    </Button>

                    <IconButton
                        icon={ClipboardCopy}
                        label="copy-to-clipboard"
                        variant="ghost"
                        className="animate-fade-pop-in shrink-0"
                        tooltip={<span>Copy to Clipboard</span>}
                        style={{ animationDelay: '0.4s' }}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        fullWidth
                        iconLeft={GithubIcon}
                        className="bg-[#24292F] hover:bg-[#1a1e23] text-white opacity-0 animate-fade-pop-in"
                        style={{ animationDelay: '0.5s' }}
                    >
                        GitHub
                    </Button>

                    <IconButton
                        icon={ClipboardCopy}
                        label="copy-to-clipboard"
                        variant="ghost"
                        className="animate-fade-pop-in shrink-0"
                        tooltip={<span>Copy to Clipboard</span>}
                        style={{ animationDelay: '0.4s' }}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        fullWidth
                        iconLeft={EmailIcon}
                        className="bg-[#EA4335] hover:bg-[#c5221f] text-white opacity-0 animate-fade-pop-in"
                        style={{ animationDelay: '0.6s' }}
                    >
                        E-mail
                    </Button>

                    <IconButton
                        icon={ClipboardCopy}
                        label="copy-to-clipboard"
                        variant="ghost"
                        className="animate-fade-pop-in shrink-0"
                        tooltip={<span>Copy to Clipboard</span>}
                        style={{ animationDelay: '0.4s' }}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        fullWidth
                        iconLeft={ExternalIcon}
                        className="bg-[#006BFF] hover:bg-[#0054cc] text-white opacity-0 animate-fade-pop-in"
                        style={{ animationDelay: '0.7s' }}
                    >
                        Calendly
                    </Button>
                    <IconButton
                        icon={ClipboardCopy}
                        label="copy-to-clipboard"
                        variant="ghost"
                        className="animate-fade-pop-in shrink-0"
                        tooltip={<span>Copy to Clipboard</span>}
                        style={{ animationDelay: '0.4s' }}
                    />
                </div>
            </div>
        </Card>
    );
};