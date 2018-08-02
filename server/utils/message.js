var generateMessage = (from, text)=> {
    return {
        from:from,
        text: text,
        createdAt: new Date().toDateString()
    }
}

module.exports = {generateMessage};