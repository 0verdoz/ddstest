import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, AlertTriangle, CheckCircle2, XCircle, RotateCcw, Home, Clock, Target } from 'lucide-react';
import { QuizSession } from '../types/quiz';

interface QuizSummaryViewProps {
  session: QuizSession;
  onRetakeQuiz: () => void;
  onPracticeMistakes: () => void;
  onGoHome: () => void;
  onViewMistakesVault: () => void;
  onOpenTotalReset?: () => void;
}

export const QuizSummaryView: React.FC<QuizSummaryViewProps> = ({
  session,
  onRetakeQuiz,
  onPracticeMistakes,
  onGoHome,
  onViewMistakesVault,
  onOpenTotalReset,
}) => {
  const incorrectRecords = session.records.filter(r => !r.isCorrect);

  useEffect(() => {
    if (session.passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#10b981', '#3b82f6', '#f59e0b'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [session.passed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Top Banner Card */}
      <div
        className={`rounded-2xl border p-8 text-center shadow-sm bg-white ${
          session.passed
            ? 'border-emerald-300 ring-1 ring-emerald-200'
            : 'border-rose-300 ring-1 ring-rose-200'
        }`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
          {session.passed ? (
            <Award className="h-9 w-9 text-emerald-600" />
          ) : (
            <AlertTriangle className="h-9 w-9 text-rose-600" />
          )}
        </div>

        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">
          {session.passed ? 'Official DDS Standard: Passed!' : 'DDS Practice Test: Needs Review'}
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          {session.passed
            ? `Congratulations! You scored ${session.scorePercentage}% on Georgia DDS Section 5. (Passing threshold is 75%, or 15/20 questions).`
            : `You scored ${session.scorePercentage}%. Georgia DDS requires at least 75% (15 out of 20) to pass the real exam. Review your missed questions below!`}
        </p>

        {/* Metric stats row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 pt-6">
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Score</span>
            <div className="mt-1 text-2xl font-black font-mono text-slate-900">
              {session.scorePercentage}%
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Correct / Total</span>
            <div className="mt-1 text-2xl font-black font-mono text-slate-900">
              <span className="text-emerald-600">{session.correctCount}</span> / {session.totalQuestions}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Time Taken</span>
            <div className="mt-1 text-2xl font-black font-mono text-slate-900">
              {formatTime(session.durationSeconds)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Section 5 Target</span>
            <div className="mt-1 text-2xl font-black font-mono text-blue-600">
              ≥ 75%
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRetakeQuiz}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Take Another Quiz</span>
          </button>

          {incorrectRecords.length > 0 && (
            <button
              onClick={onPracticeMistakes}
              className="flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 transition"
            >
              <Target className="h-4 w-4" />
              <span>Retake Missed Questions ({incorrectRecords.length})</span>
            </button>
          )}

          <button
            onClick={onGoHome}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </button>

          {onOpenTotalReset && (
            <button
              onClick={onOpenTotalReset}
              className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50/70 px-4 py-2.5 text-xs sm:text-sm font-semibold text-rose-700 hover:bg-rose-100 hover:text-rose-800 transition"
              title="Wipe all data and restart completely fresh"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clean Start</span>
            </button>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-lg font-bold text-slate-900">Session Questions Review</h2>
          <span className="text-xs text-slate-500 font-semibold">
            {session.records.length} Questions Answered
          </span>
        </div>

        <div className="space-y-4">
          {session.records.map((rec, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-5 transition bg-white shadow-sm ${
                rec.isCorrect
                  ? 'border-slate-200'
                  : 'border-rose-200 bg-rose-50/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {rec.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-700">
                    Question {idx + 1} · {rec.topic}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    rec.isCorrect
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  {rec.isCorrect ? 'Correct' : 'Missed'}
                </span>
              </div>

              <p className="mt-3 text-sm font-bold text-slate-900 leading-snug">{rec.questionText}</p>

              <div className="mt-4 space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-start gap-2">
                  <span className="w-24 shrink-0 text-slate-500 font-semibold">Your Pick:</span>
                  <span className={rec.isCorrect ? 'text-emerald-800 font-semibold' : 'text-rose-700 font-semibold line-through'}>
                    {rec.options[rec.userSelectedIndex]}
                  </span>
                </div>
                {!rec.isCorrect && (
                  <div className="flex items-start gap-2">
                    <span className="w-24 shrink-0 text-emerald-700 font-bold">Correct Rule:</span>
                    <span className="text-emerald-900 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {rec.options[rec.correctAnswerIndex]}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3.5 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 leading-relaxed">
                <span className="font-bold text-blue-600 mr-1.5">Section 5 Rule:</span>
                {rec.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
