import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import mongoose from "mongoose";

dotenv.config(); //looks for dotenv in the root
const app = express();

// routers
import authRouter from "./routes/authRoutes.js";

// Middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/auth", authRouter);

// Looks for the errors that happen in the existing route
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;

// async because mongoose returns a promise

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
