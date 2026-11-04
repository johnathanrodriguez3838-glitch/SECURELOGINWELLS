import React, { useState, useEffect, useRef } from 'react';
import { Lock, Delete, AlertCircle, ArrowLeft } from 'lucide-react';
import { HeaderBanner } from '../components/HeaderBanner.tsx';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';

interface PinViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const PinView: React.FC<PinViewProps> = ({ onSuccess, onCancel }) => {
  const [pin, setPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const CORRECT_PIN = CUSTOMER_ACCOUNT.demoPin; // "2402"

  // Handle digit press
  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setErrorMessage(null);

      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMessage(null);
    }
  };

  const handleClear = () => {
    setPin('');
    setErrorMessage(null);
  };

  const verifyPin = (candidatePin: string) => {
    if (candidatePin === CORRECT_PIN) {
      setTimeout(() => {
        onSuccess();
      }, 250);
    } else {
      setIsShaking(true);
      setErrorMessage('Incorrect PIN. Access denied. Please try again.');
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 600);
    }
  };

  // Keyboard event listener for physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between text-gray-800 select-none">
      <div>
        <HeaderBanner />

        <div className="w-full max-w-sm mx-auto px-6 pt-6 pb-8 flex flex-col items-center">
          {/* Back button */}
          <div className="w-full flex items-center justify-between mb-4">
            <button
              onClick={onCancel}
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-gray-600 hover:text-[#D71E28] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign On</span>
            </button>
            <span className="text-[11px] font-mono text-gray-400 uppercase">
              Step 2 of 2
            </span>
          </div>

          {/* Security Icon */}
          <div className="w-14 h-14 rounded-full bg-red-100/90 text-[#D71E28] flex items-center justify-center mb-3 shadow-xs">
            <Lock className="w-6 h-6 stroke-[2.2]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1 text-center">
            Enter Security PIN
          </h2>
          <p className="text-xs text-gray-500 text-center mb-5">
            Authorized session for <strong className="text-gray-800">{CUSTOMER_ACCOUNT.fullName}</strong>
          </p>

          {/* 4 Masked PIN Indicator Dots */}
          <div
            className={`flex items-center justify-center space-x-5 my-3 transition-transform ${
              isShaking ? 'animate-bounce duration-100 text-red-600' : ''
            }`}
          >
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pin.length > index;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    isFilled
                      ? 'bg-[#D71E28] border-[#D71E28] scale-110 shadow-xs'
                      : 'border-gray-300 bg-white'
                  }`}
                />
              );
            })}
          </div>

          {/* Error Message */}
          <div className="min-h-[44px] flex items-center justify-center w-full px-2 text-center mt-2 mb-2">
            {errorMessage && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-1.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-[#D71E28] shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Numeric Keypad */}
          <div className="w-full max-w-[280px] grid grid-cols-3 gap-3 my-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleDigit(num.toString())}
                className="h-14 rounded-full bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-200 shadow-2xs text-xl font-semibold text-gray-800 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                {num}
              </button>
            ))}

            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClear}
              className="h-14 rounded-full hover:bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center justify-center transition-colors cursor-pointer"
            >
              Clear
            </button>

            {/* 0 Button */}
            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="h-14 rounded-full bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-200 shadow-2xs text-xl font-semibold text-gray-800 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            >
              0
            </button>

            {/* Backspace Button */}
            <button
              type="button"
              onClick={handleBackspace}
              className="h-14 rounded-full hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              aria-label="Delete last digit"
            >
              <Delete className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden real input for mobile keyboard accessibility */}
      <input
        ref={inputRef}
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={4}
        value={pin}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, '');
          if (val.length <= 4) {
            setPin(val);
            if (val.length === 4) verifyPin(val);
          }
        }}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <footer className="w-full py-4 text-center text-[11px] text-gray-500 border-t border-gray-200 bg-white">
        Member FDIC • Equal Housing Lender
      </footer>
    </div>
  );
};
