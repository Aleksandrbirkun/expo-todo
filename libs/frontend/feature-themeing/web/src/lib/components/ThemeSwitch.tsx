import { Palette, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export interface ThemeSwitchProps {
  className?: string;
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { toggleTheme, isClassic } = useTheme();

  return (
    <button
      className={`flex items-center py-2 px-3 rounded-lg hover:bg-secondary transition-colors ${
        className || ''
      }`}
      onClick={toggleTheme}
      type="button"
    >
      <div className="mr-2">
        {isClassic ? (
          <Sparkles className="w-5 h-5 text-primary" />
        ) : (
          <Palette className="w-5 h-5 text-primary" />
        )}
      </div>
      <span className="text-base font-medium text-foreground">
        {isClassic ? 'Classic Theme' : 'Default Theme'}
      </span>
    </button>
  );
}