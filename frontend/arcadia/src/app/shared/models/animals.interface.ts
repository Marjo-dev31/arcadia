export interface Animal {
    id: string,
    firstname: string,
    habitat: string,
    id_habitat: string,
    breed: string,
    id_breed: string,
    image?: string [],
    veterinary_report?: unknown [],
    employee_report?: unknown [],
}

export interface AnimalCreate {
    firstname: string,
    habitat: string,
    breed: string
}