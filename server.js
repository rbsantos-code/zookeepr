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


// add the route (query)
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) { // req.query as an argument and filter through the animals accordingly - 11.1.5
        results = filterByQuery(req.query, results);
    }
    res.json(results)
});



// add (parameter) route - This should only return a single animal
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// get user POST data
app.post('/api/animals', (req, res) => { // rec.body is where our incoming content will be 
    
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, sent 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted');
    } else {
        // add animal to json file  and animals array in this function
        const animal = createNewAnimal(req.body, animals);

        res.json(animal); // using this to send back data to client
    }

});

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