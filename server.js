const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//set CORS
app.use(function(req, res, next) {
  /*var allowedOrigins = ['http://localhost:8081', 'http://localhost:8080'];
  if(allowedOrigins.indexOf(req.headers.origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }*/
  res.setHeader('Access-Control-Allow-Origin', '*'); //access control with * is only good for development purposes
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Front-end React content
app.use(express.static(path.join(__dirname,'/public')));

//API routes
app.use(require('./server/routes'));

/*
/// catch 404 and forward to error handler
app.use('/api', function(req, res, next) {
    var err = new Error('Not Found '+req.url);
    err.status = 404;
    next(err);
});
*/

//redirect to index
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//catch 500 error (development)
app.use('/api', function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
});

//listen to port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

