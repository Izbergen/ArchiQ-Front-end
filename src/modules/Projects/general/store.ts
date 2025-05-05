// src/store/useProjectModuleStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { APARTMENT_CLASS, PROPERTY_CATEGORY } from "@/general/types/api.types";

export type IState = {
  available_only: boolean;
  class_type: APARTMENT_CLASS | null;
  district: number | null;
  max_area: number | null;
  min_area: number | null;
  min_floor: number | null;
  max_floor: number | null;
  min_total_price: number | null;
  max_total_price: number | null;
  property_category: PROPERTY_CATEGORY | null;
  rooms: number | null;
};


type RequiredNonNull<T> = {
  [P in keyof T]-?: Exclude<T[P], null>;
};

export type APARTMENT_FIELDS = Omit<IState, "district" | "min_total_price" | "max_total_price" | "available_only" | "property_category">;
export type COMMERCE_FIELDS = RequiredNonNull<Pick<IState, "max_area" | "min_area">>;
export type PARKING_FIELDS = RequiredNonNull<Pick<IState, "max_area" | "min_area">>;
export type BOXROOM_FIELDS = RequiredNonNull<Pick<IState, "max_area" | "min_area">>;

export type IModuleStore = IState & {
    setAvailableOnly(available_only: boolean): void;
    setDistrict: (district: number) => void;
    setMinMaxPrice: (min: number, max: number) => void;
    setApartmentFields: (fields: APARTMENT_FIELDS) => void;
    setCommerceFields: (fields: COMMERCE_FIELDS) => void;
    setParkingFields: (fields: PARKING_FIELDS) => void;
    setBoxroomFields: (fields: BOXROOM_FIELDS) => void;
    reset: () => void;
    getFilledFields: () => Partial<IState>;
};

const initialState: IState = {
  available_only: false,
  class_type: null,
  district: null,
  max_area: null,
  min_area: null,
  min_floor: null,
  max_floor: null,
  min_total_price: null,
  max_total_price: null,
  property_category: null,
  rooms: null,
};

export const useProjectModuleStore = create<IModuleStore>()(
  persist<IModuleStore>(
    (set, get) => ({
      ...initialState,
      reset: () =>
        set(() => ({
          ...initialState,
        })),
      setAvailableOnly: (available_only) =>
        set({ available_only }),

      setDistrict: (district) =>
        set({ district }),

      setMinMaxPrice: (min, max) =>
        set({
          min_total_price: min,
          max_total_price: max,
        }),

      setApartmentFields: (fields) =>
        set(() => ({
          ...fields,
          property_category: PROPERTY_CATEGORY.APARTMENT
        })),

      setCommerceFields: (fields) =>
        set(() => ({
          ...fields,
          class_type: null,
          property_category: PROPERTY_CATEGORY.COMMERCE,
          rooms: null,
        })),

      setParkingFields: (fields) =>
        set(() => ({
          ...fields,
          class_type: null,
          property_category: PROPERTY_CATEGORY.PARKING,
          rooms: null,
        })),

    
      setBoxroomFields: (fields) =>
        set(() => ({
          ...fields,
          class_type: null,
          property_category: PROPERTY_CATEGORY.BOXROOM,
          rooms: null,
        })),


        getFilledFields: () => {
          const state = get();
        
          return Object.fromEntries(
            Object.entries(state).filter(([_, value]) =>
              value !== null &&
              typeof value !== "function" 
            )
          ) as Partial<IState>;
        }
    }),
    { name: "projects-module-state" }
  )
);


