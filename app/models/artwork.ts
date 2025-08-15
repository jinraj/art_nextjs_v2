export interface ArtWork {
  id: string;
  artType: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  artistName: string;
  dimension: string;
  medium: string;
  likes: number;
  isHidden: boolean;
  isSold: boolean;
}