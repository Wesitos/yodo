import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import {logger} from '../logger.js';

const verifyTmplt = pug.compileFile('src/views/email/valida.pug');
const urgenciaTmplt = pug.compileFile('src/views/email/urgencia.pug');

const env = process.env,
      HOST = env.SMTP_HOST,
      PORT = env.SMTP_PORT,
      USER = env.SMTP_USER,
      PASSWORD = env.SMTP_PASSWORD,
      opts = {
        host: HOST,
        port: PORT,
        requireTLS: true,
        logger: logger,
        auth: {
          user: USER,
          pass: PASSWORD,
        },
      },
      transporter = nodemailer.createTransport(opts);

export function verifyAddress(user){
  const name = (user.info.names || "").split(" ")[0],
        production = (env.NODE_ENV === 'production'),
        code = user.contact.email.code,
        url = `http://${env.HOSTNAME || 'localhost'}${production?``:':'+env.PORT}/api/donator/validate?user=${user.id}&code=${code}`,
        html = juice(verifyTmplt({url, name})),
        mailOpts = {
          from: {
            name: 'Yo dono',
            address: USER,
          },
          to: user.contact.email.value,
          subject: 'Verifica tu correo',
          html,
        };

  return transporter.sendMail(mailOpts);
}

