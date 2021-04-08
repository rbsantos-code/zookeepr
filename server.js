const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

// make front end files available to server - 11.3.4
app.use(express.static('public/zookeepr-public'));

// parse incoming string or array data - 11.2.5
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data - 11.2.5
app.use(express.json());

// create a route to request data from
const { animals } = require('./data/animals.json')



// add route for HTML - 11.3.4
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepr-public/index.html'));
});

// add route for animals html - 11.3.6
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepr-public/animals.html'));
});

// add route for zookeepers html - 11.3.6
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepr-public/zookeepers.html'));
});

// add route for request that does not exist (wildcard)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, ',/public/zookeepr-public/index.html'));
});

// add port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});