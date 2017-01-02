import express from 'express';
import debuglib from 'debug';
import http from 'http';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes/api';

let app = express();

// allow cross origin resource sharing
// for this demo app we allow connections from anywhere
app.use(cors());

app.set('secret', 'SECRET');

// setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', function(req, res) {
	res.sendfile('public/index.html');
});
app.get('/favicon.ico', function(req, res) { // handle annoying favicon requests
	res.sendStatus(204); // "No Content"
});
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use((err, req, res, next) => {
	res.status(err.code || 500)
		.json({
			status: 'error',
			message: err
		});
});

const debug = debuglib('cadre-test:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app);

server.listen(port, () => {
	// destructuring
	const {address, port} = server.address();

	// string interpolation
	console.log(`Started backend on port ${port}`);
});
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
	const port = parseInt(val, 10);

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

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

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
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}

export default app;