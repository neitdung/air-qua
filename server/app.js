require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require('http');
const server = http.createServer(app);
const PPMController = require('./controller/PPMController');
const PPM = require('./model/ppm.model');

const os = require('os-utils');
// const passport = require("passport");
app.use(express.urlencoded({ extended: true }));
// require('mongoose').set('debug', true);

// db configuration
// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI = 'mongodb://127.0.0.1:27017/air-qua';
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
app.use('/get', PPMController.show);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

const PORT_SOCKET = process.env.PORT_SOCKET || 6001;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  }
});
let tick = 0;

server.listen(PORT_SOCKET);

var mqtt = require('mqtt')

var options = {
  //host: 'c3c05bf6b7ff4f5fa23905cb6c726879.s2.eu.hivemq.cloud',
  host: 'broker.hivemq.com',
  port: 1883,
  protocol: 'mqtt',
  username: 'phtr311',
  password: 'PhiTruong3120'
}

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
  console.log('Connected');
});

client.on('error', function (error) {
  console.log(error);
});

io.on('connection', socketClient => {
  client.on('message', function (topic, message) {
    let arr = message.toString().split(",");
    socketClient.emit('ppm', {
      name: tick++,
      value: arr[1]
    });
    // console.log('ClientID: ' + arr[0] + ' , PPM: '+ arr[1]);
    let currentdate = new Date();
    const ppm = new PPM({
      time: currentdate,
      value: arr[1]
    });
    ppm.save()
      .then(() => true)
      .catch(() => false);
  });
});

// subscribe to topic 'my/test/topic'
client.subscribe('/hust/c3c05bf6b7ff4f5fa23905cb6c726879');

// publish message 'Hello' to topic 'my/test/topic'
// client.publish('my/test/topic', 'Hellpoooooooo');

// setInterval(() => {
//     client.publish('my/test/topic', '' + Math.random());
// }, 1000);
