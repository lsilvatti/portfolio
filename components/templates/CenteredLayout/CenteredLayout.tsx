import { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
}

export function CenteredLayout({ children }: CenteredLayoutProps) {
  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center gap-6">
      {children}
    </div>
  );
}