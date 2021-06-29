import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import "dotenv-defaults/config.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv-defaults';

import mongo from "./backend/src/mongo.js";
import apiRoute from "./backend/src/routes/api/index.js";
// import wakeUpDyno from "./backend//route/wakeUpDyno.js";

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;


const app = express();

app.use(cors());
app.use("/", apiRoute);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongo.connect();

// const server = app.listen(process.env.PORT || 80, function(){
//   console.log('on'+server.address().port);
// });

// server.applyMiddleware({ app });


const httpServer = http.createServer(app);


httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
});
