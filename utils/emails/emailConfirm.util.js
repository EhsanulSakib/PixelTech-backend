const {createTransport} = require("nodemailer")
const User = require("../../models/v1/user.model")

const localTime = (timestamp) => {
  const date = new Date(timestamp)
  const regularTime = date.toLocaleString()

  return regularTime
}

const sendEmailConfirmationEmail = async (user, url, subject, res) => {
  const transporter = createTransport({
    services: process.env.APP_SERVICE,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD
    }
  })

  var mailOptions = {
    from: process.env.APP_EMAIL,
    to: user?.email,
    subject: subject,
    html: `
    <h1>Hello ${user?.name}</h1>
    <p>You requested for an email confirmation</p>
    <p>Click on the link below to confirm your email</p>
    <a href=${url}>${url}</a>
    `
  }

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error.message)
    }

    else {
      console.log('Email sent to: ' + info.envelope.to[0])

      res.status(201).json({
        acknowledged: true,
        message: "Email sent",
        description: info.messageId
      })
    }
  })
}