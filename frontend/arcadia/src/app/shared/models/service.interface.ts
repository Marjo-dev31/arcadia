export interface Service {
    id: string,
    title: string,
    description: string,
    
    // image: string
}


export interface ServiceCreate {
    title: string,
    description: string
}