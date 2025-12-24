export type Person = {
  first_name: string;
  last_name: string;
  avatar: string;
  email?: string;
};

export type ModelCampaign = {
  campaign_id: string;
  campaign_name: string;
  description: string;
  campaign_status: string;
  number_of_creators_wanted: number;
  number_of_videos_wanted: number;
  category: string;
  content_type: string;
  video_format?: string;
  video_duration_in_seconds: number;
  created_at: string;
  updated_at: string;
  brand_accepted: boolean;
  submissions?: number;
  creators?: Person[];
  product_image?: string;
  product_url: string;
  applications?: Person[];
  status?:
    | 'created'
    | 'pending_approval'
    | 'returned'
    | 'gigs_approved'
    | 'running'
    | 'completed'
    | 'deactivated';
};
