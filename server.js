const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/connectDB");
const bookRouter = require("./routes/bookRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

connectDB();

app.use("/api", bookRouter);

app.get("/", (req,res) => {
    return res.send({
        "success": true,
        "error_code": null,
        "message": "Server is Running",
        "data": "Server is Live 🎉"
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server is running, Hurray!!");
});