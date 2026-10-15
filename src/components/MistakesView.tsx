import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Play, Trash2, BookOpen } from 'lucide-react';
import { MistakeItem } from '../types/quiz';

interface MistakesViewProps {
  mistakes: MistakeItem[];
  onStartMistakesQuiz: () => void;
  onResolveMistake: (questionId: string) => void;
  onClearAllMistakes: () => void;
  onOpenTotalReset?: () => void;
}

export const MistakesView: React.FC<MistakesViewProps> = ({
  mistakes,
  onStartMistakesQuiz,
  onResolveMistake,
  onClearAllMistakes,
  onOpenTotalReset,
}) => {
  const [filterTopic, setFilterTopic] = useState<string>('ALL');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const topics = Array.from(new Set(mistakes.map(m => m.question.topic)));
  const filtered = filterTopic === 'ALL' ? mistakes : mistakes.filter(m => m.question.topic === filterTopic);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded bg-rose-100 border border-rose-200 px-2.5 py-1 text-xs font-bold text-rose-700 mb-2">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Spaced Repetition & Weakness Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Mistake Review Vault</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Review and re-test questions you have previously missed to reinforce Section 5 rules and ensure 100% exam readiness.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {mistakes.length > 0 && (
            <>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition shadow-sm"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Vault</span>
              </button>
              <button
                onClick={onStartMistakesQuiz}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition active:scale-[0.98]"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Practice Missed ({filtered.length})</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter and stats row */}
      {mistakes.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
            <span>Filter by Topic:</span>
            <select
              value={filterTopic}
              onChange={e => setFilterTopic(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-blue-600 shadow-sm"
            >
              <option value="ALL">All Topics ({mistakes.length})</option>
              {topics.map(t => (
                <option key={t} value={t}>
                  {t} ({mistakes.filter(m => m.question.topic === t).length})
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs font-mono text-slate-600 font-semibold">
            Showing <strong className="text-slate-900">{filtered.length}</strong> missed items
          </span>
        </div>
      )}

      {/* Mistakes List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Unresolved Mistakes!</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
            Your mistake vault is completely empty. Take a new practice quiz to challenge your knowledge of Section 5.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(item => {
            const q = item.question;
            const userAnswerText = q.options[item.lastUserAnswerIndex] || 'None';
            const correctAnswerText = q.options[q.correctAnswerIndex];

            return (
              <div
                key={item.questionId}
                className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                      {q.topic}
                    </span>
                    {q.pageRef && (
                      <span className="text-[11px] font-mono text-slate-500">
                        · p. {q.pageRef}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded font-bold">
                      Missed {item.timesMissed} {item.timesMissed === 1 ? 'time' : 'times'}
                    </span>
                    <button
                      onClick={() => onResolveMistake(item.questionId)}
                      className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition"
                      title="Mark as understood / remove from vault"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                <p className="mt-3.5 text-base font-bold text-slate-900 leading-relaxed">
                  {q.question}
                </p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
                    <span className="block text-[11px] font-bold text-rose-700 uppercase tracking-wider mb-1">
                      Your Missed Answer:
                    </span>
                    <span className="text-rose-900 font-semibold">{userAnswerText}</span>
                  </div>

                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                    <span className="block text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                      Correct Georgia Rule:
                    </span>
                    <span className="text-emerald-950 font-bold">{correctAnswerText}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 leading-relaxed">
                  <div className="font-bold text-blue-600 mb-1 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Georgia Section 5 Manual Explanation:</span>
                  </div>
                  <p>{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clean Start Footer banner */}
      {onOpenTotalReset && (
        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Looking to reset your entire quiz profile, statistics, and mistake history?</span>
          <button
            onClick={onOpenTotalReset}
            className="font-bold text-rose-600 hover:text-rose-700 underline underline-offset-4 cursor-pointer"
          >
            Total App Reset (Clean Start)
          </button>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Clear Mistake Vault?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This will remove all {mistakes.length} recorded mistakes.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowClearConfirm(false);
                  onClearAllMistakes();
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
