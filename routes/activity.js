const express = require('express');
const router = express.Router();
const {create,  activityById, remove, update, list, read} = require('../controllers/activity');

router.post('/activity/create', create);
router.put('/activity/:id', update);
router.delete('/activity/:id',remove);
router.get('/activity/byid/:id', read);
router.get('/activity/all',  list);

router.param('id', activityById);

module.exports = router;  