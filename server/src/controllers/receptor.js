import {Router} from 'express';
import {verifyAddress} from '../utils/smtp.js';
import receptorModel from '../models/receptor.js';
import sanitize from 'mongo-sanitize';

const router = new Router();


router.post('/', function(req, res){
  const dni = req.params.dni,
        qty = req.params.qty,
        blood = req.params.blood;

  receptorModel.find()

});
