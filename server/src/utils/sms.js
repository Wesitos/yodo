import twilio from 'twilio';

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
      AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
      FROM_NUMBER = process.env.TWILIO_FROM_NUMBER,
      client = twilio(ACCOUNT_SID, AUTH_TOKEN);

export function verifyNumber(number, code){
  const msg = `Tu codigo de verificacion para "Yo dono" es: ${code}`;
  return sendSMS(number, msg);
}

export function sendSMS(number, message){
  return client.sendMessage({
    to: number,
    from: FROM_NUMBER,
    body: message,
  });
}
