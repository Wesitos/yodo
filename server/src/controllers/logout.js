import {Router} from 'express';

const router = new Router();

router.post('/', function(req, res){
  res.clearCookie('token');
  res.json({success: true});
});

export default router;
