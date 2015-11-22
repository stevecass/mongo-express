var application_root = __dirname;
var express = require('express');
var cookieParser = require('cookie-parser')
var session = require('cookie-session')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var app = express();
app.use(cookieParser());
app.use(session(
  {name:'session',
   keys: ['ef305d06ecb84574b9befe9d4d31c87654cf7f30ec82',
   '5ae3af1d866dab6a73eb4eb0601b44215c4ab05aa']
   }
   ));
app.use(require('body-parser').json());
app.use(express.static(application_root + "/public"));
app.use(require('./controllers/products_controller'))
app.use(require('./controllers/users_controller'))
app.listen(3000);

