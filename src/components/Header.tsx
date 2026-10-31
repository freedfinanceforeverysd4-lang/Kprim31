import React from 'react';
import { Menu, FlaskConical } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenMobileSidebar: () => void;
  onOpenPdfImport?: () => void;
  perfumeCount?: number;
  unreadChatCount?: number;
}

const PAGE_TITLES: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Kprime Dashboard',
    subtitle: '',
  },
  database: {
    title: 'Perfume Database',
    subtitle: 'Comprehensive fragrance catalog with olfactory notes and search',
  },
  'add-perfume': {
    title: 'Add Perfume',
    subtitle: 'Register and catalog new fragrance compositions',
  },
  calculator: {
    title: 'Kprime Mixing Calculator',
    subtitle: 'High-precision 1 to 4 oils formulation mixing engine with Category pricing',
  },
  'oil-tracker': {
    title: 'Essential Oil Tracker',
    subtitle: 'Track oils inventory, consumption, daily/monthly and custom date income',
  },
  'similar-perfume': {
    title: 'Similar Perfume Finder',
    subtitle: 'Web research & olfactory comparison to find Top 5 matching Kprime database perfumes',
  },
  chat: {
    title: 'Team Chat',
    subtitle: 'Shared real-time communication for atelier compounding & team updates',
  },
  history: {
    title: 'Mixing History',
    subtitle: 'Permanent batch formulations, dispensing logs and customer formulas',
  },
  reports: {
    title: 'Reports & Tracking',
    subtitle: 'Daily Sales Man audit reports, mix logs and team revenue comparisons',
  },
  'sales-team': {
    title: 'Sales Team Management',
    subtitle: 'Manage shop staff, track individual formulators and monitor productivity',
  },
  settings: {
    title: 'Atelier Settings',
    subtitle: 'Configure oil/alcohol densities, bottle sizes and database backup',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileSidebar,
}) => {
  const meta = PAGE_TITLES[currentPage] || PAGE_TITLES.dashboard;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 px-3 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          id="open-mobile-sidebar-btn"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h2 className="font-serif-luxury text-lg sm:text-xl lg:text-2xl font-bold text-stone-900 tracking-wide truncate">
            {meta.title}
          </h2>
          {meta.subtitle ? (
            <p className="text-xs text-stone-500 hidden sm:block truncate">
              {meta.subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {/* Action Buttons - Clean and focused */}
      <div className="flex items-center gap-2 shrink-0">
        {currentPage !== 'calculator' && (
          <button
            id="header-calculator-shortcut"
            onClick={() => onNavigate('calculator')}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 min-h-[40px] rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <FlaskConical className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Open</span> Calculator
          </button>
        )}
      </div>
    </header>
  );
};
