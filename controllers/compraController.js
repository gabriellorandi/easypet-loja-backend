const Compra = require('../models/compra');
const Produto = require('../models/produto');
const User = require('../models/user');
const ErrorHandler = require('../util/errorHandler');

let CompraController = {

    getAll: async function(req, res){

        let token = req.headers.authorization.split(" ")[1];
        let user = await User.findOne({token:token});

        if(!user) return ErrorHandler.handle('Usuário não encontrado',err,res,404);

        Compra.find({user:user},function(err,compras) {

            if(err) return ErrorHandler.handle('Erro ao recuperar compras',err,res,500);         
 
            return res.status(200).send({
                Compras: compras
            })
 
         })

    },

    getById: async function(req, res){

        let token = req.headers.authorization.split(" ")[1];
        let user = await User.findOne({token:token});

        if(!user) return ErrorHandler.handle('Usuário não encontrado',err,res,404);

        let conditions = {user:user,_id: req.params.id};

        Compra.find(conditions,function(err,compra) {

            if(err) return ErrorHandler.handle('Erro ao recuperar compras',err,res,500);         
 
            return res.status(200).send({
                Compra: compra
            })
 
         })


    },

    add: async function(req, res){

        let token = req.headers.authorization.split(" ")[1];
        let user = await User.findOne({token:token});

        if(!user) return ErrorHandler.handle('Usuário não encontrado',err,res,404);

        let compra = Compra();
        compra.user = user;
        compra.produtos = [];
        for(let produtoId of req.body.produtosId){

            let produto = await Produto.findOne({_id:produtoId});
            if(!produto) return ErrorHandler.handle('Produto não encontrada',null,res,404);   

            compra.produtos.push(produto);
        }

        compra.save(function (err) {
            if(err) return ErrorHandler.handle('Erro ao salvar compra',err,res,500);

            return res.status(201).send({
                Compra: compra
            });
        })

     
    },

    update: async function(req, res){

        let token = req.headers.authorization.split(" ")[1];
        let user = await User.findOne({token:token});

        if(!user) return ErrorHandler.handle('Usuário não encontrado',err,res,404);

        let compra = Compra();
        compra.produtos = [];
        for(let produtoId of req.body.produtosId){

            let produto = await Produto.findOne({_id:produtoId});
            if(!produto) return ErrorHandler.handle('Produto não encontrada',null,res,404);   

            compra.produtos.push(produto);
        }

        let update = { $set: {
            'produtos':  produtos,
            'data':  req.body.compra.data
        } };

        let conditions = {user:user,_id: req.params.compraId};

        compra.findOneAndUpdate(conditions,update,function (err) {
            if(err) return ErrorHandler.handle('Erro ao salvar compra',err,res,500);

            return res.status(201).send({
                Compra: compra
            });
        })

    },

    delete: async function(req, res){

        let token = req.headers.authorization.split(" ")[1];
        let user = await User.findOne({token:token});

        if(!user) return ErrorHandler.handle('Usuário não encontrado',err,res,404);

        let conditions = {user:user,_id: req.params.consultaId};

        Compra.deleteOne(conditions,function(err,compra) {

            if(err) return ErrorHandler.handle('Erro ao deletar compra',err,res,500);         
 
            return res.status(200).send({
                Compra: compra
            })
 
         })
      
    }

}


module.exports = CompraController;