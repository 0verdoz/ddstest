import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-blue-600 border border-blue-700 px-3.5 py-2 text-xs font-bold text-white shadow-xl">
      <WifiOff className="h-4 w-4" />
      <span>Offline Mode — All 5,000+ Section 5 questions and quiz sessions run locally.</span>
    </div>
  );
};
