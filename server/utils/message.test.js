var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Test 1';
        var text = 'Sample text';
        
        var message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
        
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = '1';
        var longitude = '1';
        url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        var data = generateLocationMessage(from, latitude, longitude);
        expect(data.from).toBe(from);
        expect(data.url).toBe(url);
        expect(data).toMatchObject({from, url});
        
    });
});