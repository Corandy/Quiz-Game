var express = require('express');
var router = express.Router();

//turns request to api to JSON format
router.use(express.json());
router.use('/api', require('./api'));
module.exports = router;