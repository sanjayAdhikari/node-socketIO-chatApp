var expect = require('expect');
var {generateMessage} = require('../utils//message.js');

describe("generateMessage", ()=> {
    it('should generate Message', () => {
        var from = "Sanjay";
        var text = "Hello There!";
        var result = generateMessage(from,text);

        expect(result).toInclude({text,from});
        expect(result.createdAt).toBeA('number');
        
    });
})