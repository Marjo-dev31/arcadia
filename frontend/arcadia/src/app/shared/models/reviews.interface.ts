export interface Review {
    id: string,
    pseudo: string,
    content: string,
    date: Date,
    status: boolean
}

export interface ReviewPost {
    pseudo: string,
    content: string,
    date: Date
}