import express from "express";
import cors from "cors";
import router from "./routes/search";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded());
// app.use(express.static("public"))
app.use("/api", router);
