var config = require('../config');
var urls = config.urls;

module.exports = function (io) {
    
    io.on('connection', function (socket) {
        
        socket.on('addUrl', function (data) {
			console.log('url received : ' + data.url);
			urls.add(data.url);
		});
		
		urls.listenToNewUrl(function (data) {
			socket.emit('urlAdded', data);
		});
		
		urls.listenToHit(function (data) {
			socket.emit('hitAdded');
		});
		
		urls.listenToInvalidUrl(function (data) {
			socket.emit('invalidUrl', { message: data});
		});
    });
}
