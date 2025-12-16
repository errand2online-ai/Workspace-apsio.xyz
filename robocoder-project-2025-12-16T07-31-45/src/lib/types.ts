export interface Space {
  id: number;
  name: string;
  description: string;
  location: string;
  address: string;
  city: string;
  images: string[];
  rating: number;
  reviews: number;
  price: number;
  type: 'Hot Desk' | 'Private Office' | 'Meeting Room' | 'Event Space';
  capacity: number;
  amenities: string[];
  features: string[];
  availability: {
    [date: string]: {
      [time: string]: boolean;
    };
  };
  workingHours: {
    start: string;
    end: string;
  };
  featured: boolean;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  company?: string;
  preferences: {
    location: string;
    spaceType: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}

export interface Booking {
  id: string;
  userId: string;
  spaceId: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalCost: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
  additionalServices?: string[];
  notes?: string;
}

export interface SearchFilters {
  location: string;
  spaceType: string[];
  priceRange: {
    min: number;
    max: number;
  };
  amenities: string[];
  capacity: number;
  date?: string;
  startTime?: string;
  endTime?: string;
}

export interface Review {
  id: string;
  userId: string;
  spaceId: number;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
  userAvatar?: string;
}