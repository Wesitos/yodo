import nodemailer from 'nodemailer';
import pug from 'pug';

const verifyTmplt = pug.compileFile('src/views/email/valida.pug');
const urgenciaTmplt = pug.compileFile('src/views/email/urgencia.pug');

const env = process.env,
      production = (env.NODE_ENV == 'production'),
      HOST = env.SMTP_HOST,
      PORT = env.SMTP_PORT,
      USER = env.SMTP_USER,
      PASSWORD = env.SMTP_PASSWORD,
      opts = {
        host: HOST,
        port: PORT,
        requireTLS: true,
        logger: true,
        debug: !production,
        auth: {
          user: USER,
          pass: PASSWORD,
        },
      },
      transporter = nodemailer.createTransport(opts);

export function verifyAddress(user){
  const name = (user.info.names || "").split(" ")[0],
        code = user.contact.email.code,
        html = urgenciaTmplt({code, name}),
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

