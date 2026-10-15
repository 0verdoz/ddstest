import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Play,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Layers,
} from 'lucide-react';
import { CumulativeStats, Section5Topic } from '../types/quiz';
import { ALL_SECTION_5_TOPICS } from '../data/ddsRepository';

interface DashboardViewProps {
  stats: CumulativeStats;
  mistakesCount: number;
  onStartQuiz: (
    mode: 'standard-20' | 'daily' | 'marathon-50' | 'topic' | 'mistakes',
    topic?: Section5Topic
  ) => void;
  onResetStats: () => void;
  onNavigateTab: (tab: 'browser' | 'mistakes' | 'import' | 'daily') => void;
  onOpenTotalReset: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  mistakesCount,
  onStartQuiz,
  onResetStats,
  onNavigateTab,
  onOpenTotalReset,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<Section5Topic>(ALL_SECTION_5_TOPICS[0]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const passRate =
    stats.totalQuizzesTaken > 0
      ? Math.round((stats.quizzesPassed / stats.totalQuizzesTaken) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8">
      {/* Hero Welcome & Overview */}
      <div className="rounded-xl sm:rounded-2xl border border-blue-100 bg-white p-4 sm:p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 border border-blue-200 px-2.5 py-1 text-xs font-bold text-blue-700 mb-2.5 sm:mb-3">
              <span>Georgia Driver Services (DDS)</span>
              <span>·</span>
              <span>Section 5 Traffic Laws</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Georgia DDS Section 5 Master Quiz
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Master all traffic rules, right-of-way laws, Move-Over statutes, passing limits, Super Speeder fees, work zone penalties, and Hands Free requirements across 5,000+ authentic questions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => onStartQuiz('standard-20')}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98] w-full sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current shrink-0" />
              <span>Start 20-Q Exam</span>
            </button>
            <button
              onClick={() => onStartQuiz('daily')}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-800 transition hover:bg-slate-100 w-full sm:w-auto"
            >
              <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Daily Practice</span>
            </button>
          </div>
        </div>

