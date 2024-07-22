import { getAnimals } from '../controller/animal.controller.js';


const mockReq = {
    method: 'GET',
    originalUrl: 'http://localhost:8000/animals'
};


const mockRes = {
    status: jest.fn(()=>mockRes),
    send: jest.fn()
};


describe('getAnimals',  ()=>{
it('should return animal list', async ()=> {

    const response = await getAnimals(mockReq, mockRes);
   expect(response.status).toHaveBeenCalled()
})  
})
