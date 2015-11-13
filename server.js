var application_root = __dirname;
var express = require('express');
var app = express();

app.use(require('body-parser').json());
app.use(express.static(application_root + "/public"));
app.use(require('./controllers/products_controller'))
app.use(require('./controllers/users_controller'))

app.listen(3000);

