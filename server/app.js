require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require('http');
const server = http.createServer(app);

const os = require('os-utils');
// const passport = require("passport");
app.use(express.urlencoded({ extended: true }));
// require('mongoose').set('debug', true);

// db configuration
const MONGO_URI = process.env.MONGO_URI;
mongoose
   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("Mongo Connection successful"))
   .catch(err => console.log("err"));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

// app.use(passport.initialize());
// require("./middleware/passport")(passport);
// app.use("/api/day", require("./route/day"));
// app.use("/api/device/", require("./route/device"));
// app.use("/api/hour/", require("./route/hour"));
// app.use("/api/user/", require("./route/user"));
// app.use("/api/week/", require("./route/week"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

const PORT_SOCKET = process.env.PORT_SOCKET || 6000;
const io = require("socket.io")(server, {
  cors: {
      origin: "*",
  }
}); 
 let tick = 0;
 io.on('connection', client => {
   setInterval(() => {
     os.cpuUsage(cpuPercent => {
       client.emit('cpu', {
         name: tick++,
         value: cpuPercent
       });
     });
   }, 1000);
 });
 
 server.listen(PORT_SOCKET);