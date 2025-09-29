import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express();
console.log("===========Starting Server===========");

// Middleware để parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
