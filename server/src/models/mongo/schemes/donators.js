import mongoose from 'mongoose';

var types = mongoose.Schema.Types;

var oschema = new mongoose.Schema({
    dni: types.String,
    info: {
        names: types.String,
        lastNames: types.String,
        gender: types.String,
        ubigeo: types.String,
        birth: types.String
    },
    contact: {
        email: {
            value: types.String,
            verified: types.Boolean,
            code: types.String
        },
        telephone: {
            value: types.String,
            verified: types.Boolean,
            code: types.String
        },
        medinfo: {
            bloodType: {type: types.String, enum: ['O-','O+','A-','A+','B-','B+','AB-','AB+']},
            validDonator: types.Boolean,
            verified: types.Boolean
        }
    }
});
export default oschema;
