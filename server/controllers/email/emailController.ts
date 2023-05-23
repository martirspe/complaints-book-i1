import nodemailer from 'nodemailer';

export const sendMail = async () => {
  const config = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rosonoem@gmail.com',
      pass: 'joqdciqrfinxnnop'
    }
  };

  const message = {
    from: '"Node Foo 👻" <admin@alka.cloud>',
    to: "mrojas@alka.cloud",
    subject: "Hello ✔",
    html: "<b>Hello world?</b>"
  };

  const transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(message);

  // Verify connection configuration
  transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  console.log("Message sent: %s", info.messageId);

}

sendMail();
