 export interface Response<T> {
    timeStamp: string,
    statusCode: number,
    httpStatus: string,
    message: string,
    data?: T[]
}



