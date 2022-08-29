import request from "supertest";
import app from "../src/server/app";

describe('App', () => {
    it('GET /auth/login --> auth url', () => {
        return request(app).get('/auth/login')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body)
                    .toEqual(expect.objectContaining({
                        state: expect.any(String),
                        url: expect.any(String)
                    })
                    )
            })
    })

    it('GET /auth/callback --> auth', () => {
        return request(app).get('/auth/login')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body)
                    .toEqual(expect.objectContaining({
                        state: expect.any(String),
                        url: expect.any(String)
                    })
                    )
            })
    })
})