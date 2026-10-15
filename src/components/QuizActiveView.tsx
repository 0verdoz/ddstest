import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Clock, AlertCircle, Bookmark } from 'lucide-react';
import { Question, PreviousAnswerFeedback } from '../types/quiz';

interface QuizActiveViewProps {
  currentIndex: number;
  currentQuestion?: Question;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  onResetQuiz: () => void;
  onExit: () => void;
  previousFeedback: PreviousAnswerFeedback | null;
  elapsedSeconds: number;
  isLastQuestion: boolean;
  quizTitle: string;
}

export const QuizActiveView: React.FC<QuizActiveViewProps> = ({
  currentIndex,
  currentQuestion,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onResetQuiz,
  onExit,
  previousFeedback,
  elapsedSeconds,
  isLastQuestion,
  quizTitle,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!currentQuestion) {
    return (
      <div className="mx-auto max-w-3xl p-8 text-center text-slate-700">
        <p>No questions found in this set.</p>
        <button
          onClick={onExit}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      {/* Top Controls & Status Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {quizTitle}
          </span>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>
              Question <strong className="text-slate-900 font-mono">{currentIndex + 1}</strong> of{' '}
              <span className="font-mono">{totalQuestions}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-mono tabular-nums text-slate-600">
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              {formatTime(elapsedSeconds)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5 text-blue-600" />
            <span>Reset Quiz</span>
          </button>
          <button
            onClick={onExit}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-semibold">
          <span>Exam Progress</span>
          <span className="font-mono tabular-nums text-blue-600">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* PREVIOUS QUESTION REVIEW BANNER (MANDATORY USER SPECIFICATION) */}
      {/* Highlighted in green or red on top of the current question     */}
      {/* ============================================================== */}
      {previousFeedback && (
        <div
          role="region"
          aria-label="Previous question review"
          className={`mb-8 rounded-xl border p-5 sm:p-6 transition-all duration-300 shadow-sm ${
            previousFeedback.isCorrect
              ? 'border-emerald-300 bg-emerald-50/90 text-slate-900 shadow-emerald-100'
              : 'border-rose-300 bg-rose-50/90 text-slate-900 shadow-rose-100'
          }`}
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-3">
            <div className="flex items-center gap-2">
              {previousFeedback.isCorrect ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Previous Question #{currentIndex}: Correct!</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-800 font-extrabold text-sm">
                  <XCircle className="h-5 w-5 shrink-0 text-rose-600" />
                  <span>Previous Question #{currentIndex}: Incorrect</span>
                </div>
              )}
            </div>
            <span className="text-xs text-slate-600">
              Topic: <strong className="text-slate-800">{previousFeedback.question.topic}</strong>
            </span>
          </div>

          {/* Previous Question text */}
          <p className="mt-3 text-sm font-semibold text-slate-900 leading-relaxed">
            {previousFeedback.question.question}
          </p>

          {/* User selection vs Correct answer details */}
          <div className="mt-4 space-y-2 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <span className="font-bold text-slate-600 shrink-0 w-28">Your Answer:</span>
              <span
                className={`font-semibold ${
                  previousFeedback.isCorrect ? 'text-emerald-800' : 'text-rose-700 line-through'
                }`}
              >
                {previousFeedback.userAnswerText}
              </span>
            </div>

            {!previousFeedback.isCorrect && (
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-800 shrink-0 w-28">Correct Rule:</span>
                <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                  {previousFeedback.correctAnswerText}
                </span>
              </div>
            )}
          </div>

          {/* DDS Section 5 Law Explanation */}
          <div className="mt-4 rounded-lg bg-white border border-slate-200 p-3.5 text-xs text-slate-800 leading-relaxed shadow-xs">
            <div className="flex items-center gap-1.5 font-bold text-blue-700 mb-1">
              <Bookmark className="h-3.5 w-3.5" />
              <span>Official Georgia DDS Section 5 Rule:</span>
            </div>
            <p>{previousFeedback.question.explanation}</p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* CURRENT QUESTION CARD (WHITE BACKGROUND & BLACK FONT)          */}
      {/* ============================================================== */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        {/* Topic & Metadata */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-4">
          <span className="font-bold text-blue-600">{currentQuestion.topic}</span>
          {currentQuestion.pageRef && (
            <span className="font-mono text-slate-500">Manual p. {currentQuestion.pageRef}</span>
          )}
        </div>

        {/* Question prompt */}
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((optionText, idx) => {
            const isSelected = selectedOption === idx;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectOption(idx)}
                className={`w-full flex items-start gap-3.5 rounded-lg border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 text-slate-900 shadow-sm ring-2 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono text-xs font-black ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {letter}
                </span>
                <span className="text-sm font-semibold leading-relaxed">{optionText}</span>
              </button>
            );
          })}
        </div>

        {/* Action footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0" />
            <span>Strict Georgia DDS Exam Mode: Forward-only progression (no going back).</span>
          </div>

          <button
            onClick={onNext}
            disabled={selectedOption === null}
            className={`flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold transition active:scale-[0.98] w-full sm:w-auto shadow-sm ${
              selectedOption !== null
                ? 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <span>{isLastQuestion ? 'Submit & View Score' : 'Next Question'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Reset Current Quiz?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Resetting will clear your current answers and return you to question 1 of this session.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Continue Quiz
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetQuiz();
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
              >
                Yes, Reset Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
