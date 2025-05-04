export enum APARTMENT_CLASS {
    BUSINESS = 'BUSINESS',
    STANDARD = 'STANDARD',
    COMFORT = 'COMFORT',
    PREMIUM = 'PREMIUM',
}

export enum PROPERTY_CATEGORY {
    APARTMENT='APARTMENT', 
    PARKING='PARKING', 
    BOXROOM='BOXROOM', 
    COMMERCE='COMMERCE',
}

export type IDistrict = {
    id: number,
    name: string
}

export type IPhoto = {
    id: number,
    photo_link: string
}

export type IResidence = {
    id: number,
    name: string,
    address: string,
    class_type: APARTMENT_CLASS,
    district: IDistrict,
    residential_complex_photos: IPhoto[],
    description_short: string

}