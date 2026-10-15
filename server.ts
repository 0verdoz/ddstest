import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health / status endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Gemini OCR / PDF question extraction endpoint
app.post('/api/ocr-extract', async (req, res) => {
  try {
    const { text, fileBase64, mimeType } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server. You can still use the offline rule-based parser or paste questions directly.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const parts: any[] = [];
    if (fileBase64 && mimeType) {
      parts.push({
        inlineData: {
          mimeType,
          data: fileBase64,
        }
      });
    }

    const promptText = `
You are an expert examiner for the Georgia DDS (Department of Driver Services) Knowledge Exam, specifically focused on SECTION 5: TRAFFIC LAWS.

Source topic list:
- Laws Governing Right-of-Way (intersections, 4-way stops, emergency vehicles, pedestrian crosswalks)
- Georgia's Move-Over Law (clear lane buffer for emergency, sanitation, utility vehicles, or reduce speed, up to $500 fine)
- Passing (2-lane road overtaking, 200 ft oncoming rule, prohibited within 100 ft of railroad/bridge/viaduct/tunnel, solid yellow lines)
- Passing on the Right (left turns, multi-lane roads) & When Someone Passes You (reduce speed, do NOT speed up)
- Passing Stopped Cars (never pass car stopped for pedestrians at crosswalk)
- Passing Bicyclists (3 ft minimum clearance, 10 mph below speed limit or 25 mph) & Motorcyclists (full lane width)
- Weaving & Illegal Signals (flashing turn signals as 'do pass' is illegal)
- Turn Signals and Safe Turning (continuous signal, right turn into curb lane, left turn into lane closest to center)
- Watching for Pedestrians, Walk Signals & Blind Pedestrians (white cane / guide dogs)
- U-Turns & Multi-Lane Highway Turns
- Stopping, Standing, and Parking (15 ft hydrant, 20 ft crosswalk, 30 ft stop sign/yield/signal, 50 ft railroad, 20/75 ft fire station)
- Steps to Parallel Parking (22x10 ft box, max 18 inches from curb) & Backing Up (look over right shoulder, 50 ft at max 10 mph)
- Traveling Speed & Speed Limits (30 urban/residential, 35 unpaved, 70 rural interstate, 65 urban interstate/divided, 55 general)
- Super Speeder Law (75+ mph on 2-lane, 85+ mph on any road: $200 state fee + $50 reinstatement)
- Slow Poke Law (HB 459: move right for faster traffic regardless of speed) & Driving Too Slowly
- Railroad Crossings (stop 15 to 50 ft, 7 safety steps, ENS sign vehicle stall)
- Highway Work Zones (orange signs, flagger authority, amber lights, fines $100-$2000 / 12 mo jail)
- Controlled-Access Roadways & Peach Pass (Express lanes, backing prohibited, reversible gates)
- Coasting Prohibited (neutral down hills)
- DUI Laws (BAC 0.08 for 21+, BAC 0.02 for under 21, prescription drugs no defense, implied consent minimum 1-year suspension)
- Reckless Driving & Aggressive Driving (tailgating, cutting off, suspension under 21)
- Racing & Reckless Stunt Driving (1st: 12-mo suspension, $210 restoration; 2nd: 3-yr, $310; 3rd: Habitual Violator)
- Trucks, Caravanning & Trailers (8 ft 6 in trailer width max, following distance, no riding in trailer)
- Driver View Obstructions, Headphone / Hearing Devices Prohibited, Opening Doors into Traffic, One-Way Streets
- Headlight Usage (1/2 hr after sunset to 1/2 hr before sunrise, rain/fog, dim within 500 ft oncoming, 200 ft following)
- Night Driving (do not overdrive headlights, guide by edge line)
- Georgia Litter Control Law (damage to property, misdemeanor, up to $1000 fine and 12 mo jail)
- Safety Belts & Child Restraints (under 8 in child restraint Federal FMVSS 213, primary law)
- Distracted Driving / Hands Free Georgia Law HB 673 (no holding phone with any body part: 1st $50/1pt, 2nd $100/2pts, 3rd $150/3pts)
- Following Emergency Vehicles (200 ft minimum, 500 ft parking from fire apparatus) & Passing Postal / Sanitation Workers (10 mph under or 25 mph, up to $250 fine)

${text ? `User document content:\n${text}` : 'Analyze the document image/file provided.'}

Extract or formulate between 5 and 20 multiple choice test questions strictly aligned with Georgia DDS Section 5.
`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswerIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  topic: { type: Type.STRING },
                },
                required: ['question', 'options', 'correctAnswerIndex', 'explanation', 'topic']
              }
            }
          },
          required: ['questions']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{"questions": []}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/ocr-extract:', error);
    return res.status(500).json({ error: error.message || 'Failed to extract questions' });
  }
});

// Configure Vite middleware in development or static in production
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`GA DDS Section 5 Quiz Server listening on http://${HOST}:${PORT}`);
});
