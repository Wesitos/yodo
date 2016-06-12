import mongoose from 'mongoose';
var types = mongoose.Schema.Types;
var oschema = new mongoose.Schema({
    bloodType: {type: types.String, enum: ['O-','O+','A-','A+','B-','B+','AB-','AB+']},
    date: types.Date,
    bloodBank: types.ObjectId,
    user: types.ObjectId,
    deadLine: types.Date,
    history: [
        {
            donator: types.ObjectId,
            quantity: types.Number,
            date: types.Date,
            user: types.ObjectId
        }
    ],
    left: types.Number,
    active: types.Boolean
});
export default mongoose.model('Receptors',oschema);
