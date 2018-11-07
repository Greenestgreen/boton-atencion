const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {Users} = require('./utils/user');
const publicPath = path.join(__dirname, '/public');


const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('Conectado');

  socket.on('join', (params) => {
    users.removeUser(params.name);
    users.addUser(socket.id, params.name);
    io.emit('updateUserList', users.getUserList());

  });

  socket.on('createRequest',(request, callback) => {
    console.log(request);
    var user = users.getUserByName(request.name);
    if (user) {

    request.user = users.getUser(socket.id).name;
    request.img = users.getUser(socket.id).img;

      switch (request.task) {
        case 'llamar':
            request.task = `${request.user} solicita de tu atención.`;
          break;
        case 'trello':
            request.task = `${request.user} te añadio una tarea en trello que requiere tu atención.`
          break;
        case 'felicitar':
            request.task = `${request.user} te felicita por tu trabajo bien hecho.`
          break;
      }


      console.log(request);
      io.to(user.id).emit('newRequest',request);
    }




  });

  socket.on('disconnect', () => {
    var user = users.removeUserById(socket.id);

    if (user) {
      io.emit('updateUserList', users.getUserList());
    }
    });


});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
