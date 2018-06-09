const expect = require('expect');

const {isRealString} = require('../utils/validation');

describe('isRealString', () => {
    it('should reject non-string values', ()=> {
        var res =  isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces values', ()=> {
        var res =  isRealString("    ");
        expect(res).toBe(false);
    });

    it('should allow string with non-space characteristics', ()=> {
        var res =  isRealString('  Andrew ');
        expect(res).toBe(true);
    })
})