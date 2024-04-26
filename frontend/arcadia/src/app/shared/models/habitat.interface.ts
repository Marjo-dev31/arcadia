import { Animal } from ".";
// ./ renvois directement sur index.ts

export interface Habitat {
    id: string,
    title: string,
    description: string,
    animals: Animal [],
    image_url: string,
    comment?: string,
}

export interface HabitatCreate {
    title: string,
    description: string
}