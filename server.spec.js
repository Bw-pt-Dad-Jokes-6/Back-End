const server = require('./server');
const request = require('supertest');

//change these for each test
let newUsername = "thisisjustatestplease"
let newPassword = "sd"


describe ('POST /api/auth/register', () => {
    it('returns 200 OK',  () => {
        return request(server).post('/api/auth/register')
        .send(`username=${newUsername}`)
        .send(`password=${newPassword}`)
        .expect(200)
    })
    it('returns 400', () => {
        return request(server).post('/api/auth/register')
        .send(`username=${newUsername}`)
        .send(`password=${newPassword}`)
        .expect(400)
    })
})

describe ('POST /api/auth/Login', () => {
    it('returns 200 OK',  async () => {
        const response = 
        await request(server).post('/api/auth/Login')
        .send(`username=${newUsername}`)
        .send(`password=${newPassword}`);

        expect(response.status).toEqual(200);
    })
    it('returns 400', () => {
        return request(server).post('/api/auth/Login')
        .send(`username=${newUsername}` + "thisdosntexist")
        .send(`password=${newPassword}`)
        .expect(401)
    })
})