import GeoJSON from 'mongoose-geojson-schema';
import mongoose from 'mongoose';

var types = mongoose.Schema.Types;
var oschema = new mongoose.Schema({
    info: {
        address: types.String,
        geo: types.Point,
        ubigeo: types.String,
        name: types.String,
        schedule: types.String,
        image: types.String
    },
    contact: {
        phone: types.String,
        mail: types.String
    },
    users: [
        {
            email: types.String,
            passwd: types.String
        }
    ]
});
export default mongoose.model('Banks', oschema);
