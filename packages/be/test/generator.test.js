const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
describe('generator test', () => {
    let res = null
    it('Should return hearthbeat', async () => {
        res = await request
            .get('/api/generator/heltz')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body.msg).toStrictEqual("Number generator is working")
        expect(res.body.success).toStrictEqual(true)
    })


    it('Should return random number from provided range', async () => {
        const min = 1;
        const max = 100;
        res = await request
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
        const min = -1999;
        const max = -2;
        res = await request
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
        const min = "any";
        const max = "any";
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
