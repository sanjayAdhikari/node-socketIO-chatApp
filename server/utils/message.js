var generateMessage = function(from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

var generateLocationMessage = function(from,data){
   return {
        from,
        url: `https://maps.google.com/?q=${data.latitude},${data.longitude}`,
        createdAt: new Date().getTime
    }
}

module.exports = {generateMessage,generateLocationMessage}