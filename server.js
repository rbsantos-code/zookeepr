const express = require('express');
const app = express();

// create a route to request data from
const { animals } = require('./data/animals.json')








// add the route
app.get('/api/animals', (req, res) => {
    res.json(animals)
});

// add port
app.listen(3001, () => {
    console.log('API server now on port 3001!');
});