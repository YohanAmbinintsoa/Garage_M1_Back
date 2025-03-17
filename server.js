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

const carBrandRoutes = require('./src/routes/carBrandRoutes');
app.use('/carBrands', carBrandRoutes);

const carModelRoutes = require('./src/routes/carModelRoutes');
app.use('/carModels', carModelRoutes);

const carRoutes = require('./src/routes/carRoutes');
app.use('/cars', carRoutes); 

const articleRoutes = require('./src/routes/articleRoutes');
app.use('/articles', articleRoutes);

const articleCategoryRoutes = require('./src/routes/articleCategoryRoutes');
app.use('/articleCategories', articleCategoryRoutes);

const serviceRoutes = require('./src/routes/serviceRoutes'); 
app.use('/services', serviceRoutes);

const rdvRoutes = require('./src/routes/rdvRoutes');
app.use('/rdvs', rdvRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});