import {Router} from 'express';
import receptorModel from '../models/receptor.js';
import donatorModel from '../models/donator.js';
import sanitize from 'mongo-sanitize';

const router = Router();
router.post('/donate', function(req, res){
    receptorModel.findOne({},function(err, dat){
        if (err) return res.status(500).send('Error interno');
        dat.history = ([]||dat.history).push({
            donator: null,
            quantity: res.body.data.quantity,
            date: new Date(),
            user: null
        });
        dat.save(function(err2, dat2){
            if (err2) return res.status(500).send('Error interno');
            var ret = {
                success: true,
                data: {
                    quantity: dat2.quantity,
                    date: dat2.date
                }
            };
            return res.status(200).send(ret);
        });
        return 1;
    });
});

export default router;
