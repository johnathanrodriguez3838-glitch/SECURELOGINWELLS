import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Building2, 
  CreditCard, 
  Euro, 
  FileText, 
  Loader2, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';
import { formatEUR } from '../lib/formatters.ts';
import { TransferErrorModal } from '../components/TransferErrorModal.tsx';

interface TransferViewProps {
  onBack: () => void;
}

export const TransferView: React.FC<TransferViewProps> = ({ onBack }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handlePreFill = (bank: string, acc: string, amt: string, desc: string) => {
    setBankName(bank);
    setAccountNumber(acc);
    setAmount(amt);
    setDescription(desc);
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedBank = bankName.trim();
    const trimmedAcc = accountNumber.trim();
    const parsedAmount = parseFloat(amount.replace(/,/g, '.'));
    const trimmedDesc = description.trim();

    // Input Validation
    if (!trimmedBank) {
      setValidationError('Please enter the recipient Bank Name.');
      return;
    }
    if (!trimmedAcc || trimmedAcc.length < 5) {
      setValidationError('Please enter a valid Account Number or IBAN.');
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setValidationError('Please enter a valid transfer amount greater than €0,00.');
      return;
    }
    if (!trimmedDesc) {
      setValidationError('Please enter a transfer description or payment reference.');
      return;
    }

    // Trigger simulated processing animation
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowErrorModal(true);
    }, 1800);
  };

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
          Wire & SEPA Transfer
        </span>
      </div>

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">
          Transfer Funds
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Execute external European SEPA / Swift Wire transfer
        </p>
      </div>

      {/* Source Account Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/60">
        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
          From Account
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm text-gray-900">
              {CUSTOMER_ACCOUNT.accountType}
            </div>
            <div className="text-xs text-gray-500">
              {CUSTOMER_ACCOUNT.fullName} • {CUSTOMER_ACCOUNT.iban}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Available</div>
            <div className="font-semibold text-sm text-slate-900">
              {formatEUR(CUSTOMER_ACCOUNT.balance)}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Fill Shortcuts for convenience */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs select-none">
        <span className="text-gray-500 text-[11px] font-medium shrink-0">Saved Payees:</span>
        <button
          type="button"
          onClick={() =>
            handlePreFill(
              'Deutsche Bank AG Berlin',
              'DE44 1007 0000 0567 8912 34',
              '25000',
              'Security Operations Escrow'
            )
          }
          className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
        >
          Deutsche Bank €25.000
        </button>
        <button
          type="button"
          onClick={() =>
            handlePreFill(
              'Berliner Sparkasse',
              'DE88 1005 0000 0123 4567 89',
              '4850',
              'Equipment Procurement'
            )
          }
          className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
        >
          Sparkasse €4.850
        </button>
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center space-x-2 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 text-[#D71E28] shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Transfer Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-sm border border-white/60 space-y-4">
        {/* Bank Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Bank Name
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={bankName}
              onChange={(e) => {
                setBankName(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g. Deutsche Bank, Commerzbank, UBS"
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-[#D71E28] focus:ring-2 focus:ring-[#D71E28]/15 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Account Number / IBAN
          </label>
          <div className="relative">
            <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g. DE89 1007 0000 0123 4567 89"
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-[#D71E28] focus:ring-2 focus:ring-[#D71E28]/15 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-mono text-gray-900 placeholder:text-gray-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Amount (EUR)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-600 text-sm">
              €
            </span>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="0.00"
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-[#D71E28] focus:ring-2 focus:ring-[#D71E28]/15 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <textarea
              rows={2}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Payment reason or invoice reference"
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-[#D71E28] focus:ring-2 focus:ring-[#D71E28]/15 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#D71E28] hover:bg-[#B7151D] active:bg-[#990F16] text-white font-semibold py-3.5 px-4 rounded-xl shadow-md text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Transfer Request...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Transfer</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Simulated Banking Notice */}
      <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-800 flex items-start space-x-2">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          All outward wire transfers undergo automated real-time compliance screening and verification against Federal Banking regulations.
        </div>
      </div>

      {/* Transfer Error Modal - EXACT wording */}
      <TransferErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
};
