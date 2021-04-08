// imports
const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

// add the route (query)
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) { // req.query as an argument and filter through the animals accordingly - 11.1.5
        results = filterByQuery(req.query, results);
    }
    res.json(results)
});

// add (parameter) route - This should only return a single animal
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// get user POST data
router.post('/animals', (req, res) => { // rec.body is where our incoming content will be 
    
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

module.exports = router;