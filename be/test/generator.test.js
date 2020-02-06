const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
describe('generator test', () => {

    it('Should return hearthbeat', async () => {
        const res = await request
            .get('/api/generator/heltz')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body.msg).toStrictEqual("Number generator is working")
        expect(res.body.success).toStrictEqual(true)
    })


    it('Should return random number from provided range', async () => {
        var min = 1;
        var max = 100;
        const res = await request
            .post('/api/generator')
            .send({
                min:min,
                max:max
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.msg).toBeGreaterThanOrEqual(min)
        expect(res.body.msg).toBeLessThanOrEqual(max)
        expect(res.body.success).toStrictEqual(true)
    })

    it('Should return random number from provided range - negative number', async () => {
        var min = -1999;
        var max = -2;
        const res = await request
            .post('/api/generator')
            .send({
                min:min,
                max:max
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.msg).toBeGreaterThanOrEqual(min)
        expect(res.body.msg).toBeLessThanOrEqual(max)
        expect(res.body.success).toStrictEqual(true)
    })

    it('Should return error - string instead of int', async () => {
        var min = "any";
        var max = "any";
        const res = await request
            .post('/api/generator')
            .send({
                min:min,
                max:max
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toEqual({success:false,max:"Maximum must be an Integer.",min:"Minimum must be an Integer."})
    })

})