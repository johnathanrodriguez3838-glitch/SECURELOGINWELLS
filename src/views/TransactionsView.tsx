import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  Filter, 
  CheckCircle2, 
  FileText,
  Calendar,
  X
} from 'lucide-react';
import { TRANSACTIONS, Transaction } from '../data/transactions.ts';
import { formatEUR, formatFullDate } from '../lib/formatters.ts';

interface TransactionsViewProps {
  onBack: () => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ onBack }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'CREDIT' | 'DEBIT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(15);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return TRANSACTIONS.filter((txn) => {
      // Type filter
      if (filterType !== 'ALL' && txn.type !== filterType) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchDesc = txn.description.toLowerCase().includes(query);
        const matchRef = txn.reference.toLowerCase().includes(query);
        const matchCategory = txn.category.toLowerCase().includes(query);
        const matchDate = txn.date.includes(query);
        return matchDesc || matchRef || matchCategory || matchDate;
      }
      return true;
    });
  }, [filterType, searchQuery]);

  const displayedList = filteredTransactions.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTransactions.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
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
          Jan 2020 – Sep 2026
        </span>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">
          Transaction Activity
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          EVERYDAY CHECKING ...0987 • EUR Ledger
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setVisibleCount(15);
          }}
          placeholder="Search by description, reference, category..."
          className="w-full bg-white border border-gray-200 focus:border-[#D71E28] focus:ring-2 focus:ring-[#D71E28]/15 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 outline-none shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Tabs (Credits / Debits / All) */}
      <div className="flex items-center space-x-2 select-none overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => {
            setFilterType('ALL');
            setVisibleCount(15);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            filterType === 'ALL'
              ? 'bg-[#D71E28] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All Activity
        </button>
        <button
          type="button"
          onClick={() => {
            setFilterType('CREDIT');
            setVisibleCount(15);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            filterType === 'CREDIT'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Incoming (Credits)
        </button>
        <button
          type="button"
          onClick={() => {
            setFilterType('DEBIT');
            setVisibleCount(15);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            filterType === 'DEBIT'
              ? 'bg-gray-800 text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Outgoing (Debits)
        </button>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-white/60 divide-y divide-gray-100 overflow-hidden">
        {displayedList.length === 0 ? (
          <div className="py-12 px-4 text-center text-gray-500">
            <p className="text-sm">No transactions match your search criteria.</p>
          </div>
        ) : (
          displayedList.map((txn) => {
            const isCredit = txn.type === 'CREDIT';
            return (
              <div
                key={txn.id}
                onClick={() => setSelectedTxn(txn)}
                className="p-3.5 sm:p-4 hover:bg-gray-50/80 transition-colors cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isCredit
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isCredit ? (
                      <ArrowDownLeft className="w-4 h-4 stroke-[2.2]" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                      {txn.description}
                    </p>
                    <div className="flex items-center space-x-1.5 text-[11px] text-gray-500 mt-0.5">
                      <span>{formatFullDate(txn.date)}</span>
                      <span>•</span>
                      <span className="font-mono text-[10px] text-gray-400">{txn.reference}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`text-xs sm:text-sm font-bold ${
                      isCredit ? 'text-emerald-700' : 'text-gray-900'
                    }`}
                  >
                    {formatEUR(txn.amount, { showSign: isCredit })}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    Bal: {formatEUR(txn.runningBalance)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More Functionality */}
      {hasMore && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
          >
            Load More Transactions
          </button>
        </div>
      )}

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase">
                Transaction Details
              </span>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-center">
              <div
                className={`text-2xl font-bold mb-1 ${
                  selectedTxn.type === 'CREDIT' ? 'text-emerald-700' : 'text-gray-900'
                }`}
              >
                {formatEUR(selectedTxn.amount, { showSign: selectedTxn.type === 'CREDIT' })}
              </div>
              <p className="text-sm font-medium text-gray-800">{selectedTxn.description}</p>
              <div className="inline-flex items-center space-x-1 mt-2 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                <span>Settled & Reconciled</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Value Date</span>
                <span className="font-medium text-gray-900">{formatFullDate(selectedTxn.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-gray-900">{selectedTxn.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Reference ID</span>
                <span className="font-mono text-gray-900">{selectedTxn.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Balance After Transaction</span>
                <span className="font-mono font-semibold text-gray-900">{formatEUR(selectedTxn.runningBalance)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTxn(null)}
              type="button"
              className="mt-4 w-full bg-gray-900 hover:bg-black text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
