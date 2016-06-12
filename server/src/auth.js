import fs from 'fs';
import parse from 'express-jwt';

const publicKey = fs.readFileSync('../jwt_key.pub');

export const parseJWT = parse({secret: publicKey});
