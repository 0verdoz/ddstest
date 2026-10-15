import React, { useState } from 'react';
import { AlertOctagon, Trash2, RotateCcw, CheckSquare, Square, X } from 'lucide-react';

interface TotalResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
  statsCount: { quizzes: number; questions: number; mistakes: number; custom: number };
}

export const TotalResetModal: React.FC<TotalResetModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
  statsCount,
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [understoodCheckbox, setUnderstoodCheckbox] = useState(false);

  // Eligible if user types "RESET" OR checks the explicit confirmation box
  const isEligible = understoodCheckbox || confirmText.trim().toLowerCase() === 'reset';

  if (!isOpen) return null;

  const handleClose = () => {
    setConfirmText('');
    setUnderstoodCheckbox(false);
    onClose();
  };

  const handleExecuteReset = () => {
    if (!isEligible) return;
    setConfirmText('');
    setUnderstoodCheckbox(false);
    onConfirmReset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 shrink-0">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Total App Reset (Clean Start)</h2>
              <p className="text-xs text-slate-500">Restore application to a brand-new factory state</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-slate-700 leading-relaxed">
          Perform a <strong>total clean wipe</strong> of all your quiz data stored on this device. This provides a fresh, clean slate as if you just installed the application:
        </p>

        {/* Data Breakdown Cards */}
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/70 p-4 text-xs text-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-rose-950 flex items-center gap-1.5">
              <span>•</span> All Cumulative Quiz History & Scores:
            </span>
            <span className="font-mono font-bold text-rose-700">
              {statsCount.quizzes} quizzes ({statsCount.questions} Qs)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-rose-950 flex items-center gap-1.5">
              <span>•</span> Mistake Vault & Past Errors:
            </span>
            <span className="font-mono font-bold text-rose-700">
              {statsCount.mistakes} saved mistakes
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-rose-950 flex items-center gap-1.5">
              <span>•</span> Custom Pasted & PDF OCR Questions:
            </span>
            <span className="font-mono font-bold text-rose-700">
              {statsCount.custom} questions
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-rose-950 flex items-center gap-1.5">
              <span>•</span> Daily Challenge Streak & Topic Accuracies:
            </span>
            <span className="font-mono font-bold text-rose-700">Will be reset to 0</span>
          </div>
        </div>

        {/* Confirmation methods (Checkbox OR Type RESET for convenience) */}
        <div className="mt-5 space-y-3 pt-1">
          <label
            onClick={() => setUnderstoodCheckbox(!understoodCheckbox)}
            className="flex items-start gap-2.5 cursor-pointer select-none rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100 transition"
          >
            <div className="mt-0.5 text-blue-600 shrink-0">
              {understoodCheckbox ? (
                <CheckSquare className="h-5 w-5 fill-blue-600 text-white" />
              ) : (
                <Square className="h-5 w-5 text-slate-400" />
              )}
            </div>
            <span className="text-xs font-semibold text-slate-800 leading-tight">
              I understand this action is permanent and want to wipe all data for a clean start.
            </span>
          </label>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">or type RESET</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <input
            type="text"
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
            placeholder='Type "RESET" here'
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 font-mono transition"
          />
        </div>

        {/* Modal Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel & Keep Data
          </button>
          <button
            onClick={handleExecuteReset}
            disabled={!isEligible}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold transition shadow-sm ${
              isEligible
                ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-600/20 active:scale-[0.99] cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <Trash2 className="h-4 w-4" />
            <span>Wipe All Data & Clean Start</span>
          </button>
        </div>
      </div>
    </div>
  );
};
