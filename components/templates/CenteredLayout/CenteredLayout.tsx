import { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
  className?: string;
}

export function CenteredLayout({ children, className }: CenteredLayoutProps) {
  return (
    <div className={`flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center gap-6 py-8 ${className}`}>
      {children}
    </div>
  );
}