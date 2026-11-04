import React from 'react';
import { ArrowLeft, Compass, Shield, CreditCard, Sparkles, Building, Landmark, ChevronRight } from 'lucide-react';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';

interface ExploreViewProps {
  onBack: () => void;
  onNavigateToTransfer: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onBack, onNavigateToTransfer }) => {
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
          Explore Services
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">
          Private Client Services
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Exclusive financial capabilities for {CUSTOMER_ACCOUNT.fullName}
        </p>
      </div>

      {/* Featured Service 1: Private Wealth Management */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-white/60 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Berlin Private Wealth Vault</h3>
            <p className="text-xs text-gray-500">Asset custody & security escrow management</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Your portfolio of €6.552.000,00 qualifies for tailored interest tiers, capital preservation bonds, and physical security deposit privileges at Berlin Moritzplatz.
        </p>
      </div>

      {/* Featured Service 2: Global Security Escrow */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-white/60 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D71E28] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Diplomatic Security Accounts</h3>
            <p className="text-xs text-gray-500">International escrow & high-limit operations</p>
          </div>
        </div>
        <button
          onClick={onNavigateToTransfer}
          type="button"
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-semibold text-gray-800"
        >
          <span>Request Transfer Limit Clearance</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};
