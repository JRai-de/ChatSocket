// JavaScript source code
const express = require('express');//Requerido para poder usar express.
const app = express();//Requerido para definir rutas.
const http = require('http').Server(app);//Requerido para poder usar http.
const io = require('socket.io')(http);//Requerido para poder usar socket.io que permite chat.
const path = require("path");//Requerido para rutas;


app.use(express.static(path.join(__dirname, 'public')));//Permite acceder a archivos estatico en este caso a las hojas de estilos y a las imagenes.




app.get('/', function (req, res) {//Permite enviar y recibir;
    res.render('index.ejs');//Permite acceder al archivo quie se indique en este caso a index.js//

});
io.sockets.on("connection", function (socket) {//Controlador de eventos.
    socket.on("username", function (username) {//evento que avisa de la union del acceso y el nombre de este.
        socket.username = username;
        io.emit("is_online", "🔵 <i>" + socket.username + " Se unió</i>");//Mensaje
    });
    socket.on("disconnect", function (username) {//evento que indica la desconexion.
        io.emit(
            "is_online",
            "🔴 <i>" + socket.username + " Abandono el chat ..</i>"//Mensaje 
        );
    });

    socket.on("chat_message", function (message) {//Evento que indica tanto el nombre del que envia el mensaje como este.
        io.emit(
            "chat_message",
            "<strong>" + socket.username + "</strong>: " + message//Mensaje
        );
    });
});

const server = http.listen(3000, function () {//Conexion del Servidor 
    console.log('listo 3000');//Mensaje que aparecerá en consola.
})