import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);
app.use("/post", postRouter);
const MONGODB_URL ="mongodb+srv://shriyanshv12:shriyanshv1222@recipeapp.scejbyj.mongodb.net/recipeapp?retryWrites=true&w=majority";
const port= 5000;

mongoose
.connect(MONGODB_URL)
    .then(() => {
    app.listen(port,() =>console.log(`Server is running on ${port}`));
    })
    .catch((error) => console.log('${error} did not connect'));

