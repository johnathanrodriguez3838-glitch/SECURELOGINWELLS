import React, { useEffect } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  durationMs?: number;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  onComplete,
  durationMs = 2000,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isOpen, onComplete, durationMs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Banking Shield & Spinner */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Pulsing ring */}
          <div className="w-20 h-20 rounded-full border-4 border-red-100 animate-ping absolute opacity-50" />
          
          {/* Rotating Spinner */}
          <div className="w-20 h-20 rounded-full border-4 border-[#D71E28]/20 border-t-[#D71E28] animate-spin" />
          
          {/* Centered Bank Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-[#D71E28]">
            <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
          </div>
        </div>

        {/* Short authentication message */}
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 font-serif">
          Verifying Credentials
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xs mb-4">
          Securing encrypted channel & initializing two-factor PIN verification...
        </p>

        {/* Secure connection indicator */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-semibold text-amber-800">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>256-Bit SSL Encrypted Banking Link</span>
        </div>
      </div>
    </div>
  );
};
