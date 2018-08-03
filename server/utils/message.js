var generateMessage = (from, text)=> {
    return {
        from:from,
        text: text,
        createdAt: new Date().toDateString()
    }
}

var generateLocationMessage = (from, latitude, longitude)=> {
    return {
        
        from: from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().toDateString()
    }
}

module.exports = {generateMessage, generateLocationMessage};