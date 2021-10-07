// eslint-disable-next-line import/no-unresolved
import request from 'supertest';
import createApp from '../app';
import { errors } from '../postEvent/postEvent';

describe('Server', () => {
    const postEvent = {
        firstName: 'testName',
        lastName: 'testName',
        email: 'testName@test.test',
        date: '0123456789',
    };

    it('Should start without crashing', async () => {
        const response = await request(createApp(true)).get('');
        expect(response.statusCode).toBe(200);
    });

    it('Should serve react', async () => {
        const response = await request(createApp(true)).get('/');
        expect(response.text).toContain('id="root"');
    });

    it('Should handle valid POST request', async () => {
        const response = await request(createApp(true)).post('/api/v1/event').send(postEvent).set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    it('Should handle invalid POST request', async () => {
        const response = await request(createApp(true))
            .post('/api/v1/event')
            .send({ ...postEvent, date: 'dsadsa' })
            .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe(errors.malformedDate);
    });
});
