

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

const mockRes = new Response(
    200,
    'OK',
    `Animals retrieved`,
    results
  );

const mockReq = {};



describe('GET/animals', ()=>{
    it('should return Response', () => {
        expect(getAnimals(mockReq, mockRes)).toBe(mockRes.status)
    })
})