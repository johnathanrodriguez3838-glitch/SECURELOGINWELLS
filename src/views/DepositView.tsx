import React from 'react';
import { ArrowLeft, Camera, ArrowDownToLine, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';
import { formatEUR } from '../lib/formatters.ts';

interface DepositViewProps {
  onBack: () => void;
}

export const DepositView: React.FC<DepositViewProps> = ({ onBack }) => {
  return (
    <div className="w-full px-4 pt-2 pb-24 space-y-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-700 hover:text-[#D71E28] transition-colors py-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <span className="text-xs font-semibold text-gray-600">
          Mobile Deposit
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">
          Deposit
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Mobile check & wire inbound deposits for {CUSTOMER_ACCOUNT.firstName}
        </p>
      </div>

      {/* Target Account */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/60">
        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
          Deposit To
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm text-gray-900">
              {CUSTOMER_ACCOUNT.accountType}
            </div>
            <div className="text-xs text-gray-500">
              Current Balance: {formatEUR(CUSTOMER_ACCOUNT.balance)}
            </div>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            Active
          </span>
        </div>
      </div>

      {/* Check Capture Mock */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-white/60 space-y-3">
        <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Capture Check Image
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="border-2 border-dashed border-gray-200 hover:border-[#D71E28] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-gray-50/50">
            <Camera className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-700">Front of Check</span>
            <span className="text-[10px] text-gray-400 mt-0.5">Tap to snap</span>
          </div>
          <div className="border-2 border-dashed border-gray-200 hover:border-[#D71E28] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-gray-50/50">
            <Camera className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-700">Back of Check</span>
            <span className="text-[10px] text-gray-400 mt-0.5">With endorsement</span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            className="w-full bg-[#D71E28] hover:bg-[#B7151D] text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
          >
            Review & Submit Deposit
          </button>
        </div>
      </div>

      {/* Inbound SEPA Wire Details */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/60 text-xs text-gray-600 space-y-2">
        <div className="flex items-center space-x-1.5 font-bold text-gray-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Inbound SEPA Transfer Instructions</span>
        </div>
        <p className="text-[11px] text-gray-500">
          For wire deposits, provide these details to the remitter:
        </p>
        <div className="bg-gray-50 p-2.5 rounded-lg space-y-1 font-mono text-[11px]">
          <div>IBAN: <strong>{CUSTOMER_ACCOUNT.iban}</strong></div>
          <div>BIC/SWIFT: <strong>{CUSTOMER_ACCOUNT.bic}</strong></div>
          <div>Bank: <strong>Wells Fargo Private International</strong></div>
        </div>
      </div>
    </div>
  );
};
