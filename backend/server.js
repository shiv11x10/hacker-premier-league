const debug = require("debug")("node-angular");
const http = require("http");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Team = mongoose.model("Team", mongoose.Schema({
  team_name: { type: String, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  ties: { type: Number, required: true },
  score: { type: Number, required: true },
}));

const app = express();

mongoose
  .connect(
    "mongodb+srv://shivamXI:Shivam*1996@cluster0.sab3t.gcp.mongodb.net/hacker-premier-league?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!" + err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post(
  "/",
  (req, res, next) => {
    const team = new Team({
      team_name: req.body.team_name,
      wins: req.body.wins,
      losses: req.body.losses,
      ties: req.body.ties,
      score: req.body.score
    });
    team.save().then(createdData => {
      res.status(201).json({
        message: "Data added successfully",
        data: {
          ...createdData
        }
      });
    });
  }
);

app.get("/", (req, res, next) => {
  const teamQuery = Team.find();
  let fetcheddata;
  teamQuery
    .then(data => {
      res.status(200).json({
        message: "Data fetched successfully!",
        data: data
      });
    });
});

app.put(
  "/win/:id",
  (req, res, next) => {
    const team = new Team({
      _id: req.params.id,
      team_name: req.body.team_name,
      wins: req.body.wins,
      losses: req.body.losses,
      ties: req.body.ties,
      score: req.body.score
    });
    Team.updateOne({ _id: req.params.id }, team).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

app.put(
  "/lose/:id",
  (req, res, next) => {
    const team = new Team({
      _id: req.params.id,
      team_name: req.body.team_name,
      wins: req.body.wins,
      losses: req.body.losses,
      ties: req.body.ties,
      score: req.body.score
    });
    Team.updateOne({ _id: req.params.id }, team).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

app.put(
  "/tie/:id",
  (req, res, next) => {
    const team = new Team({
      _id: req.params.id,
      team_name: req.body.team_name,
      wins: req.body.wins,
      losses: req.body.losses,
      ties: req.body.ties,
      score: req.body.score
    });
    Team.updateOne({ _id: req.params.id }, team).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

const normalizePort = val => {
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
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
