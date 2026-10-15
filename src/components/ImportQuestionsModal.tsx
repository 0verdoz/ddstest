import React, { useState, useRef } from 'react';
import {
  Upload,
  ClipboardPaste,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Loader2,
  Trash2,
  Key,
  Check,
  Edit3,
} from 'lucide-react';
import { Question, Section5Topic } from '../types/quiz';
import { addCustomQuestions, clearCustomQuestions, loadCustomQuestions, ALL_SECTION_5_TOPICS } from '../data/ddsRepository';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface ImportQuestionsModalProps {
  onQuestionsImported: (questions: Question[], startQuizImmediately: boolean) => void;
  onClose?: () => void;
}

export const ImportQuestionsModal: React.FC<ImportQuestionsModalProps> = ({
  onQuestionsImported,
  onClose,
}) => {
  const isOnline = useOnlineStatus();
  const [activeTab, setActiveTab] = useState<'paste' | 'ocr'>('paste');
  const [pasteText, setPasteText] = useState('');
  const [answerKeyText, setAnswerKeyText] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [existingCustomCount, setExistingCustomCount] = useState<number>(() => loadCustomQuestions().length);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to extract an answer key dictionary from text
  const parseAnswerKeyMap = (rawText: string): Map<number, { letter: string; explanation: string }> => {
    const map = new Map<number, { letter: string; explanation: string }>();
    const lines = rawText.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Matches formats like "1. C — Page 19..." or "1) B" or "Q1: A" or "1: C"
      const match = trimmed.match(/(?:Q\s*)?(\d{1,3})\s*[\.:\)\-]\s*([A-D])(?:\s*[\—\-\|:]\s*(.+))?/i);
      if (match) {
        const num = parseInt(match[1], 10);
        const letter = match[2].toUpperCase();
        const explanation = match[3] ? match[3].trim() : '';
        map.set(num, { letter, explanation });
      }
    }
    return map;
  };

  // Smart robust parser handling unified questions + answers or split answer key
  const handleParseText = () => {
    setParseError(null);
    if (!pasteText.trim()) {
      setParseError('Please paste question text into the box.');
      return;
    }

    try {
      // Direct JSON support
      if (pasteText.trim().startsWith('[') || pasteText.trim().startsWith('{')) {
        const json = JSON.parse(pasteText.trim());
        const arr = Array.isArray(json) ? json : json.questions || [];
        if (arr.length > 0) {
          const validated: Question[] = arr.map((item: any, idx: number) => ({
            id: `custom-paste-${Date.now()}-${idx}`,
            question: item.question || `Custom Question ${idx + 1}`,
            options: Array.isArray(item.options) && item.options.length >= 4
              ? [item.options[0], item.options[1], item.options[2], item.options[3]]
              : ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswerIndex: typeof item.correctAnswerIndex === 'number' ? item.correctAnswerIndex : 0,
            explanation: item.explanation || 'Custom imported question.',
            topic: (item.topic as Section5Topic) || 'Laws Governing Right-of-Way',
            isCustom: true,
          }));
          setParsedQuestions(validated);
          return;
        }
      }
    } catch (e) {
      // Continue to text parser
    }

    // Step 1: Check for Answer Key either in separate field or unified in main text
    let mainQuestionsText = pasteText;
    let separateAnswersText = answerKeyText;

    // Check if main text contains an "Answer Key" section header
    const answerKeySplitRegex = /\n\s*(?:Answer\s*Key|Answers|Answer\s*Key\s*&[^\n]*)\s*\n/i;
    const splitMatch = mainQuestionsText.search(answerKeySplitRegex);
    if (splitMatch !== -1) {
      const qPart = mainQuestionsText.substring(0, splitMatch);
      const aPart = mainQuestionsText.substring(splitMatch);
      mainQuestionsText = qPart;
      separateAnswersText = (separateAnswersText ? separateAnswersText + '\n' : '') + aPart;
    }

    const answerKeyMap = parseAnswerKeyMap(separateAnswersText);

    // Step 2: Split questions by numbered headers (e.g., "1.", "2.", "Question 1:", "Q1.")
    // We ignore emoji subheadings like "🏎️ Passing Laws"
    const cleanedText = mainQuestionsText
      .split('\n')
      .filter(line => {
        const l = line.trim();
        // Ignore lines that look like category headers (e.g. starting with emoji or surrounded by dashes)
        if (/^[\p{Emoji}\u2000-\u3300].*$/u.test(l) && !/^\d+[\.\)]/.test(l)) return false;
        if (/^[=\-_*]{3,}/.test(l)) return false;
        return true;
      })
      .join('\n');

    const rawBlocks = cleanedText.split(/\n\s*(?=(?:\d{1,3}[\.\)]|Question\s*\d{1,3}[:\.]|Q\d{1,3}[:\.]))/i);
    const parsed: Question[] = [];

    for (let i = 0; i < rawBlocks.length; i++) {
      const block = rawBlocks[i].trim();
      if (!block) continue;

      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) continue;

      // Extract question number if present
      const qNumMatch = lines[0].match(/^(\d{1,3})[\.\)]/);
      const questionNumber = qNumMatch ? parseInt(qNumMatch[1], 10) : parsed.length + 1;

      // Strip question number prefix
      const questionPrompt = lines[0].replace(/^(\d{1,3}[\.\)]|Question\s*\d+[:\.]|Q\d+[:\.])\s*/i, '').trim();

      const options: string[] = [];
      let inlineCorrectIdx: number | null = null;
      let inlineExplanation = '';

      for (let j = 1; j < lines.length; j++) {
        const line = lines[j];

        // Check for inline Answer line
        const ansMatch = line.match(/(?:Answer|Correct|Ans)[:\s]+([A-D]|[1-4])/i);
        if (ansMatch) {
          const char = ansMatch[1].toUpperCase();
          if (char === 'A' || char === '1') inlineCorrectIdx = 0;
          else if (char === 'B' || char === '2') inlineCorrectIdx = 1;
          else if (char === 'C' || char === '3') inlineCorrectIdx = 2;
          else if (char === 'D' || char === '4') inlineCorrectIdx = 3;
          continue;
        }

        // Check for inline explanation
        const expMatch = line.match(/(?:Explanation|Rule|Reason|Evidence)[:\s]+(.+)/i);
        if (expMatch) {
          inlineExplanation = expMatch[1].trim();
          continue;
        }

        // Match option bullet: • A) ..., - A) ..., A) ..., A. ...
        const optMatch = line.match(/^[•\*\-\s]*([A-D]|[1-4])[\.\)]\s*(.+)/i);
        if (optMatch) {
          let text = optMatch[2].trim();
          if (text.startsWith('*')) {
            inlineCorrectIdx = options.length;
            text = text.replace(/^\*\s*/, '');
          }
          options.push(text);
        } else if (line.startsWith('*') && !line.startsWith('**')) {
          inlineCorrectIdx = options.length;
          options.push(line.replace(/^\*\s*/, ''));
        }
      }

      // Pad options to 4 if needed
      while (options.length < 4) {
        options.push(`Option ${String.fromCharCode(65 + options.length)}`);
      }
      const finalOptions: [string, string, string, string] = [
        options[0],
        options[1],
        options[2],
        options[3],
      ];

      // Determine correct answer:
      // Priority 1: Answer Key Map matching this questionNumber
      // Priority 2: Inline answer detected in question block
      // Priority 3: Default to 0 (Option A)
      let finalCorrectIdx = 0;
      let finalExplanation = inlineExplanation || 'Official Georgia DDS Section 5 Traffic Law.';

      if (answerKeyMap.has(questionNumber)) {
        const item = answerKeyMap.get(questionNumber)!;
        const letter = item.letter;
        if (letter === 'A') finalCorrectIdx = 0;
        else if (letter === 'B') finalCorrectIdx = 1;
        else if (letter === 'C') finalCorrectIdx = 2;
        else if (letter === 'D') finalCorrectIdx = 3;

        if (item.explanation) {
          finalExplanation = item.explanation;
        }
      } else if (inlineCorrectIdx !== null) {
        finalCorrectIdx = inlineCorrectIdx;
      }

      // Auto-detect topic based on question content
      let detectedTopic: Section5Topic = 'Laws Governing Right-of-Way';
      const promptLower = questionPrompt.toLowerCase();
      if (promptLower.includes('move-over') || promptLower.includes('move over')) {
        detectedTopic = "Georgia's Move-Over Law";
      } else if (promptLower.includes('pass') && (promptLower.includes('two-lane') || promptLower.includes('viaduct') || promptLower.includes('tunnel') || promptLower.includes('bridge'))) {
        detectedTopic = 'Passing Prohibitions & Railroad/Bridge/Tunnel';
      } else if (promptLower.includes('pass') && promptLower.includes('right')) {
        detectedTopic = 'Passing on the Right & When Being Passed';
      } else if (promptLower.includes('bicycl') || promptLower.includes('motorcycl')) {
        detectedTopic = 'Passing Bicyclists & Motorcyclists';
      } else if (promptLower.includes('turn') || promptLower.includes('signal') || promptLower.includes('wheels')) {
        detectedTopic = 'Turn Signals & Making Turns Safely';
      } else if (promptLower.includes('slow poke') || promptLower.includes('passing lane')) {
        detectedTopic = 'Slow Poke Law & Impeding Traffic';
      } else if (promptLower.includes('parking') || promptLower.includes('parallel') || promptLower.includes('backing')) {
        detectedTopic = 'Parallel Parking & Straight Line Backing';
      } else if (promptLower.includes('speed') || promptLower.includes('unpaved')) {
        detectedTopic = 'Traveling Speed & Speed Limits';
      } else if (promptLower.includes('railroad') || promptLower.includes('tracks') || promptLower.includes('train')) {
        detectedTopic = 'Railroad Crossings & 7 Safety Steps';
      } else if (promptLower.includes('work zone') || promptLower.includes('flagger')) {
        detectedTopic = 'Highway Work Zones, Flaggers & Amber Lights';
      } else if (promptLower.includes('headlight') || promptLower.includes('high-beam') || promptLower.includes('night')) {
        detectedTopic = 'Headlights Properly & Night Driving';
      } else if (promptLower.includes('dui') || promptLower.includes('alcohol') || promptLower.includes('bac')) {
        detectedTopic = 'Driving Under the Influence of Drugs or Alcohol (DUI)';
      } else if (promptLower.includes('litter')) {
        detectedTopic = "Georgia's Litter Control Law";
      } else if (promptLower.includes('school bus')) {
        detectedTopic = 'Laws Governing Right-of-Way';
      }

      parsed.push({
        id: `custom-paste-${Date.now()}-${i}`,
        question: questionPrompt || `Question ${questionNumber}`,
        options: finalOptions,
        correctAnswerIndex: Math.min(3, Math.max(0, finalCorrectIdx)),
        explanation: finalExplanation,
        topic: detectedTopic,
        isCustom: true,
      });
    }

    if (parsed.length === 0) {
      setParseError(
        'Could not parse questions. Make sure questions start with a number (e.g. "1.", "2.") and options with "• A)", "A)", or "A.".'
      );
    } else {
      setParsedQuestions(parsed);
    }
  };

  // Modify correct answer for a parsed question during review
  const handleUpdateCorrectAnswer = (questionIndex: number, newOptionIndex: number) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      copy[questionIndex] = {
        ...copy[questionIndex],
        correctAnswerIndex: newOptionIndex,
      };
      return copy;
    });
  };

  // Modify topic for a question during review
  const handleUpdateTopic = (questionIndex: number, newTopic: Section5Topic) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      copy[questionIndex] = {
        ...copy[questionIndex],
        topic: newTopic,
      };
      return copy;
    });
  };

  // Modify explanation
  const handleUpdateExplanation = (questionIndex: number, newExp: string) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      copy[questionIndex] = {
        ...copy[questionIndex],
        explanation: newExp,
      };
      return copy;
    });
  };

  // OCR and Document Upload Handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setParseError(null);
    setStatusMessage(`Reading file: ${file.name}...`);

    try {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const resultStr = reader.result as string;
          const base64Data = resultStr.split(',')[1] || resultStr;
          const mimeType = file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

          setStatusMessage('Processing document with Gemini OCR model...');

          const res = await fetch('/api/ocr-extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileBase64: base64Data,
              mimeType,
              text: `Filename: ${file.name}`,
            }),
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || `Server OCR returned ${res.status}`);
          }

          const data = await res.json();
          if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
            const validated: Question[] = data.questions.map((q: any, i: number) => ({
              id: `ocr-q-${Date.now()}-${i}`,
              question: q.question,
              options: [
                q.options[0] || 'A',
                q.options[1] || 'B',
                q.options[2] || 'C',
                q.options[3] || 'D',
              ],
              correctAnswerIndex: typeof q.correctAnswerIndex === 'number' ? q.correctAnswerIndex : 0,
              explanation: q.explanation || 'Extracted via OCR from uploaded document.',
              topic: (q.topic as Section5Topic) || 'Laws Governing Right-of-Way',
              isCustom: true,
            }));
            setParsedQuestions(validated);
            setStatusMessage(`Successfully extracted ${validated.length} questions from ${file.name}! Review answers below.`);
          } else {
            throw new Error('No questions could be extracted from this document.');
          }
        } catch (serverErr: any) {
          console.warn('Backend OCR failed, attempting client text fallback:', serverErr);
          setStatusMessage('Server OCR unavailable. Reading text directly from document...');

          if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.json')) {
            const textReader = new FileReader();
            textReader.onload = () => {
              const textContent = textReader.result as string;
              setPasteText(textContent);
              setActiveTab('paste');
              setStatusMessage('Document text loaded into paste editor. Click "Parse Questions" below.');
            };
            textReader.readAsText(file);
          } else {
            setParseError(
              `OCR Service notice: ${serverErr.message}. You can copy/paste the questions directly into the Paste tab to review and edit answers.`
            );
          }
        } finally {
          setIsProcessing(false);
        }
      };

      reader.readAsDataURL(file);
    } catch (e: any) {
      setIsProcessing(false);
      setParseError(e.message || 'Failed to read file.');
    }
  };

  const handleImportAndSave = (startImmediately: boolean) => {
    if (parsedQuestions.length === 0) return;
    addCustomQuestions(parsedQuestions);
    setExistingCustomCount(loadCustomQuestions().length);
    onQuestionsImported(parsedQuestions, startImmediately);
  };

  const handleClearCustom = () => {
    clearCustomQuestions();
    setExistingCustomCount(0);
    setParsedQuestions([]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Custom Study Bank
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Import Questions & PDF OCR
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Paste practice questions and answer keys, or upload PDF files. Review and verify every answer before saving!
          </p>
        </div>

        {existingCustomCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-600">
              {existingCustomCount} custom questions saved
            </span>
            <button
              onClick={handleClearCustom}
              className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 transition"
              title="Clear custom questions from storage"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Reset Custom</span>
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 mb-6 pb-2">
        <button
          onClick={() => setActiveTab('paste')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition ${
            activeTab === 'paste'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ClipboardPaste className="h-4 w-4" />
          <span>Copy & Paste Questions + Answers</span>
        </button>

        <button
          onClick={() => setActiveTab('ocr')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition ${
            activeTab === 'ocr'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Upload className="h-4 w-4" />
          <span>Upload PDF / Image OCR</span>
        </button>
      </div>

      {/* Mode 1: Copy & Paste */}
      {activeTab === 'paste' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Box 1: Questions */}
            <div className="lg:col-span-2 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span className="font-semibold">
                  1. Paste Questions (with or without Answer Key):
                </span>
                <span className="text-slate-500 font-mono">Supports • A), A), 1.</span>
              </div>
              <textarea
                value={pasteText}
                onChange={e => setPasteText(e.target.value)}
                rows={12}
                placeholder={`Paste your questions here...\n\nExample:\n1. You are driving on a highway divided by a physical median strip...\n• A) You must come to a complete stop\n• B) You must slow down to 10 mph\n• C) You are not required to stop, but remain attentive\n• D) You must stop only if children touch the road\n\n(You can also paste the Answer Key at the bottom or into the Answer Key box on the right!)`}
                className="w-full rounded-xl border border-slate-300 bg-white p-4 font-mono text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition leading-relaxed shadow-sm"
              />
            </div>

            {/* Box 2: Optional Separate Answer Key */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span className="font-semibold flex items-center gap-1 text-blue-600">
                  <Key className="h-3.5 w-3.5" />
                  2. Answer Key (Optional):
                </span>
              </div>
              <textarea
                value={answerKeyText}
                onChange={e => setAnswerKeyText(e.target.value)}
                rows={12}
                placeholder={`Paste Answer Key here if separate:\n\n1. C — Page 19, Subsection: "Laws Governing Right-of-Way"\n2. B — Page 34, Subsection: "Traffic Signals"\n3. B — Page 34\n4. B — Page 19\n5. C\n...`}
                className="w-full rounded-xl border border-slate-300 bg-white p-4 font-mono text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition leading-relaxed shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleParseText}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition"
            >
              Parse Questions & Open Answer Reviewer
            </button>
            <button
              onClick={() => {
                setPasteText('');
                setAnswerKeyText('');
                setParsedQuestions([]);
                setParseError(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Clear Editor
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: PDF & Image OCR Upload */}
      {activeTab === 'ocr' && (
        <div className="space-y-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center transition hover:border-blue-600 hover:bg-blue-50/50 shadow-sm"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/png,image/jpeg,image/webp,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 mb-4">
              <Upload className="h-7 w-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Upload PDF or Image Document
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Select any Georgia DDS driver manual PDF page, study sheet, or practice question photo. AI OCR will scan and extract questions for you to review.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-blue-700 font-semibold bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Supports PDF, PNG, JPG, WebP</span>
            </div>
          </div>

          {isProcessing && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-600 mb-2" />
              <p className="text-xs sm:text-sm font-medium text-slate-800">{statusMessage}</p>
            </div>
          )}
        </div>
      )}

      {/* Status & Error Messages */}
      {parseError && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm text-rose-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <p>{parseError}</p>
        </div>
      )}

      {/* ============================================================== */}
      {/* INTERACTIVE ANSWER REVIEWER & EDITOR                           */}
      {/* (Allows user to inspect and change any answer with one click)  */}
      {/* ============================================================== */}
      {parsedQuestions.length > 0 && (
        <div className="mt-10 border-t border-slate-200 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>
                  Parsed {parsedQuestions.length} Questions — Verify & Review Answers
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Click any option button (A, B, C, or D) below if you wish to change the correct answer!
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleImportAndSave(false)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition"
              >
                Save to Question Bank
              </button>
              <button
                onClick={() => handleImportAndSave(true)}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Save & Start Quiz Now</span>
              </button>
            </div>
          </div>

          {/* Quick Answer Key Summary Badges */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Current Answer Key Summary:
            </span>
            <div className="flex flex-wrap gap-2">
              {parsedQuestions.map((q, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded bg-slate-100 border border-slate-200 px-2 py-1 text-xs font-mono font-bold text-slate-800"
                >
                  <span className="text-slate-500">#{idx + 1}:</span>
                  <span className="text-blue-600 font-black">
                    {String.fromCharCode(65 + q.correctAnswerIndex)}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Question Review Cards List */}
          <div className="space-y-6">
            {parsedQuestions.map((q, qIdx) => {
              const currentCorrectLetter = String.fromCharCode(65 + q.correctAnswerIndex);

              return (
                <div
                  key={qIdx}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {/* Top metadata row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white font-mono font-bold text-xs">
                        {qIdx + 1}
                      </span>
                      <span className="font-bold text-slate-800">Question {qIdx + 1}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">Topic:</span>
                      <select
                        value={q.topic}
                        onChange={e => handleUpdateTopic(qIdx, e.target.value as Section5Topic)}
                        className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-800 outline-none focus:border-blue-600"
                      >
                        {ALL_SECTION_5_TOPICS.map(t => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1 font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <Check className="h-3.5 w-3.5" />
                        <span>Answer: {currentCorrectLetter}</span>
                      </div>
                    </div>
                  </div>

                  {/* Question prompt */}
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-4">
                    {q.question}
                  </p>

                  {/* Options with interactive click-to-select correct answer */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Options (Click the option to set as correct answer):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = optIdx === q.correctAnswerIndex;
                        const letter = String.fromCharCode(65 + optIdx);

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleUpdateCorrectAnswer(qIdx, optIdx)}
                            className={`flex items-start gap-3 rounded-lg border p-3 text-left transition ${
                              isCorrect
                                ? 'border-emerald-500 bg-emerald-50 text-slate-900 shadow-sm ring-1 ring-emerald-500'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono text-xs font-bold ${
                                isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {letter}
                            </span>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs sm:text-sm font-medium leading-relaxed block">
                                {opt}
                              </span>
                              {isCorrect && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  <span>Marked as Correct</span>
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explanation box (editable) */}
                  <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs">
                    <div className="flex items-center justify-between text-slate-600 font-semibold mb-1">
                      <span>Explanation / Manual Reference:</span>
                      <span className="text-[11px] text-blue-600 font-normal">Editable</span>
                    </div>
                    <input
                      type="text"
                      value={q.explanation}
                      onChange={e => handleUpdateExplanation(qIdx, e.target.value)}
                      placeholder="Enter explanation or citation from Georgia DDS Manual..."
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-600 transition"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              onClick={() => handleImportAndSave(false)}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              Save to Question Bank
            </button>
            <button
              onClick={() => handleImportAndSave(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Save & Take This Quiz Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
