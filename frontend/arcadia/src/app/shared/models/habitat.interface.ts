import { Animals } from ".";
// ./ renvois directement sur index.ts

export interface Habitats {
    id: number,
    title: string,
    description: string,
    animals: Animals [],
    image: string,
    comment?: string,
}