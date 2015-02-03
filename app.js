/**
 * Module dependencies
 */

var express = require('express'),
    routes = require('./routes'),
    //api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//var clientHandler = require('./routes/clientHandler')
var clients = [];

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    // TODO
};


/**
 * Routes
 */

// serve index
app.get('/', routes.index);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication
io.sockets.on('connection', handleConnection);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

function handleConnection(socket) {
    console.log('a user connected');
    socket.on('user:connected', function (user) {
        clients[socket.id] = user;
        io.emit('send:name', user.name);
        console.log(user.name + " has connected");
        io.emit('user:joined', {
            'name': user.name
        });
        console.log(clients);
    });
    socket.on('message', function (message) {
        var envelope = {};
        envelope.userName = clients[socket.id].name;
        envelope.msg = message;
        console.log(envelope.userName + ': ' + envelope.msg);
        io.emit('message', envelope);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('user:left', clients[socket.id]);
        delete clients[socket.id];

    });
}
