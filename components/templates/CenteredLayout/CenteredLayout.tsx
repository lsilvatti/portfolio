import { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
}

export const CenteredLayout = ({ children }: CenteredLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 overflow-hidden">
      {children}
    </div>
  );
};