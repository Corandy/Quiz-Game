const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

//set CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Front-end React content
app.use(express.static(path.join(__dirname,'/public')));

//API routes
app.use(require('./server/routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found '+req.url);
    err.status = 404;
    next(err);
});

//catch 500 error (development)
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
});

//listen to port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

