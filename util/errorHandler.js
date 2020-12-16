function Error(msg,err) {

    this.erro = err,
    this.mensagem = msg
}

let ErrorHandler  = {
    handle: function(msg,err,res,status) {    

        let error;
        if(err){
            error = new Error(msg,err.message);
        } else {
            error = new Error(msg,null);
        }

        return res.status(status).json({error})
    }
}

module.exports = ErrorHandler