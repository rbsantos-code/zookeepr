const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');

const { zookeepers } = require('../data/zookeepers.json');


jest.mock('fs');

test('create a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Darlene', id: 'dfadfda'},
        zookeepers
    );

    expect(zookeeper.name).toBe('Darlene');
    expect(zookeeper.id).toBe('dfadfda');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '2',
            name: 'Raskha',
            age: 31,
            favoriteAnimal: 'penguin'
        },
        {
            id: '3',
            name: 'Isabella',
            age: 67,
            favoriteAnimal: 'bear'
        }
    ];

    const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});


test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '2',
            name: 'Raskha',
            age: 31,
            favoriteAnimal: 'penguin'
        },
        {
            id: '3',
            name: 'Isabella',
            age: 67,
            favoriteAnimal: 'bear'
        }
    ];

    const result = findById('3', startingZookeepers);

    expect(result.name).toBe('Isabella');
});


test('validate age', () => {
    const zookeeper = {
        id: '2',
        name: 'Raskha',
        age: 31,
        favoriteAnimal: 'penguin'
    };

    const invalidZookeeper = {
        id: '3',
        name: 'Isabella',
        age: '67',
        favoriteAnimal: 'bear'
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});