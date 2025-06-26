import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="rounded-lg bg-primary p-2">
        <Send className="h-5 w-5 text-primary-foreground" />
      </div>
      <h1 className="text-xl font-bold text-foreground">InvoicePilot</h1>
    </div>
  );
}
