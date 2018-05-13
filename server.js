var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var router = express.Router();
var mongoose = require('mongoose');
var Bear = require('./app/models/bear.model.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://rubickmagic:rubickmagic12345@ds117590.mlab.com:17590/bears-app-db')
        .then(() => {
        console.log('Connected to database');
}).catch(err => {
  console.log('Can\'t connect to the mlab database');
  console.log(err.message);
  process.exit();
});

router.use((req, res, next) => {
  console.log('Something is going on, you should check it');
  next();
});

router.get('/', (req, res) => {
  res.json({message: 'welcome to bears api'});
});

require('./app/routers/bear.routes.js')(router);

app.use('/api', router);

app.listen(port, () => {
  console.log('Server is running now!');
});
