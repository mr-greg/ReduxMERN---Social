const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000
const cors = require("cors");

// connexion à la DB
connectDB();

const app = express();

// Autorisation CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}))

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/post", require("./routes/post.routes"));






// lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));