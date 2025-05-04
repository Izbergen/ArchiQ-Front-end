export enum PropertyCategory {
  APARTMENT = 'APARTMENT',
  PARKING = 'PARKING',
  BOXROOM = 'BOXROOM',
  COMMERCE = 'COMMERCE',
}

export enum BuildingStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface PropertyPhoto {
  id: number;
  photo_link: string;
}

export interface PropertyVideo {
  id: number;
  // Add other fields as needed
}

export interface Block {
  id: number;
  block_number: string;
  entrance_number: string;
  total_floors: number;
  building_status: BuildingStatus;
}

export interface Property {
  id: number;
  category: PropertyCategory;
  number?: number;
  price?: string;
  price_per_sqm?: string;
  rental_price?: string;
  floor?: number;
  area: string;
  rooms?: number;
  layout?: string;
  property_photos?: PropertyPhoto[];
  property_videos?: PropertyVideo[];
  block: Block;
  complex: string;
} 