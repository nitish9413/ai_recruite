// components/layout/header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Briefcase className="h-7 w-7 text-primary" />
          <span>JobPortal</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Find a Job</Link>
          </Button>
          <Button asChild>
            <Link href="/jobs/create">Post a Job</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}