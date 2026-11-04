/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SignInView } from './views/SignInView.tsx';
import { PinView } from './views/PinView.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { TransactionsView } from './views/TransactionsView.tsx';
import { TransferView } from './views/TransferView.tsx';
import { ProfileView } from './views/ProfileView.tsx';
import { DepositView } from './views/DepositView.tsx';
import { ExploreView } from './views/ExploreView.tsx';
import { MenuView } from './views/MenuView.tsx';
import { DashboardHeader } from './components/DashboardHeader.tsx';
import { BottomNav, NavTab } from './components/BottomNav.tsx';
import { LoadingModal } from './components/LoadingModal.tsx';
import { NotificationModal } from './components/NotificationModal.tsx';

type Screen = 'signin' | 'pin' | 'app';
type ActiveView = 'dashboard' | 'transactions' | 'transfer' | 'profile' | 'deposit' | 'explore' | 'menu';

export default function App() {
  // Navigation Flow State
  const [currentScreen, setCurrentScreen] = useState<Screen>('signin');
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  
  // Dashboard & Tab State
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [bottomNavTab, setBottomNavTab] = useState<NavTab>('accounts');
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  // Step 1 -> Step 2: User successfully submits username & password
  const handleSignInCredentialsAccepted = () => {
    setIsLoadingAuth(true);
  };

  // Step 2 -> Step 3: Loading modal completes after ~2 seconds -> navigate to PIN screen
  const handleLoadingModalComplete = () => {
    setIsLoadingAuth(false);
    setCurrentScreen('pin');
  };

  // Step 3 -> Step 4: Correct PIN (2402) entered -> navigate to Dashboard
  const handlePinVerified = () => {
    setCurrentScreen('app');
    setActiveView('dashboard');
    setBottomNavTab('accounts');
  };

  // Return to sign in
  const handleSignOff = () => {
    setCurrentScreen('signin');
    setActiveView('dashboard');
    setBottomNavTab('accounts');
    setIsLoadingAuth(false);
  };

  // Bottom Nav click handler
  const handleBottomNavSelect = (tab: NavTab) => {
    setBottomNavTab(tab);
    if (tab === 'accounts') setActiveView('dashboard');
    else if (tab === 'deposit') setActiveView('deposit');
    else if (tab === 'transfer') setActiveView('transfer');
    else if (tab === 'explore') setActiveView('explore');
    else if (tab === 'menu') setActiveView('menu');
  };

  // Direct internal view transitions
  const navigateToTransfer = () => {
    setActiveView('transfer');
    setBottomNavTab('transfer');
  };

  const navigateToTransactions = () => {
    setActiveView('transactions');
  };

  const navigateToProfile = () => {
    setActiveView('profile');
  };

  const navigateToDashboard = () => {
    setActiveView('dashboard');
    setBottomNavTab('accounts');
  };

  return (
    <div className="min-h-screen bg-slate-900/95 flex flex-col items-center justify-start sm:py-6 sm:px-4 select-none font-sans antialiased text-slate-800">
      {/* Main Container */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden flex flex-col relative">
        {/* SCREEN 1: Sign-In */}
        {currentScreen === 'signin' && (
          <SignInView onSuccess={handleSignInCredentialsAccepted} />
        )}

        {/* SCREEN 2: Loading Modal (Triggers between sign-in and PIN verification) */}
        <LoadingModal
          isOpen={isLoadingAuth}
          onComplete={handleLoadingModalComplete}
          durationMs={2000}
        />

        {/* SCREEN 3: PIN Verification */}
        {currentScreen === 'pin' && (
          <PinView
            onSuccess={handlePinVerified}
            onCancel={handleSignOff}
          />
        )}

        {/* SCREEN 4+: Authenticated Banking Portal */}
        {currentScreen === 'app' && (
          <div className="min-h-screen bg-gradient-to-b from-[#C0D2EB] via-[#D8E2F2] to-[#ECE5EC] flex flex-col justify-between relative">
            {/* Top Bar with Ask Fargo search & Sign off */}
            <DashboardHeader
              onSignOff={handleSignOff}
              onNotificationsClick={() => setIsNotificationOpen(true)}
              onSearchClick={() => setActiveView('transactions')}
              unreadCount={9}
            />

            {/* Views Router */}
            <main className="flex-1 w-full overflow-y-auto">
              {activeView === 'dashboard' && (
                <DashboardView
                  onNavigateToTransfer={navigateToTransfer}
                  onNavigateToTransactions={navigateToTransactions}
                  onNavigateToProfile={navigateToProfile}
                />
              )}

              {activeView === 'transactions' && (
                <TransactionsView onBack={navigateToDashboard} />
              )}

              {activeView === 'transfer' && (
                <TransferView onBack={navigateToDashboard} />
              )}

              {activeView === 'profile' && (
                <ProfileView
                  onBack={navigateToDashboard}
                  onSignOff={handleSignOff}
                />
              )}

              {activeView === 'deposit' && (
                <DepositView onBack={navigateToDashboard} />
              )}

              {activeView === 'explore' && (
                <ExploreView
                  onBack={navigateToDashboard}
                  onNavigateToTransfer={navigateToTransfer}
                />
              )}

              {activeView === 'menu' && (
                <MenuView
                  onNavigateToProfile={navigateToProfile}
                  onNavigateToTransactions={navigateToTransactions}
                  onNavigateToTransfer={navigateToTransfer}
                  onSignOff={handleSignOff}
                />
              )}
            </main>

            {/* Bottom Docked Navigation Bar */}
            <BottomNav
              currentTab={bottomNavTab}
              onSelectTab={handleBottomNavSelect}
            />

            {/* Notifications Modal */}
            <NotificationModal
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
