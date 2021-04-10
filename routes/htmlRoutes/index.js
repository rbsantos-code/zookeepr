//imports
const path = require('path');
const router = require('express').Router();

// add route for HTML - 11.3.4
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepr-public/index.html'));
});

// add route for animals html - 11.3.6
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepr-public/animals.html'));
});

// add route for zookeepers html - 11.3.6
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepr-public/zookeepers.html'));
});

// add route for request that does not exist (wildcard)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepr-public/index.html'));
});



module.exports = router;