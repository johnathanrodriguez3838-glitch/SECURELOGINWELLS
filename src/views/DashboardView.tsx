import React from 'react';
import { 
  PlusCircle, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  ShieldCheck, 
  Send, 
  History, 
  User, 
  Star,
  ExternalLink
} from 'lucide-react';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';
import { RECENT_TRANSACTIONS } from '../data/transactions.ts';
import { formatEUR, formatFullDate } from '../lib/formatters.ts';

interface DashboardViewProps {
  onNavigateToTransfer: () => void;
  onNavigateToTransactions: () => void;
  onNavigateToProfile: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToTransfer,
  onNavigateToTransactions,
  onNavigateToProfile,
}) => {
  return (
    <div className="w-full px-4 pt-1 pb-24 space-y-4">
      {/* Greeting - Replicating reference screenshot styling */}
      <div className="pt-2 pb-1">
        <h1 className="text-3xl font-normal text-slate-800 leading-tight">
          Good afternoon,
        </h1>
        <h2 className="text-3xl font-medium text-slate-900 leading-tight">
          {CUSTOMER_ACCOUNT.firstName}
        </h2>
      </div>

      {/* Primary Checking Account Card - Pixel Perfect Replica */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-white/60 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-gray-700 tracking-wider uppercase font-sans">
            {CUSTOMER_ACCOUNT.accountType}
          </span>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            Primary
          </span>
        </div>

        {/* Large Balance Display */}
        <div className="text-3xl sm:text-[34px] font-light text-slate-900 tracking-tight my-1">
          {formatEUR(CUSTOMER_ACCOUNT.balance)}
        </div>

        <div className="text-xs text-gray-500 font-normal mb-4">
          Available balance
        </div>

        {/* Quick Actions Row */}
        <div className="pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
          <button
            onClick={onNavigateToTransfer}
            type="button"
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-red-50 text-[#D71E28] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Send className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700">Transfer</span>
          </button>

          <button
            onClick={onNavigateToTransactions}
            type="button"
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <History className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700">Activity</span>
          </button>

          <button
            onClick={onNavigateToProfile}
            type="button"
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <User className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700">Profile</span>
          </button>
        </div>
      </div>

      {/* Secondary Account Card - WAY2SAVE */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-white/60 relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-gray-700 tracking-wider uppercase font-sans">
            {CUSTOMER_ACCOUNT.secondaryAccountType}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">EUR</span>
        </div>

        <div className="text-3xl sm:text-[34px] font-light text-slate-900 tracking-tight my-1">
          {formatEUR(CUSTOMER_ACCOUNT.secondaryBalance)}
        </div>

        <div className="text-xs text-gray-500 font-normal">
          Available balance
        </div>
      </div>



      {/* FICO Score / Credit Rating Card - Exact Replica */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/60 flex items-center space-x-3.5">
        {/* Score Ring */}
        <div className="w-12 h-12 rounded-full border-[3px] border-emerald-500 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-slate-800">{CUSTOMER_ACCOUNT.creditScore}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">
            Your Credit Score went up 10 points
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Updated {CUSTOMER_ACCOUNT.creditScoreDate}
          </p>
        </div>

        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
      </div>

      {/* Bonus Points / VIP Tier Card - Exact Replica */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/60 flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <Star className="w-5 h-5 fill-amber-500 stroke-amber-600" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            Earn 20k bonus points
          </p>
          <p className="text-[11px] text-gray-400">
            Private Client VIP status active
          </p>
        </div>

        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
      </div>

      {/* Recent Transaction Activity Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-white/60">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Recent Activity</h3>
            <p className="text-[11px] text-gray-400">Latest account movements</p>
          </div>
          <button
            onClick={onNavigateToTransactions}
            type="button"
            className="text-xs font-semibold text-[#D71E28] hover:underline flex items-center space-x-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recent Transactions List */}
        <div className="divide-y divide-gray-100">
          {RECENT_TRANSACTIONS.map((txn) => {
            const isCredit = txn.type === 'CREDIT';
            return (
              <div
                key={txn.id}
                onClick={onNavigateToTransactions}
                className="py-3 flex items-center justify-between hover:bg-gray-50/80 -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isCredit
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isCredit ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                      {txn.description}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {formatFullDate(txn.date)} • {txn.category}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-3">
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      isCredit ? 'text-emerald-700' : 'text-gray-900'
                    }`}
                  >
                    {formatEUR(txn.amount, { showSign: isCredit })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
