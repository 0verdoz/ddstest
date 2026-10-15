import { Question, Section5Topic } from '../types/quiz';
import { generateSection5QuestionCatalog } from './questionGenerator';

const CUSTOM_QUESTIONS_STORAGE_KEY = 'ga_dds_custom_questions_v1';

let cachedCatalog: Question[] | null = null;

export function getFullCatalog(): Question[] {
  if (!cachedCatalog) {
    cachedCatalog = generateSection5QuestionCatalog();
  }
  const custom = loadCustomQuestions();
  return [...custom, ...cachedCatalog];
}

export function loadCustomQuestions(): Question[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse custom questions', e);
    return [];
  }
}

export function saveCustomQuestions(questions: Question[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOM_QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save custom questions', e);
  }
}

export function addCustomQuestions(newQuestions: Question[]): void {
  const current = loadCustomQuestions();
  const merged = [...newQuestions, ...current];
  saveCustomQuestions(merged);
}

export function clearCustomQuestions(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CUSTOM_QUESTIONS_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear custom questions', e);
  }
  cachedCatalog = null;
}

export function resetRepositoryCache(): void {
  cachedCatalog = null;
}

// Seeded pseudo-random generator for daily quiz
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
}

/**
 * Fisher-Yates shuffle with optional RNG
 */
export function shuffleArray<T>(array: T[], rng = Math.random): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Gets a randomized daily practice quiz (standard 20 questions) seeded by date
 */
export function getDailyQuiz(dateStr: string): Question[] {
  const catalog = getFullCatalog();
  const seed = stringToSeed(dateStr);
  const rng = mulberry32(seed);

  // Group by topic to ensure balanced representation across Section 5
  const topicMap: Record<string, Question[]> = {};
  for (const q of catalog) {
    if (!topicMap[q.topic]) topicMap[q.topic] = [];
    topicMap[q.topic].push(q);
  }

  const selected: Question[] = [];
  const topics = shuffleArray(Object.keys(topicMap), rng);

  // Pick 1 question from distinct topics first
  for (const topic of topics) {
    if (selected.length >= 20) break;
    const pool = topicMap[topic];
    if (pool && pool.length > 0) {
      const idx = Math.floor(rng() * pool.length);
      selected.push(pool[idx]);
    }
  }

  // If still need more to reach 20
  if (selected.length < 20) {
    const remaining = catalog.filter(q => !selected.some(s => s.id === q.id));
    const shuffledRemaining = shuffleArray(remaining, rng);
    selected.push(...shuffledRemaining.slice(0, 20 - selected.length));
  }

  return shuffleArray(selected, rng);
}

/**
 * Gets a randomized quiz of requested size and optional topic filter
 */
export function getRandomQuiz(
  count = 20,
  topicFilter?: Section5Topic | 'ALL'
): Question[] {
  const catalog = getFullCatalog();
  let pool = catalog;
  if (topicFilter && topicFilter !== 'ALL') {
    pool = catalog.filter(q => q.topic === topicFilter);
  }
  if (pool.length === 0) {
    pool = catalog;
  }

  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Search questions by keyword or topic
 */
export function searchQuestions(
  query: string,
  topicFilter?: Section5Topic | 'ALL',
  limit = 20,
  offset = 0
): { questions: Question[]; total: number } {
  const catalog = getFullCatalog();
  const qLower = query.toLowerCase().trim();

  const filtered = catalog.filter(q => {
    const matchesTopic = !topicFilter || topicFilter === 'ALL' || q.topic === topicFilter;
    if (!matchesTopic) return false;
    if (!qLower) return true;
    return (
      q.question.toLowerCase().includes(qLower) ||
      q.explanation.toLowerCase().includes(qLower) ||
      q.options.some(opt => opt.toLowerCase().includes(qLower))
    );
  });

  return {
    total: filtered.length,
    questions: filtered.slice(offset, offset + limit),
  };
}

export const ALL_SECTION_5_TOPICS: Section5Topic[] = [
  'Laws Governing Right-of-Way',
  "Georgia's Move-Over Law",
  'Passing on Two-Lane Roads',
  'Passing Prohibitions & Railroad/Bridge/Tunnel',
  'Passing on the Right & When Being Passed',
  'Passing Bicyclists & Motorcyclists',
  'Weaving & Illegal Signals',
  'Turn Signals & Making Turns Safely',
  'Watching for Pedestrians & Blind Pedestrians',
  'U-Turns & Multi-Lane Highway Turns',
  'Stopping, Standing, and Parking',
  'Parallel Parking & Straight Line Backing',
  'Traveling Speed & Speed Limits',
  'Super Speeder Law',
  'Slow Poke Law & Impeding Traffic',
  'Railroad Crossings & 7 Safety Steps',
  'Highway Work Zones, Flaggers & Amber Lights',
  'Controlled-Access Roadways & Peach Pass',
  'Coasting & Mechanical Prohibitions',
  'Driving Under the Influence of Drugs or Alcohol (DUI)',
  'Reckless & Aggressive Driving',
  'Racing & Reckless Stunt Driving',
  'Trucks, Trailers & Caravanning',
  'Impaired Hearing, View Obstruction & Doors',
  'One-Way Streets & Stopping',
  'Headlights Properly & Night Driving',
  "Georgia's Litter Control Law",
  'Safety Belts & Child Restraints',
  'Distracted Driving & Hands Free Law (HB 673)',
  'Following Emergency Vehicles & Passing Mail/Sanitation',
];
