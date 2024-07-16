

import Response from "../domain/response.js";
import { getAnimals } from "./animal.controller.js";

let mockRequest = {}

let mockResponse = {}



describe('get animals', ()=> {
    it('should get animals', ()=>{
        getAnimals(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalled();
    })
})

