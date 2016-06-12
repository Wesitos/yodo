import fs from 'fs';
import parse from 'express-jwt';
import jwt from 'jsonwebtoken';

const publicKey = fs.readFileSync('jwt_key.pub');
const privateKey = fs.readFileSync('jwt_key');

export const parseJWT = parse({
  secret: publicKey,
  getToken: function(req){
    return req.cookies.token || null;
  }});

export function signJWT(payload){
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
  });
}
