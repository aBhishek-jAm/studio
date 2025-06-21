// src/ai/flows/suggest-alternative-handling.ts
'use server';

/**
 * @fileOverview Suggests alternative handling methods or local resources for waste classified as 'Other'.
 *
 * - suggestAlternativeHandling - A function that suggests alternative handling methods.
 * - SuggestAlternativeHandlingInput - The input type for the suggestAlternativeHandling function.
 * - SuggestAlternativeHandlingOutput - The return type for the suggestAlternativeHandling function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeHandlingInputSchema = z.object({
  wasteDescription: z
    .string()
    .describe('A description of the waste material classified as \'Other\'.'),
});
export type SuggestAlternativeHandlingInput = z.infer<
  typeof SuggestAlternativeHandlingInputSchema
>;

const SuggestAlternativeHandlingOutputSchema = z.object({
  alternativeHandlingMethods: z
    .string()
    .describe(
      'Suggested alternative handling methods or local resources for proper disposal.'
    ),
});
export type SuggestAlternativeHandlingOutput = z.infer<
  typeof SuggestAlternativeHandlingOutputSchema
>;

export async function suggestAlternativeHandling(
  input: SuggestAlternativeHandlingInput
): Promise<SuggestAlternativeHandlingOutput> {
  return suggestAlternativeHandlingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeHandlingPrompt',
  input: {schema: SuggestAlternativeHandlingInputSchema},
  output: {schema: SuggestAlternativeHandlingOutputSchema},
  prompt: `You are an expert in waste management and recycling.
Given the description of waste material that does not fall into standard categories, suggest alternative handling methods or local resources for its proper disposal.

Waste Description: {{{wasteDescription}}}

Suggest alternative handling methods or local resources:
`,
});

const suggestAlternativeHandlingFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeHandlingFlow',
    inputSchema: SuggestAlternativeHandlingInputSchema,
    outputSchema: SuggestAlternativeHandlingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
