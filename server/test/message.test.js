var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('../utils//message.js');

describe("generateMessage", () => {
    it('should generate Message', () => {
        var from = "Sanjay";
        var text = "Hello There!";
        var result = generateMessage(from, text);

        expect(result).toInclude({
            text,
            from
        });
        expect(result.createdAt).toBeA('number');

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Sanjay';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://maps.google.com/?q=15,19';
        var message = generateLocationMessage(from, {
            latitude,
            longitude
        });

        expect(message.createdAt).toBeA('number');

        expect(message).toInclude({
            from,
            url
        });
    });
});