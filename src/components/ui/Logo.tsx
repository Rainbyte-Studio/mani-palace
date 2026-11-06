import React from 'react';
import { useApp } from '../../context/AppContext';

interface LogoProps {
  variant?: 'light' | 'dark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const { navigateTo, settings } = useApp();

  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#202320]';
  const accentColor = 'text-[#B49A70]';
  const subtitleColor = isLight ? 'text-white/60' : 'text-[#777A75]';

  const sizeStyles = {
    sm: {
      text: 'text-base tracking-[0.22em]',
      sub: 'text-[8px] tracking-[0.28em]',
      monogram: 'w-6 h-6 text-xs',
    },
    md: {
      text: 'text-xl tracking-[0.26em]',
      sub: 'text-[9px] tracking-[0.32em]',
      monogram: 'w-8 h-8 text-sm',
    },
    lg: {
      text: 'text-2xl md:text-3xl tracking-[0.3em]',
      sub: 'text-[11px] tracking-[0.35em]',
      monogram: 'w-10 h-10 text-base',
    },
  }[size];

  return (
    <button
      onClick={() => navigateTo('home')}
      className={`group flex items-center gap-3.5 text-left focus:outline-none transition-opacity hover:opacity-90 ${className}`}
      aria-label="MANI PALACE Home"
    >
      {/* Minimal MP Monogram */}
      <div 
        className={`relative ${sizeStyles.monogram} flex items-center justify-center border border-[#B49A70]/60 transition-transform group-hover:border-[#B49A70] duration-300`}
        aria-hidden="true"
      >
        <span className="font-serif text-[#B49A70] font-semibold leading-none select-none tracking-tighter">
          MP
        </span>
        <div className="absolute -top-[2px] -right-[2px] w-[3px] h-[3px] bg-[#B49A70]" />
        <div className="absolute -bottom-[2px] -left-[2px] w-[3px] h-[3px] bg-[#B49A70]" />
      </div>

      {/* Typographic Wordmark */}
      <div className="flex flex-col">
        <span className={`font-serif font-medium uppercase ${textColor} ${sizeStyles.text} transition-colors leading-none`}>
          MANI <span className={accentColor}>PALACE</span>
        </span>
        {showSubtitle && (
          <span className={`font-sans uppercase font-medium mt-1 ${subtitleColor} ${sizeStyles.sub} select-none`}>
            Real Estate & Property Management
          </span>
        )}
      </div>
    </button>
  );
};
