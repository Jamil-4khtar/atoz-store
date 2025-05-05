const express = require("express")
const http = require("http");
const { Server } = require("socket.io")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload")
require("dotenv").config();
var helmet = require("helmet")


const app = express()
const server = http.createServer(app);
global.io = new Server(server);

// app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.cloudinary.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      // ...other directives
    },
  })
);
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())


const admins = []
let activeChats = []

function get_random(array) {
  return array[Math.floor(Math.random() * array.length)]
}

io.on("connection", (socket) => {
  socket.on("admin connected with server", (adminName) => {
      admins.push({ id: socket.id, admin: adminName})
      console.log(admins)
  })
  socket.on("client sends message", (msg) => {
    if (admins.length === 0) {
      socket.emit("no admin", "")
    } else {
      let client = activeChats.find((client) => client.clientId === socket.id);
      let targetAdminId;
      if (client) {
        targetAdminId = client.adminId;
      } else {
        let admin = get_random(admins)
        activeChats.push({ clientId: socket.id, adminId: admin.id})
        targetAdminId = admin.id;
      }
      socket.broadcast.to(targetAdminId).emit("server sends message from client to admin", {
        message: msg,
        user: socket.id
      })
    }
    // console.log(msg)
  })
  socket.on("admin sends message", ({ user,  message }) => {
    socket.broadcast.to(user).emit("server sends message from admin to client", { message })
  })

  socket.on("admin closes the chat", (socketId) => {
    socket.broadcast.to(socketId).emit("admin closed", "");
    let c = io.sockets.sockets.get(socketId);
    c.disconnect();
  })

  socket.on("disconnect", (reason) => {
    const removeIndex = admins.findIndex((item) => item.id === socket.id);
    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1)
    }
    activeChats = activeChats.filter((item) => item.adminId !== socket.id)
    const removeClientIndex = activeChats.findIndex(item => item.clientId === socket.id);
    if (removeClientIndex !== -1) {
      activeChats.splice(removeClientIndex, 1);
    }

    socket.broadcast.emit("disconnected", { reason, socketId: socket.id })
  })
})


// mongodb connection
const connectDB = require("./config/db") 
connectDB()

// api routes
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

// global error handler for console
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error); 

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!!"
    })
    
    next()
  }
}) 

// global error handler for client
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack
    })
  } else {
    res.status(500).json({
      message: error.message,
    })
  }
})

const path = require('path');
// ...existing code...

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server Is Up")) 