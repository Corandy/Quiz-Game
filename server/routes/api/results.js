var router = require('express').Router();
var resultsController = require('../../controllers/results');

//save results
router.post('/', resultsController.saveResultOfUser);  

//load all results
router.get('/', resultsController.showAllResults);

//load specific result
router.get('/:userId?', resultsController.showResultsOfSpecificUser);

module.exports = router;