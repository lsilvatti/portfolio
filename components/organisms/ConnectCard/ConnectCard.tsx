import { Avatar, Button, Card, Icon, IconButton, Typography } from "@/components/atoms"

export const ConnectCard = () => {
    return (
        <Card className="flex flex-col items-center gap-4 p-8 relative max-w-xl animate-fade-down" style={{ animationDelay: '0.1s' }}>
            <Avatar border="primary" size="lg" alt="Profile Picture" className="absolute -top-16" src="/profile.jpeg" />
            <Typography variant="h2" className="text-center pt-12">
                Let's Connect!
            </Typography>
            <Typography variant="body" className="text-center">
                I'm always open to new opportunities and collaborations. Feel free to reach out to me through any of the platforms below!
            </Typography>
            <div className="flex flex-col gap-6 mt-6 w-full max-w-md">
                <div>
                    <Button
                        fullWidth
                        iconLeft="linkedin"
                        className="bg-[#0A66C2] hover:bg-[#004182] text-white"
                    >
                        LinkedIn
                    </Button>
                </div>

                <Button
                    fullWidth
                    iconLeft="github"
                    className="bg-[#24292F] hover:bg-[#1a1e23] text-white"
                >
                    GitHub
                </Button>

                <Button
                    fullWidth
                    iconLeft="email"
                    className="bg-[#EA4335] hover:bg-[#c5221f] text-white"
                >
                    E-mail
                </Button>

                <Button
                    fullWidth
                    iconLeft="external"
                    className="bg-[#006BFF] hover:bg-[#0054cc] text-white"
                >
                    Calendly
                </Button>
            </div>
        </Card>
    )
}
