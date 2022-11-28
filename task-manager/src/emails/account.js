const sgMail = require ('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'darkghoust10@gmail.com',
        subject: 'Welcome to the app',
        text: name + ' are involved to our domain'
    })
}

const sendDeleteEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'darkghoust10@gmail.com',
        subject: 'Your account getting to be deleted',
        text: name + ' Why?'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
}