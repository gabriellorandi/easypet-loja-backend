const mongoose = require('mongoose');
const Produto = require('./produto');
const User = require('./user');

let compraSchema = new mongoose.Schema({

    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    produtos:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' } ],
    data:{ type: Date },    

});

module.exports = mongoose.model('Compra', compraSchema);