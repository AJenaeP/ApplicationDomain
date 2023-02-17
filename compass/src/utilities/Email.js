const MailDev = require('maildev')


const maildev = new MailDev({
    smtp: 1025,
    outgoingHost: 'stmp.compass.com',
    outgoingUser: 'compass@compass.com',
    outgoingPass: '********'
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const nodemailer = require('nodemailer')

async function main() {
    const { user, pass } = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: '0.0.0.0',
        port: 8025,
        auth: { type: 'login', user, pass }
    })
}

const info = await transporter.sendMail({
    from: '\'Fred Foo 👻\' <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
})
//Send email?
const messages = [
    {
        from: '',
        to: '',
        subject: '',
        text: '',
        html: '',
    }
]

main().catch(console.error)