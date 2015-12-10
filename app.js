var getApp = function (config) {
	var express = require('express');
	var app = express();
	var bodyParser=require('body-parser');
	var methodOverride=require('method-override');
	var cookieParser=require('cookie-parser');
	//middleware
	function local_env (req, res, next){
		res.local('real_time_server', config.server.production.real_time_server)
		next();
	}

		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');
		app.engine('.html', require('ejs').parseHandler);
		app.engine('.ejs', require('ejs').parseHandler);
		app.use(bodyParser());
		app.use(methodOverride());
		app.use(cookieParser());
				
		app.use(local_env);
		
		var oneYear = 31557600000;
		app.use(express.static(__dirname + '/public', { maxAge: oneYear }));

	  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 


	//routes
	require('./routes/index').configure(app);

	return app;
};

exports.getApp = getApp;
