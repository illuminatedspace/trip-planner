const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');
const router = require('./routes');

//middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//bootstrap and jQ
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

//nunjucks
nunjucks.configure('views', {noCache:true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//database and server
db.sync()
  .then(() => {
    app.listen(3000, function(){
      console.log('server listening on port 3000');
    });
  })
  .catch(console.error);



//router
app.use('/', router);
