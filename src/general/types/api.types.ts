export type ICities = {
    id: number,
    name: string
}

export type IDistrict ={
    id: number,
    name: string,
    description: string,
    city: number
    
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


export enum APARTMENT_CLASS {
    ALL = 'ALL',
    BUSINESS = 'BUSINESS',
    STANDARD = 'STANDARD',
    COMFORT = 'COMFORT',
    PREMIUM = 'PREMIUM',
}
export enum ROOMS {
    ONE = "1",
    TWO = "2",
    THREE = "3",
    FOUR = "4",
    ALL = "ALL",
}

export enum PROPERTY_CATEGORY {
    APARTMENT='APARTMENT', 
    PARKING='PARKING', 
    BOXROOM='BOXROOM', 
    COMMERCE='COMMERCE',
}

