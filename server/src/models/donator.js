import mongoose from 'mongoose';
var types = mongoose.Schema.Types;
import {hashPassword, randomString} from '../utils/crypto.js';

var oschema = new mongoose.Schema({
  dni: {type: types.String, index: true},
  password: types.String,
  info: {
    names: types.String,
    lastNames: types.String,
    gender: types.String,
    ubigeo: types.String,
    birth: types.String,
  },
  contact: {
    email: {
      value: types.String,
      verified: types.Boolean,
      code: types.String,
    },
    telephone: {
      value: types.String,
      verified: types.Boolean,
      code: types.String,
    },
  },
  medinfo: {
    bloodType: {
      type: types.String,
      enum: ['O-','O+','A-','A+','B-','B+','AB-','AB+'],
      uppercase: true,
    },
    validDonator: types.Boolean,
    verified: types.Boolean,
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

oschema.pre('save', function emailVerifyCodePreSave(next){
  if (!this.contact.email.verified &&
      !this.contact.email.code){
    randomString(30)
      .then((str) => this.contact.email.code = str)
      .then(next);
  }
  else{
    next();
  }
});

oschema.statics.create = function(data){
  return this({
    info: data.info,
    password: data.password,
    contact: {
      email: {
        value: data.contact.email.value,
        verified: false,
      },
      telephone: {
        value: data.contact.telephone.value,
        verified: false,
        code: null,
      },
    },
    medinfo: {
      bloodType: data.medinfo.bloodType,
      validDonator: null,
      verified: false,
    },
  });
};

export default mongoose.model('Donators',oschema);
