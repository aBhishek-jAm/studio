import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-waste-facts.ts';
import '@/ai/flows/suggest-alternative-handling.ts';
import '@/ai/flows/classify-waste-flow.ts';
