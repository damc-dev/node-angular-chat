function ClientHandler(clients) {
    console.log(this.clients);
    this.clients = clients;
    console.log(this.clients);

}

ClientHandler.prototype.handle = function(socket) {
    socket.clients = this.clients;
    //console.log(this);
        console.log(this.clients);

    console.log('a user connected');
    socket.on('user:connected', function (user) {
        socket.clients[socket.id] = user;
        console.log(user.name + " has connected");
        io.emit('user:joined', {
            'name': user.name
        });
    });

    socket.on('message', function (message) {
            console.log(this.clients);

        var envelope = {};
        envelope.userName = clients[socket.id].name;
        envelope.msg = message;
        console.log(envelope.userName + ': ' + envelope.msg);
        io.emit('message', envelope);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
};


module.exports = ClientHandler;