export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string | null;
  image_url: string | null;
  model_url: string | null;
  category: string | null;
  featured: boolean;
  created_at: string;
};

