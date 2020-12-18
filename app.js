let express = require('express');
let cors = require('cors');
const mongoose = require('mongoose');
const ErrorHandler = require('./util/errorHandler');
const auth = require('./security/auth');
const config = require('./config/config');

let compraRouter = require('./routes/compra.route');
let produtoRouter = require('./routes/produto.route');
let loginRouter = require('./routes/login');

var app = express(); 
app.listen(config.PORT);

// MongoDB
var mongoDB = 'mongodb://'+config.MONGO_PATH+'/'+config.MONGO_BD;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar ao Banco'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Routes
app.use('/', loginRouter);
app.use('/', auth.isAuthorized , compraRouter);
app.use('/', auth.isAuthorized , produtoRouter);


app.use(function(req,res) {
  return ErrorHandler.handle('Path: '+req.path+' não encontrado',null,res,404);    
});

console.log('Easy Pet Loja');  

module.exports = app;