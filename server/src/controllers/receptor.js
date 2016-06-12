import {Router} from 'express';
import receptorModel from '../models/receptor.js';
import sanitize from 'mongo-sanitize';

const router = Router();

router.post('/', function(req, res){
    var receptor = new receptorModel({
        bloodType: req.data.bloodType,
        date: new Date(),
        quantity: req.data.quantity,
        bloodBank: req.data.bloodBank,
        user: req.user.id,
        deadLine: new Date(req.data.deadLine),
        history: null,
        left: req.data.quantity,
        active: true
    });
    receptor.save(function(err,dat){
        if(err) return res.send(500,'Internal error');
        var ret = {
            success: true,
            data: {
                id: dat._id,
                bloodType: dat.bloodType,
                quantity: dat.quantity,
                bloodBank: dat.bloodBank,
                deadLine: dat.deadLine,
                history: [],
                left: dat.left,
                active: dat.active
            }
        };
        return 1;
    });
});

export default router;
