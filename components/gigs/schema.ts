import { z } from 'zod/v4';
import { ModelsCreateGigRequestGenderRequirementEnum } from '@/lib/api/generated/models';
import { ReactFormExtendedApi } from '@tanstack/react-form';

// Helper to extract values for z.enum
function getEnumValues<T extends Record<string, any>>(obj: T) {
  return Object.values(obj) as [string, ...string[]];
}

export const createGigSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  compensation: z.number({ error: 'Compensation must be a number' }).min(0, 'Compensation must be positive'),
  gig_cost: z.number({ error: 'Gig cost must be a number' }).min(0, 'Gig cost must be positive'),
  number_of_videos: z.number({ error: 'Must be a number' }).min(1, 'At least 1 video is required'),
  video_duration_in_seconds: z.number({ error: 'Must be a number' }).min(1, 'Duration must be at least 1 second'),
  posting_start_date: z.date({ error: 'Start date is required' }),
  posting_end_date: z.date({ error: 'End date is required' }),
  age_min: z.number().min(18).optional(),
  age_max: z.number().min(18).optional(),
  gender_requirement: z.enum(getEnumValues(ModelsCreateGigRequestGenderRequirementEnum)).optional().default('any'),
  requirements: z.string().optional(),
  content_guidelines: z.string().optional(),
  ambience: z.string().optional(),
  enforce_single_creator_submission: z.boolean().default(false).optional(),
  enforce_unique_creator_submission: z.boolean().default(false).optional(),
}).superRefine((data, ctx) => {
  // Rule 1: Total Gig cost cannot be less than Compensation per video
  if (data.gig_cost < data.compensation) {
    ctx.addIssue({
      code: 'custom',
      message: 'Total Gig cost cannot be less than Compensation per video',
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

  // Rule 4: One of Enforce Single Creator Submission and Enforce Unique Creator Submission must be selected
  if (!data.enforce_single_creator_submission && !data.enforce_unique_creator_submission) {
    ctx.addIssue({
      code: 'custom',
      message: 'You must chose to either Enforce Single Creator Submission or Enforce Unique Creator Submission',
      path: ['enforce_single_creator_submission'], // Attach error to one of the fields
    });
    // Optionally attach to the other field as well, or handle in UI to show general error
    // ctx.addIssue({
    //   code: 'custom',
    //   message: 'You must chose to either Enforce Single Creator Submission or Enforce Unique Creator Submission',
    //   path: ['enforce_unique_creator_submission'],
    // });
  }
});

export type CreateGigSchema = z.infer<typeof createGigSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GigFormApi = ReactFormExtendedApi<CreateGigSchema, any, any, any, any, any, any, any, any, any, any, any>;
