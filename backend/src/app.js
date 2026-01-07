import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/weather", weatherRoutes);

export default app;
