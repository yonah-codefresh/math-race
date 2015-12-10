var getApp = function (config) {
	var express = require('express');
	var app = express();
	var bodyParser=require('body-parser');
	var methodOverride=require('method-override');
	var cookieParser=require('cookie-parser');
	var errorHandler=require('errorhandler');

		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');
		app.engine('.html', require('ejs').renderFile);
		app.engine('.ejs', require('ejs').renderFile);
		app.use(bodyParser());
		app.use(methodOverride());
		app.use(cookieParser());
				
	//middleware
		app.use(function(req, res, next){
                	res.locals.real_time_server=config.server.production.real_time_server;
                	next();
        	});
		
		var oneYear = 31557600000;
		app.use(express.static(__dirname + '/public', { maxAge: oneYear }));

	  app.use(errorHandler({ dumpExceptions: true, showStack: true })); 


	//routes
	require('./routes/index').configure(app);

	return app;
};

exports.getApp = getApp;
