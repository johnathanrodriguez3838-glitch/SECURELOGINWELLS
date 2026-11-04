import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderBannerProps {
  onMenuClick?: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ onMenuClick }) => {
  return (
    <header className="w-full bg-[#D71E28] text-white shadow-sm select-none relative z-20">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Classic Wells Fargo Serif Wordmark */}
          <span className="font-serif tracking-wider font-extrabold text-lg sm:text-xl text-white uppercase drop-shadow-sm">
            WELLS FARGO
          </span>
        </div>
        <button
          type="button"
          onClick={onMenuClick}
          className="text-white hover:text-gray-200 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>
      {/* Signature Gold Accent Stripe */}
      <div className="w-full h-[3.5px] bg-gradient-to-r from-[#F5BA15] via-[#FFD034] to-[#F5BA15]" />
    </header>
  );
};
