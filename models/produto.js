const mongoose = require('mongoose');

let ProdutoSchema = new mongoose.Schema({

    descricao: { type: String, required: true },    
    codigo: { type: String, required: true },
    quantidade: { type: Number, required: true  },
    preco: { type: Number, required: true  },

});

ProdutoSchema.set('toObject', { virtuals: true })
ProdutoSchema.set('toJSON', { virtuals: true })

module.exports  = mongoose.model('Produto', ProdutoSchema);