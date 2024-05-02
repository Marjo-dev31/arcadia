export interface User {
    id: string
    email: string,
    lastname: string,
    firstname: string,
    password: string,
    id_role: string
}

export interface UserCreate {
    email: string,
    lastname: string,
    firstname: string,
    password: string,
    id_role: string,
}

export interface UserConnect {
    email: string,
    password: string,
    role: string
}
