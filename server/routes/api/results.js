var router = require('express').Router();

router.get('/', function(req, res, next){
  res.send('GET RESULTS');
});

router.post('/', function(req, res, next){
    res.send('POST RESULTS');
});  

router.get('/:userId?', loadUser, function(req, res, next){
    if(req.user){
        res.send('GET RESULTS OF ' + req.user);
    } else {
        res.send('GET RESULTS OF USER FAIL');
    }
});

function loadUser(req, res, next) {
    if (req.params.userId == 2) {
        req.user = 'PIET';
        next();
    } else {
        next(new Error("Couldn't find user: "));
    }
  }

module.exports = router;