'use server';
/**
 * @fileOverview Classifies waste from an image into predefined categories.
 *
 * - classifyWaste - A function that handles the waste classification process.
 * - ClassifyWasteInput - The input type for the classifyWaste function.
 * - ClassifyWasteOutput - The return type for the classifyWaste function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const categories = ['Biodegradable', 'Recyclable', 'Other'] as const;

const ClassifyWasteInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the waste item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyWasteInput = z.infer<typeof ClassifyWasteInputSchema>;

const ClassifyWasteOutputSchema = z.object({
  category: z
    .enum(categories)
    .describe('The classified category of the waste.'),
});
export type ClassifyWasteOutput = z.infer<typeof ClassifyWasteOutputSchema>;

export async function classifyWaste(input: ClassifyWasteInput): Promise<ClassifyWasteOutput> {
  return classifyWasteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyWastePrompt',
  input: {schema: ClassifyWasteInputSchema},
  output: {schema: ClassifyWasteOutputSchema},
  prompt: `You are an expert in waste management. Your task is to classify the waste item in the provided image.

Analyze the image and determine if the item is 'Biodegradable', 'Recyclable', or 'Other'.

- 'Biodegradable' includes items like food scraps, yard waste, and paper products that can decompose naturally.
- 'Recyclable' includes items like plastic bottles, glass, metal cans, and cardboard that can be processed and reused.
- 'Other' includes items that do not fit into the above categories, such as electronics, batteries, or mixed materials.

Please classify the item based on the main material you see.

Photo: {{media url=photoDataUri}}`,
});

const classifyWasteFlow = ai.defineFlow(
  {
    name: 'classifyWasteFlow',
    inputSchema: ClassifyWasteInputSchema,
    outputSchema: ClassifyWasteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
