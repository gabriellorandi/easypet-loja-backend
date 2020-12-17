const User = require('../models/user');
const ErrorHandler = require('../util/errorHandler');
const bcrypt = require('bcrypt');
const auth = require('../security/auth');

let LoginController = {

    login: async function(req, res){

        let user = await User.findOne({"email": req.body.email }) 
                        
        if(!user) {
            return ErrorHandler.handle('Email ou senha inválida',null,res,400);         
        } else {

            let valido = await bcrypt.compare(req.body.password, user.password);
            
            if(!valido) {
                return ErrorHandler.handle('Email ou senha inválida',null,res,400);         
            } 

            let token = auth.token(user.id);

            user.token = token;

            user.save();

            res.status(200).json({
                email: user.email,
                tokenType: 'Bearer',                
                accessToken: token                
            });
        }    

    },

    signup: function(req,res){

        let user = new User();
        user = Object.assign(user,req.body);

        User.findOne({$or:[{cpf: user.cpf},{email: user.email} ]}, 
            function (err,userBanco) {

            if(userBanco){
                return ErrorHandler.handle('Email ou Cpf já cadastrado',null,res,400);  
            } 
            else {

                bcrypt.hash(req.body.password, 2, function(err,hash) {
                    if(err) ErrorHandler.handle('Erro na criptografia da definição senha',err,res,500);           
        
                    user.password = hash;
        
                    user.save();
        
                    return res.status(201).json({msg:"Usuário cadastrado com sucesso!"});
                });
            }
        })       
    }

}


module.exports = LoginController;