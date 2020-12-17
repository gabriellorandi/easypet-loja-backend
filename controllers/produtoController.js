const Produto = require('../models/produto');
const ErrorHandler = require('../util/errorHandler');

let ProdutoController = {

    getAll: function(req, res){

        Produto.find( function(err,produtos) {

            if(err) return ErrorHandler.handle('Erro ao recuperar produtos',err,res,500);         
 
            return res.status(200).send({
                Produtos: produtos
            })
 
         })

    },

    getById: async function(req, res){

        let produto = await Produto.findOne({_id:req.params.produtoId});
        if(!produto) return ErrorHandler.handle('Produto não encontrado',err,res,404);

        return res.status(200).send({
            Produto: produto
        })

    },

    add: async function(message){

        try {

            let produto = JSON.parse(message.value);

            let produto = await Produto.findOne({_id:produto.id});
            if(!produto) return ErrorHandler.handle('Produto não encontrado',null,res,404);    


            produto.save(function (err) {
                if(err) return console.log('Error ao adicionar produto '+err);
            })

        } catch(err) {
            console.log('Error ao adicionar produto '+err);
        }

    },

    update: async function(message){

        try {

            let produto = JSON.parse(message.value);

            let produto = await Produto.findOne({_id:produto.id});
            if(!produto) return ErrorHandler.handle('Produto não encontrado',null,res,404);    

            let conditions = { _id: produto.id };

            Produto.findOneAndUpdate(conditions, produto, function (err) {
                if(err) console.log('Error ao adicionar produto '+err);;            
            })

        } catch(err) {
            console.log('Error ao adicionar produto '+err);
        }

    },

    delete: async function(message){
    
        try {

            let produtoId = JSON.parse(message.value);
    
            let conditions = {_id: produtoId};
    
            Produto.deleteOne(conditions , function(err) {
                if(err) return ErrorHandler.handle('Erro ao deletar produto',err,res,500);            
            })

        } catch(err) {
            console.log('Error ao adicionar produto '+err);
        }

    }

}


module.exports = ProdutoController;