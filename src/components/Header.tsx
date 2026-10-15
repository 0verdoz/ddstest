import React, { useState } from 'react';
import { WifiOff, Download, RotateCcw } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export type ActiveTab = 'dashboard' | 'daily' | 'quiz' | 'mistakes' | 'browser' | 'import';

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  onNewQuizClick: () => void;
  mistakesCount: number;
  onOpenTotalReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onNewQuizClick,
  mistakesCount,
  onOpenTotalReset,
}) => {
  const isOnline = useOnlineStatus();
  const { isInstallable, install, isIOS } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-slate-900 transition hover:text-blue-600 whitespace-nowrap shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-black shadow-md shadow-blue-600/20">
              5
            </div>
            <span>Georgia DDS Section 5</span>
          </button>

          {/* Zone 2: Navigation Links (single line, crisp black font) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
                activeTab === 'dashboard' ? 'text-blue-600 underline underline-offset-8 decoration-blue-600 decoration-2' : ''
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('daily')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
                activeTab === 'daily' ? 'text-blue-600 underline underline-offset-8 decoration-blue-600 decoration-2' : ''
              }`}
            >
              Daily Quiz
            </button>
            <button
              onClick={() => onNavigate('mistakes')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 flex items-center gap-1.5 ${
                activeTab === 'mistakes' ? 'text-blue-600 underline underline-offset-8 decoration-blue-600 decoration-2' : ''
              }`}
            >
              Review Mistakes
              {mistakesCount > 0 && (
                <span className="text-xs font-mono tabular-nums text-rose-700 bg-rose-100 border border-rose-200 px-1.5 py-0.2 rounded font-bold">
                  {mistakesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('browser')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
                activeTab === 'browser' ? 'text-blue-600 underline underline-offset-8 decoration-blue-600 decoration-2' : ''
              }`}
            >
              Question Bank
            </button>
            <button
              onClick={() => onNavigate('import')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
                activeTab === 'import' ? 'text-blue-600 underline underline-offset-8 decoration-blue-600 decoration-2' : ''
              }`}
            >
              Import / PDF OCR
            </button>
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {!isOnline && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-md whitespace-nowrap">
                <WifiOff className="h-3.5 w-3.5 text-amber-700" />
                Offline Mode
              </span>
            )}

            {isInstallable && (
              <button
                onClick={install}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap shadow-sm"
                title="Install PWA application"
              >
                <Download className="h-3.5 w-3.5 text-blue-600" />
                Install App
              </button>
            )}

            {isIOS && (
              <button
                onClick={() => setShowIOSModal(true)}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 whitespace-nowrap shadow-sm"
              >
                <Download className="h-3.5 w-3.5 text-blue-600" />
                Add to Home
              </button>
            )}

            <button
              onClick={onOpenTotalReset}
              className="hidden md:flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 whitespace-nowrap shadow-xs"
              title="Total data wipe & clean start"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              <span>Clean Start</span>
            </button>

            <button
              onClick={onNewQuizClick}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Take Quiz</span>
              <span className="text-[10px] bg-blue-800 text-blue-100 px-1 py-0.5 rounded font-mono font-bold">20 Qs</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="flex lg:hidden overflow-x-auto border-t border-slate-200 px-4 py-2 gap-4 text-xs font-semibold text-slate-600 no-scrollbar bg-white">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`whitespace-nowrap ${activeTab === 'dashboard' ? 'text-blue-600 font-bold' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('daily')}
            className={`whitespace-nowrap ${activeTab === 'daily' ? 'text-blue-600 font-bold' : ''}`}
          >
            Daily Quiz
          </button>
          <button
            onClick={() => onNavigate('mistakes')}
            className={`whitespace-nowrap flex items-center gap-1 ${activeTab === 'mistakes' ? 'text-blue-600 font-bold' : ''}`}
          >
            Mistakes ({mistakesCount})
          </button>
          <button
            onClick={() => onNavigate('browser')}
            className={`whitespace-nowrap ${activeTab === 'browser' ? 'text-blue-600 font-bold' : ''}`}
          >
            Question Bank
          </button>
          <button
            onClick={() => onNavigate('import')}
            className={`whitespace-nowrap ${activeTab === 'import' ? 'text-blue-600 font-bold' : ''}`}
          >
            Import / OCR
          </button>
          <button
            onClick={onOpenTotalReset}
            className="whitespace-nowrap text-rose-600 font-bold"
          >
            Clean Start
          </button>
        </div>
      </header>

      {/* iOS Safari Installation Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Install on iPhone or iPad</h3>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              1. Tap the <strong className="text-blue-600">Share</strong> button in Safari’s bottom toolbar.<br />
              2. Scroll down the actions list and tap <strong className="text-blue-600">Add to Home Screen</strong>.<br />
              3. Tap <strong className="text-blue-600">Add</strong> in the top right to study offline anytime.
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
