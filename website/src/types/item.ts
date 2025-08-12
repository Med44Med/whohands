export type ItemType = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  description?: string;
  how_to_use?: string[];
  images?: string[];
  category: string;
  hashtag?: string[];
  price: number;
  discount?: string;
};
