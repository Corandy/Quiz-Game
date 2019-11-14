const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//set CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //access control with * is only good for development purposes
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Front-end React content
app.use(express.static(path.join(__dirname,'/public')));

//API routes
app.use(require('./server/routes'));

//when route not found redirect to index
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//catch 500 error
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

