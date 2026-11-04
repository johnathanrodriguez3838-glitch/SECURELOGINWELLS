import React, { useState } from 'react';
import { Eye, EyeOff, Fingerprint, AlertCircle } from 'lucide-react';
import { HeaderBanner } from '../components/HeaderBanner.tsx';
import { CUSTOMER_ACCOUNT } from '../data/account.ts';

interface SignInViewProps {
  onSuccess: () => void;
}

export const SignInView: React.FC<SignInViewProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveUsername, setSaveUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Time-based greeting ("Good morning", "Good afternoon", "Good evening")
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setErrorMessage('Please enter both your username and password.');
      return;
    }

    // Supported demonstration user credentials
    const validUsers = ['cengiz', 'cengiz.akturk', 'cengizakturk', CUSTOMER_ACCOUNT.demoUsername.toLowerCase()];
    const validPasswords = [
      CUSTOMER_ACCOUNT.demoPassword,
      'Password2026!',
      'password',
      'demo',
      '2402',
      'cengiz',
      'Demo123',
    ];

    const isUserValid = validUsers.includes(trimmedUser);
    const isPassValid = validPasswords.includes(trimmedPass);

    if (isUserValid && isPassValid) {
      onSuccess();
    } else {
      setErrorMessage('Invalid username or password. Please verify your credentials.');
    }
  };

  const handleBiometricClick = () => {
    setUsername('cengiz');
    setPassword('Password2026!');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between text-gray-800">
      <div>
        {/* Top Wells Fargo Red Banner with Gold Stripe */}
        <HeaderBanner />

        {/* Main Sign-In Container */}
        <div className="w-full max-w-md mx-auto px-5 pt-7 pb-8">
          {/* Greeting matching reference screenshot */}
          <h1 className="text-3xl font-serif font-normal text-[#362E27] tracking-tight mb-7">
            {getGreeting()}
          </h1>

          {/* Validation Alert */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50/90 border border-red-200 rounded-lg flex items-start space-x-2.5 text-xs sm:text-sm text-red-700 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-[#D71E28] shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Username Input */}
            <div>
              <label 
                htmlFor="username-input" 
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username-input"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Username"
                  className="w-full bg-white border border-[#CBC4B8] focus:border-[#D71E28] focus:ring-2 focus:ring-[#D71E28]/20 rounded-[4px] px-3.5 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password Input with Visibility Control */}
            <div>
              <label 
                htmlFor="password-input" 
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Password"
                  className="w-full bg-white border border-[#CBC4B8] focus:border-[#D71E28] focus:ring-2 focus:ring-[#D71E28]/20 rounded-[4px] px-3.5 py-3 pr-11 text-base text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Controls Row: Save Username toggle & Touch ID */}
            <div className="pt-2 flex items-center justify-between text-xs sm:text-sm text-gray-700 select-none">
              {/* Save Username Switch */}
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <button
                  type="button"
                  role="switch"
                  aria-checked={saveUsername}
                  onClick={() => setSaveUsername(!saveUsername)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    saveUsername ? 'bg-[#D71E28]' : 'bg-[#D6D0C5]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      saveUsername ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-gray-700 font-medium">Save username</span>
              </label>

              {/* Touch ID biometric trigger */}
              <button
                type="button"
                onClick={handleBiometricClick}
                className="flex items-center space-x-1.5 text-gray-700 hover:text-[#D71E28] transition-colors py-1 px-1.5 rounded cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#D71E28] text-white flex items-center justify-center shadow-xs">
                  <Fingerprint className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="font-medium text-xs">Use Touch ID®</span>
              </button>
            </div>

            {/* Sign On Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#D71E28] hover:bg-[#B7151D] active:bg-[#990F16] text-white font-semibold py-3.5 px-4 rounded-[6px] shadow-sm text-base transition-all duration-150 focus:outline-none focus:ring-3 focus:ring-[#D71E28]/30 cursor-pointer"
              >
                Sign On
              </button>
            </div>
          </form>

          {/* Help & Security Links matching reference screenshot */}
          <div className="mt-8 text-center space-y-3 select-none">
            <p className="text-xs text-gray-600 font-medium">Need help?</p>
            <div>
              <span className="text-xs text-[#006699] hover:underline cursor-pointer font-medium">
                Create a new password or find your username
              </span>
            </div>
            <div>
              <span className="text-xs text-[#006699] hover:underline cursor-pointer font-medium">
                Security Center
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="w-full py-4 text-center text-[11px] text-gray-500 border-t border-[#ECE5D8] bg-white">
        Member FDIC • Equal Housing Lender
      </footer>
    </div>
  );
};
