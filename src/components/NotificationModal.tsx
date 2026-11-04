import React from 'react';
import { X, Bell, ShieldCheck, AlertCircle, CheckCircle2, ArrowDownLeft } from 'lucide-react';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Transfer Clearance Required',
      desc: 'External wire transfer was attempted. In-branch identity verification is required.',
      time: '10 min ago',
      type: 'alert',
    },
    {
      id: 2,
      title: 'Incoming Retainer Deposit Settled',
      desc: 'Account Deposit of €135.000,00 has been credited to EVERYDAY CHECKING ...0987.',
      time: 'Yesterday',
      type: 'credit',
    },
    {
      id: 3,
      title: 'Two-Factor Authentication Confirmed',
      desc: 'PIN 2402 successfully verified for session security.',
      time: 'Just now',
      type: 'security',
    },
    {
      id: 4,
      title: 'Monthly Statement Generated',
      desc: 'Your September 2026 account statement is available for review.',
      time: 'Sep 30',
      type: 'statement',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-[#D71E28]" />
            <span className="text-sm font-bold text-gray-900 font-serif">
              Account Notifications
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-2 divide-y divide-gray-100 max-h-80 overflow-y-auto">
          {notifications.map((item) => (
            <div key={item.id} className="py-3 flex items-start space-x-3 text-xs">
              <div className="mt-0.5">
                {item.type === 'alert' && (
                  <AlertCircle className="w-4 h-4 text-[#D71E28]" />
                )}
                {item.type === 'credit' && (
                  <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                )}
                {item.type === 'security' && (
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                )}
                {item.type === 'statement' && (
                  <CheckCircle2 className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{item.title}</span>
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </div>
                <p className="text-gray-600 mt-0.5 text-[11px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          type="button"
          className="mt-3 w-full bg-[#D71E28] hover:bg-[#B7151D] text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
};
