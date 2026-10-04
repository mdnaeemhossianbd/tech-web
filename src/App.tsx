/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { HomeView } from './views/HomeView';
import { MobilesView } from './views/MobilesView';
import { MobileDetailsView } from './views/MobileDetailsView';
import { CompareView } from './views/CompareView';
import { ReviewsView } from './views/ReviewsView';
import { VideosView } from './views/VideosView';
import { GuidesView } from './views/GuidesView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  // If in Admin view, render standalone full-screen Admin Portal layout
  if (activeView === 'admin') {
    return <AdminView />;
  }

  // Consumer Public Website Layout
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0c0d12] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-140px)]">
        {activeView === 'home' && <HomeView />}
        {activeView === 'mobiles' && <MobilesView />}
        {activeView === 'mobile-detail' && <MobileDetailsView />}
        {activeView === 'compare' && <CompareView />}
        {activeView === 'reviews' && <ReviewsView />}
        {activeView === 'videos' && <VideosView />}
        {activeView === 'guides' && <GuidesView />}
        {activeView === 'about' && <AboutView />}
        {activeView === 'contact' && <ContactView />}
      </main>
      <Footer />
      <GlobalSearchModal />
      <AiAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
