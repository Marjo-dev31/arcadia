import { Animal } from ".";
// ./ renvois directement sur index.ts

export interface Habitat {
    id: number,
    title: string,
    description: string,
    animals: Animal [],
    image: string,
    comment?: string,
}