import { useState, useEffect } from 'react';
import { MistakeItem, Question } from '../types/quiz';

const MISTAKES_STORAGE_KEY = 'ga_dds_mistakes_v1';

export function useMistakes() {
  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(MISTAKES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading mistakes', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(mistakes));
    } catch (e) {
      console.error('Error saving mistakes', e);
    }
  }, [mistakes]);

  const recordMistake = (question: Question, userSelectedIndex: number) => {
    setMistakes(prev => {
      const existingIdx = prev.findIndex(m => m.questionId === question.id);
      const now = Date.now();
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          timesMissed: copy[existingIdx].timesMissed + 1,
          lastMissedTimestamp: now,
          lastUserAnswerIndex: userSelectedIndex,
        };
        return copy;
      } else {
        return [
          {
            questionId: question.id,
            question,
            timesMissed: 1,
            lastMissedTimestamp: now,
            lastUserAnswerIndex: userSelectedIndex,
          },
          ...prev,
        ];
      }
    });
  };

  const resolveMistake = (questionId: string) => {
    setMistakes(prev => prev.filter(m => m.questionId !== questionId));
  };

  const clearAllMistakes = () => {
    setMistakes([]);
    try {
      localStorage.removeItem(MISTAKES_STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing mistakes', e);
    }
  };

  return {
    mistakes,
    recordMistake,
    resolveMistake,
    clearAllMistakes,
  };
}
