// SummarizeWasteFacts.ts
'use server';

/**
 * @fileOverview Provides summarized facts and best practices for a given waste category.
 *
 * - summarizeWasteFacts - A function that summarizes waste facts based on category.
 * - SummarizeWasteFactsInput - The input type for the summarizeWasteFacts function.
 * - SummarizeWasteFactsOutput - The return type for the summarizeWasteFacts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeWasteFactsInputSchema = z.object({
  category: z
    .string()
    .describe("The waste category (e.g., 'Biodegradable', 'Recyclable', 'Other')."),
});
export type SummarizeWasteFactsInput = z.infer<typeof SummarizeWasteFactsInputSchema>;

const SummarizeWasteFactsOutputSchema = z.object({
  summary: z
    .string()
    .describe("A summary of facts and best practices related to the waste category."),
});
export type SummarizeWasteFactsOutput = z.infer<typeof SummarizeWasteFactsOutputSchema>;

export async function summarizeWasteFacts(input: SummarizeWasteFactsInput): Promise<SummarizeWasteFactsOutput> {
  return summarizeWasteFactsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWasteFactsPrompt',
  input: {schema: SummarizeWasteFactsInputSchema},
  output: {schema: SummarizeWasteFactsOutputSchema},
  prompt: `You are an expert on waste management and environmental practices.

  Provide a concise summary of key facts, tips, and best practices related to the following waste category:

  {{category}}

  The summary should be informative and encourage better waste management habits.
  Give the user practical advice.
  Format the response using markdown.
  `,
});

const summarizeWasteFactsFlow = ai.defineFlow(
  {
    name: 'summarizeWasteFactsFlow',
    inputSchema: SummarizeWasteFactsInputSchema,
    outputSchema: SummarizeWasteFactsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
