

const getAnimals = jest.fn();
const httpStatus = jest.fn()
const Response = jest.fn();

const results = [
{   id:1,
    firstname:'Edward',
    id_habitat:1,
    id_breed:1
},
{
    id:2,
    firstname:'Winry',
    id_habitat:2,
    id_breed:1
},
{
    id:3,
    firstname:'Alphonse',
    id_habitat:3,
    id_breed:6
}]

let mockRes = new Response(
    200,
    'OK',
    `Animals retrieved`,
    results
  );

let mockReq = {};

let responseOk = new Response(
    200,
    'OK',
    `Animals retrieved`,
    results
  );

let noResponse = new Response(
    200,
    'OK',
    `No animals found`,
)

describe('GET/animals', ()=>{
    it('should return Response', () => {
        expect(getAnimals(mockReq, mockRes)).toBe(responseOk.status)
        expect(getAnimals(mockReq, mockRes)).toBe(responseOk.code)
    });

    it('should return no results', ()=>{
        mockRes = new Response(
            200,
            'OK',
            `No animals found`,);
        expect(getAnimals(mockReq, mockRes)).toBe(noResponse.status)
    });

    it('')
})