import mongoose from 'mongoose';

export default function(){
  let env = process.env,
      HOST = env.DB_HOST,
      PORT = env.DB_PORT,
      DB = env.DB_DB,
      USER = env.DB_USER || "",
      PASS = env.DB_PASS || "",
      uri = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/${DB}`;
  return mongoose.connect(uri);
}

