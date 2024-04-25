export interface Service {
    id: string,
    title: string,
    description: string
    image_url: []
}


export interface ServiceCreate {
    title: string,
    description: string
}