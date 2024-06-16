const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 4200; // Replace with your desired port

// Middleware
app.use(bodyParser.json());

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'katapariashvilinikoloz@gmail.com',
    pass: '72upidag' // Replace with your email account password
  }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'katapariashvilinikoloz@gmail.com',
    to: 'katapariashvilinikoloz123@gmail.com',
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
