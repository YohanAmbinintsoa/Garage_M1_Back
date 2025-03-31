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

const carBrandRoutes = require('./src/Controllers/carBrandRoutes');
app.use('/carBrands', carBrandRoutes);

const carModelRoutes = require('./src/Controllers/carModelRoutes');
app.use('/carModels', carModelRoutes);

const carRoutes = require('./src/Controllers/carRoutes');
app.use('/cars', carRoutes); 

const articleRoutes = require('./src/Controllers/articleRoutes');
app.use('/articles', articleRoutes);

const articleCategoryRoutes = require('./src/Controllers/articleCategoryRoutes');
app.use('/articleCategories', articleCategoryRoutes);

const serviceRoutes = require('./src/Controllers/serviceRoutes'); 
app.use('/services', serviceRoutes);

const rdvRoutes = require('./src/Controllers/rdvRoutes');
app.use('/rdvs', rdvRoutes);

const parkRoutes = require('./src/Controllers/parkRoutes');
app.use('/parks', parkRoutes);

const employeeSpecialityRoutes = require('./src/Controllers/employeeSpecialityRoutes');
app.use('/employeeSpecialities', employeeSpecialityRoutes);

const employeeRoutes = require('./src/Controllers/employeeRoutes');
app.use('/employees', employeeRoutes);

const clientServiceRoutes = require('./src/Controllers/clientServiceRoutes');
app.use('/clientServices', clientServiceRoutes);

const clientServiceFactureRoutes = require('./src/Controllers/clientServiceFactureRoutes');
app.use('/clientServiceFactures', clientServiceFactureRoutes);

const employeeSalaryRoutes = require('./src/Controllers/employeeSalaryRoutes');
app.use('/employeeSalaries', employeeSalaryRoutes);

const stockRoutes = require('./src/Controllers/stockRoutes');
app.use('/stocks',stockRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});