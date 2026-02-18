const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 858,
    secure: false,
    auth: {
        user: 'mernimishas@gmail.com',
        pass: 'ytrepmbdllqocxnf'
    }
})

const sendEmail = async (message) => {
    let res = await transporter.sendMail(message)
}

module.exports = sendEmail;