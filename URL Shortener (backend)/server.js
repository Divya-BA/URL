const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors');

// const path = require('path');
const app = express();
const PORT = 3000;

//connect to the database
connectDB();

//middleware
app.use(bodyParser.json());
app.use(cors());


//middleware to serv static files
app.use('/', urlRoutes);
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running fine on ${PORT}`);
})