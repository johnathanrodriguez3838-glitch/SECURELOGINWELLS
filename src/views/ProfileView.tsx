import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Briefcase, 
  Euro, 
  ShieldCheck, 
  CreditCard, 
  Building, 
  Camera, 
  Lock, 
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';
import { formatEUR } from '../lib/formatters.ts';

interface ProfileViewProps {
  onBack: () => void;
  onSignOff: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onBack, onSignOff }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(CUSTOMER_ACCOUNT.profilePhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
          Customer Profile
        </span>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/60 flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle background banner */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-r from-[#D71E28] to-[#990F16]" />

        {/* Profile Photograph Container - Guarantees NO distortion */}
        <div className="relative mt-4 mb-3">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={CUSTOMER_ACCOUNT.fullName}
                className="w-full h-full object-cover object-center aspect-square"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          {/* Photo change badge */}
          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#D71E28] text-white flex items-center justify-center shadow-md hover:bg-[#B7151D] transition-colors cursor-pointer"
            title="Upload customer photograph"
            aria-label="Upload customer photograph"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        {/* Exact Customer Details */}
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-0.5">
          {CUSTOMER_ACCOUNT.fullName}
        </h1>
        <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mb-3">
          <Briefcase className="w-3.5 h-3.5 text-slate-500" />
          <span>{CUSTOMER_ACCOUNT.occupation}</span>
        </div>

        {/* Verified Private Client Badge */}
        <div className="w-full pt-3 border-t border-gray-100 flex items-center justify-center space-x-2 text-xs text-emerald-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Private Banking Client</span>
        </div>
      </div>

      {/* Account & Identity Details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-white/60 space-y-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Account Specifications
        </h2>

        {/* Address */}
        <div className="flex items-start space-x-3 text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-[#D71E28] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-gray-400 text-[11px]">Primary Residential Address</div>
            <div className="font-semibold text-gray-900">{CUSTOMER_ACCOUNT.address}</div>
          </div>
        </div>

        {/* Occupation */}
        <div className="flex items-start space-x-3 text-xs sm:text-sm">
          <Briefcase className="w-4 h-4 text-[#D71E28] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-gray-400 text-[11px]">Registered Occupation</div>
            <div className="font-semibold text-gray-900">{CUSTOMER_ACCOUNT.occupation}</div>
          </div>
        </div>

        {/* Currency */}
        <div className="flex items-start space-x-3 text-xs sm:text-sm">
          <Euro className="w-4 h-4 text-[#D71E28] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-gray-400 text-[11px]">Base Account Currency</div>
            <div className="font-semibold text-gray-900">{CUSTOMER_ACCOUNT.currency} (EUR)</div>
          </div>
        </div>

        {/* Current Balance */}
        <div className="flex items-start space-x-3 text-xs sm:text-sm">
          <CreditCard className="w-4 h-4 text-[#D71E28] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-gray-400 text-[11px]">Primary Balance</div>
            <div className="font-bold text-base text-slate-900">
              {formatEUR(CUSTOMER_ACCOUNT.balance)}
            </div>
          </div>
        </div>

        {/* IBAN & BIC */}
        <div className="flex items-start space-x-3 text-xs sm:text-sm">
          <Building className="w-4 h-4 text-[#D71E28] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-gray-400 text-[11px]">IBAN & Branch</div>
            <div className="font-mono font-medium text-xs text-gray-900">{CUSTOMER_ACCOUNT.iban}</div>
            <div className="text-gray-500 text-[11px] mt-0.5">{CUSTOMER_ACCOUNT.branch}</div>
          </div>
        </div>

        {/* Security PIN status */}
        <div className="flex items-start space-x-3 text-xs sm:text-sm">
          <Lock className="w-4 h-4 text-[#D71E28] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-gray-400 text-[11px]">Security PIN Status</div>
            <div className="font-medium text-gray-800">
              Two-Factor Protection Enabled
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2">
        <button
          onClick={onSignOff}
          type="button"
          className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl shadow-2xs text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-[#D71E28]" />
          <span>Sign Out of Account</span>
        </button>
      </div>
    </div>
  );
};
