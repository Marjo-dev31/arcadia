// import { Animal } from "./animals.interface";
// import { Breed } from "./breed.interface";


 export interface Response<T> {
    timeStamp: string,
    statusCode: number,
    httpStatus: string,
    message: string,
    data?: T[]
}

// export interface ResponseBreed {
//     timeStamp: string,
//     statusCode: number,
//     httpStatus: string,
//     message: string,
//     data?: Breed[]
// }


