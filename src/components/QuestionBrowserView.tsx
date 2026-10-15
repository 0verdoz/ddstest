import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Section5Topic } from '../types/quiz';
import { ALL_SECTION_5_TOPICS, searchQuestions } from '../data/ddsRepository';

interface QuestionBrowserViewProps {
  onStartTopicQuiz: (topic: Section5Topic) => void;
}

export const QuestionBrowserView: React.FC<QuestionBrowserViewProps> = ({
  onStartTopicQuiz,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Section5Topic | 'ALL'>('ALL');
  const [page, setPage] = useState(0);
  const pageSize = 15;

  const { questions, total } = useMemo(() => {
    return searchQuestions(searchQuery, selectedTopic, pageSize, page * pageSize);
  }, [searchQuery, selectedTopic, page]);

  const totalPages = Math.ceil(total / pageSize);

  const handleTopicChange = (newTopic: Section5Topic | 'ALL') => {
    setSelectedTopic(newTopic);
    setPage(0);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(0);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Georgia DDS Driver Manual
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Section 5 Question Catalog</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Explore 5,000+ official questions and situational scenarios covering all Georgia Section 5 statutes.
          </p>
        </div>

        {selectedTopic !== 'ALL' && (
          <button
            onClick={() => onStartTopicQuiz(selectedTopic)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Practice This Topic</span>
          </button>
        )}
      </div>

      {/* Search & Topic Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search by keyword (e.g. Move-Over, 100 feet, 18 inches, Super Speeder, flasher, BAC, bicycle)..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition shadow-sm"
          />
        </div>

        <div className="relative">
          <select
            value={selectedTopic}
            onChange={e => handleTopicChange(e.target.value as Section5Topic | 'ALL')}
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition truncate shadow-sm font-medium"
          >
            <option value="ALL">All Section 5 Topics (5,000+ Items)</option>
            {ALL_SECTION_5_TOPICS.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Count and Pagination controls */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-600 font-semibold">
        <span>
          Found <strong className="font-mono text-slate-900 font-bold">{total.toLocaleString()}</strong> questions
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-2 font-mono">
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded border border-slate-300 p-1 hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4 text-slate-700" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="rounded border border-slate-300 p-1 hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4 text-slate-700" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div
            key={q.id || idx}
            className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-3 border-b border-slate-100 pb-2.5">
              <span className="font-bold text-blue-600">{q.topic}</span>
              <div className="flex items-center gap-3">
                {q.pageRef && (
                  <span className="font-mono text-slate-500">Manual p. {q.pageRef}</span>
                )}
                <span className="font-mono text-slate-400 text-[11px]">{q.id}</span>
              </div>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {q.question}
            </h3>

            {/* Options grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {q.options.map((opt, optIdx) => {
                const isCorrect = optIdx === q.correctAnswerIndex;
                const letter = String.fromCharCode(65 + optIdx);
                return (
                  <div
                    key={optIdx}
                    className={`flex items-start gap-2.5 rounded-lg border p-2.5 ${
                      isCorrect
                        ? 'border-emerald-400 bg-emerald-50 text-slate-900 font-semibold'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] font-mono font-bold ${
                        isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Official Rule explanation */}
            <div className="mt-3.5 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 leading-relaxed">
              <span className="font-bold text-blue-600 mr-1.5">Official Rule:</span>
              {q.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3 font-mono text-xs text-slate-700 font-semibold">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-800 hover:bg-slate-50 disabled:opacity-40 shadow-sm"
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-800 hover:bg-slate-50 disabled:opacity-40 shadow-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
