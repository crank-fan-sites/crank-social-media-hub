import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="md:border-e border-stone-400 dark:border-stone-600 py-4 mb-8 md:m-0"
      variant="ghost"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-5 w-5 dark:hidden" strokeWidth={2} />
      <Moon className="hidden h-5 w-5 dark:block" strokeWidth={1.5} />
      <span className="sr-only">Toggle theme</span>
      <span className="dark:hidden ps-2 text-sm">make it dark&hellip;</span>
      <span className="hidden dark:block ps-2 text-sm">see the light</span>
    </Button>
  );
}
