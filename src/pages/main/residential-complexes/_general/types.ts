import { IDistrict , IPhoto } from "@/general/types/api.types";
  
export interface Block {
    id: number;
    block_number: number;
    entrance_number: number;
    total_floors: number;
    queue: number;
    deadline_year: number;
    deadline_querter: number;
    total_apartments: number;
    building_status: "COMPLETED" | "UNDER CONSTRUCTION" | string;
    link_on_map: string;
  }
  
export interface ResidentialComplexDetails {
    id: number;
    name: string;
    address: string;
    class_type: "STANDARD" | "COMFORT" | "BUSINESS" | "PREMIUM" | string;
    construction_technology: string;
    heating_type: string;
    has_elevator_pass: boolean;
    has_elevator_cargo: boolean;
    ceiling_height: string;
    block_number: number;
    down_payment: string;
    installment_plan: string;
    latitude: string;
    longitude: string;
    link_on_map: string;
    description_full: string;
    description_short: string;
    created_at: string;
    district: IDistrict;
    blocks: Block[];
    residential_complex_photos: IPhoto[];
  }