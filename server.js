const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors= require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    }).then(() => console.log("MongoDB connecté")) 
      .catch(err => console.log(err)); 

app.use("/auth",require("./src/Controllers/LoginController"))
app.use("/tests", require("./src/Controllers/TestController"))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});