export interface Image {
    id: string,
    image_url: string,
    service_id?: string,
    habitat_id?: string,
    animal_id?: string,
}

export interface ImageCreate {
    image_url: string,
    service_id?: string,
    habitat_id?: string,
    animal_id?: string
}