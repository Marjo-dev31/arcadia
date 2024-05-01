export interface VeterinaryReport {
    id: string,
    food: string,
    grammage: number,
    date: Date,
    health: string,
    details_condition?: string,
    id_user: string,
    id_animal: string 
}

export interface VeterinaryReportCreate {
    food: string,
    grammage: number,
    health: string,
    details_condition?: string,
    id_user: string,
    id_animal: string
}