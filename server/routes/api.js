const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController');

router.get('/search', controller.search);
router.get('/artists/:id/albums', controller.albums);
module.exports = router;
