const request = require('supertest')
const app = require('../server')

describe('Endpoints', () => {
    it('Should create or update prefered temp', async () =>{
        const res = await request(app)
            .post('/api/1/favorites/temp/20')
        expect(res.statusCode).toEqual(200);
    })

    it('should show prefered temp', async () => {
        const res = await request(app)
            .get('/api/1/favorites/temp/')
        expect(res.statusCode).toEqual(200)

    })
})


afterAll(done=>{
    app.close();
    done();
});