import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import "dotenv-defaults/config.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import mongo from "./backend/src/mongo.js";
import apiRoute from "./backend/routes/api/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;


const app = express();

app.use(cors());
app.use("/api", apiRoute);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});




const httpServer = http.createServer(app);


mongo.connect();

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
});
