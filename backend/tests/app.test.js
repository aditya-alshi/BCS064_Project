const { app } = require('../index');
const  request  = require('supertest');
const http = require('http')

let server;
const PORT=3001;

beforeAll(() => {
    server = http.createServer(app);
    server.listen(PORT);
});

afterAll(() => {
    server.close();
});

describe('API TEST', () => {

    it('should return hello message', async () => {
        let response = await request(server).get('/test');
        expect(response.text).toEqual('hello');
    });

})