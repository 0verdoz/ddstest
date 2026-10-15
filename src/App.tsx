import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DashboardView } from './components/DashboardView';
import { QuizActiveView } from './components/QuizActiveView';
import { QuizSummaryView } from './components/QuizSummaryView';
import { MistakesView } from './components/MistakesView';
import { QuestionBrowserView } from './components/QuestionBrowserView';
import { ImportQuestionsModal } from './components/ImportQuestionsModal';
import { TotalResetModal } from './components/TotalResetModal';
import { useQuizStats } from './hooks/useQuizStats';
import { useMistakes } from './hooks/useMistakes';
import { useQuizState } from './hooks/useQuizState';
import { Question, Section5Topic, QuizSession } from './types/quiz';
import { getDailyQuiz, getRandomQuiz, clearCustomQuestions, loadCustomQuestions, resetRepositoryCache } from './data/ddsRepository';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const { stats, recordSession, resetAllStats } = useQuizStats();
  const { mistakes, recordMistake, resolveMistake, clearAllMistakes } = useMistakes();

  // Active quiz session configuration
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [activeMode, setActiveMode] = useState<QuizSession['mode']>('standard-20');
  const [activeTopic, setActiveTopic] = useState<Section5Topic | undefined>(undefined);
  const [quizTitle, setQuizTitle] = useState<string>('Standard 20-Question DDS Exam');
  const [completedSession, setCompletedSession] = useState<QuizSession | null>(null);
  const [showTotalResetModal, setShowTotalResetModal] = useState<boolean>(false);
  const [resetToast, setResetToast] = useState<string | null>(null);

  // Total Reset / Factory Clean Start
  const handleTotalCleanStart = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error('Error clearing storage', e);
    }
    resetRepositoryCache();
    resetAllStats();
    clearAllMistakes();
    clearCustomQuestions();
    quizEngine.handleReset();
    setActiveQuestions([]);
    setCompletedSession(null);
    setActiveTab('dashboard');
    setShowTotalResetModal(false);
    setResetToast('All application data has been wiped. You now have a fresh, clean start!');
    setTimeout(() => {
      setResetToast(null);
    }, 6000);
  };

  // Initialize or start a quiz
  const startQuizWithQuestions = (
    questions: Question[],
    mode: QuizSession['mode'],
    title: string,
    topic?: Section5Topic
  ) => {
    setActiveQuestions(questions);
    setActiveMode(mode);
    setActiveTopic(topic);
    setQuizTitle(title);
    setCompletedSession(null);
    setActiveTab('quiz');
  };

  const handleStartQuizFromDashboard = (
    mode: 'standard-20' | 'daily' | 'marathon-50' | 'topic' | 'mistakes',
    topic?: Section5Topic
  ) => {
    if (mode === 'standard-20') {
      const q = getRandomQuiz(20);
      startQuizWithQuestions(q, 'standard-20', 'Official 20-Question DDS Test');
    } else if (mode === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      const q = getDailyQuiz(today);
      startQuizWithQuestions(q, 'daily', `Daily Section 5 Drill (${today})`);
    } else if (mode === 'marathon-50') {
      const q = getRandomQuiz(50);
      startQuizWithQuestions(q, 'marathon-50', '50-Question Section 5 Marathon');
    } else if (mode === 'topic' && topic) {
      const q = getRandomQuiz(15, topic);
      startQuizWithQuestions(q, 'topic', `Focus Drill: ${topic}`, topic);
    } else if (mode === 'mistakes') {
      if (mistakes.length === 0) return;
      const q = mistakes.map(m => m.question);
      startQuizWithQuestions(q, 'mistakes', `Mistake Vault Drill (${q.length} Questions)`);
    }
  };

  // Called when a quiz session finishes
  const handleQuizCompleted = (session: QuizSession) => {
    recordSession(session);
    setCompletedSession(session);
  };

  // Instantiate active quiz engine hook
  const quizEngine = useQuizState({
    questions: activeQuestions,
    mode: activeMode,
    topicFilter: activeTopic,
    onComplete: handleQuizCompleted,
    onMistake: (question, selectedIdx) => {
      recordMistake(question, selectedIdx);
    },
    onResolveMistake: (qId) => {
      resolveMistake(qId);
    },
  });

  const handleRetakeCurrentQuiz = () => {
    quizEngine.handleReset();
    setCompletedSession(null);
    setActiveTab('quiz');
  };

  const handlePracticeSessionMissed = () => {
    if (!completedSession) return;
    const missed = completedSession.records
      .filter(r => !r.isCorrect)
      .map(r => activeQuestions.find(q => q.id === r.questionId)!)
      .filter(Boolean);

    if (missed.length > 0) {
      startQuizWithQuestions(missed, 'mistakes', `Retry Missed Questions (${missed.length})`);
    }
  };

  const handleCustomQuestionsImported = (imported: Question[], startImmediately: boolean) => {
    if (startImmediately) {
      startQuizWithQuestions(imported, 'custom', `Custom Imported Quiz (${imported.length} Qs)`);
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        onNavigate={tab => {
          if (tab === 'daily') {
            handleStartQuizFromDashboard('daily');
          } else {
            setActiveTab(tab);
          }
        }}
        onNewQuizClick={() => handleStartQuizFromDashboard('standard-20')}
        mistakesCount={mistakes.length}
        onOpenTotalReset={() => setShowTotalResetModal(true)}
      />

      {/* Clean Start Toast Notification */}
      {resetToast && (
        <div className="bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-3 text-center shadow-md animate-fade-in flex items-center justify-center gap-2">
          <span>✓</span>
          <span>{resetToast}</span>
        </div>
      )}

      {/* Main View Port */}
      <main className="flex-1 pb-16">
        {activeTab === 'quiz' && (
          <>
            {completedSession ? (
              <QuizSummaryView
                session={completedSession}
                onRetakeQuiz={handleRetakeCurrentQuiz}
                onPracticeMistakes={handlePracticeSessionMissed}
                onGoHome={() => setActiveTab('dashboard')}
                onViewMistakesVault={() => setActiveTab('mistakes')}
                onOpenTotalReset={() => setShowTotalResetModal(true)}
              />
            ) : (
              <QuizActiveView
                currentIndex={quizEngine.currentIndex}
                currentQuestion={quizEngine.currentQuestion}
                totalQuestions={quizEngine.totalQuestions}
                selectedOption={quizEngine.selectedOption}
                onSelectOption={quizEngine.handleSelectOption}
                onNext={quizEngine.handleNext}
                onResetQuiz={quizEngine.handleReset}
                onExit={() => setActiveTab('dashboard')}
                previousFeedback={quizEngine.previousFeedback}
                elapsedSeconds={quizEngine.elapsedSeconds}
                isLastQuestion={quizEngine.isLastQuestion}
                quizTitle={quizTitle}
              />
            )}
          </>
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            mistakesCount={mistakes.length}
            onStartQuiz={handleStartQuizFromDashboard}
            onResetStats={resetAllStats}
            onNavigateTab={tab => {
              if (tab === 'daily') handleStartQuizFromDashboard('daily');
              else setActiveTab(tab);
            }}
            onOpenTotalReset={() => setShowTotalResetModal(true)}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakesView
            mistakes={mistakes}
            onStartMistakesQuiz={() => handleStartQuizFromDashboard('mistakes')}
            onResolveMistake={resolveMistake}
            onClearAllMistakes={clearAllMistakes}
            onOpenTotalReset={() => setShowTotalResetModal(true)}
          />
        )}

        {activeTab === 'browser' && (
          <QuestionBrowserView
            onStartTopicQuiz={topic => handleStartQuizFromDashboard('topic', topic)}
          />
        )}

        {activeTab === 'import' && (
          <ImportQuestionsModal
            onQuestionsImported={handleCustomQuestionsImported}
            onClose={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* Offline Toast */}
      <OfflineIndicator />

      {/* Total Factory Reset Modal */}
      <TotalResetModal
        isOpen={showTotalResetModal}
        onClose={() => setShowTotalResetModal(false)}
        onConfirmReset={handleTotalCleanStart}
        statsCount={{
          quizzes: stats.totalQuizzesTaken,
          questions: stats.totalQuestionsAnswered,
          mistakes: mistakes.length,
          custom: loadCustomQuestions().length,
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-600">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-slate-700">
            Georgia Department of Driver Services (DDS) Section 5 Study Companion · 5,000+ Questions
          </p>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>Forward-only examination mode</span>
            <span>·</span>
            <span>Full offline PWA support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
