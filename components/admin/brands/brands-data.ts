
export type Brand = {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'inactive' | 'pending';
  total_campaigns: number;
  website: string;
  joined_date: string;
  contact_email: string;
  category?: string;
  company_size?: string;
  city?: string;
  country?: string;
};