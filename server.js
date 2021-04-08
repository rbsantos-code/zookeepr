const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

// add modularize files function - 11.4.4
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// make front end files available to server - 11.3.4
app.use(express.static('public/zookeepr-public'));

// parse incoming string or array data - 11.2.5
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data - 11.2.5
app.use(express.json());

// app will use router - 11.4.4
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// create a route to request data from
const { animals } = require('./data/animals.json')

// add port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});