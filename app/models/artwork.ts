export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  city: string;
  state: string;
  country: string;
}

export interface Order {
  id: string;
  orderedById: string;
  artworkIds: string[];
  quantities: number[];
  totalAmount: number;
  status: OrderStatus;
  orderedAt: Date;
  updatedAt: Date;
}

export interface Artwork {
  id: string;
  artType: 'Paintings' | 'Photography' | 'Decors' | 'Artifacts';
  title: string;
  description: string;
  images: string[];
  dimensions: string;
  medium: string;
  price: number;
  artistName: string;
  likes: number;
  isHidden: boolean;
  isSold: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppReview {
  id: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  Artist = 'Artist',
  Admin = 'Admin',
  Customer = 'Customer',
}

export enum OrderStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}
