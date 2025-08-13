export interface Business {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: { name: string };
  owner: { full_name: string };
}

export interface UserProfile {
  full_name: string;
  phone: string;
  email?: string;
}