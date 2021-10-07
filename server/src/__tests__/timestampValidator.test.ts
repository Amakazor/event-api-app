import validateTimestamp from '../utility/timestampValidator';

describe('Timestamp validator', () => {
    it('should pass walid timestamp', () => {
        expect(validateTimestamp(new Date().getTime())).toBeTruthy();
    });
    it('should not pass empty string', () => {
        expect(validateTimestamp('')).toBeFalsy();
    });
    it('should not pass non numeric string', () => {
        expect(validateTimestamp('sfsasfa32154213fgsdfsd')).toBeFalsy();
    });
    it('should pass numeric string', () => {
        expect(validateTimestamp('1231451')).toBeTruthy();
    });
});
