export interface Review {
    id: string,
    pseudo: string,
    content: string,
    date: Date,
    status: boolean;
    employee: string
}

export interface ReviewPost {
    pseudo: string,
    content: string,
    date: Date
}