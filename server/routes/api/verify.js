var router = require('express').Router();
var resultsController = require('../../controllers/results');

router.post('/', resultsController.verifyUserBasedOnEmail);

module.exports = router;