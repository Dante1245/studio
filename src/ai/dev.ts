import { config } from 'dotenv';
config();

// The flows are loaded by Next.js, so they don't need to be imported here
// for the dev server. This prevents file-watching loops.
import '@/ai/flows/purchase-probability-model.ts';
import '@/ai/flows/summarize-news-flow.ts';
