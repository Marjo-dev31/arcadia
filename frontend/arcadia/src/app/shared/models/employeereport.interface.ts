export interface EmployeeReport {
    id: string;
    food: string;
    grammage: number,
    date: string,
    id_user: string,
    id_animal: string
}

export interface EmployeeReportCreate {
    food: string;
    grammage: number,
    id_user: string,
    id_animal: string
}