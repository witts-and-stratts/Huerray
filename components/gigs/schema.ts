import { z } from 'zod/v4';
import { ModelsCreateGigRequestGenderRequirementEnum } from '@/lib/api/generated/models';
import { ReactFormExtendedApi } from '@tanstack/react-form';

// Helper to extract values for z.enum
function getEnumValues<T extends Record<string, any>>(obj: T) {
  return Object.values(obj) as [string, ...string[]];
}

export const createGigBaseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  compensation: z.number({ error: 'Compensation must be a number' }).gt(0, 'Compensation must be greater than 0'),
  gig_cost: z.number({ error: 'Gig cost must be a number' }).gt(0, 'Total Gig cost must be greater than 0'),
  number_of_videos: z.number({ error: 'Must be a number' }).gt(0, 'Number of videos must be greater than 0'),
  video_duration_in_seconds: z.number({ error: 'Must be a number' }).min(1, 'Duration must be at least 1 second'),
  posting_start_date: z.date({ error: 'Start date is required' }),
  posting_end_date: z.date({ error: 'End date is required' }),
  age_min: z.number().min(18).optional(),
  age_max: z.number().min(18).optional(),
  gender_requirement: z.enum(getEnumValues(ModelsCreateGigRequestGenderRequirementEnum)).optional().default('any'),
  requirements: z.string().optional(),
  content_guidelines: z.string().optional(),
  ambience: z.string().optional(),
  submission_enforcement: z.enum(['single', 'unique'], { error: 'Please select a submission enforcement type' }),
});

export const createGigSchema = createGigBaseSchema.superRefine((data, ctx) => {
  // Rule 1: Total Gig cost cannot be less than Compensation × Number of videos
  const minGigCost = data.compensation * (data.number_of_videos || 1);
  if (data.gig_cost < minGigCost) {
    ctx.addIssue({
      code: 'custom',
      message: `Total Gig cost cannot be less than Compensation × Number of videos (min. ${minGigCost})`,
      path: ['gig_cost'],
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Rule 2: Posting Start Date cannot be before Today's date
  if (data.posting_start_date) {
    const startDate = new Date(data.posting_start_date);
    startDate.setHours(0, 0, 0, 0);
    
    if (startDate < today) {
      ctx.addIssue({
        code: 'custom',
        message: 'The start date for this Gig cannot be before today',
        path: ['posting_start_date'],
      });
    }
  }

  // Rule 3: Posting End Date cannot be before Posting Start Date
  if (data.posting_start_date && data.posting_end_date) {
    const startDate = new Date(data.posting_start_date);
    const endDate = new Date(data.posting_end_date);
    
    // Compare timestamps to handle time component if present, though likely we want day comparison
    // If they are strictly dates (00:00:00), direct comparison works.
    // Let's be safe and just compare values.
    if (endDate < startDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'The Gig deadline must be after the Gig start date',
        path: ['posting_end_date'],
      });
    }
  }

});

export type CreateGigSchema = z.infer<typeof createGigSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GigFormApi = ReactFormExtendedApi<CreateGigSchema, any, any, any, any, any, any, any, any, any, any, any>;
