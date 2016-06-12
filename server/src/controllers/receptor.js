import {Router} from 'express';
import receptorModel from '../models/receptor.js';
import sanitize from 'mongo-sanitize';

const router = Router();

router.post('/', function(req, res){
    var receptor = new receptorModel({
        dni: req.body.data.dni,
        bloodType: req.body.data.bloodType,
        date: new Date(),
        quantity: req.body.data.quantity,
        //bloodBank: req.body.data.bloodBank,
        bloodBank: null,
        //user: req.user.id,
        user: null,
        deadLine: new Date(req.body.data.deadLine),
        history: null,
        left: req.body.data.quantity,
        active: true
    });
    receptor.save(function(err,dat){
        if(err) return res.status(500).send('Internal error');
        var ret = {
            success: true,
            data: {
                id: dat._id,
                dni: dat.dni,
                bloodType: dat.bloodType,
                quantity: dat.quantity,
                //bloodBank: dat.bloodBank,
                deadLine: dat.deadLine,
                history: [],
                left: dat.left,
                active: dat.active
            }
        };
        res.status(200).jsonp(ret);
        return 1;
    });
});

export default router;
