var config = require ('./config').values

var app = require ('./app').getApp(config)
var http=require('http'), server=http.createServer(app);
var port = parseInt(process.argv[2], 10) || process.env.PORT || 9000
var listener=app.listen(port);

//create handler for socket.io
var race = require ('./lib/modules/race')
race.createRace(server);

console.log("Express server listening on port %d in %s mode", listener.address().port, app.settings.env);

process.on('SIGINT', function () {
	app.close();
	console.log();
	console.log('Shutting down server...');
	process.exit(0);
});
