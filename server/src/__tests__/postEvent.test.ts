import { Request } from 'express';
import handlePostEventPostRequest, { errors } from '../postEvent/postEvent';

describe('Post event', () => {
    it('should pass valid request', () => {
        const request = {
            body: {
                firstName: 'testName',
                lastName: 'testName',
                email: 'testName@test.test',
                date: '0123456789',
            },
        };

        const response = handlePostEventPostRequest(request as unknown as Request, true);
        expect(response).toBe(true);
    });

    it('should not pass request without firstName', () => {
        const request = {
            body: {
                lastName: 'testName',
                email: 'testName@test.test',
                date: '0123456789',
            },
        };

        const response = handlePostEventPostRequest(request as unknown as Request, true);
        expect(response).toBe(errors.firstNameMissing);
    });

    it('should not pass request without lastName', () => {
        const request = {
            body: {
                firstName: 'testName',
                email: 'testName@test.test',
                date: '0123456789',
            },
        };

        const response = handlePostEventPostRequest(request as unknown as Request, true);
        expect(response).toBe(errors.lastNameMissing);
    });

    it('should not pass request without email', () => {
        const request = {
            body: {
                firstName: 'testName',
                lastName: 'testName',
                date: '0123456789',
            },
        };

        const response = handlePostEventPostRequest(request as unknown as Request, true);
        expect(response).toBe(errors.emailMissing);
    });

    it('should not pass request without date', () => {
        const request = {
            body: {
                firstName: 'testName',
                lastName: 'testName',
                email: 'testName@test.test',
            },
        };

        const response = handlePostEventPostRequest(request as unknown as Request, true);
        expect(response).toBe(errors.dateMissing);
    });

    it('should not pass request with malformed email', () => {
        const request = {
            body: {
                firstName: 'testName',
                lastName: 'testName',
                email: 'testName@',
                date: '0123456789',
            },
        };

        const response = handlePostEventPostRequest(request as unknown as Request, true);
        expect(response).toBe(errors.malformedEmail);
    });

    it('should not pass request with malformed date', () => {
        const request = {
            body: {
                firstName: 'testName',
                lastName: 'testName',
                email: 'testName@test.test',
                date: 'fgweg32432',
            },
        };

        const response = handlePostEventPostRequest(request as unknown as Request, true);
        expect(response).toBe(errors.malformedDate);
    });
});
