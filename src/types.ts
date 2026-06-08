export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Drinks';
  isPopular?: boolean;
  tags?: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}
