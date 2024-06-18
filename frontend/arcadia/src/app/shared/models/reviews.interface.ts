export interface Review {
    id: string,
    pseudo: string,
    content: string,
    date: Date,
    status: boolean;
    id_employee: string
}

export interface ReviewPost {
    pseudo: string,
    content: string,
    date: Date
}