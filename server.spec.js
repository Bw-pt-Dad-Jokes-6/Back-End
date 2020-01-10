const server = require('./server');
const request = require('supertest');

//change these for each test
let newUsername = "thisisjustates"
let newPassword = "sd"

let token;
let jokeNum;

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
        token = JSON.parse(response.text).token;
        expect(response.status).toEqual(200);
    })
    it('returns 400', () => {
        return request(server).post('/api/auth/Login')
        .send(`username=${newUsername}` + "thisdosntexist")
        .send(`password=${newPassword}`)
        .expect(401)
    })
})

describe ('POST /api/jokes/create', () => {
    it('returns 200 OK',  async () => {
        const response = 
        await request(server).post('/api/jokes/create')
        .set('token', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(`joke_body=${newUsername}`)
        .send(`punchline=${newPassword}`)

        jokeNum = JSON.parse(response.text);

        expect(response.status).toEqual(200);
    })
})

describe ('PUT /api/jokes/edit/:id', () => {
    it('returns 200 OK',  async () => {
        const response = 
        await request(server).put(`/api/jokes/edit/${jokeNum}`)
        .set('token', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(`joke_body=${newUsername}`)
        .send(`punchline=${newPassword}`)

        expect(response.status).toEqual(200);
    })
})

describe ('PUT /api/jokes/remove/:id', () => {
    it('returns 200 OK',  async () => {
        const response = 
        await request(server).put(`/api/jokes/remove/${jokeNum}`)
        .set('token', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')

        expect(response.status).toEqual(200);
    })
})