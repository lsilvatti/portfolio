import { ReactNode } from "react";

interface HorizontallyCenteredLayoutProps {
  children: ReactNode;
  className?: string;
}

export function HorizontallyCenteredLayout({ children, className }: HorizontallyCenteredLayoutProps) {
  return (
    <div className={`flex my-16 flex-col items-center gap-6 ${className ? className : ''}`}>
      {children}
    </div>
  );
}