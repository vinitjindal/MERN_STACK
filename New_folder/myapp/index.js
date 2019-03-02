var express = require('express');
//import Express from './node_modules/express';

var app = express();
app.set('view engine','ejs');

app.get('/',function(req,res){
  res.render('index');
})
app.listen(3000);
