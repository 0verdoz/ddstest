import { useState, useEffect } from 'react';
import { CumulativeStats, QuizSession } from '../types/quiz';

const STATS_STORAGE_KEY = 'ga_dds_cumulative_stats_v1';

const INITIAL_STATS: CumulativeStats = {
  totalQuizzesTaken: 0,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  overallAccuracy: 0,
  quizzesPassed: 0,
  quizzesFailed: 0,
  currentStreakDays: 0,
  lastDailyDate: null,
  bestScorePercentage: 0,
  topicStats: {},
  recentSessions: [],
};

export function useQuizStats() {
  const [stats, setStats] = useState<CumulativeStats>(() => {
    if (typeof window === 'undefined') return INITIAL_STATS;
    try {
      const stored = localStorage.getItem(STATS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading cumulative stats', e);
    }
    return INITIAL_STATS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving stats to localStorage', e);
    }
  }, [stats]);

  const recordSession = (session: QuizSession) => {
    setStats(prev => {
      const newTotalQuizzes = prev.totalQuizzesTaken + 1;
      const newTotalQuestions = prev.totalQuestionsAnswered + session.totalQuestions;
      const newTotalCorrect = prev.totalCorrect + session.correctCount;
      const newOverallAccuracy =
        newTotalQuestions > 0 ? Math.round((newTotalCorrect / newTotalQuestions) * 1000) / 10 : 0;
      const newPassed = session.passed ? prev.quizzesPassed + 1 : prev.quizzesPassed;
      const newFailed = !session.passed ? prev.quizzesFailed + 1 : prev.quizzesFailed;
      const newBest = Math.max(prev.bestScorePercentage, session.scorePercentage);

      // Update topic breakdown
      const updatedTopicStats = { ...prev.topicStats };
      for (const rec of session.records) {
        const top = rec.topic;
        if (!updatedTopicStats[top]) {
          updatedTopicStats[top] = { answered: 0, correct: 0 };
        }
        updatedTopicStats[top].answered += 1;
        if (rec.isCorrect) {
          updatedTopicStats[top].correct += 1;
        }
      }

      // Check daily streak
      let streak = prev.currentStreakDays;
      const today = session.dateStr;
      if (session.mode === 'daily') {
        if (!prev.lastDailyDate) {
          streak = 1;
        } else if (prev.lastDailyDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          if (prev.lastDailyDate === yesterdayStr) {
            streak += 1;
          } else {
            streak = 1;
          }
        }
      }

      const updatedSessions = [session, ...prev.recentSessions].slice(0, 50);

      return {
        totalQuizzesTaken: newTotalQuizzes,
        totalQuestionsAnswered: newTotalQuestions,
        totalCorrect: newTotalCorrect,
        overallAccuracy: newOverallAccuracy,
        quizzesPassed: newPassed,
        quizzesFailed: newFailed,
        currentStreakDays: streak,
        lastDailyDate: session.mode === 'daily' ? today : prev.lastDailyDate,
        bestScorePercentage: newBest,
        topicStats: updatedTopicStats,
        recentSessions: updatedSessions,
      };
    });
  };

  const resetAllStats = () => {
    setStats(INITIAL_STATS);
    try {
      localStorage.removeItem(STATS_STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing stats', e);
    }
  };

  return {
    stats,
    recordSession,
    resetAllStats,
  };
}
