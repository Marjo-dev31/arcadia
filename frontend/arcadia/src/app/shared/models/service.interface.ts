export interface Service {
    id: string,
    title: string,
    description: string
    image_url: string
}


export interface ServiceCreate {
    title: string,
    description: string
}