const mongoose = require('mongoose');


let UserSchema = new mongoose.Schema({

    cpf:{ type: String, required: true, minlength: 11, maxlength: 16 },
    email: { type: String, required: true },    
    password: { type: String, required: true },
    token: { type: String }

}, { __v: false });

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', function() {
    var obj = this.toObject()
    delete obj.password
    delete obj.cpf
    return obj
 })

module.exports  = mongoose.model('User', UserSchema);