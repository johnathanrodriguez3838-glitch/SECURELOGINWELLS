import React from 'react';
import { Search, Bell } from 'lucide-react';

interface DashboardHeaderProps {
  onSignOff: () => void;
  onNotificationsClick?: () => void;
  onSearchClick?: () => void;
  unreadCount?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onSignOff,
  onNotificationsClick,
  onSearchClick,
  unreadCount = 9,
}) => {
  return (
    <div className="w-full pt-3 pb-2 px-4 flex items-center justify-between gap-3">
      {/* Search Pill - Replica of "Ask Fargo" */}
      <button
        onClick={onSearchClick}
        type="button"
        className="flex-1 bg-white/95 hover:bg-white text-gray-700 rounded-full px-3.5 py-2 shadow-sm flex items-center justify-between border border-gray-100/80 transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#D71E28]/30"
      >
        <div className="flex items-center space-x-2 text-gray-500 text-xs sm:text-sm">
          <Search className="w-4 h-4 text-gray-400 stroke-[2.2]" />
          <span className="font-medium text-gray-600">Ask Fargo</span>
        </div>
        {/* Fargo emblem */}
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-700 via-purple-700 to-rose-600 flex items-center justify-center shadow-xs">
          <span className="text-[10px] font-black text-white italic tracking-tighter">fi</span>
        </div>
      </button>

      {/* Right Actions: Notifications Bell & Sign off */}
      <div className="flex items-center space-x-3 shrink-0">
        <button
          onClick={onNotificationsClick}
          type="button"
          className="relative p-1.5 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#D71E28] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight shadow-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={onSignOff}
          type="button"
          className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#D71E28] transition-colors px-1 py-1"
        >
          Sign off
        </button>
      </div>
    </div>
  );
};
