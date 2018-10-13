const mailer = require('nodemailer');
const from = 'Aman <postmaster@localhost>';

const markdown = require('../lib/markdown');

exports.send = async function (to = [], subject, body) {

    let mailOpts = {
        from: from,
        subject: subject,
    }
    try {
        mailOpts.html = await markdown.render(body);
    } catch (error) {
        throw 'Could Not Render Message Body!';
    }
    const response = {};
    for (const email of to) {
        mailOpts.to = email;
        let r = await sendMessage(mailOpts)
        response[email] = r.response;
    }
    return response;
}


function sendMessage(options) {
    return new Promise((resolve, reject) => {
        let transporter = getTransPort();
        transporter.sendMail(options, (err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });
}

function getTransPort() {
    return mailer.createTransport({
        host: 'localhost',
        port: 25,
    })
}