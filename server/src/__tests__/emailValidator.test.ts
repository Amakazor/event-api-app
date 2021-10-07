import validateEmail from '../utility/emailValidator';

describe('Email validator', () => {
    it('should pass walid email', () => {
        expect(validateEmail('test@test.test')).toBeTruthy();
    });
    it('should not pass email without domain extension', () => {
        expect(validateEmail('test@test')).toBeFalsy();
    });
    it('should not pass email without domain', () => {
        expect(validateEmail('test')).toBeFalsy();
    });
    it('should not pass email without name', () => {
        expect(validateEmail('test.com')).toBeFalsy();
    });
    it('should not pass email without dot', () => {
        expect(validateEmail('test@testcom')).toBeFalsy();
    });
    it('should not pass empty string', () => {
        expect(validateEmail('test@testcom')).toBeFalsy();
    });
    it('should not pass email with more than one at', () => {
        expect(validateEmail('test@test@test.com')).toBeFalsy();
    });
});
