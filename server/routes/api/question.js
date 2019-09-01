var router = require('express').Router();
var questionController = require('../../controllers/question');

router.get('/', questionController.getNewQuestion);

module.exports = router;