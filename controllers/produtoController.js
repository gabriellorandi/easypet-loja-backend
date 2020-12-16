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

    add: async function(req, res){

        let produto = await Produto.findOne({_id:req.params.produtoId});
        if(!produto) return ErrorHandler.handle('Produto não encontrado',null,res,404);    

        let produto = new Produto();
        produto = Object.assign(produto,req.body);

        produto.save(function (err) {
            if(err) return ErrorHandler.handle('Erro ao salvar produto',err,res,500);

            return res.status(201).send({
                Produto: produto
            });
        })

    },

    update: async function(req, res){

        let produto = await Produto.findOne({_id:req.params.produtoId});
        if(!produto) return ErrorHandler.handle('Produto não encontrada',err,res,404);

        let update = { $set: {
            'descricao':  req.body.produto.descricao,
            'codigo':  req.body.produto.codigo,
            'quantidade':  req.body.produto.quantidade,
            'preco':  req.body.produto.preco
        } };
        let conditions = {_id: req.params.produtoId};

        Produto.findOneAndUpdate( conditions , update, function(err,produtoUpdate) {
            if(err) return ErrorHandler.handle('Erro ao atualizar produto',err,res,500);

            return res.status(201).send({
                Produto: produtoUpdate
            });
        })

    },

    delete: async function(req, res){

        let produto = await Produto.findOne({_id:req.params.produtoId});
        if(!produto) return ErrorHandler.handle('Produto não encontrada',err,res,404);

        let conditions = {_id: req.params.produtoId};

        Produto.deleteOne(conditions , function(err,produtoDelete) {
            if(err) return ErrorHandler.handle('Erro ao deletar produto',err,res,500);

            return res.status(200).send({
                ConProdutosulta: produtoDelete
            });
        })

    }

}


module.exports = ProdutoController;