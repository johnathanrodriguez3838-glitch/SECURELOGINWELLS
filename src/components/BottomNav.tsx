import React from 'react';
import { Home, ArrowDownToLine, ArrowLeftRight, Compass, Menu } from 'lucide-react';

export type NavTab = 'accounts' | 'deposit' | 'transfer' | 'explore' | 'menu';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'accounts' as NavTab,
      label: 'Accounts',
      icon: Home,
    },
    {
      id: 'deposit' as NavTab,
      label: 'Deposit',
      icon: ArrowDownToLine,
    },
    {
      id: 'transfer' as NavTab,
      label: 'Pay & Transfer',
      icon: ArrowLeftRight,
    },
    {
      id: 'explore' as NavTab,
      label: 'Explore',
      icon: Compass,
    },
    {
      id: 'menu' as NavTab,
      label: 'Menu',
      icon: Menu,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200/90 z-30 shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              type="button"
              className={`flex flex-col items-center justify-center pt-1.5 pb-1 transition-all ${
                isActive
                  ? 'text-[#D71E28]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <span
                className={`text-[11px] mt-1 tracking-tight font-medium ${
                  isActive ? 'text-[#D71E28] font-bold' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
