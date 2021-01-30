const express = require('express');
const router = express.Router();
const {create, insertMany, countryById, remove, update, list, read} = require('../controllers/country');

router.post('/country/create/', create);
router.post('/country/insert/many/', insertMany);

router.put('/country/:id', update);
router.delete('/country/:id',remove);
router.get('/country/byid/:id', read);
router.get('/country/all',  list);

router.param('id', countryById);

module.exports = router;  