        {/* Cumulative Stats Strip */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 border-t border-slate-100 pt-5 sm:pt-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 sm:p-3.5">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate" title="Total Quizzes">Total Quizzes</span>
            <div className="mt-1 text-lg sm:text-xl md:text-2xl font-black font-mono text-slate-900">
              {stats.totalQuizzesTaken}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 sm:p-3.5">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate" title="Questions Answered">Questions Answered</span>
            <div className="mt-1 text-lg sm:text-xl md:text-2xl font-black font-mono text-slate-900">
              {stats.totalQuestionsAnswered}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 sm:p-3.5">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate" title="Overall Accuracy">Overall Accuracy</span>
            <div className="mt-1 text-lg sm:text-xl md:text-2xl font-black font-mono text-emerald-600">
              {stats.overallAccuracy}%
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 sm:p-3.5">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate" title="DDS Pass Rate">DDS Pass Rate</span>
            <div className="mt-1 text-lg sm:text-xl md:text-2xl font-black font-mono text-blue-600">
              {passRate}%
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 sm:p-3.5">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate" title="Best Score">Best Score</span>
            <div className="mt-1 text-lg sm:text-xl md:text-2xl font-black font-mono text-indigo-600">
              {stats.bestScorePercentage}%
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 sm:p-3.5">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 flex items-center gap-1 truncate" title="Daily Streak">
              <Flame className="h-3 w-3 text-orange-500 shrink-0" />
              <span className="truncate">Daily Streak</span>
            </span>
            <div className="mt-1 text-lg sm:text-xl md:text-2xl font-black font-mono text-orange-600">
              {stats.currentStreakDays} <span className="text-xs font-sans font-medium text-slate-500">{stats.currentStreakDays === 1 ? 'day' : 'days'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Daily Practice Quiz */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold text-blue-600 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Randomized Daily Challenge
              </span>
              <span className="font-mono">{todayStr}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Daily 20-Question Drill</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every day features a unique, date-seeded 20-question randomized test spanning all 30 subtopics under Section 5. Consistent daily drills build long-term retention.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Status:{' '}
              {stats.lastDailyDate === new Date().toISOString().split('T')[0] ? (
                <span className="text-emerald-600 font-bold">Completed today</span>
              ) : (
                <span className="text-blue-600 font-bold">Ready to take</span>
              )}
            </span>
            <button
              onClick={() => onStartQuiz('daily')}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-sm"
            >
              <span>Start Daily</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Mistake Vault & Review */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                Adaptive Mistake Review
              </span>
              <span className="font-mono text-rose-600 font-bold">{mistakesCount} questions</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Review Past Mistakes</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every missed question is automatically cataloged in your Mistake Vault with official citations. Retake only missed questions until you achieve 100% mastery.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab('mistakes')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition"
            >
              Open Vault ({mistakesCount})
            </button>
            <button
              onClick={() => onStartQuiz('mistakes')}
              disabled={mistakesCount === 0}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                mistakesCount > 0
                  ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Retake Missed</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: 50-Question Marathon & Custom Imports */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold text-indigo-600 flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" />
                5,000+ Question Catalog
              </span>
              <span className="font-mono text-slate-500">Deep Practice</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Marathon & Custom Sets</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Challenge yourself with a comprehensive 50-question marathon, browse the full 5,000+ item bank, or paste custom test questions and upload PDF pages.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab('import')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition"
            >
              Import / OCR
            </button>
            <button
              onClick={() => onStartQuiz('marathon-50')}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-sm"
            >
              <span>50-Q Marathon</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Topic Mastery Breakdown */}
      <div className="mt-8 sm:mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-4 mb-5 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Section 5 Topic Mastery Breakdown
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cumulative accuracy and performance tracking across all 30 subtopics of the Georgia DDS manual.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value as Section5Topic)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-600 w-full sm:max-w-xs truncate shadow-sm"
            >
              {ALL_SECTION_5_TOPICS.map(top => (
                <option key={top} value={top}>
                  {top}
                </option>
              ))}
            </select>
            <button
              onClick={() => onStartQuiz('topic', selectedTopic)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition whitespace-nowrap shadow-sm shrink-0"
            >
              <span>Practice Topic</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {ALL_SECTION_5_TOPICS.map(topicName => {
            const topicStat = stats.topicStats[topicName] || { answered: 0, correct: 0 };
            const topicAccuracy =
              topicStat.answered > 0
                ? Math.round((topicStat.correct / topicStat.answered) * 100)
                : null;

            return (
              <div
                key={topicName}
                className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm transition hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1" title={topicName}>
                      {topicName}
                    </h4>
                    {topicAccuracy !== null ? (
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                          topicAccuracy >= 75
                            ? 'text-emerald-700 bg-emerald-100 border border-emerald-200'
                            : 'text-blue-700 bg-blue-100 border border-blue-200'
                        }`}
                      >
                        {topicAccuracy}%
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono shrink-0">Not attempted</span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span>
                      Answered: <strong className="font-mono text-slate-900">{topicStat.answered}</strong>
                    </span>
                    <span>
                      Correct: <strong className="font-mono text-emerald-600 font-bold">{topicStat.correct}</strong>
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full transition-all duration-300 ${
                        (topicAccuracy || 0) >= 75 ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${topicAccuracy || 0}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => onStartQuiz('topic', topicName)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                  >
                    <span>Drill 10 Qs</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Sessions History */}
      {stats.recentSessions.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 border-b border-slate-200 pb-3 sm:pb-4 mb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Recent Quiz Sessions</h2>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Cumulative Stats</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[540px] text-left text-xs text-slate-700">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-900">
                <tr>
                  <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Date</th>
                  <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Mode</th>
                  <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Score</th>
                  <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Correct / Total</th>
                  <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Status</th>
                  <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {stats.recentSessions.slice(0, 10).map((sess, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 font-sans text-slate-900 font-medium">{sess.dateStr}</td>
                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 uppercase tracking-wider text-[11px] text-slate-600">
                      {sess.mode}
                    </td>
                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 font-black text-slate-900">{sess.scorePercentage}%</td>
                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-800 font-semibold">
                      {sess.correctCount} / {sess.totalQuestions}
                    </td>
                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 font-sans">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          sess.passed
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {sess.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-500">{sess.durationSeconds}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Clean Start / Total Reset Action Box */}
      <div className="mt-8 sm:mt-12 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-rose-600 shrink-0" />
            <span>Need a Clean Start?</span>
          </h3>
          <p className="mt-1 text-xs text-slate-600 max-w-xl">
            Wipe all historical sessions, quiz accuracy stats, mistake vault records, and custom imported questions from your browser.
          </p>
        </div>

        <button
          onClick={onOpenTotalReset}
          className="flex items-center justify-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 hover:border-rose-400 transition whitespace-nowrap shadow-xs shrink-0 w-full sm:w-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Total App Reset (Clean Start)</span>
        </button>
      </div>

      {/* Reset Stats Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Reset Cumulative Statistics?</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              This will permanently clear your historical quiz sessions, accuracy rates, and streak counters. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetStats();
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
              >
                Reset All Stats
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
