// components/layout/page-layout.tsx
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main 
      className={cn(
        "container mx-auto py-8 md:py-10 px-8 md:px-10",
        className
      )}
    >
      {children}
    </main>
  );
}