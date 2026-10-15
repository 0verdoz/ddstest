import { useState, useEffect, useRef } from 'react';
import { Question, PreviousAnswerFeedback, QuizSession } from '../types/quiz';

export interface UseQuizStateProps {
  questions: Question[];
  mode: QuizSession['mode'];
  topicFilter?: QuizSession['topicFilter'];
  onComplete: (session: QuizSession) => void;
  onMistake?: (question: Question, userSelectedIndex: number) => void;
  onResolveMistake?: (questionId: string) => void;
}

export function useQuizState({
  questions,
  mode,
  topicFilter,
  onComplete,
  onMistake,
  onResolveMistake,
}: UseQuizStateProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [previousFeedback, setPreviousFeedback] = useState<PreviousAnswerFeedback | null>(null);
  const [answersRecord, setAnswersRecord] = useState<QuizSession['records']>([]);
  const [startTime] = useState<number>(() => Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lastCompletedSession, setLastCompletedSession] = useState<QuizSession | null>(null);

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isCompleted]);

  const currentQuestion = questions[currentIndex] as Question | undefined;
  const isLastQuestion = currentIndex === questions.length - 1;

  // Handle option select
  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  // Submit and advance strictly forward (no going back!)
  const handleNext = () => {
    if (selectedOption === null || !currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;

    const feedback: PreviousAnswerFeedback = {
      question: currentQuestion,
      userSelectedIndex: selectedOption,
      isCorrect,
      correctAnswerText: currentQuestion.options[currentQuestion.correctAnswerIndex],
      userAnswerText: currentQuestion.options[selectedOption],
    };

    const recordEntry: QuizSession['records'][0] = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      options: currentQuestion.options,
      userSelectedIndex: selectedOption,
      correctAnswerIndex: currentQuestion.correctAnswerIndex,
      isCorrect,
      explanation: currentQuestion.explanation,
      topic: currentQuestion.topic,
    };

    const newRecords = [...answersRecord, recordEntry];
    setAnswersRecord(newRecords);

    // Track mistakes
    if (!isCorrect) {
      onMistake?.(currentQuestion, selectedOption);
    } else {
      onResolveMistake?.(currentQuestion.id);
    }

    if (isLastQuestion) {
      // Quiz finished
      setIsCompleted(true);
      const totalCorrect = newRecords.filter(r => r.isCorrect).length;
      const scorePct = Math.round((totalCorrect / questions.length) * 1000) / 10;
      const finalDuration = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      const today = new Date().toISOString().split('T')[0];

      const completedSession: QuizSession = {
        id: `sess-${Date.now()}`,
        timestamp: Date.now(),
        dateStr: today,
        mode,
        topicFilter,
        totalQuestions: questions.length,
        correctCount: totalCorrect,
        scorePercentage: scorePct,
        passed: scorePct >= 75, // DDS 75% standard passing score
        durationSeconds: finalDuration,
        records: newRecords,
      };

      setLastCompletedSession(completedSession);
      onComplete(completedSession);
    } else {
      // Forward only: show previous feedback on top of current question
      setPreviousFeedback(feedback);
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      // Smoothly scroll to the feedback/question
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset quiz function
  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setPreviousFeedback(null);
    setAnswersRecord([]);
    setIsCompleted(false);
    setLastCompletedSession(null);
  };

  return {
    currentIndex,
    currentQuestion,
    totalQuestions: questions.length,
    selectedOption,
    handleSelectOption,
    handleNext,
    handleReset,
    previousFeedback,
    isLastQuestion,
    elapsedSeconds,
    isCompleted,
    lastCompletedSession,
    correctSoFar: answersRecord.filter(r => r.isCorrect).length,
  };
}
