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
        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif">
            <div
                style="
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid black;
                background-color: white;
                "
            >
                <div style="text-align: center; margin-bottom: 30px">
                    <img
                        src="https://i.ibb.co/1MTFxQt/Messagemind.png"
                        alt="Company Logo"
                        style="max-width: 150px"
                    />
                    <h1>${subject}</h1>
                </div>
                <div style="margin-bottom: 30px">
                    <p style="text-align: center">
                        Dear Customer, Please, click the button below:
                    </p>
                </div>
                <a
                    href=${url}
                    style="
                        display: block;
                        width: fit-content;
                        margin: 0 auto;
                        padding: 10px 20px;
                        background-color: white;
                        color: black;
                        text-decoration: none;
                        border-radius: none;
                        border: 1px solid black;
                    "
                >
                    <b>Accept Confirmation</b>
                </a>
                <div style="margin-top: 30px; text-align: center; color: #888">
                    <p><span style="color: white; background-color: red;"><b>Having trouble?</b></span> Paste the URL <mark><b><i>${url}</i></b></mark> at <b>reply</b> to this <b>email</b></p>
                    <p>If you did not <b>create an account</b> with us, please ignore this email.</p>
                    <p>&copy; ${new Date().getFullYear()} Beamer. All rights reserved.</p>
                </div>
            </div>
        </div>
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