const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
describe('Global test', () => {
    it('Should return error not found - POST', async () => {
        const res = await request
            .post('/api/posts')
            .send({
                id: 1,
                msg: 'Does it exist?',
            })
        expect(res.statusCode).toEqual(404)
        expect(res.body).toStrictEqual({msg:"not found",success:false})
    })

    it('Should return error not found - GET', async () => {
        const res = await request
            .get('/api/posts')
            .send()
        expect(res.statusCode).toEqual(404)
        expect(res.body).toStrictEqual({msg:"not found",success:false})
    })

})