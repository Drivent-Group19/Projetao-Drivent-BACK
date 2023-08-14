import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

type MailInfo = {
  userEmail: string;
  userName: string;
  ticketType: string;
  price: number;
};

export default async function sendPaymentConfirmation(mailInfo: MailInfo) {
  const { userEmail, userName, ticketType, price } = mailInfo;

  const html = `
    <h1> Pagamento confirmado! </h1>
    <h2> Olá, ${userName}! </h2>
    <h2> Aqui está o resumo da sua compra:</h2>
    <h3> ${ticketType} </h3>
    <h3> R$${price} </h3>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `Drivent <${process.env.EMAIL}>`,
      to: userEmail,
      subject: 'Pagamento efetuado com sucesso :)',
      html: html,
    });

    console.log('message sent ' + info.messageId);
  } catch (err) {
    console.log(err);
  }
}