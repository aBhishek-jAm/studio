'use server';

import { summarizeWasteFacts } from '@/ai/flows/summarize-waste-facts';
import { suggestAlternativeHandling } from '@/ai/flows/suggest-alternative-handling';

const categories = ['Biodegradable', 'Recyclable', 'Other'] as const;
type Category = (typeof categories)[number];

export type ClassificationResult = {
  category: Category;
  summary: string;
};

// This is a mocked classification function.
// In a real app, this would involve a multi-modal AI call to classify the image.
async function performWasteClassification(
  image: File
): Promise<Category> {
  // We log the image details to show it's received, but the logic is mocked.
  console.log(`Classifying image: ${image.name}, size: ${image.size} bytes`);

  // Simulate network delay for a more realistic user experience.
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock implementation: returns a random category.
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

export async function classifyWasteAction(
  formData: FormData
): Promise<{ result: ClassificationResult | null; error: string | null }> {
  try {
    const file = formData.get('image') as File;
    if (!file || file.size === 0) {
      return { result: null, error: 'No image provided. Please upload a file.' };
    }

    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!supportedTypes.includes(file.type)) {
      return {
        result: null,
        error:
          'Unsupported file type. Please upload a JPEG, PNG, WEBP, or GIF.',
      };
    }

    const category = await performWasteClassification(file);
    const summaryResult = await summarizeWasteFacts({ category });

    return {
      result: { category, summary: summaryResult.summary },
      error: null,
    };
  } catch (e) {
    console.error(e);
    // Return a generic error to the user
    return {
      result: null,
      error: 'An unexpected error occurred during classification. Please try again later.',
    };
  }
}

export async function getAlternativeHandlingAction(
  wasteDescription: string
): Promise<{ suggestion: string | null; error: string | null }> {
  if (!wasteDescription.trim()) {
    return {
      suggestion: null,
      error: 'Please provide a description of the waste.',
    };
  }

  try {
    const result = await suggestAlternativeHandling({ wasteDescription });
    return { suggestion: result.alternativeHandlingMethods, error: null };
  } catch (e) {
    console.error(e);
    return {
      suggestion: null,
      error: 'Failed to get suggestions. Please try again.',
    };
  }
}
