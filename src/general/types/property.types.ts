export enum CategoryEnum {
  APARTMENT = "APARTMENT",
  BOXROOM = "BOXROOM",
  PARKING = "PARKING",
  COMMERCE = "COMMERCE",
}

export enum BuildingStatusEnum {
  PLANNING = "PLANNING",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  COMPLETED = "COMPLETED",
}

export interface PropertyPhoto {
  id: number;
  photo_link: string;
}

export interface PropertyVideo {
  id: number;
  video_link: string;
}

export interface Complex {
  id?: number;
  name: string;
  status?: BuildingStatusEnum;
}

export interface Block {
  id?: number;
  block_number: string;
}

export interface Property {
  id: number;
  category: CategoryEnum | string;
  complex: Complex | string;
  price: string;
  price_per_sqm?: string;
  rental_price?: string;
  floor?: string;
  area: string;
  rooms?: string;
  layout?: string;
  unit?: string;
  block?: Block;
  application_type?: string;
  status?: string;
  property_photos?: PropertyPhoto[];
  property_videos?: PropertyVideo[];
} 