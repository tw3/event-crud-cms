'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// allow cross origin resource sharing
app.use((0, _cors2.default)());

app.set('secret', 'SECRET');

// setup
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// Routing
app.get('/', function (req, res) {
	res.sendfile('public/index.html');
});
app.get('/favicon.ico', function (req, res) {
	// handle annoying favicon requests
	res.sendStatus(204); // "No Content"
});
app.use('/api', _api2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use(function (err, req, res, next) {
	res.status(err.code || 500).json({
		status: 'error',
		message: err
	});
});

var debug = (0, _debug2.default)('cadre-test:server');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = _http2.default.createServer(app);

server.listen(port, function () {
	// destructuring
	var _server$address = server.address(),
	    address = _server$address.address,
	    port = _server$address.port;

	// string interpolation


	console.log('Started backend on port ' + port);
});
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}
function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}

exports.default = app;
//# sourceMappingURL=index.js.map