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

app.use("/auth",require("./src/routes/Login"))

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

const parkRoutes = require('./src/routes/parkRoutes');
app.use('/parks', parkRoutes);

const employeeSpecialityRoutes = require('./src/routes/employeeSpecialityRoutes');
app.use('/employeeSpecialities', employeeSpecialityRoutes);

const employeeRoutes = require('./src/routes/employeeRoutes');
app.use('/employees', employeeRoutes);

const clientServiceRoutes = require('./src/routes/clientServiceRoutes');
app.use('/clientServices', clientServiceRoutes);

const clientServiceFactureRoutes = require('./src/routes/clientServiceFactureRoutes');
app.use('/clientServiceFactures', clientServiceFactureRoutes);

const employeeSalaryRoutes = require('./src/routes/employeeSalaryRoutes');
app.use('/employeeSalaries', employeeSalaryRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});