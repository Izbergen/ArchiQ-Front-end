enum RESIDENCE_CLASS {
    BUSINESS = 'BUSINESS',
    STANDARD = 'STANDARD',
    COMFORT = 'COMFORT',
    PREMIUM = 'PREMIUM',
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
    class_type: RESIDENCE_CLASS,
    district: IDistrict,
    residential_complex_photos: IPhoto[],
    description_short: string

}