import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface TransferErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransferErrorModal: React.FC<TransferErrorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-150 border border-red-100 relative"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="transfer-error-title"
      >
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-full bg-red-100/90 text-[#D71E28] flex items-center justify-center mb-4 shadow-xs">
          <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
        </div>

        {/* Exact Modal Title */}
        <h3 id="transfer-error-title" className="text-xl font-bold text-gray-900 mb-2 font-serif">
          Transfer Error
        </h3>

        {/* Exact Modal Message */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Please visit the bank. Your account has been restricted.
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full bg-[#D71E28] hover:bg-[#B7151D] text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#D71E28]/40"
        >
          Close
        </button>
      </div>
    </div>
  );
};
