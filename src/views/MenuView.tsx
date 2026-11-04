import React from 'react';
import { 
  User, 
  History, 
  Send, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  LogOut, 
  ChevronRight, 
  Lock,
  PhoneCall,
  Briefcase
} from 'lucide-react';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';

interface MenuViewProps {
  onNavigateToProfile: () => void;
  onNavigateToTransactions: () => void;
  onNavigateToTransfer: () => void;
  onSignOff: () => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  onNavigateToProfile,
  onNavigateToTransactions,
  onNavigateToTransfer,
  onSignOff,
}) => {
  return (
    <div className="w-full px-4 pt-2 pb-24 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">
          Menu & Settings
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Account preferences and private banking controls
        </p>
      </div>

      {/* Customer Quick Card */}
      <div 
        onClick={onNavigateToProfile}
        className="bg-white rounded-2xl p-4 shadow-sm border border-white/60 flex items-center space-x-3.5 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shrink-0">
          <img
            src={CUSTOMER_ACCOUNT.profilePhoto}
            alt={CUSTOMER_ACCOUNT.fullName}
            className="w-full h-full object-cover object-center aspect-square"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-gray-900 truncate">
            {CUSTOMER_ACCOUNT.fullName}
          </h2>
          <p className="text-xs text-gray-500 truncate">
            {CUSTOMER_ACCOUNT.occupation} • {CUSTOMER_ACCOUNT.city}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-1 inline-block">
            Verified Account
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
      </div>

      {/* Primary Links */}
      <div className="bg-white rounded-2xl shadow-sm border border-white/60 divide-y divide-gray-100 overflow-hidden">
        <button
          onClick={onNavigateToProfile}
          type="button"
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
                Customer Profile
              </span>
              <span className="text-[11px] text-gray-400">
                Residential address, occupation & photo
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={onNavigateToTransactions}
          type="button"
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
                Transaction History
              </span>
              <span className="text-[11px] text-gray-400">
                Ledger spanning 2020 – 2026
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={onNavigateToTransfer}
          type="button"
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-red-50 text-[#D71E28] flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
                Pay & Transfer
              </span>
              <span className="text-[11px] text-gray-400">
                Wire and external SEPA transfers
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Security & Branch Info */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/60 space-y-3 text-xs text-gray-600">
        <div className="flex items-center space-x-2 text-gray-900 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security & Authentication</span>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Security PIN</span>
            <span className="text-gray-900 font-medium">Enabled (Active)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Branch</span>
            <span className="text-gray-800">{CUSTOMER_ACCOUNT.branch}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Customer ID</span>
            <span className="font-mono text-gray-800">{CUSTOMER_ACCOUNT.id}</span>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2">
        <button
          onClick={onSignOff}
          type="button"
          className="w-full bg-[#D71E28] hover:bg-[#B7151D] text-white font-semibold py-3 px-4 rounded-xl shadow-md text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Off & End Session</span>
        </button>
      </div>
    </div>
  );
};
