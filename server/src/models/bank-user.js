import mongoose from 'mongoose';
import {hashPassword} from '../utils/crypto.js';

var types = mongoose.Schema.Types;
var oschema = new mongoose.Schema({
  _bank: {type: mongoose.Schema.objectId, ref: 'bank'},
  email: String,
  passwd: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    uppercase: true,
  },
});

oschema.pre('save', function hashPasswordPreSave(next){
  const user = this;
  if (!user.isModified('passwd')){
    next();
  }
  else{
    // Si la contraseña fue modificada (o creada)
    hashPassword(user.passwd)
      .then((hashed) => user.passwd = hashed)
      .then(next);
  }
});

oschema.statics.create = function(bankId, email, passwd){
  return this({
    _bank: bankId,
    email,
    passwd,
    role: 'user',
  });
};

oschema.methods.setRole = function(role){
  this.role = role;
  return this;
};

export default mongoose.model('BankUser', oschema);
