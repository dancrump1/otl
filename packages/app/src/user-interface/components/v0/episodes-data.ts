export interface Episode {
  id: string;
  number: string;
  title: string;
  description: string;
  duration?: string;
  date: string;
  featured: boolean;
  spotifyUrl: string;
}
