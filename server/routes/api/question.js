var router = require('express').Router();
var questionController = require('../../controllers/question');

router.post('/', questionController.getNewQuestion);

module.exports = router;