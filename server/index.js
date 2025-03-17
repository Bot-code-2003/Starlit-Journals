import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the other side!");
});

mongoose
  .connect("mongodb://localhost:27017/cozy-mind")
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000 ");
    });
  })
  .catch((error) => console.log(error));
