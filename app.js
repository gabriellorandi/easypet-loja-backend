let express = require('express');
let cors = require('cors');
const mongoose = require('mongoose');
const ErrorHandler = require('./util/errorHandler');
const auth = require('./security/auth');
const config = require('./config/config');

//Routes

// MongoDB
var mongoDB = 'mongodb://'+config.MONGO_PATH+'/'+config.MONGO_BD;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar ao Banco'));

var app = express(); 
app.listen(config.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req,res) {
  return ErrorHandler.handle('Path: '+req.path+' não encontrado',null,res,404);    
});

console.log('Easy Pet Loja');  

module.exports = app;