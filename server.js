const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data - 11.2.5
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data - 11.2.5
app.use(express.json());

// create a route to request data from
const { animals } = require('./data/animals.json')




// handle filter functionality 
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    // note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // save personalityTraits as a dedicated array
        // if personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        })
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
}


// parameter function
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// function to take data and adding to animals JSON - 11.2.6
function createNewAnimal(body, animalsArray) {
    console.log(body);
    // our function's main code will go here!

    // return finished code to post route for response
    return body;
}

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
app.post('/api/animals', (req, res) => {
    // rec.body is where our incoming content will be 
    console.log(req.body); // req.body is where we can access that data on the server side - 11.2.3
    res.json(req.body); // using this to send back data to client
});

// add port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});