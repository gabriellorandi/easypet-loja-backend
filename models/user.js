const mongoose = require('mongoose');


let UserSchema = new mongoose.Schema({

    cpf:{ type: String, required: true, minlength: 11, maxlength: 16 },
    email: { type: String, required: true },    
    password: { type: String, required: true }

});

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })

module.exports  = mongoose.model('User', UserSchema);