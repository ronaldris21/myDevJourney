import nodemailer from 'nodemailer';
import { OrderTemplate } from './EmailTemplates.js';

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log('Email sent');
  });
};

// send email
const EmailSender = ({ email, subject, order }) => {
  const options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: order.status ? OrderTemplate(order) : '',
  };

  Email(options);
};

export default EmailSender;
