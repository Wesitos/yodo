import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {promisify} from 'bluebird';

const randomBytes = promisify(crypto.randomBytes);

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);


// Returns a promise for a base64 decoded random n-byte string
export function randomString(bytes){
  return randomBytes(bytes)
    .then((buf) => buf.toString('base64'));
}

// Returns a promise for a hashed password
export function hashPassword(password){
  return genSalt(parseInt(process.env.SALT_WORK_FACTOR))
    .then((salt) => hash(password, salt));
}

// Returns a promise for a boolean if the hash fits the password
export function comparePassword(password, hashed){
  return compare(password, hashed);
}
