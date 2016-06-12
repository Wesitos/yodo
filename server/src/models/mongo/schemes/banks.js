import mongoose from 'mongoose';
import GeoJSON from 'mongoose-geojson-schema';
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
export default oschema;
